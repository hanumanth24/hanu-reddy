import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { openCalendly } from "@/lib/calendly";
import { PROFILE } from "@/lib/data";

const COMMANDS = [
  { id: "resume",       label: "Download Resume",      tag: "FILE",     hint: "Opens PDF in new tab" },
  { id: "call",         label: "Book a 30-min Call",   tag: "CALENDLY", hint: "Opens Calendly scheduler" },
  { id: "linkedin",     label: "Open LinkedIn",         tag: "SOCIAL",   hint: "hanu-reddy-8b04b7167" },
  { id: "contact",      label: "Jump to Contact",       tag: "SCROLL",   hint: "#contact section" },
  { id: "work",         label: "Jump to Work",          tag: "SCROLL",   hint: "#projects section" },
  { id: "about",        label: "Jump to About",         tag: "SCROLL",   hint: "#about section" },
  { id: "skills",       label: "Jump to Skills",        tag: "SCROLL",   hint: "#skills section" },
  { id: "achievements", label: "Achievements Page",     tag: "PAGE",     hint: "Timeline & milestones" },
  { id: "resume-page",  label: "Resume Page",           tag: "PAGE",     hint: "Full career profile" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((s) => !s);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const filtered = COMMANDS.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.label.toLowerCase().includes(q) ||
      c.tag.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.hint.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const scrollItemIntoView = (i) => {
    const el = listRef.current?.children[i];
    el?.scrollIntoView({ block: "nearest" });
  };

  const execute = (cmd) => {
    setOpen(false);
    switch (cmd.id) {
      case "resume":       window.open(PROFILE.resumeUrl, "_blank"); break;
      case "call":         openCalendly("cmd-palette"); break;
      case "linkedin":     window.open(PROFILE.linkedin, "_blank"); break;
      case "achievements": navigate("/achievements"); break;
      case "resume-page":  navigate("/resume"); break;
      default: {
        const sectionMap = { contact: "#contact", work: "#projects", about: "#about", skills: "#skills" };
        const id = sectionMap[cmd.id];
        if (id) {
          if (window.location.pathname !== "/") { navigate("/"); setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }), 120); }
          else document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => { const n = Math.min(s + 1, filtered.length - 1); scrollItemIntoView(n); return n; });
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => { const n = Math.max(s - 1, 0); scrollItemIntoView(n); return n; });
    }
    if (e.key === "Enter" && filtered[selected]) execute(filtered[selected]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[99999] bg-[#050505]/80 backdrop-blur-sm flex items-start justify-center pt-[14vh]"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg mx-4 border border-zinc-700 bg-[#0a0a0a] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800">
              <span className="font-mono text-[#E5FE40] text-sm select-none">›_</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="TYPE A COMMAND..."
                className="flex-1 bg-transparent font-mono text-sm text-white placeholder:text-zinc-600 outline-none tracking-[0.08em]"
              />
              <kbd className="font-mono text-[9px] text-zinc-600 border border-zinc-800 px-1.5 py-0.5 select-none">ESC</kbd>
            </div>

            {/* Results list */}
            <div ref={listRef} className="max-h-72 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-5 py-10 font-mono text-[10px] text-zinc-600 text-center tracking-[0.25em]">
                  NO COMMANDS FOUND
                </div>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setSelected(i)}
                    className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors ${
                      i === selected ? "bg-zinc-800/70" : "hover:bg-zinc-900/50"
                    }`}
                  >
                    <div>
                      <div className="font-mono text-sm text-white tracking-wide">{cmd.label}</div>
                      <div className="font-mono text-[9px] text-zinc-600 tracking-[0.15em] mt-0.5">{cmd.hint}</div>
                    </div>
                    <span className={`font-mono text-[9px] tracking-[0.25em] border px-1.5 py-0.5 shrink-0 ml-4 ${
                      i === selected ? "text-[#E5FE40] border-[#E5FE40]/40" : "text-zinc-600 border-zinc-800"
                    }`}>
                      {cmd.tag}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4 font-mono text-[9px] text-zinc-600 tracking-[0.15em]">
                <span>↑↓ NAVIGATE</span>
                <span>↵ EXECUTE</span>
              </div>
              <span className="font-mono text-[9px] text-zinc-600 tracking-[0.15em]">⌘K TOGGLE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
