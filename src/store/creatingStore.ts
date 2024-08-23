import { create } from "zustand";

import { ShapeType } from "@/types";

type CreateState = {
  shapeType: ShapeType | null;
  setShapeType: (type: ShapeType | null) => void;
};

export const useCreatingStore = create<CreateState>()((set) => ({
  shapeType: null,
  setShapeType: (type) => set({ shapeType: type }),
}));
