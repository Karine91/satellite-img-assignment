import { observer } from "mobx-react-lite";

import { EditProps } from "../hooks/useEditShape";

import { Polygon } from "@/features/polygon";
import { Rectangle } from "@/features/rectangle";
import { ShapeType, ShapeDataBase } from "@/types";

export const CreateShape = observer(
  ({
    data,
    visible,
    listening = false,
    type,
    ...props
  }: {
    data: ShapeDataBase;
    visible: boolean;
    listening?: boolean;
    type: ShapeType;
  } & Partial<EditProps>) => {
    const commonProps = { visible, listening };

    const getShape = () => {
      switch (type) {
        case "rect":
          return <Rectangle {...commonProps} {...props} {...data} />;
        case "polygon":
          return <Polygon {...commonProps} {...props} {...data} />;
        default: {
          throw new Error("Error | Creating shape: Unknown shape type");
        }
      }
    };

    return getShape();
  },
);
