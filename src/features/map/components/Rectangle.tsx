import { observer } from "mobx-react-lite";
import { Rect } from "react-konva";

import type { RectangleShape } from "@/types";

export const Rectangle = observer(
  ({
    visible = true,
    ...shapeData
  }: { visible?: boolean } & RectangleShape) => {
    return (
      <Rect
        {...shapeData}
        fill="rgba(0,0,255,0.5)"
        visible={visible}
        listening={false}
      />
    );
  },
);
