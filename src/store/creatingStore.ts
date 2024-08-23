import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { ShapeType } from "@/types";

type CreateState = {
  createMode: boolean;
  shapeType: ShapeType;
  setCreateMode: (val: boolean) => void;
  setShapeType: (type: ShapeType) => void;
};

export const useCreatingStore = create<CreateState>()(
  devtools((set) => ({
    createMode: false,
    shapeType: "rect",
    setCreateMode: (val) => {
      set({ createMode: val });
    },
    setShapeType: (type) => set({ shapeType: type }),
  })),
);
