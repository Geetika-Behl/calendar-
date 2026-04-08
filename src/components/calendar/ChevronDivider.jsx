export default function ChevronDivider({ isDark, palette }) {
  const cardColor = isDark ? palette.waveDark : palette.bg;

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
          d="M0,60 Q215,0 430,42 Q645,80 860,40 L860,95 L0,80 Z"
          fill={cardColor}
        />
      </svg>
    </div>
  );
}