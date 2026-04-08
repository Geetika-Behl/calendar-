// ─── CalendarStyles ───────────────────────────────────────────────────────────
// Generates the full <style> block for the calendar.
// Receives palette + isDark as parameters so styles react to theme/month.
// Keeping styles here (not inlined inside components) means each component
// file stays focused on structure, not on CSS strings.

export function buildCalendarStyles(palette, isDark) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: ${isDark ? "#0f0f13" : "#f0f0f5"};
      min-height: 100vh;
      font-family: 'DM Sans', sans-serif;
      transition: background 0.5s;
    }

    /* ── Root layout ── */
    .cal-root {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
      background: ${isDark
        ? "radial-gradient(ellipse at 30% 20%, #1a1a2e 0%, #0f0f13 70%)"
        : "radial-gradient(ellipse at 30% 20%, #e8e8f5 0%, #d8d8e8 70%)"};
    }

    .calendar-wrapper {
      width: 100%;
      max-width: 860px;
    }

    /* ── Spiral binding ── */
    .binding {
      display: flex;
      justify-content: center;
      gap: 28px;
      margin-bottom: -4px;
      position: relative;
      z-index: 10;
      padding: 0 40px;
    }
    .ring {
      width: 18px; height: 28px;
      border: 3px solid ${isDark ? "#555" : "#aaa"};
      border-radius: 50% 50% 30% 30%;
      background: ${isDark ? "#333" : "#ccc"};
      position: relative;
    }
    .ring::after {
      content: '';
      position: absolute;
      bottom: -6px; left: 50%;
      transform: translateX(-50%);
      width: 10px; height: 10px;
      border-radius: 50%;
      background: ${isDark ? "#444" : "#bbb"};
    }

    /* ── Card shell ── */
    .calendar-card {
      background: ${isDark ? "#1c1c24" : "#ffffff"};
      border-radius: 4px 4px 12px 12px;
      overflow: hidden;
      box-shadow: ${isDark
        ? "0 40px 80px rgba(0,0,0,0.7), 0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
        : "0 40px 80px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)"};
      transition: background 0.5s;
      position: relative;
    }

    /* ── Page flip animation ── */
    @keyframes slideOutLeft {
      from { opacity: 1; transform: rotateX(0deg) translateY(0); }
      to   { opacity: 0; transform: rotateX(-25deg) translateY(-20px); }
    }
    @keyframes slideInFromBottom {
      from { opacity: 0; transform: rotateX(25deg) translateY(20px); }
      to   { opacity: 1; transform: rotateX(0deg) translateY(0); }
    }

    .page-content { transform-origin: top center; perspective: 1200px; }
    .page-content.slide-out-left,
    .page-content.slide-out-right { animation: slideOutLeft 0.38s ease-in forwards; }
    .page-content.slide-in         { animation: slideInFromBottom 0.38s ease-out forwards; }

    /* ── Hero image ── */
    .hero-section { position: relative; height: 260px; overflow: hidden; }
    .hero-img {
      width: 100%; height: 100%; object-fit: cover;
      transition: opacity 0.6s ease, transform 8s ease;
      opacity: 0; transform: scale(1.05);
    }
    .hero-img.loaded { opacity: 1; transform: scale(1); }
    .hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, transparent 40%, ${palette.accent}dd 100%);
    }
    .hero-month-label {
      position: absolute; bottom: 0; right: 0;
      padding: 20px 28px; text-align: right;
    }
    .hero-year {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px; font-weight: 500;
      color: rgba(255,255,255,0.85);
      letter-spacing: 4px; text-transform: uppercase;
    }
    .hero-month {
      font-family: 'Playfair Display', serif;
      font-size: 42px; font-weight: 900;
      color: #fff; line-height: 1;
      text-shadow: 0 2px 20px rgba(0,0,0,0.3);
    }

    /* ── Chevron divider ── */
    .chevron-divider {
      display: block; width: 100%; overflow: hidden;
      line-height: 0; margin-top: -2px;
    }
    .chevron-divider svg { display: block; width: 100%; }

    /* ── Month nav bar ── */
    .nav-bar {
      display: flex; align-items: center;
      justify-content: space-between;
      padding: 12px 28px 0;
    }
    .nav-btn {
      width: 36px; height: 36px; border-radius: 50%;
      border: 2px solid ${palette.accent};
      background: transparent; color: ${palette.accent};
      cursor: pointer; display: flex;
      align-items: center; justify-content: center;
      font-size: 16px; font-weight: bold;
      transition: all 0.2s;
    }
    .nav-btn:hover { background: ${palette.accent}; color: #fff; transform: scale(1.1); }
    .nav-title {
      font-family: 'DM Sans', sans-serif;
      font-size: 13px; font-weight: 600;
      color: ${isDark ? "#aaa" : "#888"};
      letter-spacing: 2px; text-transform: uppercase;
    }

    /* ── Body layout ── */
    .calendar-body {
      display: grid;
      grid-template-columns: 160px 1fr;
      gap: 0; padding: 16px 24px 24px;
    }

    /* ── Notes sidebar ── */
    .notes-sidebar {
      padding-right: 20px;
      border-right: 1px solid ${isDark ? "#2e2e3e" : "#eee"};
    }
    .notes-label {
      font-size: 10px; font-weight: 600;
      letter-spacing: 2px; text-transform: uppercase;
      color: ${palette.accent}; margin-bottom: 12px;
    }
    .notes-textarea {
      width: 100%; background: transparent;
      border: none; outline: none; resize: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px; line-height: 2.2;
      color: ${isDark ? "#ccc" : "#444"};
      min-height: 140px;
      background-image: repeating-linear-gradient(
        to bottom,
        transparent, transparent 28px,
        ${isDark ? "#2a2a38" : "#eee"} 28px,
        ${isDark ? "#2a2a38" : "#eee"} 29px
      );
      padding-top: 4px;
    }
    .notes-textarea::placeholder { color: ${isDark ? "#444" : "#ccc"}; }
    .range-info {
      margin-top: 10px; font-size: 11px;
      color: ${palette.accent}; font-weight: 500; line-height: 1.5;
    }

    /* ── Calendar grid ── */
    .grid-section { padding-left: 20px; }
    .day-headers {
      display: grid; grid-template-columns: repeat(7, 1fr);
      margin-bottom: 6px;
    }
    .day-header {
      text-align: center; font-size: 10px; font-weight: 600;
      letter-spacing: 1.5px; text-transform: uppercase;
      color: ${isDark ? "#666" : "#aaa"}; padding: 4px 0;
    }
    .day-header.weekend { color: ${palette.accent}; }

    .days-grid {
      display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px;
    }
    .day-cell {
      aspect-ratio: 1; display: flex;
      align-items: center; justify-content: center;
      border-radius: 6px; cursor: pointer; position: relative;
      transition: all 0.15s; font-size: 13px; font-weight: 400;
      color: ${isDark ? "#ddd" : "#333"}; user-select: none;
    }
    .day-cell.other-month {
      color: ${isDark ? "#333" : "#ccc"};
      cursor: default; pointer-events: none;
    }
    .day-cell:not(.other-month):hover {
      background: ${palette.accent}22;
      color: ${palette.accent}; transform: scale(1.12);
    }
    .day-cell.today { font-weight: 700; color: ${palette.accent}; }
    .day-cell.today::after {
      content: ''; position: absolute; bottom: 3px; left: 50%;
      transform: translateX(-50%);
      width: 4px; height: 4px; border-radius: 50%;
      background: ${palette.accent};
    }
    .day-cell.range-start, .day-cell.range-end {
      background: ${palette.accent} !important;
      color: #fff !important; font-weight: 700;
      border-radius: 6px; transform: scale(1.1);
      box-shadow: 0 4px 12px ${palette.accent}66;
    }
    .day-cell.range-mid {
      background: ${palette.accent}25;
      color: ${palette.accent}; border-radius: 0;
    }
    .day-cell.has-note::before {
      content: ''; position: absolute; top: 3px; right: 3px;
      width: 5px; height: 5px; border-radius: 50%;
      background: ${palette.accent};
    }
    .day-cell.holiday { font-style: italic; }
    .day-cell.sat, .day-cell.sun {
      color: ${isDark ? "#888" : "#bbb"}; font-weight: 500;
    }
    .day-cell.range-start.sat, .day-cell.range-start.sun,
    .day-cell.range-end.sat,   .day-cell.range-end.sun { color: #fff; }

    /* ── Theme toggle ── */
    .controls-bar {
      display: flex; justify-content: flex-end;
      padding: 10px 20px 4px; gap: 8px;
    }
    .ctrl-btn {
      background: ${isDark ? "#2a2a38" : "#f0f0f5"};
      border: none; border-radius: 20px;
      padding: 6px 14px; font-size: 11px;
      font-weight: 600; letter-spacing: 1px;
      text-transform: uppercase;
      color: ${isDark ? "#888" : "#666"};
      cursor: pointer; transition: all 0.2s;
    }
    .ctrl-btn:hover { background: ${palette.accent}; color: #fff; }
    .ctrl-btn.active { background: ${palette.accent}; color: #fff; }

    /* ── Note modal ── */
    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(6px);
      z-index: 100; display: flex;
      align-items: center; justify-content: center;
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .modal-card {
      background: ${isDark ? "#1e1e2c" : "#fff"};
      border-radius: 16px; padding: 28px;
      width: 340px; max-width: 90vw;
      box-shadow: 0 30px 60px rgba(0,0,0,0.4);
      animation: slideUp 0.25s ease;
      border-top: 4px solid ${palette.accent};
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .modal-title {
      font-family: 'Playfair Display', serif;
      font-size: 20px; font-weight: 700;
      color: ${isDark ? "#eee" : "#222"}; margin-bottom: 6px;
    }
    .modal-subtitle {
      font-size: 11px; color: ${palette.accent};
      letter-spacing: 2px; text-transform: uppercase;
      margin-bottom: 18px;
    }
    .modal-input {
      width: 100%;
      background: ${isDark ? "#2a2a38" : "#f8f8fc"};
      border: 2px solid ${isDark ? "#33334a" : "#eee"};
      border-radius: 10px; padding: 14px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px; color: ${isDark ? "#ddd" : "#333"};
      resize: none; outline: none;
      transition: border-color 0.2s; min-height: 100px;
    }
    .modal-input:focus { border-color: ${palette.accent}; }
    .modal-actions {
      display: flex; gap: 10px;
      margin-top: 16px; justify-content: flex-end;
    }
    .btn-cancel {
      background: ${isDark ? "#2a2a38" : "#f0f0f5"};
      border: none; border-radius: 8px; padding: 10px 20px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px; font-weight: 600;
      color: ${isDark ? "#888" : "#666"};
      cursor: pointer; transition: all 0.2s;
    }
    .btn-cancel:hover { opacity: 0.8; }
    .btn-save {
      background: ${palette.accent}; border: none;
      border-radius: 8px; padding: 10px 24px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px; font-weight: 600; color: #fff;
      cursor: pointer;
      box-shadow: 0 4px 12px ${palette.accent}55;
      transition: all 0.2s;
    }
    .btn-save:hover { transform: translateY(-1px); box-shadow: 0 6px 16px ${palette.accent}66; }
    .btn-delete {
      background: transparent; border: 1px solid #e55;
      border-radius: 8px; padding: 10px 16px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px; font-weight: 500; color: #e55;
      cursor: pointer; transition: all 0.2s; margin-right: auto;
    }
    .btn-delete:hover { background: #fee; }

    /* ── Holiday dot ── */
    .holiday-dot {
      position: absolute; bottom: 2px; left: 50%;
      transform: translateX(-50%);
      width: 3px; height: 3px; border-radius: 50%;
      background: #e55;
    }

    /* ── Selection hint ── */
    .selection-hint {
      text-align: center; font-size: 11px;
      color: ${isDark ? "#555" : "#ccc"};
      letter-spacing: 1px; padding: 6px 0 0;
      text-transform: uppercase;
    }
    .selection-hint span { color: ${palette.accent}; }

    /* ── Responsive ── */
    @media (max-width: 600px) {
      .calendar-body { grid-template-columns: 1fr; padding: 16px; }
      .notes-sidebar {
        border-right: none;
        border-bottom: 1px solid ${isDark ? "#2e2e3e" : "#eee"};
        padding-right: 0; padding-bottom: 16px; margin-bottom: 16px;
      }
      .grid-section { padding-left: 0; }
      .hero-section { height: 200px; }
      .hero-month   { font-size: 32px; }
      .day-cell     { font-size: 12px; }
    }
  `;
}
