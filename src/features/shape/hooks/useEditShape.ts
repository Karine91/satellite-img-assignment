import { KonvaEventObject } from "konva/lib/Node";
import { Shape as KonvaShape } from "konva/lib/Shape";
import { useState, useEffect } from "react";

import { useMapStore } from "@/providers";

export type EditProps = {
  onClick: (e: KonvaEventObject<MouseEvent>) => void;
  listening: boolean;
};

export const useEditShape = () => {
  const { editMode, setEditShapeId } = useMapStore();
  const [nodes, setNodes] = useState<KonvaShape[] | null>(null);

  useEffect(() => {
    if (!editMode) {
      setNodes(null);
    }
  }, [editMode]);

  const handleShapeClick =
    (id: string) => (e: KonvaEventObject<MouseEvent>) => {
      e.evt.preventDefault();

      setEditShapeId(id);
      setNodes([e.target as KonvaShape]);
    };

  const closeEditMode = () => {
    setNodes(null);
    setEditShapeId(null);
  };

  return {
    editData: {
      onClick: handleShapeClick,
      listening: true,
    },
    nodes,
    editMode,
    closeEditMode,
  };
};
