export type Point = {
  x: number;
  y: number;
};

export type ShapeType = "polygon" | "rect";

export type ShapeData = {
  type: ShapeType;
  coords: Point[];
};
