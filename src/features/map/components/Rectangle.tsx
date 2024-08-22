import { Rect, Layer } from "react-konva";

import { useCreatingStore } from "@/store/creatingStore";
import type { Point } from "@/types";

export const Rectangle = ({ points }: { points: Point[] }) => {
  const createMode = useCreatingStore((state) => state.createMode);
  const [p1 = { x: 0, y: 0 }, p2 = p1] = points;

  return (
    <Layer>
      <Rect
        x={Math.min(p1.x, p2.x)}
        y={Math.min(p1.y, p2.y)}
        width={Math.abs(p2.x - p1.x)}
        height={Math.abs(p2.y - p1.y)}
        fill="rgba(0,0,255,0.5)"
        visible={createMode}
        listening={false}
      />
    </Layer>
  );
};
