import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "motion/react";
import { Download, ArrowUpRight, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Cursor from "@/components/Cursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/sections/Footer";
import LazyMount from "@/components/LazyMount";
import AchievementCanvas from "@/components/three/AchievementCanvas";
import { ACHIEVEMENTS, STATS, PROFILE } from "@/lib/data";
import { openCalendly } from "@/lib/calendly";
import { events } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ value, suffix, label, delay = 0 }) {
  const numRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: value,
      duration: 2.4,
      ease: "power3.out",
      delay,
      onUpdate() { if (numRef.current) numRef.current.textContent = Math.floor(proxy.val); },
      onComplete() { if (numRef.current) numRef.current.textContent = value; },
    });
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="px-6 md:px-10 py-6 md:py-8 text-center flex-1 border-r border-zinc-800 last:border-r-0">
      <div
        className="font-display font-semibold text-white leading-none mb-2"
        style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
      >
        <span ref={numRef}>0</span>
        <span className="text-[#E5FE40]">{suffix}</span>
      </div>
      <div className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 uppercase">{label}</div>
    </div>
  );
}

// ── Milestone card — fully redesigned ────────────────────────────────────────
function MilestoneCard({ item, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "expo.out",
          delay: (index % 4) * 0.09,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden flex flex-col bg-[#080808] group cursor-default"
      style={{ opacity: 0 }}
    >
      {/* Top accent bar — solid card color */}
      <div className="h-[3px] w-full shrink-0" style={{ backgroundColor: item.color }} />

      {/* Subtle radial glow from card color */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${item.color}12 0%, transparent 65%)`,
        }}
      />

      {/* Huge background year — decorative */}
      <div
        className="absolute right-3 bottom-2 font-display font-bold leading-none pointer-events-none select-none"
        style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: item.color, opacity: 0.055 }}
        aria-hidden="true"
      >
        {item.year}
      </div>

      {/* Card content */}
      <div className="relative z-10 flex flex-col gap-5 p-6 md:p-7 flex-1">

        {/* Tag (filled) + index */}
        <div className="flex items-start justify-between gap-2">
          <span
            className="font-mono text-[8px] tracking-[0.3em] px-2.5 py-1.5 font-semibold shrink-0"
            style={{ color: "#050505", backgroundColor: item.color }}
          >
            {item.tag}
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-700 shrink-0 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Year — bold display */}
        <div
          className="font-display font-semibold leading-none tabular-nums"
          style={{ color: item.color, fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
        >
          {item.year}
        </div>

        {/* Title */}
        <h3
          className="font-display uppercase font-semibold text-white leading-[0.95] group-hover:text-[#E5FE40] transition-colors duration-300"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
        >
          {item.title}
        </h3>

        {/* Gradient rule */}
        <div
          className="h-px w-full shrink-0"
          style={{ background: `linear-gradient(to right, ${item.color}80, transparent)` }}
        />

        {/* Detail */}
        <p className="font-mono text-[11px] text-zinc-500 leading-[1.8] flex-1">
          {item.detail}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: item.color }} />
            <span className="font-mono text-[8px] tracking-[0.3em] text-zinc-600">VERIFIED</span>
          </div>
          <ArrowUpRight
            size={14}
            className="text-zinc-700 group-hover:text-[#E5FE40] transition-colors duration-300 opacity-0 group-hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}

// ── Impact stat cell ──────────────────────────────────────────────────────────
function ImpactCell({ stat, index }) {
  const ref = useRef(null);
  const numRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: stat.value,
      duration: 2.2,
      ease: "power3.out",
      delay: index * 0.12,
      onUpdate() { if (numRef.current) numRef.current.textContent = Math.floor(proxy.val); },
      onComplete() { if (numRef.current) numRef.current.textContent = stat.value; },
    });
  }, [inView, stat.value, index]);

  return (
    <div
      ref={ref}
      className="border-r border-b border-zinc-800/60 p-6 md:p-10 flex flex-col justify-between min-h-[160px] md:min-h-[200px] group hover:bg-[#0a0a0a] transition-colors"
    >
      <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-700">
        {String(index + 1).padStart(2, "0")} /
      </div>
      <div
        className="font-display font-semibold text-white leading-none"
        style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
      >
        <span ref={numRef}>0</span>
        <span className="text-[#E5FE40]">{stat.suffix}</span>
      </div>
      <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase">{stat.label}</div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AchievementsPage() {
  const heroTitleRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const el = heroTitleRef.current;
    if (!el) return;
    const words = el.querySelectorAll("[data-word]");
    gsap.fromTo(words,
      { y: "105%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.12, delay: 0.3 }
    );
  }, []);

  // Section heading line + label animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector("[data-section-line]"),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "expo.out", transformOrigin: "left center",
          scrollTrigger: { trigger: section, start: "top 82%", once: true } }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <Cursor />
      <Navigation />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-screen bg-[#050505] flex flex-col justify-between overflow-hidden">
          <LazyMount className="absolute inset-0 z-0">
            <AchievementCanvas />
          </LazyMount>
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, rgba(5,5,5,0.2) 40%, rgba(5,5,5,0.92) 100%)" }}
          />

          <div className="relative z-10 px-6 md:px-12 pt-32 max-w-[1400px] mx-auto w-full">
            <div className="flex items-center gap-4 mb-10">
              <Link to="/" className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 hover:text-[#E5FE40] transition-colors flex items-center gap-2">
                <ArrowLeft size={10} /> PORTFOLIO
              </Link>
              <span className="flex-1 h-px bg-zinc-800" />
              <span className="section-label">[ 00 / ACHIEVEMENTS ]</span>
            </div>

            <div ref={heroTitleRef}>
              <h1 className="font-display uppercase font-semibold leading-[0.85] mb-8" style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}>
                <span className="block overflow-hidden">
                  <span data-word className="block text-white">IMPACT</span>
                </span>
                <span className="block overflow-hidden">
                  <span data-word className="block text-[#E5FE40]">RECOGNIZED.</span>
                </span>
              </h1>
            </div>

            <p className="font-mono text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
              Adobe Certified Professional · Fortune 500 Clients
              <br />10+ years building enterprise digital experiences that move numbers.
            </p>
          </div>

          {/* Counter bar */}
          <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 pb-0">
            <div className="border border-zinc-800 bg-[#050505]/80 backdrop-blur-sm flex flex-wrap md:flex-nowrap">
              <Counter value={10}  suffix="+"  label="YEARS IN AEM"        delay={0.5} />
              <Counter value={6}   suffix="+"  label="FORTUNE 500 CLIENTS" delay={0.65} />
              <Counter value={2}   suffix=""   label="ADOBE CERTIFICATIONS" delay={0.8} />
              <Counter value={50}  suffix="%"  label="PAGE LOAD GAINS"     delay={0.95} />
              <Counter value={40}  suffix="%"  label="BUFFER REDUCTION"    delay={1.1} />
            </div>
          </div>
        </section>

        {/* ── MILESTONES ── */}
        <section ref={sectionRef} className="relative px-6 md:px-12 py-24 md:py-36 border-t border-zinc-900 bg-[#050505]">
          <div className="max-w-[1400px] mx-auto">

            {/* Section header */}
            <div className="flex items-center gap-4 mb-6">
              <span className="section-label">[ 01 / CAREER MILESTONES ]</span>
              <span
                data-section-line
                className="flex-1 h-px bg-zinc-800"
                style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
              />
            </div>

            {/* Bold editorial heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <h2
                className="font-display uppercase font-semibold text-white leading-[0.85]"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
              >
                Shipped.<br />
                <span className="text-[#E5FE40]">Measured.<br />Repeated.</span>
              </h2>
              <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 max-w-xs md:text-right leading-[2]">
                DELIVERY · CERTIFICATION · ARCHITECTURE<br />
                PLATFORM · PERFORMANCE · 2017 — 2026
              </p>
            </div>

            {/* 4-column grid — 8 items = 2 clean rows, no empty slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800">
              {ACHIEVEMENTS.map((item, i) => (
                <MilestoneCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── IMPACT NUMBERS ── */}
        <section className="relative px-6 md:px-12 py-24 border-t border-zinc-900 bg-[#080808]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="section-label">[ 02 / MEASURABLE IMPACT ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>
            <h2
              className="font-display uppercase font-semibold text-white leading-[0.9] mb-14"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              Numbers that <span className="text-[#E5FE40]">stick.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-zinc-800/60">
              {STATS.map((s, i) => (
                <ImpactCell key={s.label} stat={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── RECOGNITION STRIP ── */}
        <section className="border-t border-zinc-900 bg-[#050505] px-6 md:px-12 py-16">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="font-mono text-[9px] tracking-[0.35em] text-zinc-600 mb-4">RECOGNITION</div>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  "Adobe Certified Professional × 2",
                  "HD Supply — Fortune 500",
                  "American Express — Fortune 500",
                  "Verizon — Fortune 500",
                  "Cummins — Fortune 500",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 font-mono text-xs text-zinc-300">
                    <span className="w-1 h-1 bg-[#E5FE40] rounded-full shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 text-right shrink-0">SINCE 2016</div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-zinc-900 bg-[#080808] px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className="font-mono text-[9px] tracking-[0.4em] text-zinc-600 mb-8">OPEN TO OPPORTUNITIES</div>
            <h2
              className="font-display uppercase font-semibold text-white leading-[0.88] mb-10"
              style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
            >
              Want results <span className="text-[#E5FE40]">like these?</span>
            </h2>
            <p className="font-mono text-zinc-400 text-sm max-w-md mx-auto leading-relaxed mb-12">
              Open to AEM, Frontend, Martech, and Architecture roles. Let's build something that ships.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => events.resumeClick("achievements-cta")}
                className="btn-brutal"
              >
                <Download size={14} strokeWidth={2.5} />
                DOWNLOAD RESUME
              </a>
              <button
                type="button"
                onClick={() => openCalendly("achievements-cta")}
                className="btn-brutal btn-brutal-outline"
              >
                <ArrowUpRight size={14} strokeWidth={2.5} />
                SCHEDULE A CALL
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
