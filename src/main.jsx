// ─── Entry Point ──────────────────────────────────────────────────────────────
// Mounts the WallCalendar component into the DOM. Nothing else lives here.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WallCalendar from "./components/calendar/WallCalendar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WallCalendar />
  </StrictMode>
);
