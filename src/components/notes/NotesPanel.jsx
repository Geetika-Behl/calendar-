// ─── NotesPanel ───────────────────────────────────────────────────────────────
// Renders the left sidebar: monthly notes textarea + selected range summary.
// Owns no state — receives values and change handlers from the parent.

import { MONTHS } from "../../utils/calendar";
import { daysBetween } from "../../utils/dateUtils";

export default function NotesPanel({
  monthNote,
  onMonthNoteChange,
  rangeStart,
  rangeEnd,
  month,
}) {
  return (
    <div className="notes-sidebar">
      <div className="notes-label">Monthly Notes</div>

      <textarea
        className="notes-textarea"
        placeholder="Jot down your thoughts for this month..."
        value={monthNote}
        onChange={(e) => onMonthNoteChange(e.target.value)}
        rows={6}
      />

      {/* Range summary — shown only when a range is active */}
      {rangeStart && rangeEnd && (
        <div className="range-info">
          📅 {rangeStart.d} – {rangeEnd.d} {MONTHS[month]}
          <br />
          <span style={{ fontSize: 10, opacity: 0.7 }}>
            {daysBetween(rangeStart, rangeEnd)} days selected
          </span>
        </div>
      )}

      {rangeStart && !rangeEnd && (
        <div className="range-info">
          📍 Started: {rangeStart.d} {MONTHS[month]}
          <br />
          <span style={{ fontSize: 10, opacity: 0.7 }}>
            Click another date to set end
          </span>
        </div>
      )}
    </div>
  );
}
