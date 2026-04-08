import { useState } from "react";
import { makeDay, isSameDay } from "../utils/dateUtils";

export function useDateRange({ year, month, onSingleDayTap }) {
  const [rangeStart, setRangeStart] = useState([]);
  const [rangeEnd,   setRangeEnd]   = useState(null);
  const [selecting,  setSelecting]  = useState(false);

  /**
   * Call this when the user clicks a valid (current-month) day cell.
   * - First click  → sets rangeStart, enters selecting mode.
   * - Second click (same day) → opens note modal via onSingleDayTap.
   * - Second click (different day) → sets rangeEnd, exits selecting mode.
   */
  const handleDayClick = (d) => {
    const day = makeDay(year, month, d);

    if (!selecting) {
      setRangeStart(day);
      setRangeEnd(null);
      setSelecting(true);
    } else {
      if (isSameDay(day, rangeStart)) {
        onSingleDayTap?.({type: "single", year, month, day: d});
      } else {
        const range = {
          start: rangeStart,
          end: day,
        };
        onSingleDayTap?.({type: "range", year, month, ...range});
        setRangeEnd(day);
      }
      setSelecting(false);
    }
  };

  const clearRange = () => {
    setRangeStart(null);
    setRangeEnd(null);
    setSelecting(false);
  };

  return { rangeStart, rangeEnd, selecting, handleDayClick };
}
