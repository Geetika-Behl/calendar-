// ─── CalendarBinding ──────────────────────────────────────────────────────────
// Renders the decorative spiral-ring binding at the top of the calendar.
// No props, no state — purely visual. CSS classes come from calendarStyles.js.

export default function CalendarBinding({ count = 12 }) {
  return (
    <div className="binding">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="ring" />
      ))}
    </div>
  );
}
