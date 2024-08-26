import { KonvaEventObject } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Stage } from "react-konva";

import { MapImage } from "./MapImage";

import imgSrc from "@/assets/TCI.jpg";
import { Shapes } from "@/features/shape";
import { useMapStore } from "@/providers";

export const Map = observer(() => {
  const {
    scale,
    mapPosition,
    setPosition,
    getMapPositionWithinImage,
    width,
    height,
  } = useMapStore();

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const stage = e.target;

    const newPos = getMapPositionWithinImage({
      currentPos: stage.getPosition(),
      prevPos: mapPosition,
    });

    stage.setPosition(newPos);
  };

  return (
    <Stage
      draggable
      scaleX={scale}
      scaleY={scale}
      width={width}
      height={height}
      x={mapPosition.x}
      y={mapPosition.y}
      onDragMove={handleDragMove}
      onDragEnd={(e) => {
        setPosition({
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
    >
      <MapImage imgSrc={imgSrc} width={width} height={height}>
        <Shapes />
      </MapImage>
    </Stage>
  );
});
