import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { ShapeType } from "@/types";

type CreateState = {
  createMode: boolean;
  shapeType: ShapeType;
  setCreating: (val: boolean) => void;
  setShapeType: (type: ShapeType) => void;
};

export const useCreatingStore = create<CreateState>()(
  devtools((set) => ({
    createMode: true,
    shapeType: "rect",
    setCreating: (val) => {
      set({ createMode: val });
    },
    setShapeType: (type) => set({ shapeType: type }),
  })),
);
