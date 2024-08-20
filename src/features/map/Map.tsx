import { useEffect, useRef } from "react";

export const Map = ({
  scale = 1,
  width: canvasWidth = 1000,
  height: canvasHeight = 1000,
  imgSrc,
}: {
  scale?: number;
  height?: number;
  width?: number;
  imgSrc: string;
}) => {
  const canvRef = useRef<null | HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const drawImage = () => {
    if (ctxRef.current) {
      const img = new Image();
      img.src = imgSrc;

      img.addEventListener("load", () => {
        const dx = (canvasWidth - canvasWidth * scale) / 2;
        const dy = (canvasHeight - canvasWidth * scale) / 2;

        ctxRef.current!.drawImage(
          img,
          dx,
          dy,
          canvasWidth * scale,
          canvasHeight * scale,
        );
      });
    }
  };

  const initCanvasCtx = () => {
    if (canvRef.current?.getContext) {
      const ctx = canvRef.current.getContext("2d");
      ctxRef.current = ctx;
    }
  };

  const clearCanvas = () => {
    ctxRef.current?.clearRect(0, 0, canvasWidth, canvasHeight);
  };

  useEffect(() => {
    initCanvasCtx();
    drawImage();
    return () => {
      clearCanvas();
    };
  }, [scale, canvasWidth, canvasHeight]);

  return (
    <>
      <canvas
        style={{ border: "1px solid black" }}
        width={canvasWidth}
        height={canvasHeight}
        ref={canvRef}
      ></canvas>
    </>
  );
};
