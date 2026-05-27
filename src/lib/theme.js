export const THEMES = [
  { id: "yellow", label: "Acid Yellow",   accent: "#E5FE40", hover: "#CBE02D" },
  { id: "red",    label: "Cyber Red",     accent: "#FF3333", hover: "#CC2020" },
  { id: "blue",   label: "Electric Blue", accent: "#00D4FF", hover: "#00A8CC" },
  { id: "green",  label: "Matrix Green",  accent: "#00FF41", hover: "#00CC34" },
  { id: "purple", label: "Neon Purple",   accent: "#B44FFF", hover: "#9033CC" },
  { id: "orange", label: "Copper",        accent: "#FF6B35", hover: "#CC5520" },
];

export function applyTheme(id) {
  const theme = THEMES.find((t) => t.id === id) || THEMES[0];
  const root = document.documentElement;
  root.setAttribute("data-theme", theme.id);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-hover", theme.hover);
  try { localStorage.setItem("portfolio-theme", theme.id); } catch (_) {}
  window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
}

export function getStoredTheme() {
  try { return localStorage.getItem("portfolio-theme") || "yellow"; } catch (_) { return "yellow"; }
}
