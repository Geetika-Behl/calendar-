import { useState } from "react";

export default function HeroPanel({ src, monthName, year }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="hero-section" style={{ height: "340px" }}>
      <img
        className={`hero-img ${imgLoaded ? "loaded" : ""}`}
        src={src}
        alt={monthName}
        onLoad={() => setImgLoaded(true)}
      />
      {/* Subtle dark vignette only at very bottom for text legibility */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.35) 100%)"
      }} />
      <div className="hero-month-label">
        <div className="hero-year">{year}</div>
        <div className="hero-month">{monthName}</div>
      </div>
    </div>
  );
}