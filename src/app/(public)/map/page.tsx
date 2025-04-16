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

const MAPBOX_ACCESS_TOKEN = process.env
  .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
const IPINFO_API_KEY = process.env.NEXT_PUBLIC_IPINFO_API_KEY as string;
if (!MAPBOX_ACCESS_TOKEN) {
  throw new Error("Set mapbox access token in NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN");
}
if (!IPINFO_API_KEY) {
  throw new Error("Set IPinfo API key in NEXT_PUBLIC_IPINFO_API_KEY");
}

// test data (get from database later)

// const courts = [
//   {
//     id: 1,
//     name: "Northside Park",
//     lat: 29.70743498704277,
//     lng: -82.35371900410598,
//   },
//   {
//     id: 2,
//     name: "Forest Park",
//     lat: 29.636549532177156,
//     lng: -82.39134797316163,
//   },
//   {
//     id: 3,
//     name: "Flavet Sports Field",
//     lat: 29.645905378302785,
//     lng: -82.35272140477402,
//   },
//   {
//     id: 4,
//     name: "Southwest Rec Tennis/Pickleball Courts",
//     lat: 29.638423998683724,
//     lng: -82.36711401872542,
//   },
// ];

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

  const filteredCourts = courts.filter((court) =>
    court.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCourt = (court: Court) => {
    setSearch(court.name);
    setShowDropdown(false);
    // Pan map to court location
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [court.lng, court.lat], zoom: 14 });
      const { x, y } = mapRef.current.project([court.lng, court.lat]);
      setPopupPosition({ x, y });
      setSelectedCourt(court);
    }
  };

  // fetch user location
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

  // fetch courts from database
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await axios.get("/api/courts/get"); // make GET request to fetch courts
        setCourts(response.data); // set the fetched data to state
      } catch (error) {
        console.error("Error fetching courts:", error);
      }
    };
    fetchCourts(); //
  }, []);

  useEffect(() => {
    // only initialize the map if userLocation is valid
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
      center: [lng, lat], // order is lng, lat
      zoom: 11,
    });

    // add markers for each pickleball court
    courts.forEach((court) => {
      if (mapRef.current) {
        const marker = new mapboxgl.Marker()
          .setLngLat([court.lng, court.lat])
          .addTo(mapRef.current);
        marker.getElement().addEventListener("click", () => {
          setSelectedCourt(court);
          const { x, y } = mapRef.current!.project([court.lng, court.lat]);
          setPopupPosition({ x, y });
        });
      }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [userLocation, courts]); // trigger map initialization when userLocation is updated

  useEffect(() => {
    if (!mapRef.current || !selectedCourt) return;

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
  }, [selectedCourt]);

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
          <MarkerPopup {...selectedCourt} />
        </div>
      )}
      
      <div className="absolute top-20 left-4 z-10 w-[300px] max-w-full">
        <input
          type="text"
          placeholder="Search for a court..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // delay for click
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
    </div>
  );
}

export default Page;
