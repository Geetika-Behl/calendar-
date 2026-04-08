// ChevronDivider — smooth wave that blends hero photo into the card body
// Pass isDark so the wave fill matches the card background exactly

export default function ChevronDivider({ isDark }) {
  const cardColor = isDark ? "#1c1c24" : "#fdf8f3";

  return (
    <div style={{
      position: "relative",
      marginTop: "-60px",
      zIndex: 3,
      lineHeight: 0,
      pointerEvents: "none",
    }}>
      <svg
        viewBox="0 0 860 80"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "80px" }}
      >
        {/* Single smooth bezier wave — organic, no harsh edges */}
        <path
          d="M0,60 Q215,0 430,42 Q645,82 860,22 L860,80 L0,80 Z"
          fill={cardColor}
        />
      </svg>
    </div>
  );
}