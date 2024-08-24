import { action, computed, observable, reaction } from "mobx";

import { ShapeData, ShapeType } from "@/types";

type Position = {
  x: number;
  y: number;
};

export class MapStoreState {
  @observable public accessor shapes: ShapeData[] = [];
  @observable public accessor scale: number = 1;

  @observable public accessor mapPosition: Position;

  @observable public accessor shapeType: ShapeType | null = null;

  constructor(
    public readonly width: number,
    public readonly height: number,
  ) {
    this.mapPosition = this.getCenteredCoords();

    reaction(
      () => this.scale,
      (scale, prevScale) => {
        const newPos = this.getScaledPosition(scale, prevScale);
        this.setPosition(newPos);
      },
    );
  }

  @action.bound
  setScale(val: number) {
    this.scale = val;
  }

  @action.bound
  setShapeType(type: ShapeType | null) {
    this.shapeType = type;
  }

  @action.bound
  addShape(shape: ShapeData) {
    this.shapes.push(shape);
  }

  @action.bound
  setPosition(newPos: Position) {
    this.mapPosition = newPos;
  }

  @computed
  get scaledWidth() {
    return {
      width: this.width * this.scale,
      height: this.height * this.scale,
    };
  }

  getCenteredCoords() {
    return {
      x: (this.width - this.scaledWidth.width) / 2,
      y: (this.height - this.scaledWidth.height) / 2,
    };
  }

  @action.bound
  getMapPositionWithinImage({
    currentPos,
    prevPos,
  }: {
    currentPos: Position;
    prevPos: Position;
  }) {
    const newPos = { ...currentPos };
    const map = this.scaledWidth;

    const boundary = {
      top: 0,
      bottom: this.height - map.height,
      left: 0,
      right: this.width - map.width,
    };

    if (this.width < map.width) {
      if (currentPos.x < boundary.right) {
        newPos.x = boundary.right;
      }

      if (currentPos.x > boundary.left) {
        newPos.x = boundary.left;
      }
    } else {
      newPos.x = prevPos.x;
    }

    if (this.height < map.height) {
      if (currentPos.y < boundary.bottom) {
        newPos.y = boundary.bottom;
      }

      if (currentPos.y > boundary.top) {
        newPos.y = boundary.top;
      }
    } else {
      newPos.y = prevPos.y;
    }

    return newPos;
  }

  getScaledPosition(scale: number, prevScale: number) {
    const newPos = {
      x: this.mapPosition.x * (scale / prevScale),
      y: this.mapPosition.y * (scale / prevScale),
    };
    return this.getMapPositionWithinImage({
      currentPos: newPos,
      prevPos: { x: 0, y: 0 },
    });
  }
}
