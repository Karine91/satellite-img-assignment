import { Image as KonvaImage } from "konva/lib/shapes/Image";
import { observer } from "mobx-react-lite";
import { useState, useEffect, useRef } from "react";
import { Image, Layer } from "react-konva";

import { CreateShape } from "@/features/shape";
import { useCreateShape } from "@/features/shape";
import { useMapStore } from "@/providers";
import { loadImage } from "@/utils";

interface IMapImageProps {
  width: number;
  height: number;
  imgSrc: string;
}

export const MapImage = observer(
  ({
    width,
    height,
    imgSrc,
    children,
  }: IMapImageProps & { children: React.ReactNode }) => {
    const [image, setImage] = useState<null | HTMLImageElement>(null);

    const mapImgRef = useRef<null | KonvaImage>(null);

    const { shapeType } = useMapStore();

    const { data, stageProps, isCreating } = useCreateShape();

    useEffect(() => {
      loadImage(imgSrc, setImage);
    }, [imgSrc]);

    return image ? (
      <>
        <Layer>
          <Image
            ref={mapImgRef}
            image={image}
            width={width}
            height={height}
            className={"cursor-crosshair"}
            {...stageProps}
          />
        </Layer>
        <Layer>
          {shapeType !== null && data && (
            <CreateShape
              type={shapeType}
              data={data}
              visible={Boolean(isCreating)}
            />
          )}
          {children}
        </Layer>
      </>
    ) : null;
  },
);
