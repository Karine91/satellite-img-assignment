import { observer } from "mobx-react-lite";

import { Polygon } from "./Polygon";
import { Rectangle } from "./Rectangle";

import { ShapeType } from "@/types";

export type TData<T> = T extends "rect"
  ? React.ComponentProps<typeof Rectangle>
  : T extends "polygon"
    ? React.ComponentProps<typeof Polygon>
    : never;

export const CreateShape = observer(
  <T extends ShapeType>({
    data,
    visible,
    listening = false,
    type,
  }: {
    data: TData<T>;
    visible: boolean;
    listening?: boolean;
    type: T;
  }) => {
    const commonProps = { visible, listening };

    const getShape = () => {
      switch (type) {
        case "rect":
          return <Rectangle {...commonProps} {...(data as TData<"rect">)} />;
        case "polygon":
          return <Polygon {...commonProps} {...(data as TData<"polygon">)} />;
        default: {
          throw new Error("Error | Creating shape: Unknown shape type");
        }
      }
    };

    return getShape();
  },
);
