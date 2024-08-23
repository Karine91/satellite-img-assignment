import imgSrc from "@/assets/TCI.jpg";
import { ZoomPanel, Map, CreatePanel } from "@/features/map";

export const MapScreen = () => {
  return (
    <div>
      <div className="my-5 flex gap-2">
        <ZoomPanel max={10} min={0.5} />
        <CreatePanel />
      </div>
      <Map imgSrc={imgSrc} />
    </div>
  );
};
