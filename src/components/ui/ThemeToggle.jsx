// Renders two buttons to switch between light and dark theme.

export default function ThemeToggle({ theme, onLight, onDark }) {
  return (
    <div className="controls-bar">
      <button
        className={`ctrl-btn ${theme === "light" ? "active" : ""}`}
        onClick={onLight}
      >
        ☀ Light
      </button>
      <button
        className={`ctrl-btn ${theme === "dark" ? "active" : ""}`}
        onClick={onDark}
      >
        🌙 Dark
      </button>
    </div>
  );
}
