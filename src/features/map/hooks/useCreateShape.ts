import { KonvaEventObject } from "konva/lib/Node";
import { useState, useRef } from "react";

import { useCreatingStore } from "@/store/creatingStore";
import type { Point } from "@/types";

export const useCreateShape = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const isCreating = useRef(false);
  const shapeType = useCreatingStore((state) => state.shapeType);
  const createMode = useCreatingStore((state) => state.createMode);
  const setCreating = useCreatingStore((state) => state.setCreating);

  function addPoint(point: Point) {
    if (shapeType === "rect" && points.length > 1) {
      setPoints((state) => [state[0], point]);
    } else {
      setPoints((state) => [...state, point]);
    }
  }

  const startCreating = () => {
    isCreating.current = true;
    setCreating(true);
  };

  const finishCreating = () => {
    isCreating.current = false;
    setCreating(false);
  };

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    if (!createMode) {
      return;
    }
    if (isCreating.current) {
      finishCreating();
      return;
    }

    e.evt.preventDefault();

    const position = e.target.getStage()?.getPointerPosition();
    if (position) {
      startCreating();
      addPoint(position);
    }
  };

  const handleStageMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!createMode) {
      return;
    }
    // can count on this state - it's not updated in this handler
    if (!isCreating.current) {
      return;
    }

    e.evt.preventDefault();

    const position = e.target.getStage()?.getPointerPosition();
    if (position) {
      addPoint(position);
    }
  };

  return {
    points,
    stageHandlers: {
      onClick: handleStageClick,
      onMouseMove: handleStageMouseMove,
    },
  };
};
