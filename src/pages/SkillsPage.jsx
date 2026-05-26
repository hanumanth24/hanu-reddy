import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Cursor from "@/components/Cursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/sections/Footer";
import LazyMount from "@/components/LazyMount";
import SkillNetCanvas from "@/components/three/SkillNetCanvas";
import { SKILLS, CERTIFICATIONS } from "@/lib/data";
import { Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── Adobe Experience Cloud product cards ──────────────────────────────────────
const AEC_PRODUCTS = [
  { name: "AEM CLOUD",       tag: "CMS / DXP",         color: "#E5FE40", desc: "Sling Models · HTL · SPA Editor · DAM · OSGi · Dispatcher · Cloud Manager" },
  { name: "EDGE DELIVERY",   tag: "PERFORMANCE",        color: "#4ade80", desc: "<200ms TTFB · CDN-first · Headless authoring · Sharpoint/GDrive integration" },
  { name: "JOURNEY OPT.",    tag: "ORCHESTRATION",      color: "#ff9a3c", desc: "Event journeys · Offer decisioning · Cross-channel flows · AJO campaigns" },
  { name: "RT-CDP",          tag: "DATA PLATFORM",      color: "#a78bfa", desc: "Identity resolution · Audience segments · Profile activation · Merge policies" },
  { name: "CJA",             tag: "ANALYTICS",          color: "#60a5fa", desc: "Cross-channel attribution · Stitched datasets · Workspace · Report suites" },
  { name: "ANALYTICS",       tag: "MEASUREMENT",        color: "#f87171", desc: "eVars · ACDL data layer · Launch tags · Funnel analysis · Workspace" },
  { name: "ADOBE LAUNCH",    tag: "TAG MANAGEMENT",     color: "#facc15", desc: "Rules engine · Extensions · Data layer · ACDL · Server-side forwarding" },
];

// ── Skill tag with magnetic hover ─────────────────────────────────────────────
function SkillTag({ label }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * 0.3,
      y: (e.clientY - r.top - r.height / 2) * 0.3,
      duration: 0.2, ease: "power2.out",
    });
  };
  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1,0.4)" });

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="brutal-tag text-zinc-300 cursor-default select-none inline-block text-xs"
    >
      {label}
    </span>
  );
}

