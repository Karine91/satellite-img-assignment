import { useState } from "react";

import { Map } from "./Map";

import imgSrc from "@/assets/TCI.jpg";

const MAX_ZOOM = 10;
const MIN_ZOOM = 0.5;

export const MapContainer = () => {
  const [scale, setScale] = useState(1);

  const zoomIn = () => {
    setScale((s) => {
      return Math.min(s + 1, MAX_ZOOM);
    });
  };

  const zoomOut = () => {
    setScale((s) => {
      return Math.max(s - 1, MIN_ZOOM);
    });
  };

  return (
    <div>
      <div>
        Panel
        <button disabled={scale === MAX_ZOOM} onClick={zoomIn}>
          +
        </button>
        <button disabled={scale === MIN_ZOOM} onClick={zoomOut}>
          -
        </button>
      </div>
      <Map imgSrc={imgSrc} scale={scale} />
    </div>
  );
};
