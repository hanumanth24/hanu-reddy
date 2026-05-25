import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/lib/data";
import { events } from "@/lib/analytics";
import { openCalendly } from "@/lib/calendly";

gsap.registerPlugin(ScrollTrigger);

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./:_@#";

function scrambleText(el, finalText, duration = 1.4) {
  const len = finalText.length;
  const proxy = { progress: 0 };
  gsap.to(proxy, {
    progress: 1,
    duration,
    ease: "power2.out",
    onUpdate() {
      const p = proxy.progress;
      const decoded = Math.floor(p * len);
      el.textContent = finalText
        .split("")
        .map((ch, i) => {
          if (ch === " " || ch === "." || ch === "_") return ch;
          if (i < decoded) return ch;
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join("");
    },
    onComplete() {
      el.textContent = finalText;
    },
  });
}

export default function Footer() {
  const footerRef = useRef(null);
  const bigTextRef = useRef(null);
  const metaRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const bigText = bigTextRef.current;
    if (!footer || !bigText) return;

    const ctx = gsap.context(() => {
      // 1. Clip-path wipe on the giant BARLA._ text
      gsap.fromTo(
        bigText,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
            once: true,
            onEnter: () => {
              // scramble after clip starts
              setTimeout(() => scrambleText(bigText, "BARLA._"), 300);
            },
          },
        }
      );

      // 2. Footer meta content stagger-fade
      gsap.fromTo(
        [lineRef.current, metaRef.current],
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: footer,
            start: "top 75%",
            once: true,
          },
        }
      );

      // 3. Yellow accent line draws across the footer top
      gsap.fromTo(
        footer.querySelector("[data-footer-line]"),
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      data-testid="footer"
      className="relative border-t border-zinc-900 bg-[#050505] px-6 md:px-12 pt-20 pb-8 overflow-hidden"
    >
      {/* Subtle grid noise */}
      <div className="absolute inset-0 grid-noise opacity-[0.04] pointer-events-none" />

      {/* Yellow top accent line */}
      <div
        data-footer-line
        className="absolute top-0 left-0 right-0 h-px bg-[#E5FE40]"
        style={{ transform: "scaleX(0)" }}
      />

      <div className="relative max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-12" ref={lineRef} style={{ opacity: 0 }}>
          <span className="section-label">[ 09 / END OF TRANSMISSION ]</span>
          <span className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Massive scramble text */}
        <h2
          ref={bigTextRef}
          className="font-display uppercase font-semibold text-white leading-[0.85] select-none"
          style={{
            fontSize: "clamp(2.5rem, 14vw, 14rem)",
            clipPath: "inset(0 100% 0 0)",
          }}
        >
          <span className="text-[#E5FE40]">BARLA._</span>
        </h2>

        {/* Footer links */}
        <div
          ref={metaRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-zinc-800 pt-8"
          style={{ opacity: 0 }}
        >
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-3">CONTACT</div>
            <a
              href={`mailto:${PROFILE.email}`}
              data-testid="footer-email"
              className="block font-mono text-sm text-white hover:text-[#E5FE40] transition-colors"
            >
              {PROFILE.email}
            </a>
            <a
              href={`tel:${PROFILE.phone.replace(/[^0-9+]/g, "")}`}
              data-testid="footer-phone"
              className="block font-mono text-sm text-zinc-400 hover:text-white transition-colors mt-1"
            >
              {PROFILE.phone}
            </a>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-3">LOCATION</div>
            <div className="font-mono text-sm text-white">{PROFILE.location}</div>
            <div className="font-mono text-sm text-zinc-400 mt-1">UTC-5</div>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-3">ELSEWHERE</div>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => events.linkedinClick("footer")}
              data-testid="footer-linkedin"
              className="block font-mono text-sm text-white hover:text-[#E5FE40] transition-colors"
            >
              LinkedIn ↗
            </a>
            <button
              type="button"
              onClick={() => openCalendly("footer")}
              data-testid="footer-calendly"
              className="block font-mono text-sm text-zinc-400 hover:text-white transition-colors mt-1 text-left"
            >
              Calendly ↗
            </button>
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => events.resumeClick("footer")}
              data-testid="footer-resume"
              className="block font-mono text-sm text-zinc-400 hover:text-white transition-colors mt-1"
            >
              Resume.pdf ↗
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[10px] tracking-[0.25em] text-zinc-600">
          <div>© 2026 HANUMANTH REDDY BARLA. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#E5FE40] animate-pulse" />
            BUILT WITH MOTION · GSAP · THREE.JS
          </div>
        </div>
      </div>
    </footer>
  );
}
