import { Rectangle } from "./Rectangle";

import { Point } from "@/types";

export const CreateShape = ({
  points,
  isCreating,
}: {
  points: Point[];
  isCreating: boolean;
}) => {
  return <Rectangle points={points} visible={isCreating} />;
};
