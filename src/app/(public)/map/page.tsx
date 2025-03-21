"use client";
import React, { useEffect, useRef } from "react";
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MAPBOX_ACCESS_TOKEN = process.env
  .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
if (!MAPBOX_ACCESS_TOKEN) {
  throw new Error("Set mapbox access token in NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN");
}

function Page() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      accessToken: MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      container: mapContainerRef.current,
      center: [-82.3540725315767, 29.657667255989793],
      zoom: 11,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_ACCESS_TOKEN,
      mapboxgl: mapboxgl,
    });
    mapRef.current.addControl(geocoder);
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

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
