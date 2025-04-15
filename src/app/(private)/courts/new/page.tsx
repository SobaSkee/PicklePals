"use client";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export default function AddCourtPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [markerCoords, setMarkerCoords] = useState<{ lat: number; lng: number } | null>(null);
  const currentMarkerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-82.3248, 29.6516],
      zoom: 11,
    });

    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setMarkerCoords({ lat, lng });

      // Remove previous marker
      if (currentMarkerRef.current) {
        currentMarkerRef.current.remove();
      }

      const newMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current!);
      currentMarkerRef.current = newMarker;
    });

    return () => mapRef.current?.remove();
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div ref={mapContainerRef} className="w-full h-full" />
      {markerCoords && (
        <SidebarForm coords={markerCoords} onCancel={() => setMarkerCoords(null)} />
      )}
    </div>
  );
}

function SidebarForm({
  coords,
  onCancel,
}: {
  coords: { lat: number; lng: number };
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("lat", coords.lat.toString());
    formData.append("lng", coords.lng.toString());
    formData.append("public", isPublic.toString());
    if (image) formData.append("image", image);

    await axios.post("/api/courts/create", formData);
    alert("Court submitted!");
    onCancel();
  };

  return (
    <div className="absolute top-0 right-0 bg-white shadow-lg p-4 w-80 h-full z-10">
      <h2 className="text-lg font-bold mb-2">Add a Pickleball Court</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-1">Name</label>
        <input
          className="border w-full mb-2 p-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="block mb-1">Description</label>
        <textarea
          className="border w-full mb-2 p-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="block mb-1">Address</label>
        <input
          className="border w-full mb-2 p-1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label className="block mb-1">Public Court</label>
        <select
          className="border w-full mb-2 p-1"
          value={isPublic ? "true" : "false"}
          onChange={(e) => setIsPublic(e.target.value === "true")}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label className="block mb-1">Image</label>
        <input
          type="file"
          className="mb-2"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Submit
          </button>
          <button type="button" onClick={onCancel} className="text-red-500">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
