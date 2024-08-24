import { observer } from "mobx-react-lite";

import { CreateButton } from "./CreateButton";

import { useMapStore } from "@/providers";
import { ShapeType } from "@/types";

export const CreatePanel = observer(() => {
  const { shapeType, setShapeType } = useMapStore();

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
});
