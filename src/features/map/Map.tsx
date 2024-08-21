import { KonvaEventObject } from "konva/lib/Node";
import { useState, useEffect, useRef } from "react";
import { Stage, Image, Layer } from "react-konva";

import {
  getCenteredCoords,
  getMapPosition,
  getScaledPosition,
} from "./services/mapService";

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
    <Stage width={width} height={height}>
      {image && (
        <Layer>
          <Image
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
    </Stage>
  );
};
