import { Line } from "react-konva";

import { EditProps, BaseShapeProps } from "@/features/shape";
import { ShapeDataBase } from "@/types";

type IPolygonProps = BaseShapeProps & ShapeDataBase & Partial<EditProps>;

export const Polygon = ({ points, visible, ...shapeData }: IPolygonProps) => {
  return (
    <Line
      fill={"rgba(52, 211, 153, 0.5)"}
      points={points}
      stroke="black"
      strokeWidth={3}
      visible={visible}
      {...shapeData}
      closed
    />
  );
};
