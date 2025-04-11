"use client";
import React, { useEffect, useRef, useState } from "react";
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";

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

const courts = [
  {
    id: 1,
    name: "Northside Park",
    lat: 29.70743498704277,
    lng: -82.35371900410598,
  },
  {
    id: 2,
    name: "Forest Park",
    lat: 29.636549532177156,
    lng: -82.39134797316163,
  },
  {
    id: 3,
    name: "Flavet Sports Field",
    lat: 29.645905378302785,
    lng: -82.35272140477402,
  },
  {
    id: 4,
    name: "Southwest Rec Tennis/Pickleball Courts",
    lat: 29.638423998683724,
    lng: -82.36711401872542,
  },
];

function Page() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

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

  useEffect(() => {
    // Only initialize the map if userLocation is valid
    if (!mapContainerRef.current || !userLocation) return;

    const { lat, lng } = userLocation; // TypeScript will now understand that userLocation is not null
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

    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_ACCESS_TOKEN,
      mapboxgl: mapboxgl,
      bbox: [-82.85235, 29.4681, -81.72848, 29.88553],
      proximity: { longitude: -82.3248, latitude: 29.6516 },
    });
    mapRef.current.addControl(geocoder);

    // Add markers for each pickleball court
    courts.forEach((court) => {
      // Check if mapRef.current is not null before adding markers
      if (mapRef.current) {
        new mapboxgl.Marker()
          .setLngLat([court.lng, court.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${court.name}</h3>`)) // Display court name on click
          .addTo(mapRef.current);
      }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [userLocation]); // Trigger map initialization when userLocation is updated

  return (
    <div className="w-full h-full">
      <div
        id="map-container"
        ref={mapContainerRef}
        className="h-full w-full"
      ></div>
    </div>
  );
}

export default Page;
