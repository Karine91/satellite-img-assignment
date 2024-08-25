import type { KonvaEventObject } from "konva/lib/Node";

export type BaseShapeProps = {
  visible?: boolean;
  listening?: boolean;
  onClick?: (e: KonvaEventObject<MouseEvent>) => void;
};
