import { useEffect, useState, memo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { events } from "@/lib/analytics";
import { openCalendly } from "@/lib/calendly";

// Anchor links scroll on "/" — on other pages navigate to "/#section"
const ANCHOR_LINKS = [
  { label: "ABOUT",    href: "#about" },
  { label: "WORK",     href: "#projects" },
  { label: "SKILLS",   href: "#skills" },
  { label: "CONTACT",  href: "#contact" },
];

// Page links — always use router navigation
const PAGE_LINKS = [
  { label: "RESUME",       to: "/resume" },
  { label: "ACHIEVEMENTS", to: "/achievements" },
];

// Typewriter logo — memoised so parent scroll re-renders don't reset the animation
const AnimatedLogo = memo(function AnimatedLogo() {
  const FULL = "HR.BARLA";
  const played = typeof sessionStorage !== "undefined" && sessionStorage.getItem("logo-played");
  const [text, setText] = useState(played ? FULL : "");
  const [typing, setTyping] = useState(!played);

  useEffect(() => {
    if (played) return;
    let intervalId;
    let i = 0;
    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setText(FULL.slice(0, i));
        if (i >= FULL.length) {
          clearInterval(intervalId);
          setTyping(false);
          sessionStorage.setItem("logo-played", "1");
        }
      }, 90);
    }, 500);
    return () => {
      clearTimeout(startId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <span className="flex items-center gap-3">
      <span className="w-3 h-3 bg-[#E5FE40] shrink-0" />
      <span className="font-mono text-xs tracking-[0.3em] text-white inline-flex items-center">
        {text}
        <span
          className="inline-block w-[1.5px] h-[0.75em] bg-[#E5FE40] ml-[2px]"
          style={{ animation: typing ? "none" : "cursor-blink 1s step-start infinite" }}
        />
      </span>
    </span>
  );
});

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
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (e, href, label) => {
    e.preventDefault();
    setOpen(false);
    if (label) events.navClick(label);
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/" + href);
    }
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
          href={isHome ? "#hero" : "/"}
          onClick={(e) => isHome ? handleAnchorClick(e, "#hero") : null}
          data-testid="nav-logo"
        >
          <AnimatedLogo />
        </a>

        <div className="hidden md:flex items-center gap-1">
          {ANCHOR_LINKS.map((l) => (
            <a
              key={l.href}
              href={isHome ? l.href : "/" + l.href}
              onClick={(e) => handleAnchorClick(e, l.href, l.label)}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="group px-3 py-2 font-mono text-xs tracking-[0.2em] text-zinc-300 hover:text-zinc-300 transition-colors"
            >
              <span className="text-[#E5FE40] mr-1">/</span>
              <HoverText>{l.label}</HoverText>
            </a>
          ))}
          {PAGE_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`group px-3 py-2 font-mono text-xs tracking-[0.2em] transition-colors ${
                location.pathname === l.to ? "text-[#E5FE40]" : "text-zinc-300"
              }`}
            >
              <span className="text-[#E5FE40] mr-1">/</span>
              <HoverText>{l.label}</HoverText>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => openCalendly("nav")}
            data-testid="nav-cta"
            className="ml-3 btn-brutal group"
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
              {ANCHOR_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={isHome ? l.href : "/" + l.href}
                  onClick={(e) => handleAnchorClick(e, l.href, l.label)}
                  data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                  className="py-3 font-mono text-sm tracking-[0.2em] text-white border-b border-zinc-900"
                >
                  <span className="text-[#E5FE40] mr-2">/</span>
                  {l.label}
                </a>
              ))}
              {PAGE_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`py-3 font-mono text-sm tracking-[0.2em] border-b border-zinc-900 ${
                    location.pathname === l.to ? "text-[#E5FE40]" : "text-white"
                  }`}
                >
                  <span className="text-[#E5FE40] mr-2">/</span>
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
