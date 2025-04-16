import React, { useState } from "react";
import Image from "next/image";

// define props for the popup component
export interface Court {
  name: string;
  lat: number;
  lng: number;
  image: string;
}

const MarkerPopup: React.FC<Court> = ({ name, lat, lng, image }) => {
  return (
    <div>
      <h3>{name}</h3>
      {/* <p>
        Coordinates: {lat}, {lng}
      </p> */}
      <img src={`data:image/jpg;base64,${image}`} alt={name} />
    </div>
  );
};

export default MarkerPopup;
