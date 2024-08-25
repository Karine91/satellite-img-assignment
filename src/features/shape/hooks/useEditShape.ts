import { KonvaEventObject } from "konva/lib/Node";
import { Shape as KonvaShape } from "konva/lib/Shape";
import { useState } from "react";

export type EditProps = ReturnType<typeof useEditShape>["editData"];

export const useEditShape = () => {
  const [editMode, setMode] = useState(false);
  const [nodes, setNodes] = useState<KonvaShape[] | null>(null);
  const handleShapeClick = (e: KonvaEventObject<MouseEvent>) => {
    console.log("click on shape");

    setMode(true);
    console.log(e.target);
    setNodes([e.target as KonvaShape]);
  };

  return {
    editData: {
      onClick: handleShapeClick,
      listening: true,
    },
    nodes,
    editMode,
  };
};
