import { useState, useEffect } from "react";
import { THEMES, applyTheme, getStoredTheme } from "@/lib/theme";

export default function ThemePicker() {
  const [current, setCurrent] = useState("yellow");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    setCurrent(stored);
    applyTheme(stored);
  }, []);

  useEffect(() => {
    const onTheme = (e) => setCurrent(e.detail.id);
    window.addEventListener("theme-change", onTheme);
    return () => window.removeEventListener("theme-change", onTheme);
  }, []);

  const select = (id) => {
    applyTheme(id);
    setCurrent(id);
    setOpen(false);
  };

  const currentTheme = THEMES.find((t) => t.id === current) || THEMES[0];

  return (
    <div className="fixed bottom-6 left-6 z-[9000] flex flex-col-reverse items-start gap-2">
      {/* Swatches — visible when open */}
      {open &&
        THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => select(t.id)}
            title={t.label}
            aria-label={`Switch to ${t.label} theme`}
            className="w-7 h-7 border-2 transition-transform duration-150 hover:scale-125 focus:outline-none"
            style={{
              backgroundColor: t.accent,
              borderColor: t.id === current ? "#ffffff" : "transparent",
            }}
          />
        ))}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((s) => !s)}
        aria-label="Toggle theme picker"
        title="Change colour theme"
        className="w-9 h-9 border border-zinc-700 flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none"
        style={{
          backgroundColor: open ? "#111111" : currentTheme.accent,
        }}
      >
        {open ? (
          <span className="font-mono text-xs text-zinc-400">×</span>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#050505" strokeWidth="1.5" />
            <circle cx="6" cy="6" r="2" fill="#050505" />
          </svg>
        )}
      </button>
    </div>
  );
}
