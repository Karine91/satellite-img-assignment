import { create } from "zustand";

import { ShapeType } from "@/types";

interface MapState {
  createMode: null | ShapeType;
  shapes: any[];
}

export const mapStore = create<MapState>()((set) => ({
  createMode: null,
  shapes: [],
  addShape: (data: any) =>
    set((state) => ({ shapes: [...state.shapes, data] })),
}));
