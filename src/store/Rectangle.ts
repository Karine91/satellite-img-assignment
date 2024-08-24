import { KonvaEventObject } from "konva/lib/Node";
import { observable, action, computed } from "mobx";

import { MapStoreState } from "./MapStoreState";
import { ShapeBase } from "./ShapeBase";

import { Point } from "@/types";

export class Rectangle extends ShapeBase {
  @observable accessor points: Point[];
  constructor(store: MapStoreState) {
    super("rect", store);
    this.points = [];
  }

  addPoint(point: Point) {
    if (this.points.length > 1) {
      this.points[1] = point;
    } else {
      this.points.push(point);
    }
  }

  @computed
  get rectData() {
    const [p1 = { x: 0, y: 0 }, p2 = p1] = this.points;
    return {
      x: Math.min(p1.x, p2.x),
      y: Math.min(p1.y, p2.y),
      width: Math.abs(p2.x - p1.x),
      height: Math.abs(p2.y - p1.y),
    };
  }

  addShape(): void {
    super.addShape({ ...this.rectData, type: "rect" });
  }

  @action.bound
  handleStageClick(e: KonvaEventObject<MouseEvent>) {
    if (!this.createMode) {
      return;
    }
    if (this.isCreating) {
      this.addShape();
      this.finishCreating();
      return;
    }

    e.evt.preventDefault();

    const position = this.getPosition(e);

    if (position) {
      this.startCreating();
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
      this.addPoint(position);
    }
  }

  @action
  resetState(): void {
    this.points = [];
  }

  @computed
  get componentData() {
    return {
      stageProps: {
        onClick: this.handleStageClick,
        onMouseMove: this.handleStageMouseMove,
      },
      data: this.rectData,
      isCreating: this.isCreating,
    };
  }
}
