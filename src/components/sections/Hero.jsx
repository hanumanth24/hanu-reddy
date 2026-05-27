import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "@/components/three/HeroCanvas";
import { PROFILE } from "@/lib/data";
import { ArrowDown, Download, Calendar } from "lucide-react";
import { events } from "@/lib/analytics";
import { openCalendly } from "@/lib/calendly";

const TICKER_WORDS = [
  "AEM CLOUD SERVICE", "EDGE DELIVERY", "REACT", "GRAPHQL",
  "JOURNEY OPTIMIZER", "REAL-TIME CDP", "HTL · SLING", "TYPESCRIPT",
  "ADOBE ANALYTICS", "DISPATCHER", "OKTA", "NODE.JS", "JAVA",
  "ADOBE LAUNCH", "CJA", "EXPERIENCE FRAGMENTS",
];

function TickerMarquee() {
  const rowRef = useRef(null);
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    let tl;
    const id = requestAnimationFrame(() => {
      const w = el.scrollWidth / 2;
      tl = gsap.to(el, {
        x: -w,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    });
    return () => { cancelAnimationFrame(id); tl?.kill(); };
  }, []);

  const doubled = [...TICKER_WORDS, ...TICKER_WORDS];
  return (
    <div ref={rowRef} className="flex gap-0 w-max">
      {doubled.map((word, i) => (
        <span key={i} className="flex items-center">
          <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 whitespace-nowrap px-5">
            {word}
          </span>
          <span className="text-zinc-700 text-[10px]">·</span>
        </span>
      ))}
    </div>
  );
}

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll("[data-char]");
    gsap.fromTo(
      chars,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.025,
        delay: 0.2,
      }
    );
  }, []);

  // Hero scroll-exit choreography: text + canvas fade & scale as the user
  // scrolls past the hero, giving a cinematic "release" into the next section.
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.to(section.querySelector("[data-hero-content]"), {
        opacity: 0,
        y: -60,
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to(section.querySelector("[data-hero-canvas]"), {
        opacity: 0.25,
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const splitText = (text) =>
    text.split("").map((ch, i) => (
      <span key={i} className="inline-block overflow-hidden align-baseline">
        <span data-char className="inline-block">
          {ch === " " ? "\u00A0" : ch}
        </span>
      </span>
    ));

  return (
    <section
      id="hero"
      ref={containerRef}
      data-testid="hero-section"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0" data-hero-canvas>
        <HeroCanvas mouse={mouse} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] grid-noise opacity-30 pointer-events-none" />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between px-6 md:px-12 py-28 md:py-32 pointer-events-none">
        {/* Top labels */}
        <div className="flex items-start justify-between pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-mono text-[11px] tracking-[0.3em] text-zinc-400"
          >
            <div>PORTFOLIO / 2026</div>
            <div className="mt-1 text-zinc-600">FORT MILL, SC — UTC-5</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="hidden md:block text-right font-mono text-[11px] tracking-[0.3em] text-zinc-400"
          >
            <div>ADOBE CERTIFIED</div>
            <div className="mt-1 text-zinc-600">AJO · RT-CDP</div>
          </motion.div>
        </div>

        {/* Title block */}
        <div className="pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-[#E5FE40]" />
            <span className="font-mono text-[11px] tracking-[0.3em] text-[#E5FE40]">
              SR. AEM FULL STACK LEAD
            </span>
          </motion.div>

          <h1
            ref={titleRef}
            data-testid="hero-title"
            className="font-display font-semibold uppercase text-white leading-[0.85] break-words"
            style={{ fontSize: "clamp(2rem, 9vw, 9rem)" }}
          >
            <div>{splitText("HANUMANTH")}</div>
            <div className="text-[#E5FE40]">
              {splitText("REDDY BARLA")}
              <span
                className="cursor-blink inline-block align-bottom bg-[#E5FE40] ml-[0.08em]"
                style={{ width: "0.055em", height: "0.82em" }}
                aria-hidden="true"
              />
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8 max-w-xl"
          >
            <p className="font-mono text-sm md:text-base text-zinc-300 leading-relaxed">
              <span className="text-[#E5FE40]">{"// "}</span>
              10+ years architecting Adobe Experience Cloud platforms for{" "}
              <span className="text-white">Fortune 500</span> — HD Supply, Amex,
              Verizon, Cummins.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4"
          >
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => events.resumeClick("hero")}
              data-testid="hero-resume-btn"
              className="btn-brutal justify-center sm:justify-start"
            >
              <Download size={14} strokeWidth={2.5} />
              DOWNLOAD RESUME
            </a>
            <div className="flex gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => openCalendly("hero")}
                data-testid="hero-calendly-btn"
                className="btn-brutal btn-brutal-outline flex-1 sm:flex-none justify-center"
              >
                <Calendar size={14} strokeWidth={2.5} />
                BOOK A CALL
              </button>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="hero-view-work-btn"
                className="btn-brutal btn-brutal-outline flex-1 sm:flex-none justify-center"
              >
                VIEW WORK →
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col gap-4 pointer-events-auto"
        >
          {/* Tech keyword ticker */}
          <div className="overflow-hidden border-t border-b border-zinc-800/60 py-2 -mx-6 md:-mx-12 px-0">
            <TickerMarquee />
          </div>

          <div className="flex items-end justify-between">
            <div className="font-mono text-[11px] tracking-[0.3em] text-zinc-500 flex items-center gap-3">
              <ArrowDown size={14} className="animate-bounce text-[#E5FE40]" />
              SCROLL TO EXPLORE
            </div>
            <div className="hidden md:flex flex-col items-end gap-1 font-mono text-[11px] tracking-[0.3em] text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E5FE40] animate-pulse" />
                AVAILABLE FOR PROJECTS
              </div>
              <div className="text-zinc-700">v.26.12</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
