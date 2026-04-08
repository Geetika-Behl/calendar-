// Renders the decorative spiral-ring binding at the top of the calendar.

export default function CalendarBinding({ count = 8 }) {
  return (
    <div className="binding">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="ring" />
      ))}
    </div>
  );
}
