import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { MSWDevToolsComponent, enableMocking } from "./lib/msw.tsx";

import "./index.css";

enableMocking().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MSWDevToolsComponent />
      <App />
    </StrictMode>,
  ),
);
