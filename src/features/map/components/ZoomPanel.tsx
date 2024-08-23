import Button from "@/components/Button";
import { useMapStore } from "@/store/mapStore";

interface IZoomPanel {
  min: number;
  max: number;
}

export const ZoomPanel = ({ min, max }: IZoomPanel) => {
  const scale = useMapStore((state) => state.scale);
  const setScale = useMapStore((state) => state.setScale);

  const zoomIn = () => {
    setScale((s) => {
      return Math.min(Math.floor(s + 1), max);
    });
  };

  const zoomOut = () => {
    setScale((s) => {
      return Math.max(s - 1, min);
    });
  };

  return (
    <div className="flex items-center gap-2 mx-3">
      <div>Zoom: {scale}</div>
      <Button disabled={scale === max} onClick={zoomIn}>
        +
      </Button>
      <Button disabled={scale === min} onClick={zoomOut}>
        -
      </Button>
    </div>
  );
};
