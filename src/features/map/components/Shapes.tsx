import { observer } from "mobx-react-lite";

import { CreateShape } from "./CreateShape";

import { useMapStore } from "@/providers";

export const Shapes = observer(() => {
  const { shapes } = useMapStore();

  return shapes.map(({ type, ...data }, ind) => (
    <CreateShape key={ind} data={data} visible listening type={type} />
  ));
});
