import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "motion/react";
import { Download, ArrowUpRight, ArrowLeft, Plus, Minus } from "lucide-react";
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
      duration: 1.4,
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

// ── Accordion milestone row ───────────────────────────────────────────────────
function MilestoneRow({ item, index, isOpen, onClick }) {
  const detailRef = useRef(null);
  const rowRef = useRef(null);

  // Scroll-in animation (once)
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0, duration: 0.65, ease: "expo.out",
          delay: index * 0.055,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [index]);

  // Expand / collapse detail panel
  useEffect(() => {
    const el = detailRef.current;
    if (!el) return;
    if (isOpen) {
      gsap.set(el, { height: "auto", opacity: 1 });
      const h = el.offsetHeight;
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.42, ease: "expo.out" }
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.28, ease: "expo.in" });
    }
  }, [isOpen]);

  return (
    <div ref={rowRef} style={{ opacity: 0 }}>
      {/* ── Trigger row ── */}
      <button
        type="button"
        onClick={onClick}
        data-cursor="hover"
        className="w-full flex items-center gap-4 md:gap-8 px-5 md:px-8 py-5 md:py-6 text-left border-b border-zinc-800/60 group transition-colors duration-200"
        style={{
          background: isOpen ? `${item.color}08` : "transparent",
          borderLeft: `3px solid ${isOpen ? item.color : "transparent"}`,
          transition: "background 0.25s, border-color 0.25s",
        }}
        aria-expanded={isOpen}
      >
        {/* Index */}
        <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-700 w-5 shrink-0 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Year */}
        <span
          className="font-display font-semibold leading-none shrink-0 tabular-nums w-20 md:w-28"
          style={{ color: item.color, fontSize: "clamp(1.1rem, 2.2vw, 1.75rem)" }}
        >
          {item.year}
        </span>

        {/* Tag */}
        <span
          className="hidden sm:flex font-mono text-[8px] tracking-[0.22em] px-2.5 py-1 shrink-0 border"
          style={{ color: item.color, borderColor: `${item.color}50` }}
        >
          {item.tag}
        </span>

        {/* Title */}
        <h3
          className="font-display uppercase font-semibold text-white flex-1 leading-[1.05] transition-colors duration-200 group-hover:text-[#E5FE40]"
          style={{
            fontSize: "clamp(0.85rem, 1.7vw, 1.2rem)",
            color: isOpen ? item.color : undefined,
          }}
        >
          {item.title}
        </h3>

        {/* Expand icon */}
        <span
          className="w-7 h-7 border flex items-center justify-center shrink-0 transition-colors duration-200"
          style={{
            borderColor: isOpen ? item.color : "#27272a",
            color: isOpen ? item.color : "#52525b",
          }}
        >
          {isOpen
            ? <Minus size={12} strokeWidth={2} />
            : <Plus size={12} strokeWidth={2} />
          }
        </span>
      </button>

      {/* ── Detail panel (GSAP-controlled height) ── */}
      <div ref={detailRef} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
        <div
          className="flex flex-col md:flex-row gap-6 md:gap-16 px-5 md:px-8 py-6 md:py-8 border-b border-zinc-800/60"
          style={{ borderLeft: `3px solid ${item.color}` }}
        >
          {/* Detail text */}
          <p className="font-mono text-sm md:text-base text-zinc-300 leading-relaxed flex-1 max-w-2xl">
            {item.detail}
          </p>

          {/* Meta panel */}
          <div className="flex flex-col gap-4 shrink-0 md:min-w-[180px]">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
              <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-500">VERIFIED</span>
            </div>
            <div>
              <div className="font-mono text-[8px] tracking-[0.25em] text-zinc-700 mb-1">CATEGORY</div>
              <div className="font-mono text-[10px] tracking-[0.18em]" style={{ color: item.color }}>
                {item.tag}
              </div>
            </div>
            <div>
              <div className="font-mono text-[8px] tracking-[0.25em] text-zinc-700 mb-1">YEAR</div>
              <div className="font-display font-semibold text-xl" style={{ color: item.color }}>
                {item.year}
              </div>
            </div>
          </div>
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
      className="border-r border-b border-zinc-800/60 p-6 md:p-10 flex flex-col justify-between min-h-[160px] md:min-h-[200px] hover:bg-[#0a0a0a] transition-colors"
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
  const [openIndex, setOpenIndex] = useState(0); // first row open by default

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector("[data-section-line]"),
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.1, ease: "expo.out", transformOrigin: "left center",
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const handleToggle = (i) => setOpenIndex(openIndex === i ? null : i);

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
              <Counter value={10}  suffix="+"  label="YEARS EXPERIENCE"     delay={0.5} />
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

            {/* Editorial heading */}
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

            {/* Accordion list */}
            <div className="border border-zinc-800">
              {/* Column headers */}
              <div className="hidden md:flex items-center gap-4 md:gap-8 px-5 md:px-8 py-3 border-b border-zinc-800 bg-[#080808]">
                <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-700 w-5 shrink-0">#</span>
                <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-700 w-20 md:w-28 shrink-0">YEAR</span>
                <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-700 hidden sm:block shrink-0 w-28">CATEGORY</span>
                <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-700 flex-1">MILESTONE</span>
                <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-700 w-7 shrink-0 text-center">OPEN</span>
              </div>

              {ACHIEVEMENTS.map((item, i) => (
                <MilestoneRow
                  key={item.title}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onClick={() => handleToggle(i)}
                />
              ))}
            </div>

            {/* Hint */}
            <div className="mt-4 flex items-center gap-2">
              <span className="w-px h-3 bg-zinc-700" />
              <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-700">
                CLICK ANY ROW TO EXPAND DETAILS
              </span>
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
              Open to AEP, AEM, Martech, and Architecture roles. Let's build something that ships.
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
