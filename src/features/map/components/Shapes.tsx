import { Rectangle } from "./Rectangle";

import { useMapStore } from "@/store/mapStore";

export const Shapes = () => {
  const shapes = useMapStore((state) => state.shapes);

  return shapes.map((el, ind) => <Rectangle key={ind} points={el.coords} />);
};
