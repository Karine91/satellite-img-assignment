import { useEffect, useState } from "react";
import { StageProps } from "react-konva";

import { useMapStore } from "@/providers";
import { Polygon } from "@/store/Polygon";
import { Rectangle } from "@/store/Rectangle";
import { ShapeDataBase } from "@/types";

export interface ICreateShape {
  stageProps: StageProps;
  data: ShapeDataBase;
  isCreating: boolean;
}

export const useCreateShape = () => {
  const store = useMapStore();
  const [shapeStore, setShapeStore] = useState(() => createData());

  useEffect(() => {
    setShapeStore(createData());
  }, [store.shapeType]);

  function createData() {
    switch (store.shapeType) {
      case "rect":
        return new Rectangle(store);
      case "polygon":
        return new Polygon(store);
      default:
        return null;
    }
  }

  return shapeStore?.componentData || ({} as ICreateShape);
};
