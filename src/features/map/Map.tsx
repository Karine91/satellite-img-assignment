import { useState, useEffect, useRef } from "react";
import { Stage, Image, Layer } from "react-konva";

import { roundNumber } from "@/utils";

function getCenteredCoords(width: number, height: number, scale: number) {
  return {
    x: roundNumber((width - width * scale) / 2),
    y: roundNumber((height - height * scale) / 2),
  };
}

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
    getCenteredCoords(width, height, scale),
  );

  useEffect(() => {
    loadImage();
  }, [imgSrc]);

  useEffect(() => {
    // preserve position during scaling
    setPosition((state) => ({
      x: roundNumber(state.x * (scale / prevScale.current)),
      y: roundNumber(state.y * (scale / prevScale.current)),
    }));
    prevScale.current = scale;
  }, [scale]);

  const loadImage = () => {
    const img = new window.Image();
    img.src = imgSrc;
    img.addEventListener("load", () => setImage(img));
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
            onDragMove={(e) => {
              // restrict dragging only within image
              const newPos = { ...e.target.getPosition() };
              const rightEdge = width - width * scale;
              const bottomEdge = height - height * scale;
              const topEdge = 0;
              const leftEdge = 0;

              if (e.target.x() < rightEdge) {
                newPos.x = rightEdge;
              }

              if (e.target.y() < bottomEdge) {
                newPos.y = bottomEdge;
              }

              if (e.target.x() > topEdge) {
                newPos.x = topEdge;
              }

              if (e.target.y() > leftEdge) {
                newPos.y = leftEdge;
              }

              e.target.setPosition(newPos);
            }}
            onDragEnd={(e) => {
              setPosition({
                x: roundNumber(e.target.x()),
                y: roundNumber(e.target.y()),
              });
            }}
          />
        </Layer>
      )}
    </Stage>
  );
};
