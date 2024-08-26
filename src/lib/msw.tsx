import { MSWDevTools } from "msw-devtools";

import { IS_DEVELOPMENT } from "@/config/constants";
import { db, handlers } from "@/testing/mocks";
import { seedDb } from "@/testing/mocks/seed-db";

export async function enableMocking() {
  if (!IS_DEVELOPMENT) {
    return;
  }

  const { worker } = await import("@/testing/mocks/browser");

  await worker.start({ onUnhandledRequest: "bypass" });
  seedDb();
}

export const MSWDevToolsComponent = () => {
  return IS_DEVELOPMENT && <MSWDevTools db={db} handlers={handlers} />;
};
