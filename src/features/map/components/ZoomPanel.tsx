import { observer } from "mobx-react-lite";

import Button from "@/components/Button";
import { useMapStore } from "@/providers";

interface IZoomPanel {
  min: number;
  max: number;
}

export const ZoomPanel = observer(({ min, max }: IZoomPanel) => {
  const { scale, setScale } = useMapStore();

  const zoomIn = () => {
    setScale(Math.min(Math.floor(scale + 1), max));
  };

  const zoomOut = () => {
    setScale(Math.max(scale - 1, min));
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
});
