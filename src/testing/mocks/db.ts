import { factory, primaryKey } from "@mswjs/data";

import { uid } from "@/utils";

const models = {
  shape: {
    id: primaryKey(uid),
    type: String,
    points: Array<number>,
  },
};

export const db = factory(models);
