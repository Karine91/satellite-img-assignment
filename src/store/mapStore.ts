import { create } from "zustand";

import { ShapeData } from "@/types";
interface MapState {
  shapes: ShapeData[];
  scale: number;
  addShape: (data: ShapeData) => void;
  setScale: (fn: (val: number) => number) => void;
}

export const useMapStore = create<MapState>()((set) => ({
  shapes: [],
  scale: 1,
  setScale: (fn) => {
    set((state) => ({ scale: fn(state.scale) }));
  },
  addShape: (data: ShapeData) =>
    set((state) => ({ shapes: [...state.shapes, data] })),
}));
