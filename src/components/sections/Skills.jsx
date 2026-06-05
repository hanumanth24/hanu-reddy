import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOME_SKILLS } from "@/lib/data";
import NodeGraphCanvas from "@/components/three/NodeGraphCanvas";
import LazyMount from "@/components/LazyMount";
import SkillTooltipTag from "@/components/SkillTooltipTag";
import useTitleReveal from "@/hooks/useTitleReveal";

gsap.registerPlugin(ScrollTrigger);

// Adobe product nodes — colors mirror the 3D graph exactly
const ADOBE_PRODUCTS = [
  {
    id: "aem",
    name: "AEM CLOUD",
    color: "#E5FE40",
    tag: "CMS / DXP",
    desc: "Sling Models · HTL · SPA Editor · DAM · OSGi · Dispatcher",
  },
  {
    id: "ajo",
    name: "JOURNEY OPTIMIZER",
    color: "#ff9a3c",
    tag: "ORCHESTRATION",
    desc: "Event journeys · Offer decisioning · Cross-channel flows",
  },
  {
    id: "rtcdp",
    name: "RT-CDP",
    color: "#a78bfa",
    tag: "DATA PLATFORM",
    desc: "Identity resolution · Audience segments · Profile activation",
  },
  {
    id: "eds",
    name: "EDGE DELIVERY",
    color: "#4ade80",
    tag: "PERFORMANCE",
    desc: "<200ms TTFB · CDN-first · Headless authoring at the edge",
  },
  {
    id: "cja",
    name: "CJA",
    color: "#60a5fa",
    tag: "ANALYTICS",
    desc: "Cross-channel attribution · Stitched datasets · Workspace",
  },
  {
    id: "analytics",
    name: "ANALYTICS",
    color: "#f87171",
    tag: "MEASUREMENT",
    desc: "eVars · ACDL data layer · Launch tags · Funnels",
  },
  {
    id: "launch",
    name: "ADOBE LAUNCH",
    color: "#facc15",
    tag: "TAG MANAGEMENT",
    desc: "Rules engine · Extensions · Data layer · ACDL",
  },
];

