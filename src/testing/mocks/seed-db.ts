import { testData } from "../test-data";

import { db } from "./db";

export const seedDb = () => {
  testData.shapes.forEach((shape) => db.shape.create(shape));
};
