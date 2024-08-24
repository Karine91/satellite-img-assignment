import { useEffect, useState } from "react";
import { StageProps } from "react-konva";

import { TData } from "../components/CreateShape";

import { useMapStore } from "@/providers";
import { Rectangle } from "@/store/Rectangle";
import { ShapeType } from "@/types";

export interface ICreateShape {
  stageProps: StageProps;
  data: TData<ShapeType>;
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
      default:
        return null;
    }
  }

  return shapeStore?.componentData || ({} as ICreateShape);
};
