import { KonvaEventObject } from "konva/lib/Node";
import { useState, useRef } from "react";

import { useCreatingStore } from "@/store/creatingStore";
import { useMapStore } from "@/store/mapStore";
import type { Point } from "@/types";

export const useCreateShape = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isCreatingState, setCreatingState] = useState(false);
  const isCreating = useRef(false);
  const shapeType = useCreatingStore((state) => state.shapeType);
  const createMode = shapeType !== null;
  const addShape = useMapStore((state) => state.addShape);

  function addPoint(point: Point) {
    if (shapeType === "rect" && points.length > 1) {
      setPoints((state) => [state[0], point]);
    } else {
      setPoints((state) => [...state, point]);
    }
  }

  const startCreating = () => {
    isCreating.current = true;
    setCreatingState(true);
  };

  const finishCreating = () => {
    isCreating.current = false;
    setCreatingState(false);
    setPoints([]);
    // save our points to the store
    if (shapeType) {
      addShape({ type: shapeType, coords: points });
    }
  };

  const getPosition = (e: KonvaEventObject<MouseEvent>) => {
    return e.target.getStage()?.getRelativePointerPosition();
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

    const position = getPosition(e);

    if (position) {
      startCreating();
      addPoint(position);
    }
  };

  const handleStageMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!createMode || !isCreating.current) {
      return;
    }

    e.evt.preventDefault();

    const position = getPosition(e);
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
    isCreating: isCreatingState,
  };
};
