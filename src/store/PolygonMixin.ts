import { KonvaEventObject } from "konva/lib/Node";
import { action } from "mobx";

import { ShapeBase } from "./ShapeBase";

export abstract class MixinPolygon extends ShapeBase {
  abstract saveShape(): void;
  abstract addPoint(
    pos: ReturnType<typeof this.getPosition>,
    moving?: boolean,
  ): void;

  abstract get isCreatingContinue(): boolean;

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
