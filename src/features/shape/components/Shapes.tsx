import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import { useEditShape } from "../hooks/useEditShape";

import { CreateShape } from "./CreateShape";
import { EditShape } from "./EditShape";

import { useMapStore } from "@/providers";

export const Shapes = observer(() => {
  const { shapes } = useMapStore();
  const { nodes, editData } = useEditShape();

  console.log(toJS(shapes));

  return (
    <>
      {shapes.map(({ type, ...data }, ind) => (
        <CreateShape
          // replace with id
          key={ind}
          visible
          {...editData}
          data={data}
          type={type}
        />
      ))}
      {nodes && <EditShape nodes={nodes} />}
    </>
  );
});
