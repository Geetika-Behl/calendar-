// Owns: current year, current month, page-flip animation state.

import { useState } from "react";

export function useCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [animDir, setAnimDir] = useState(null);    // "next" | "prev" | null
  const [animating, setAnimating] = useState(false);

  /**
   * Navigate one month forward ("next") or backward ("prev").
   * Triggers a 380 ms page-flip animation, then commits the new month.
   * @param {"next"|"prev"} dir
   * @param {Function} onAfter - optional callback fired after month changes
   */
  const changeMonth = (dir, onAfter) => {
    if (animating) return;
    setAnimDir(dir);
    setAnimating(true);

    setTimeout(() => {
      if (dir === "next") {
        setMonth(m => {
          if (m === 11) { setYear(y => y + 1); return 0; }
          return m + 1;
        });
      } else {
        setMonth(m => {
          if (m === 0) { setYear(y => y - 1); return 11; }
          return m - 1;
        });
      }
      setAnimating(false);
      setAnimDir(null);
      onAfter?.();
    }, 380);
  };
  const slideClass = animating
    ? (animDir === "next" ? "slide-out-left" : "slide-out-right")
    : animDir === null ? "slide-in" : "";

  return { year, month, today, changeMonth, slideClass, animating };
}
