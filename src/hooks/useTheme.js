// ─── useTheme ─────────────────────────────────────────────────────────────────
// Owns: "light" | "dark" theme state. One job.
// Exposes isDark boolean as a convenience for CSS string interpolation.

import { useState } from "react";

export function useTheme(initial = "light") {
  const [theme, setTheme] = useState(initial);
  const isDark = theme === "dark";

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");
  const setLight    = () => setTheme("light");
  const setDark     = () => setTheme("dark");

  return { theme, isDark, toggleTheme, setLight, setDark };
}
