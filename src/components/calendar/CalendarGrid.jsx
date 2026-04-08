import { DAYS_SHORT, HOLIDAYS } from "../../utils/calendar";
import { makeDay, isSameDay, isBetween } from "../../utils/dateUtils";

export default function CalendarGrid({
  year, month, today,
  cells,
  rangeStart, rangeEnd, selecting,
  onDayClick,
  hasNote,
}) {
  const getDayClasses = (cell, idx) => {
    const day = makeDay(year, month, cell.d);

    const isStart = isSameDay(day, rangeStart);
    const isEnd   = isSameDay(day, rangeEnd);
    const isMid   = isBetween(day, rangeStart, rangeEnd);

    const isToday =
      year === today.getFullYear() &&
      month === today.getMonth() &&
      cell.d === today.getDate();

    const noteFlag = hasNote(year, month, cell.d);
    const holiday  = HOLIDAYS[`${month + 1}-${cell.d}`];

    const colIdx = idx % 7;
    const isSat = colIdx === 5;
    const isSun = colIdx === 6;

    return [
      "day-cell",
      isStart  ? "range-start" : "",
      isEnd    ? "range-end"   : "",
      isMid    ? "range-mid"   : "",
      isToday  ? "today"       : "",
      noteFlag ? "has-note"    : "",
      holiday  ? "holiday"     : "",
      isSat    ? "sat"         : "",
      isSun    ? "sun"         : "",
    ].filter(Boolean).join(" ");
  };

  return (
    <div className="grid-section">

      {/* Weekday headers */}
      <div className="day-headers">
        {DAYS_SHORT.map((d, i) => (
          <div key={d} className={`day-header ${i >= 5 ? "weekend" : ""}`}>
            {d}
          </div>
        ))}
      </div>

      {/* ✅ FIXED GRID */}
      <div className="days-grid">
        {cells.map((cell, idx) => {
          if (cell.type !== "cur") {
            return (
              <div key={idx} className="day-cell other-month">
                {cell.d}
              </div>
            );
          }

          const holiday = HOLIDAYS[`${month + 1}-${cell.d}`];

          return (
            <div
              key={idx}
              className={getDayClasses(cell, idx)}
              onClick={() => onDayClick(cell.d)}
              title={holiday || ""}
            >
              <div className="day-content">
                <span className="day-number">{cell.d}</span>

                {holiday && (
                  <span className="holiday-label">
                    {holiday}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection hint */}
      <div className="selection-hint">
        {selecting
          ? <>Click to set <span>end date</span> — or same date to add note</>
          : <>Click a date to <span>start selecting</span></>}
      </div>
    </div>
  );
}