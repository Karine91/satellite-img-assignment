import Button from "@/components/Button";

export const CreatePanel = () => {
  const createRect = () => {};
  return (
    <div className="mx-2">
      <span className="mr-2">Create Panel:</span>
      <Button onClick={createRect}>Rectangle</Button>
    </div>
  );
};
