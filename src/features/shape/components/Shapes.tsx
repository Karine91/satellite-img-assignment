import { observer } from "mobx-react-lite";

import { useEditShape } from "../hooks/useEditShape";

import { CreateShape } from "./CreateShape";
import { EditShape } from "./EditShape";
import Offscreen from "./Offscreen";

import { useMapStore } from "@/providers";

export const Shapes = observer(() => {
  const { shapes } = useMapStore();
  const {
    nodes,
    editData: { onClick, ...restEditData },
    editMode,
    closeEditMode,
  } = useEditShape();

  return (
    <>
      <Offscreen visible={editMode} closeEditMode={closeEditMode} />
      {shapes.map(({ type, ...data }) => (
        <CreateShape
          key={data.id}
          visible
          onClick={onClick(data.id)}
          data={data}
          type={type}
          {...restEditData}
        />
      ))}
      {nodes && <EditShape nodes={nodes} />}
    </>
  );
});
