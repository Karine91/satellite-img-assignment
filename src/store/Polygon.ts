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

  @action.bound
  addPoint(point: Point, moving: boolean) {
    const newPoints = MixinPolygon.addPointHelper(point, moving, this.points);
    this.points = newPoints;
  }

  @computed
  get data() {
    return { points: this.points };
  }

  @computed
  get isCreatingContinue(): boolean {
    return this.points.length < MAX_POINTS * 2;
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

  @action
  resetState(): void {
    this.points = [];
  }
}