export default function Skills() {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const graphRef = useRef(null);
  const carouselRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  useTitleReveal(titleRef);

  // Auto-scroll for mobile carousel — starts when section enters view,
  // pauses on touch so users can swipe freely, resumes 2s after lift.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || !window.matchMedia("(pointer: coarse)").matches) return;

    let tween = null;

    const start = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0 || tween) return;
      tween = gsap.to(el, {
        scrollLeft: maxScroll,
        duration: 22,
        ease: "none",
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.6,
      });
    };

    const pause = () => tween?.pause();
    const resume = () => { setTimeout(() => tween?.resume(), 2000); };

    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(start, 1400); },
      { threshold: 0.3 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      tween?.kill();
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Graph: fade + scale in
      gsap.fromTo(
        graphRef.current,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: graphRef.current, start: "top 82%", once: true },
        }
      );

      // Legend chips: stagger after graph trigger, simulate "boot-up"
      gsap.fromTo(
        section.querySelectorAll("[data-legend-chip]"),
        { opacity: 0, x: 14 },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          ease: "expo.out",
          stagger: 0.09,
          delay: 0.5,
          scrollTrigger: { trigger: graphRef.current, start: "top 78%", once: true },
        }
      );

      // Status bar items
      gsap.fromTo(
        section.querySelectorAll("[data-status-item]"),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.9,
          scrollTrigger: { trigger: graphRef.current, start: "top 78%", once: true },
        }
      );

      // Product cards: stagger up
      gsap.fromTo(
        section.querySelectorAll("[data-product-card]"),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "expo.out",
          stagger: 0.065,
          scrollTrigger: {
            trigger: section.querySelector("[data-products-grid]"),
            start: "top 80%",
            once: true,
          },
        }
      );

      // Skill group cards
      gsap.fromTo(
        section.querySelectorAll("[data-skill-group]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section.querySelector("[data-skills-grid]"),
            start: "top 78%",
            once: true,
          },
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      data-testid="skills-section"
      className="relative px-6 md:px-12 py-24 md:py-36 border-t border-zinc-900 bg-[#080808] overflow-hidden"
    >
      <div className="absolute inset-0 grid-noise opacity-[0.04] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto">

        {/* ── Header ── */}
        <div className="flex items-center gap-4 mb-12">
          <span className="section-label">[ 04 / TECHNICAL ARSENAL ]</span>
          <span className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* ── Title row ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <h2
            ref={titleRef}
            className="font-display uppercase font-semibold text-white leading-[0.9]"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)" }}
          >
            The <span className="text-[#E5FE40]">Stack.</span>
          </h2>
          <p className="font-mono text-[10px] text-zinc-500 tracking-[0.15em] max-w-sm md:text-right leading-loose">
            10+ YEARS AEM & AEP EXPERTISE · FULL ADOBE CLOUD BREADTH
            <br />RT-CDP · AJO · CJA · EDS · AEM CLOUD · ANALYTICS
          </p>
        </div>

        {/* ── Adobe Topology Canvas ── */}
        <div
          ref={graphRef}
          className="relative border border-zinc-800 overflow-hidden h-[380px] md:h-[420px] lg:h-[520px]"
          style={{ opacity: 0 }}
        >
          <LazyMount className="absolute inset-0">
            <NodeGraphCanvas mouse={mouse} />
          </LazyMount>

          {/* Corner frame accents */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#E5FE40]/60 pointer-events-none" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#E5FE40]/60 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#E5FE40]/60 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#E5FE40]/60 pointer-events-none" />

          {/* HUD top-left */}
          <div className="absolute top-4 left-6 flex items-center gap-2 pointer-events-none">
            <span className="w-1.5 h-1.5 bg-[#E5FE40] rounded-full animate-pulse" />
            <span className="font-mono text-[8px] tracking-[0.4em] text-[#E5FE40]">
              ADOBE EXPERIENCE CLOUD · LIVE TOPOLOGY
            </span>
          </div>

          {/* HUD top-right: product legend — hidden on mobile to avoid overlap */}
          <div className="hidden md:flex absolute top-10 right-5 flex-col gap-2 items-end pointer-events-none">
            <span className="font-mono text-[7px] tracking-[0.35em] text-zinc-600 mb-1">NODES</span>
            {ADOBE_PRODUCTS.map((p) => (
              <div
                key={p.id}
                data-legend-chip
                className="flex items-center gap-2"
                style={{ opacity: 0 }}
              >
                <span
                  className="font-mono text-[8px] tracking-[0.2em]"
                  style={{ color: p.color }}
                >
                  {p.name}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: p.color }}
                />
              </div>
            ))}
          </div>

          {/* HUD bottom: status bar */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800/70 bg-[#050505]/80 px-4 md:px-6 py-2 flex items-center gap-3 md:gap-6 pointer-events-none">
            <span data-status-item className="font-mono text-[7px] tracking-[0.3em] text-[#E5FE40]" style={{ opacity: 0 }}>
              ● LIVE
            </span>
            <span data-status-item className="hidden sm:inline font-mono text-[7px] tracking-[0.25em] text-zinc-500" style={{ opacity: 0 }}>
              NODES: 08
            </span>
            <span data-status-item className="hidden sm:inline font-mono text-[7px] tracking-[0.25em] text-zinc-500" style={{ opacity: 0 }}>
              EDGES: 08
            </span>
            <span data-status-item className="hidden md:inline font-mono text-[7px] tracking-[0.25em] text-zinc-500" style={{ opacity: 0 }}>
              BIDIRECTIONAL DATA FLOW
            </span>
            <span data-status-item className="ml-auto font-mono text-[7px] tracking-[0.25em] text-zinc-600" style={{ opacity: 0 }}>
              AEC ARCHITECTURE
            </span>
          </div>
        </div>

        {/* Mobile-only legend strip — horizontal scroll below canvas */}
        <div className="flex md:hidden overflow-x-auto scrollbar-hide border border-t-0 border-zinc-800 bg-[#050505]/90 px-4 py-2.5 gap-5 mb-0">
          {ADOBE_PRODUCTS.map((p) => (
            <div key={p.id} className="flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
              <span className="font-mono text-[8px] tracking-[0.18em] whitespace-nowrap" style={{ color: p.color }}>
                {p.name}
              </span>
            </div>
          ))}
        </div>

        {/* ── Adobe Product Feature Cards ── */}
        {/* Mobile: horizontal swipe carousel. Desktop: even grid */}
        <div
          ref={carouselRef}
          data-products-grid
          className="overflow-x-auto scrollbar-hide border border-zinc-800 border-t-0 mb-20"
        >
          <div className="flex md:grid md:grid-cols-4 lg:grid-cols-7 gap-px bg-zinc-800 w-max md:w-auto">
            {ADOBE_PRODUCTS.map((p) => (
              <div
                key={p.id}
                data-product-card
                data-cursor="hover"
                className="w-[200px] md:w-auto p-5 flex flex-col gap-3 bg-[#080808] hover:bg-[#0d0d0d] transition-colors group"
                style={{ opacity: 0 }}
              >
                <div className="h-[2px] w-7 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: p.color }} />
                <div
                  className="font-mono text-[10px] font-bold tracking-[0.18em] leading-tight"
                  style={{ color: p.color }}
                >
                  {p.name}
                </div>
                <div className="font-mono text-[8px] tracking-[0.25em] text-zinc-600 uppercase border border-zinc-800 px-1.5 py-0.5 self-start">
                  {p.tag}
                </div>
                <div className="font-mono text-[9px] text-zinc-500 leading-relaxed mt-auto">
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Full Stack Skills ── */}
        <div className="flex items-center gap-4 mb-8">
          <span className="section-label">[ FULL STACK SKILLS ]</span>
          <span className="flex-1 h-px bg-zinc-800" />
        </div>
        <div className="mb-4 font-mono text-[9px] tracking-[0.28em] text-zinc-600 sm:hidden">
          TAP A STACK ITEM FOR CONTEXT
        </div>

        <div
          data-skills-grid
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border-l border-t border-zinc-800 mb-20"
        >
          {HOME_SKILLS.map((group, idx) => (
            <div
              key={group.category}
              data-skill-group
              data-testid={`skill-group-${idx}`}
              className="border-r border-b border-zinc-800 p-6 bg-[#080808]/70"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-mono text-[10px] tracking-[0.3em] text-[#E5FE40]">
                  {group.category}
                </h3>
                <span className="font-mono text-[10px] text-zinc-600">
                  {group.items.length.toString().padStart(2, "0")}
                </span>
              </div>
              <p className="mb-5 min-h-[2.5rem] font-mono text-[10px] leading-relaxed text-zinc-600">
                {group.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <SkillTooltipTag key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Certifications CTA ── */}
        <div className="border border-zinc-800 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-zinc-700 transition-colors">
          <div>
            <div className="font-mono text-[9px] tracking-[0.35em] text-zinc-600 mb-2">[ 05 / ADOBE CERTIFIED ]</div>
            <div className="font-display uppercase font-semibold text-white text-2xl md:text-3xl leading-tight">
              2× Adobe Certified <span className="text-[#E5FE40]">Professional.</span>
            </div>
            <div className="font-mono text-xs text-zinc-500 mt-2">Journey Optimizer · Real-Time CDP</div>
          </div>
          <a
            href="/skills"
            className="btn-brutal shrink-0 whitespace-nowrap"
          >
            VIEW SKILLS PAGE ↗
          </a>
        </div>
      </div>
    </section>
  );
}
