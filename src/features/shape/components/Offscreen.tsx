import { KonvaEventObject } from "konva/lib/Node";
import { Rect } from "react-konva";

import { useMapStore } from "@/providers";

const Offscreen = ({
  visible,
  closeEditMode,
}: {
  visible: boolean;
  closeEditMode: () => void;
}) => {
  const { width, height } = useMapStore();

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
    closeEditMode();
  };
  return (
    <Rect
      x={0}
      y={0}
      width={width}
      height={height}
      fill={"transparent"}
      onClick={handleClick}
      visible={visible}
      listening
    />
  );
};

export default Offscreen;
