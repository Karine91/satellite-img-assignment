import { KonvaEventObject } from "konva/lib/Node";
import { Image as KonvaImage } from "konva/lib/shapes/Image";
import { Stage as KonvaStage } from "konva/lib/Stage";
import { useState, useEffect, useRef } from "react";
import { Stage, Image, Layer } from "react-konva";

import { useCreateShape } from "../hooks/useCreateShape";
import {
  getCenteredCoords,
  getMapPosition,
  getScaledPosition,
} from "../services/mapService";

import { Rectangle } from "./Rectangle";

import { useCreatingStore } from "@/store/creatingStore";
import { loadImage } from "@/utils";

export const Map = ({
  width = 1000,
  height = 1000,
  imgSrc,
  scale,
}: {
  width?: number;
  height?: number;
  imgSrc: string;
  scale: number;
}) => {
  const [image, setImage] = useState<null | HTMLImageElement>(null);
  const prevScale = useRef(scale);
  const stageRef = useRef<null | KonvaStage>(null);
  const mapImgRef = useRef<null | KonvaImage>(null);

  const shapeType = useCreatingStore((state) => state.shapeType);
  const { points, stageHandlers } = useCreateShape();

  const [mapPosition, setPosition] = useState(
    getCenteredCoords({ width, height, scale }),
  );

  useEffect(() => {
    loadMapImage();
  }, [imgSrc]);

  useEffect(() => {
    setPosition((state) =>
      getScaledPosition({
        currPos: state,
        scale,
        prevScale: prevScale.current,
      }),
    );
    prevScale.current = scale;
  }, [scale]);

  const loadMapImage = () => {
    loadImage(imgSrc, setImage);
  };

  const handleMapDragMove = (e: KonvaEventObject<DragEvent>) => {
    const image = e.target;

    const newPos = getMapPosition({
      canvas: {
        width,
        height,
      },
      scale,
      currentPos: {
        x: image.x(),
        y: image.y(),
      },
      prevPos: mapPosition,
    });

    image.setPosition(newPos);
  };

  return (
    <Stage ref={stageRef} width={width} height={height} {...stageHandlers}>
      {image && (
        <Layer>
          <Image
            ref={mapImgRef}
            image={image}
            scale={{ x: scale, y: scale }}
            x={mapPosition.x}
            y={mapPosition.y}
            width={width}
            height={height}
            draggable
            onDragMove={handleMapDragMove}
            onDragEnd={(e) => {
              setPosition({
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
          />
        </Layer>
      )}
      {shapeType === "rect" && <Rectangle points={points} />}
    </Stage>
  );
};
