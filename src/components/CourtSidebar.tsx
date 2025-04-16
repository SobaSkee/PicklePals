import React, { useEffect, useState } from "react";

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
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: "40%",
        backgroundColor: "white",
        opacity: 0.95,
        boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
        paddingLeft: "20px",
        paddingRight: "20px",
        zIndex: 1000,
        display: "flex",
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
      <h2 style={{ fontSize: "40px", fontWeight: "bold"}}>{name}</h2>
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
    </div>
  );
};

export default CourtSidebar;