// ── Animated skill group card ─────────────────────────────────────────────────
function SkillGroupCard({ group, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "expo.out",
          delay: index * 0.06,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      className="border-r border-b border-zinc-800 p-6 bg-[#080808]/70 group"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-mono text-[10px] tracking-[0.3em] text-[#E5FE40]">{group.category}</h3>
        <span className="font-mono text-[10px] text-zinc-600">
          {group.items.length.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => <SkillTag key={item} label={item} />)}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SkillsPage() {
  const heroRef = useRef(null);
  const aecRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll("[data-hero-line]"),
      { y: "105%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.95, ease: "expo.out", stagger: 0.14, delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    const el = aecRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-aec-card]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
    }, el);
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
            <SkillNetCanvas />
          </LazyMount>
          <div className="absolute inset-0 z-[1] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, rgba(5,5,5,0.3) 45%, rgba(5,5,5,0.9) 100%)" }}
          />

          <div className="relative z-10 px-6 md:px-12 pt-32 pb-16 max-w-[1400px] mx-auto w-full">
            <div className="flex items-center gap-4 mb-10">
              <Link to="/" className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 hover:text-[#E5FE40] transition-colors flex items-center gap-2">
                <ArrowLeft size={10} />PORTFOLIO
              </Link>
              <span className="flex-1 h-px bg-zinc-800" />
              <span className="section-label">[ 00 / SKILLS ]</span>
            </div>

            <div ref={heroRef} className="mb-10">
              <h1 className="font-display uppercase font-semibold leading-[0.85] mb-8"
                style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}>
                <span className="block overflow-hidden">
                  <span data-hero-line className="block text-white" style={{ display: "block" }}>THE</span>
                </span>
                <span className="block overflow-hidden">
                  <span data-hero-line className="block text-[#E5FE40]" style={{ display: "block" }}>STACK.</span>
                </span>
              </h1>
              <p className="font-mono text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
                6 years AEM depth · Full Adobe Cloud breadth
                <br />AEP · AJO · RT-CDP · CJA · EDS · Analytics · Launch
              </p>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3">
              {["AEM CLOUD SERVICE", "ADOBE EXPERIENCE PLATFORM", "REACT / ANGULAR", "JAVA / SLING", "CI/CD / DOCKER"].map((s) => (
                <span key={s} className="font-mono text-[9px] tracking-[0.25em] text-zinc-400 border border-zinc-800 px-3 py-1.5 hover:border-[#E5FE40] hover:text-[#E5FE40] transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── ADOBE EXPERIENCE CLOUD ── */}
        <section className="border-t border-zinc-900 bg-[#080808] px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="section-label">[ 01 / ADOBE EXPERIENCE CLOUD ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>

            <h2 className="font-display uppercase font-semibold text-white leading-[0.9] mb-14"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
              Adobe <span className="text-[#E5FE40]">Cloud Depth.</span>
            </h2>

            <div
              ref={aecRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800"
            >
              {AEC_PRODUCTS.map((p) => (
                <div
                  key={p.name}
                  data-aec-card
                  className="p-6 bg-[#080808] hover:bg-[#0d0d0d] transition-colors group"
                  style={{ opacity: 0 }}
                >
                  <div className="h-[2px] w-7 mb-4 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: p.color }} />
                  <div className="font-mono text-[10px] font-bold tracking-[0.18em] mb-2" style={{ color: p.color }}>{p.name}</div>
                  <div className="font-mono text-[7px] tracking-[0.25em] text-zinc-600 border border-zinc-800 px-1.5 py-0.5 self-start inline-block mb-3">{p.tag}</div>
                  <div className="font-mono text-[8px] text-zinc-500 leading-relaxed">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FULL STACK SKILLS ── */}
        <section className="border-t border-zinc-900 bg-[#050505] px-6 md:px-12 py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="section-label">[ 02 / FULL STACK SKILLS ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>

            <h2 className="font-display uppercase font-semibold text-white leading-[0.9] mb-14"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
              End-to-end <span className="text-[#E5FE40]">capability.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-zinc-800">
              {SKILLS.map((group, idx) => (
                <SkillGroupCard key={group.category} group={group} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section className="border-t border-zinc-900 bg-[#080808] px-6 md:px-12 py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="section-label">[ 03 / ADOBE CERTIFIED ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>

            <h2 className="font-display uppercase font-semibold text-white leading-[0.9] mb-14"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
              Certified <span className="text-[#E5FE40]">professional.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CERTIFICATIONS.map((c, i) => (
                <div
                  key={c.title}
                  className="brutal-box p-8 flex items-start gap-5 hover:border-[#E5FE40] transition-colors group bg-[#080808]/70"
                >
                  <div className="w-14 h-14 border border-zinc-700 flex items-center justify-center shrink-0 group-hover:border-[#E5FE40] group-hover:bg-[#E5FE40]/5 transition-all">
                    <Award size={22} strokeWidth={1.5} className="text-[#E5FE40]" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-2">{c.issuer}</div>
                    <div className="font-display uppercase font-semibold text-white text-xl leading-tight">{c.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-zinc-900 bg-[#050505] px-6 md:px-12 py-20">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="font-mono text-[9px] tracking-[0.35em] text-zinc-600 mb-3">OPEN ROLES</div>
              <h2 className="font-display uppercase font-semibold text-white text-3xl md:text-5xl leading-tight">
                AEM · Frontend · Martech<br />
                <span className="text-[#E5FE40]">Architecture</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link to="/achievements" className="btn-brutal">
                <ArrowUpRight size={14} strokeWidth={2.5} />
                VIEW ACHIEVEMENTS
              </Link>
              <Link to="/resume" className="btn-brutal btn-brutal-outline">
                <ArrowUpRight size={14} strokeWidth={2.5} />
                FULL RESUME
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
