import React, { useState } from "react";
import Image from "next/image";

// define props for the popup component
export interface Court {
  name: string;
  address: string;
  isPublic: boolean;
  lat: number;
  lng: number;
  image: string;
}

const MarkerPopup: React.FC<Court> = ({ name, address, isPublic, lat, lng, image }) => {
  return (
    <div>


      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ fontWeight: "bold", fontSize: "18px", color: "#111" }}>{name}</div>
        <div style={{ color: "#444", fontSize: "14px" }}>{address}</div>
        <div style={{
          fontSize: "14px",
          fontWeight: "600",
          color: isPublic ? "#0284C7" : "#A855F7"
        }}>
          {isPublic ? "Public Court" : "Private Court"}
        </div>
      </div>
    </div>
  );
};

export default MarkerPopup;
