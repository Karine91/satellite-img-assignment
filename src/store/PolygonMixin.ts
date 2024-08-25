import { KonvaEventObject } from "konva/lib/Node";
import { action, flow } from "mobx";

import { ShapeBase } from "./ShapeBase";

import { Point, ShapeDataBase } from "@/types";

export abstract class MixinPolygon extends ShapeBase {
  abstract get data(): ShapeDataBase;
  abstract addPoint(
    pos: ReturnType<typeof this.getPosition>,
    moving?: boolean,
  ): void;

  abstract get isCreatingContinue(): boolean;

  @flow.bound
  *saveShape() {
    try {
      yield super.addShape({ type: this.type, ...this.data });
    } catch (error) {
      console.error(error);
    }
  }

  static addPointHelper(
    point: Point,
    moving: boolean = false,
    points: number[],
  ) {
    let newPoints = [...points];
    if (moving && points.length > 2) {
      newPoints = [...newPoints.slice(0, -2), point.x, point.y];
    } else {
      newPoints.push(point.x, point.y);
    }

    return newPoints;
  }

  @action.bound
  handleStageClick(e: KonvaEventObject<MouseEvent>) {
    if (!this.createMode) {
      return;
    }
    if (!this.isCreatingContinue) {
      this.saveShape();
      this.finishCreating();
      return;
    }

    e.evt.preventDefault();

    const position = this.getPosition(e);

    if (position) {
      if (!this.isCreating) {
        this.startCreating();
      }

      this.addPoint(position);
    }
  }

  @action.bound
  handleStageMouseMove(e: KonvaEventObject<MouseEvent>) {
    if (!this.createMode || !this.isCreating) {
      return;
    }

    e.evt.preventDefault();

    const position = this.getPosition(e);
    if (position) {
      this.addPoint(position, true);
    }
  }
}
