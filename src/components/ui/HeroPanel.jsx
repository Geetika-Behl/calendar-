// ─── HeroPanel ────────────────────────────────────────────────────────────────
// Renders the top hero image with a gradient overlay and month/year label.
// Manages its own imgLoaded state (image fade-in) — that's it.
// Receives: src, month name string, year number, palette (for overlay color).

import { useState } from "react";

export default function HeroPanel({ src, monthName, year }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="hero-section">
      <img
        className={`hero-img ${imgLoaded ? "loaded" : ""}`}
        src={src}
        alt={monthName}
        onLoad={() => setImgLoaded(true)}
      />
      <div className="hero-overlay" />
      <div className="hero-month-label">
        <div className="hero-year">{year}</div>
        <div className="hero-month">{monthName}</div>
      </div>
    </div>
  );
}
