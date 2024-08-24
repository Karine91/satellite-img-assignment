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

  addPoint(point: Point) {
    this.points.push(point.x, point.y);
  }

  saveShape(): void {
    super.addShape({ type: "polygon", ...this.polygonData });
  }

  isCreatingContinue(): boolean {
    return this.points.length === MAX_POINTS * 2;
  }

  @computed
  get componentData() {
    return {
      stageProps: {
        onClick: this.handleStageClick,
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
