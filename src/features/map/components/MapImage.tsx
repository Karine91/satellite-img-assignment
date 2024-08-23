import { Image as KonvaImage } from "konva/lib/shapes/Image";
import { useState, useEffect, useRef } from "react";
import { Image, Layer } from "react-konva";

import { useCreateShape } from "../hooks/useCreateShape";

import { CreateShape } from "./CreateShape";

import { useCreatingStore } from "@/store/creatingStore";
import { loadImage } from "@/utils";

export interface IMapImageProps {
  width: number;
  height: number;
  imgSrc: string;
}

export const MapImage = ({ width, height, imgSrc }: IMapImageProps) => {
  const [image, setImage] = useState<null | HTMLImageElement>(null);

  const mapImgRef = useRef<null | KonvaImage>(null);

  const shapeType = useCreatingStore((state) => state.shapeType);
  const { points, stageHandlers, isCreating } = useCreateShape();

  useEffect(() => {
    loadImage(imgSrc, setImage);
  }, [imgSrc]);

  return image ? (
    <Layer>
      <Image
        ref={mapImgRef}
        image={image}
        width={width}
        height={height}
        {...stageHandlers}
      />
      {shapeType === "rect" && (
        <CreateShape points={points} isCreating={isCreating} />
      )}
    </Layer>
  ) : null;
};
