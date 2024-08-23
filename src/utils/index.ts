import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const roundNumber = (num: number) => {
  return Math.round(num * 100) / 100;
};

export const loadImage = (
  imgSrc: string,
  handler: (img: HTMLImageElement) => void,
) => {
  const img = new window.Image();
  img.src = imgSrc;
  img.addEventListener("load", () => handler(img));
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
