type MapProps = Dimensions & {
  scale: number;
};

type Dimensions = {
  width: number;
  height: number;
};

type Position = {
  x: number;
  y: number;
};

export const getScaledDimensions = ({ width, height, scale }: MapProps) => ({
  width: width * scale,
  height: height * scale,
});

export function getCenteredCoords({ width, height, scale }: MapProps) {
  const scaledWidth = getScaledDimensions({ width, height, scale });

  return {
    x: (width - scaledWidth.width) / 2,
    y: (height - scaledWidth.height) / 2,
  };
}

export function getScaledPosition({
  currPos,
  scale,
  prevScale,
  canvas,
}: {
  currPos: Position;
  scale: number;
  prevScale: number;
  canvas: Dimensions;
}) {
  const newPos = {
    x: currPos.x * (scale / prevScale),
    y: currPos.y * (scale / prevScale),
  };
  return getMapPosition({
    canvas,
    currentPos: newPos,
    prevPos: { x: 0, y: 0 },
    scale,
  });
}

export function getMapPosition({
  canvas,
  currentPos,
  prevPos,
  scale,
}: {
  canvas: Dimensions;
  currentPos: Position;
  prevPos: Position;
  scale: number;
}) {
  const newPos = { ...currentPos };
  const map = getScaledDimensions({ ...canvas, scale });

  const boundary = {
    top: 0,
    bottom: canvas.height - map.height,
    left: 0,
    right: canvas.width - map.width,
  };

  if (canvas.width < map.width) {
    if (currentPos.x < boundary.right) {
      newPos.x = boundary.right;
    }

    if (currentPos.x > boundary.left) {
      newPos.x = boundary.left;
    }
  } else {
    newPos.x = prevPos.x;
  }

  if (canvas.height < map.height) {
    if (currentPos.y < boundary.bottom) {
      newPos.y = boundary.bottom;
    }

    if (currentPos.y > boundary.top) {
      newPos.y = boundary.top;
    }
  } else {
    newPos.y = prevPos.y;
  }

  return newPos;
}
