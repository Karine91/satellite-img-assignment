import { Line } from "react-konva";

import { PolygonShape } from "@/types";

type IPolygonProps = {
  visible?: boolean;
} & PolygonShape;

export const Polygon = ({ points, visible }: IPolygonProps) => {
  return (
    <Line
      points={points}
      stroke="black"
      strokeWidth={5}
      fill={"rgba(0,255,255,0.5)"}
      visible={visible}
    />
  );
};
