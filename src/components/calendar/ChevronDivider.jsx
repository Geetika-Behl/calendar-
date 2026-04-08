// ─── ChevronDivider ───────────────────────────────────────────────────────────
// Renders the decorative SVG chevron that separates the hero image
// from the calendar grid. Receives colors as props — no state, no logic.

export default function ChevronDivider({ cardColor, accentColor }) {
  return (
    <div className="chevron-divider">
      <svg viewBox="0 0 860 40" preserveAspectRatio="none" height="40">
        {/* White/dark body fill */}
        <polygon
          points="0,0 430,38 860,0 860,40 0,40"
          fill={cardColor}
        />
        {/* Left accent chevron */}
        <polygon
          points="0,0 215,38 430,0"
          fill={accentColor}
        />
        {/* Right accent chevron (semi-transparent) */}
        <polygon
          points="430,38 645,0 860,38 860,0 430,0"
          fill={accentColor + "99"}
        />
      </svg>
    </div>
  );
}
