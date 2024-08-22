import Button from "@/components/Button";

interface IZoomPanel {
  min: number;
  max: number;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
}

export const ZoomPanel = ({ min, max, scale, setScale }: IZoomPanel) => {
  const zoomIn = () => {
    setScale((s) => {
      return Math.min(s + 1, max);
    });
  };

  const zoomOut = () => {
    setScale((s) => {
      return Math.max(s - 1, min);
    });
  };

  return (
    <div className="flex items-center gap-2 mx-3">
      <div>Zoom: </div>
      <Button disabled={scale === min} onClick={zoomIn}>
        +
      </Button>
      <Button disabled={scale === max} onClick={zoomOut}>
        -
      </Button>
    </div>
  );
};
