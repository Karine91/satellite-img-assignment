export type Point = {
  x: number;
  y: number;
};

export type ShapeType = "polygon" | "rect";

export type ShapeData = {
  type: ShapeType;
} & (RectangleShape | PolygonShape);

export type RectangleShape = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PolygonShape = {
  points: number[];
};
