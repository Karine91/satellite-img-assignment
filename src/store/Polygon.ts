import { observable, computed, action } from "mobx";

import { MapStoreState } from "./MapStoreState";
import { MixinPolygon } from "./PolygonMixin";

import { Point } from "@/types";

const MAX_POINTS = 4;

export class Polygon extends MixinPolygon {
  @observable accessor points: number[];
  constructor(store: MapStoreState) {
    super("polygon", store);

    this.points = [];
  }

  @computed
  get polygonData() {
    return {
      points: this.points,
    };
  }

  @action.bound
  addPoint(point: Point, moving: boolean) {
    if (moving && this.points.length > 2) {
      this.points = [...this.points.slice(0, -2), point.x, point.y];
    } else {
      this.points.push(point.x, point.y);
    }
  }

  @action.bound
  saveShape(): void {
    super.addShape({ type: "polygon", ...this.polygonData });
  }

  @computed
  get isCreatingContinue(): boolean {
    return this.points.length < MAX_POINTS * 2;
  }

  @computed
  get componentData() {
    return {
      stageProps: {
        onMouseDown: this.handleStageClick,
        onMouseMove: this.handleStageMouseMove,
      },
      data: this.polygonData,
      isCreating: this.isCreating,
    };
  }

  @action
  resetState(): void {
    this.points = [];
  }
}
