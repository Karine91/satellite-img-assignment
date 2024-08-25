import { observer } from "mobx-react-lite";
import { Rect } from "react-konva";

import { EditProps } from "../shape";

import { BaseShapeProps } from "@/features/shape";
import { ShapeDataBase } from "@/types";

export const Rectangle = observer(
  ({
    visible = true,
    points,
    ...shapeData
  }: BaseShapeProps & ShapeDataBase & Partial<EditProps>) => {
    const [px1 = 0, py1 = 0, px2 = px1, py2 = py1] = points;

    return (
      <Rect
        x={Math.min(px1, px2)}
        y={Math.min(py1, py2)}
        width={Math.abs(px2 - px1)}
        height={Math.abs(py2 - py1)}
        fill="rgba(0,0,255,0.5)"
        visible={visible}
        {...shapeData}
      />
    );
  },
);
