import { http, HttpResponse, delay } from "msw";

import { db } from "../db";

import { API_URL } from "@/config/constants";
import { ShapeType } from "@/types";

const createShapeHandler = http.post(
  `${API_URL}/shape`,
  async ({ request }) => {
    const newShape = (await request.json()) as {
      type: ShapeType;
      points: number[];
    };

    const shape = db.shape.create(newShape);

    await delay(300);

    return HttpResponse.json(shape, { status: 201 });
  },
);

const getShapesHandler = http.get(`${API_URL}/shape`, async () => {
  const shapes = db.shape.getAll();
  await delay(300);
  return HttpResponse.json(shapes, { status: 200 });
});

const deleteShapeHandler = http.delete(
  `${API_URL}/shape/:id`,
  async ({ params }) => {
    const { id } = params;

    db.shape.delete({ where: { id: { equals: id as string } } });

    await delay(300);
    return HttpResponse.json({ status: 200 });
  },
);

export const handlers = [
  createShapeHandler,
  getShapesHandler,
  deleteShapeHandler,
];
