import { KonvaEventObject } from "konva/lib/Node";
import { useState, useRef, useEffect } from "react";
import { Group, Stage, Layer } from "react-konva";

import {
  getCenteredCoords,
  getMapPosition,
  getScaledPosition,
} from "../services/mapService";

import { MapImage, type IMapImageProps } from "./MapImage";
import { Shapes } from "./Shapes";

import { useMapStore } from "@/store/mapStore";

export const Map = ({
  width = 1000,
  height = 1000,
  imgSrc,
}: Pick<IMapImageProps, "imgSrc"> &
  Partial<Pick<IMapImageProps, "height" | "width">>) => {
  const scale = useMapStore((state) => state.scale);
  const prevScale = useRef(scale);
  useEffect(() => {
    setPosition((state) =>
      getScaledPosition({
        currPos: state,
        scale,
        prevScale: prevScale.current,
        canvas: { width, height },
      }),
    );
    prevScale.current = scale;
  }, [scale]);

  const [mapPosition, setPosition] = useState(
    getCenteredCoords({ width, height, scale }),
  );

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const stage = e.target;

    const newPos = getMapPosition({
      canvas: {
        width,
        height,
      },
      scale,
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
      <MapImage imgSrc={imgSrc} width={width} height={height} />
      <Layer>
        <Group>
          <Shapes />
        </Group>
      </Layer>
    </Stage>
  );
};
