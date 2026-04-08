// Renders the navigation bar: ‹ prev button, month+year title, next › button.

export default function MonthNav({ monthName, year, onPrev, onNext }) {
  return (
    <div className="nav-bar">
      <button className="nav-btn" onClick={onPrev} aria-label="Previous month">
        ‹
      </button>
      <div className="nav-title">
        {monthName} {year}
      </div>
      <button className="nav-btn" onClick={onNext} aria-label="Next month">
        ›
      </button>
    </div>
  );
}
