import Button from "@/components/Button";
import { useCreatingStore } from "@/store/creatingStore";

export const CreatePanel = () => {
  const setCreateMode = useCreatingStore((state) => state.setCreateMode);
  const setShapeType = useCreatingStore((state) => state.setShapeType);

  const createRect = () => {
    setCreateMode(true);
    setShapeType("rect");
  };
  return (
    <div className="mx-2">
      <span className="mr-2">Create Panel:</span>
      <Button onClick={createRect}>Rectangle</Button>
    </div>
  );
};
