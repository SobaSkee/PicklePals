"use client";
import React, { useEffect, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import ReactDOMServer from "react-dom/server";
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";
import { Court } from "@/components/MarkerPopup";
import MarkerPopup from "@/components/MarkerPopup";
import CourtSidebar from "@/components/CourtSidebar";

const MAPBOX_ACCESS_TOKEN = process.env
  .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
const IPINFO_API_KEY = process.env.NEXT_PUBLIC_IPINFO_API_KEY as string;
if (!MAPBOX_ACCESS_TOKEN) {
  throw new Error("Set mapbox access token in NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN");
}
if (!IPINFO_API_KEY) {
  throw new Error("Set IPinfo API key in NEXT_PUBLIC_IPINFO_API_KEY");
}

function Page() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const filteredCourts = courts.filter((court) =>
    court.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCourt = (court: Court) => {
    setSearch(court.name);
    setShowDropdown(false);
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [court.lng, court.lat - 0.005], zoom: 14 });
      const { x, y } = mapRef.current.project([court.lng, court.lat]);
      setPopupPosition({ x, y });
      setSelectedCourt(court);
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await axios.get(
          `https://ipinfo.io/json?token=${IPINFO_API_KEY}`
        );
        const { loc } = response.data;
        const [lat, lng] = loc
          .split(",")
          .map((coord: string) => parseFloat(coord));

        if (!isNaN(lat) && !isNaN(lng)) {
          setUserLocation({ lat, lng });
        } else {
          console.error("Invalid location data", loc);
        }
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };
    fetchUserLocation();
  }, []);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await axios.get("/api/courts/get");
        setCourts(response.data);
      } catch (error) {
        console.error("Error fetching courts:", error);
      }
    };
    fetchCourts();
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !userLocation) return;

    const { lat, lng } = userLocation;
    if (isNaN(lat) || isNaN(lng)) {
      console.error("Invalid latitude or longitude", lat, lng);
      return;
    }

    mapRef.current = new mapboxgl.Map({
      accessToken: MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      container: mapContainerRef.current,
      center: [lng, lat],
      zoom: 11,
    });

    courts.forEach((court) => {
      if (mapRef.current) {
        const marker = new mapboxgl.Marker()
          .setLngLat([court.lng, court.lat])
          .addTo(mapRef.current);
        marker.getElement().addEventListener("click", () => {
          setShowSidebar(false);
          setSelectedCourt(court);
          mapRef.current!.flyTo({ center: [court.lng, court.lat + 0.015], zoom: 12 });
          const { x, y } = mapRef.current!.project([court.lng, court.lat]);
          setPopupPosition({ x, y });
        });
      }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [userLocation, courts]);

  useEffect(() => {
    if (!mapRef.current || !selectedCourt || showSidebar) return;

    const updatePopupPosition = () => {
      const { x, y } = mapRef.current!.project([selectedCourt.lng, selectedCourt.lat]);
      setPopupPosition({ x, y });
    };

    mapRef.current.on("move", updatePopupPosition);
    mapRef.current.on("zoom", updatePopupPosition);
    updatePopupPosition();

    return () => {
      mapRef.current?.off("move", updatePopupPosition);
      mapRef.current?.off("zoom", updatePopupPosition);
    };
  }, [selectedCourt, showSidebar]);

  return (
    <div className="w-full h-full">
      {selectedCourt && popupPosition && (
        <div
          className="absolute z-20 bg-white p-4 rounded-lg shadow-lg w-[300px]"
          style={{ left: popupPosition.x, top: popupPosition.y, transform: "translate(-50%, -100%)" }}
        >
          <div className="relative w-full h-[160px] overflow-hidden rounded-md mb-3">
            <img
              src={`data:image/jpg;base64,${selectedCourt.image}`}
              alt={selectedCourt.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => {
                setSelectedCourt(null);
                setPopupPosition(null);
              }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white bg-opacity-80 rounded-full text-gray-600 hover:text-black hover:bg-red-200 shadow-sm"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <MarkerPopup {...selectedCourt} onViewDetails={() => {
            setPopupPosition(null);
            setShowSidebar(true);
          }} />
        </div>
      )}
      
      <div className="absolute top-20 left-4 z-10 w-[300px] max-w-full">
        <input
          type="text"
          placeholder="Search for a court..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none bg-white"
        />
        {showDropdown && filteredCourts.length > 0 && (
          <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow z-20 max-h-60 overflow-y-auto">
            {filteredCourts.map((court, index) => (
              <li
                key={index}
                onMouseDown={() => handleSelectCourt(court)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {court.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        id="map-container"
        ref={mapContainerRef}
        className="h-full w-full"
      ></div>
      {showSidebar && selectedCourt && (
        <CourtSidebar court={selectedCourt} onClose={() => setShowSidebar(false)} />
      )}
    </div>
  );
}

export default Page;
