import { Shape as KonvaShape } from "konva/lib/Shape";
import { Transformer } from "react-konva";

export const EditShape = ({ nodes }: { nodes: KonvaShape[] }) => {
  return <Transformer draggable nodes={nodes} />;
};
