import { KonvaEventObject } from "konva/lib/Node";
import { action, observable, computed } from "mobx";

import { ICreateShape } from "../features/map/hooks/useCreateShape";

import { MapStoreState } from "./MapStoreState";

import { ShapeData, ShapeType } from "@/types";

export abstract class ShapeBase {
  @observable accessor isCreating: boolean;

  constructor(
    public type: ShapeType,
    private mapStore: MapStoreState,
  ) {
    this.isCreating = false;
  }

  @computed
  get createMode() {
    return this.type !== null;
  }

  @action
  startCreating() {
    this.isCreating = true;
  }

  @action
  finishCreating() {
    this.isCreating = false;
    this.resetState();
  }

  @action.bound
  addShape(data: ShapeData) {
    this.mapStore.addShape(data);
  }

  getPosition = (e: KonvaEventObject<MouseEvent>) => {
    return e.target.getStage()?.getRelativePointerPosition();
  };

  abstract resetState(): void;

  abstract get componentData(): ICreateShape;
}
