import React, { useEffect, useState } from "react";
import Link from "next/link";

interface CourtSidebarProps {
  court: {
    name: string;
    address: string;
    description: string;
    isPublic: boolean;
    lat: number;
    lng: number;
    image: string;
  };
  onClose: () => void;
}

const CourtSidebar: React.FC<CourtSidebarProps> = ({ court, onClose }) => {
  const { name, address, description, isPublic, image } = court;
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    // Trigger the animation after mount
    requestAnimationFrame(() => setSlideIn(true));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,  
        height: "100%",
        width: "40%",
        backgroundColor: "white",
        opacity: 0.95,
        boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
        paddingLeft: "20px",
        paddingRight: "20px",
        zIndex: 1000,
        display: "flex",
        gap: "16px",
        overflowY: "auto",
        flexDirection: "column",
        transform: slideIn ? "translateX(0%)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <button
        onClick={onClose}
        style={{
          alignSelf: "flex-end",
          fontSize: "40px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#888",
        }}
      >
        ×
      </button>
      <img
        src={`data:image/jpg;base64,${image}`}
        alt={name}
        style={{
          width: "100%",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      />
      <h2 style={{ fontSize: "40px", fontWeight: "bold", lineHeight: "2rem"}}>{name}</h2>
      <p style={{ fontSize: "16px", color: "#444" }}>{address}</p>
      <p style={{ fontSize: "14px", color: "#555", marginTop: "12px", marginBottom: "12px"}}>{description}</p>
      
      <p
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: isPublic ? "#0284C7" : "#A855F7",
        }}
      >
        {isPublic ? "Public Court" : "Private Court"}
      </p>
      <p>Don't see a court listed in your area? Request a new court to be added!</p>

        <Link href="/courts/new" style={{
          backgroundColor: "#0284C7",
          color: "white",
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: 600,
        }}>Request a Court</Link>

    </div>
  );
};

export default CourtSidebar;