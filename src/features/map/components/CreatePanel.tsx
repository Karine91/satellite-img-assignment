import { CreateButton } from "./CreateButton";

import { useCreatingStore } from "@/store/creatingStore";
import { ShapeType } from "@/types";

export const CreatePanel = () => {
  const setShapeType = useCreatingStore((state) => state.setShapeType);
  const shapeType = useCreatingStore((state) => state.shapeType);

  const createShape = (type: ShapeType) => {
    if (shapeType === type) {
      setShapeType(null);
    } else {
      setShapeType(type);
    }
  };

  return (
    <div className="mx-2">
      <span className="mr-2">Create Panel:</span>
      <CreateButton
        isActive={shapeType === "rect"}
        className="mr-2"
        onClick={() => createShape("rect")}
      >
        Rectangle
      </CreateButton>
      <CreateButton
        isActive={shapeType === "polygon"}
        onClick={() => createShape("polygon")}
      >
        Polygon
      </CreateButton>
    </div>
  );
};
