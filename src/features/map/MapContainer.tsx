import { useState } from "react";

import { Map } from "./Map";

import imgSrc from "@/assets/TCI.jpg";

export const MapContainer = () => {
  const [scale, setScale] = useState(1);
  return (
    <div>
      <div>
        Panel
        <button onClick={() => setScale((s) => s + 1)}>+</button>
        <button onClick={() => setScale((s) => s - 1)}>-</button>
      </div>
      <Map imgSrc={imgSrc} scale={scale} />
    </div>
  );
};
