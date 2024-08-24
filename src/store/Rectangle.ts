import { observable, computed, action } from "mobx";

import { MapStoreState } from "./MapStoreState";
import { MixinPolygon } from "./PolygonMixin";

import { Point } from "@/types";

export class Rectangle extends MixinPolygon {
  @observable accessor points: Point[];
  constructor(store: MapStoreState) {
    super("rect", store);
    this.points = [];
  }

  @action.bound
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

  @action.bound
  saveShape(): void {
    super.addShape({ ...this.rectData, type: "rect" });
  }

  @action
  resetState(): void {
    this.points = [];
  }

  isCreatingContinue(): boolean {
    return this.points.length === 2;
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
