import { useState } from "react";

import imgSrc from "@/assets/TCI.jpg";
import { ZoomPanel, Map, CreatePanel } from "@/features/map";

export const MapScreen = () => {
  const [scale, setScale] = useState(1);

  return (
    <div>
      <div className="my-5 flex gap-2">
        <ZoomPanel max={10} min={0.5} scale={scale} setScale={setScale} />
        <CreatePanel />
      </div>
      <Map imgSrc={imgSrc} scale={scale} />
    </div>
  );
};
