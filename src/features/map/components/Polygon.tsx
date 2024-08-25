import { Line } from "react-konva";

import { PolygonShape } from "@/types";

type IPolygonProps = {
  visible?: boolean;
  listening?: boolean;
} & PolygonShape;

export const Polygon = ({ points, visible, listening }: IPolygonProps) => {
  return (
    <Line
      points={points}
      stroke="black"
      strokeWidth={5}
      fill={"rgba(0,0,255,0.5)"}
      visible={visible}
      listening={listening}
      closed
    />
  );
};
