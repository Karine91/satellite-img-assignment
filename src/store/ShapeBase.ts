import { KonvaEventObject } from "konva/lib/Node";
import { action, observable, computed } from "mobx";

import { ICreateShape } from "../features/shape/hooks/useCreateShape";

import { MapStoreState } from "./MapStoreState";

import { ShapeType } from "@/types";

export abstract class ShapeBase {
  @observable accessor isCreating: boolean;

  constructor(
    public type: ShapeType,
    public mapStore: MapStoreState,
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

  getPosition = (e: KonvaEventObject<MouseEvent>) => {
    return e.target.getStage()?.getRelativePointerPosition();
  };

  abstract resetState(): void;

  abstract get componentData(): ICreateShape;
}
