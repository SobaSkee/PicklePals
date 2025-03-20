"use client";
import React from "react";
import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

function Page() {
  return (
    <div className="w-full h-full">
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        style={{ width: "100%", height: 475 }}
        mapStyle="https://demotiles.maplibre.org/style.json"
      />
    </div>
  );
}

export default Page;
