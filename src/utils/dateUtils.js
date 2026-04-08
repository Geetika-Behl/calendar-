// ─── Date Utilities ───────────────────────────────────────────────────────────
// Pure functions only. No imports from React or app state.
// Every function here is independently unit-testable.

/** Returns total days in a given month (0-indexed month). */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns the 0-indexed weekday of the 1st of a month,
 * adjusted so Monday = 0, Sunday = 6 (ISO week).
 */
export function getFirstDayOfMonth(year, month) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

/** Consistent string key for any year/month/day triple. */
export function dateKey(y, m, d) {
  return `${y}-${m + 1}-${d}`;
}

/** Consistent string key for a year+month (used for monthly notes). */
export function monthKey(y, m) {
  return `${y}-${m}`;
}

/** Creates a day object with a timestamp for fast comparisons. */
export function makeDay(y, m, d) {
  return { y, m, d, ts: new Date(y, m, d).getTime() };
}

/** Returns true if two day objects refer to the same calendar date. */
export function isSameDay(a, b) {
  return Boolean(a && b && a.y === b.y && a.m === b.m && a.d === b.d);
}

/** Returns true if `day` falls strictly between `start` and `end` (order-safe). */
export function isBetween(day, start, end) {
  if (!start || !end) return false;
  const [s, e] = start.ts <= end.ts ? [start, end] : [end, start];
  return day.ts > s.ts && day.ts < e.ts;
}

/**
 * Builds the 42-cell grid (6 weeks × 7 days) for a given month.
 * Each cell: { d: number, type: "prev" | "cur" | "next" }
 */
export function buildCalendarCells(year, month) {
  const daysInMonth  = getDaysInMonth(year, month);
  const firstDay     = getFirstDayOfMonth(year, month);
  const prevMonthTotal = getDaysInMonth(year, month === 0 ? 11 : month - 1);

  const cells = [];

  // Trailing days from previous month
  for (let i = 0; i < firstDay; i++) {
    cells.push({ d: prevMonthTotal - firstDay + 1 + i, type: "prev" });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ d, type: "cur" });
  }

  // Leading days from next month
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ d, type: "next" });
  }

  return cells;
}

/** Returns the number of days between two day objects (always positive). */
export function daysBetween(a, b) {
  return Math.abs(Math.round((b.ts - a.ts) / 86400000)) + 1;
}
