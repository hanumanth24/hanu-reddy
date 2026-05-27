export const THEMES = [
  { id: "yellow", label: "Acid Yellow",   accent: "#E5FE40", hover: "#CBE02D" },
  { id: "red",    label: "Cyber Red",     accent: "#FF3333", hover: "#CC2020" },
  { id: "blue",   label: "Electric Blue", accent: "#00D4FF", hover: "#00A8CC" },
  { id: "green",  label: "Matrix Green",  accent: "#00FF41", hover: "#00CC34" },
  { id: "purple", label: "Neon Purple",   accent: "#B44FFF", hover: "#9033CC" },
  { id: "orange", label: "Copper",        accent: "#FF6B35", hover: "#CC5520" },
];

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function applyTheme(id) {
  const theme = THEMES.find((t) => t.id === id) || THEMES[0];
  const root = document.documentElement;
  root.setAttribute("data-theme", theme.id);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-hover", theme.hover);
  root.style.setProperty("--accent-op-05", hexToRgba(theme.accent, 0.05));
  root.style.setProperty("--accent-op-10", hexToRgba(theme.accent, 0.10));
  root.style.setProperty("--accent-op-30", hexToRgba(theme.accent, 0.30));
  root.style.setProperty("--accent-op-40", hexToRgba(theme.accent, 0.40));
  root.style.setProperty("--accent-op-60", hexToRgba(theme.accent, 0.60));
  try { localStorage.setItem("portfolio-theme", theme.id); } catch (_) {}
  window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
}

export function getStoredTheme() {
  try { return localStorage.getItem("portfolio-theme") || "yellow"; } catch (_) { return "yellow"; }
}
