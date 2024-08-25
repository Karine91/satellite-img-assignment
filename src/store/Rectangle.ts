import { observable, computed, action } from "mobx";

import { MapStoreState } from "./MapStoreState";
import { MixinPolygon } from "./PolygonMixin";

import { Point } from "@/types";

export class Rectangle extends MixinPolygon {
  @observable accessor points: number[];
  constructor(store: MapStoreState) {
    super("rect", store);
    this.points = [];
  }

  @action.bound
  addPoint(point: Point, moving: boolean) {
    const newPoints = MixinPolygon.addPointHelper(point, moving, this.points);
    this.points = newPoints;
  }

  @computed
  get data() {
    return { points: this.points };
  }

  @action
  resetState(): void {
    this.points = [];
  }

  @computed
  get isCreatingContinue(): boolean {
    return this.points.length < 2;
  }

  @computed
  get componentData() {
    return {
      stageProps: {
        onClick: this.handleStageClick,
        onMouseMove: this.handleStageMouseMove,
      },
      data: this.data,
      isCreating: this.isCreating,
    };
  }
}
