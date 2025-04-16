import React, { useState } from "react";

// define props for the popup component
export interface Court {
  name: string;
  address: string;
  description: string;
  isPublic: boolean;
  lat: number;
  lng: number;
  image: string;
}

interface MarkerPopupProps extends Court {
  onViewDetails: () => void;
}

const MarkerPopup: React.FC<MarkerPopupProps> = ({ name, address, isPublic, lat, lng, image, onViewDetails }) => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ fontWeight: "bold", fontSize: "18px", color: "#111" }}>{name}</div>
        <div style={{ color: "#444", fontSize: "14px" }}>{address}</div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: isPublic ? "#0284C7" : "#A855F7",
          }}
        >
          {isPublic ? "Public Court" : "Private Court"}
        </div>
        <button
          onClick={onViewDetails}
          style={{
            marginTop: "8px",
            backgroundColor: "#4F46E5",
            color: "white",
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "14px",
            cursor: "pointer",
            border: "none",
            width: "100%",
            alignSelf: "flex-start"
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default MarkerPopup;
