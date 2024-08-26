import { ZoomPanel, Map, CreatePanel, DeletePanel } from "@/features/map";

export const MapScreen = () => {
  return (
    <div>
      <div className="my-5 flex gap-2 items-center">
        <ZoomPanel max={10} min={0.5} />
        <CreatePanel />
        <DeletePanel />
      </div>
      <Map />
    </div>
  );
};
