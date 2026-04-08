import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WallCalendar from "./components/calendar/WallCalendar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WallCalendar />
  </StrictMode>
);
