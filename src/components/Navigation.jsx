import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { events } from "@/lib/analytics";
import { openCalendly } from "@/lib/calendly";

const LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" },
];

// Letter-doubling hover: render each char twice in a clipped column so the
// duplicate slides up on hover (Luke-Baffait-style).
function HoverText({ children, className = "" }) {
  const text = String(children);
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <span className="flex">
        {text.split("").map((ch, i) => (
          <span
            key={`a-${i}`}
            className="inline-block transition-transform duration-300 ease-nav group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 14}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="absolute inset-0 flex">
        {text.split("").map((ch, i) => (
          <span
            key={`b-${i}`}
            className="inline-block translate-y-full transition-transform duration-300 ease-nav group-hover:translate-y-0 text-[#E5FE40]"
            style={{ transitionDelay: `${i * 14}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, href, label) => {
    e.preventDefault();
    setOpen(false);
    if (label) events.navClick(label);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      data-testid="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-md border-b border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-4 md:py-5 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "#hero")}
          data-testid="nav-logo"
          className="flex items-center gap-3"
        >
          <span className="w-3 h-3 bg-[#E5FE40]" />
          <span className="font-mono text-xs tracking-[0.3em] text-white">
            HR.BARLA
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleClick(e, l.href, l.label)}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="group px-4 py-2 font-mono text-xs tracking-[0.2em] text-zinc-300 hover:text-zinc-300 transition-colors"
            >
              <span className="text-[#E5FE40] mr-1">/</span>
              <HoverText>{l.label}</HoverText>
            </a>
          ))}
          <button
            type="button"
            onClick={() => openCalendly("nav")}
            data-testid="nav-cta"
            className="ml-4 btn-brutal group"
          >
            <HoverText>HIRE ME</HoverText>
          </button>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((s) => !s)}
          className="md:hidden w-10 h-10 border border-zinc-700 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-4 h-px bg-white transition-all ${
              open ? "rotate-45 translate-y-[3px]" : ""
            }`}
          />
          <span
            className={`block w-4 h-px bg-white transition-all ${
              open ? "-rotate-45 -translate-y-[3px]" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-zinc-800 bg-[#050505]"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href, l.label)}
                  data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                  className="py-3 font-mono text-sm tracking-[0.2em] text-white border-b border-zinc-900"
                >
                  <span className="text-[#E5FE40] mr-2">/</span>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
