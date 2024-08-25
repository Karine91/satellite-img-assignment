import { AxiosResponse } from "axios";
import { KonvaEventObject } from "konva/lib/Node";
import { action, observable, computed, flow } from "mobx";

import { ICreateShape } from "../features/shape/hooks/useCreateShape";

import { MapStoreState } from "./MapStoreState";

import { ShapeType, ShapeData } from "@/types";

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

  @flow.bound
  *addShape(data: Omit<ShapeData, "id">) {
    const { data: newShape }: AxiosResponse<ShapeData> =
      yield this.mapStore.createShape(data);
    this.mapStore.addShape(newShape);
  }

  getPosition = (e: KonvaEventObject<MouseEvent>) => {
    return e.target.getStage()?.getRelativePointerPosition();
  };

  abstract resetState(): void;

  abstract get componentData(): ICreateShape;
}
