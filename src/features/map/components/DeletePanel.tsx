import { observer } from "mobx-react-lite";

import Button from "@/components/Button";
import { useMapStore } from "@/providers";

export const DeletePanel = observer(() => {
  const { editMode, deleteShape, setEditShapeId } = useMapStore();

  const handleDelete = async () => {
    try {
      await deleteShape();
      setEditShapeId(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (!editMode) return null;

  return (
    <div>
      <span>Delete Panel:</span>
      <Button onClick={handleDelete} className="bg-red-600 px-6 mx-2">
        Delete
      </Button>
    </div>
  );
});
