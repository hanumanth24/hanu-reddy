import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/lib/data";
import DataWaveCanvas from "@/components/three/DataWaveCanvas";
import useTitleReveal from "@/hooks/useTitleReveal";

gsap.registerPlugin(ScrollTrigger);

function GsapCounter({ value, suffix }) {
  const numRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: value,
      duration: 2.2,
      ease: "power3.out",
      onUpdate() {
        if (numRef.current) numRef.current.textContent = Math.floor(proxy.val);
      },
      onComplete() {
        if (numRef.current) numRef.current.textContent = value;
      },
    });
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="font-display font-semibold text-white leading-none"
      style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
    >
      <span ref={numRef}>0</span>
      <span className="text-[#E5FE40]">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const scanRef = useRef(null);
  useTitleReveal(titleRef);

  // Scan line sweeps across the grid on scroll
  useEffect(() => {
    const scan = scanRef.current;
    if (!scan) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        scan,
        { left: "-2px", opacity: 0 },
        {
          left: "100%",
          opacity: 1,
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Stagger each stat cell in on scroll
  useEffect(() => {
    const cells = gridRef.current?.querySelectorAll("[data-stat-cell]");
    if (!cells?.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cells,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      data-testid="stats-section"
      className="relative border-t border-zinc-900 overflow-hidden"
      style={{ minHeight: "640px" }}
    >
      {/* Three.js wave behind everything */}
      <div className="absolute inset-0 z-0">
        <DataWaveCanvas />
      </div>

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.5) 50%, rgba(5,5,5,0.82) 100%)" }}
      />

      <div className="relative z-10 px-6 md:px-12 py-24 md:py-32 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-label">[ 06 / IMPACT, MEASURED ]</span>
          <span className="flex-1 h-px bg-zinc-800" />
        </div>

        <h2
          ref={titleRef}
          className="font-display uppercase font-semibold text-white leading-[0.9] mb-12"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
        >
          Numbers that <span className="text-[#E5FE40]">stick.</span>
        </h2>

        {/* Grid with scan line */}
        <div ref={gridRef} className="relative">
          {/* Yellow scan line */}
          <div
            ref={scanRef}
            className="absolute top-0 bottom-0 w-0.5 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #E5FE40, transparent)",
              left: "-2px",
              opacity: 0,
              boxShadow: "0 0 16px 4px #E5FE4088",
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-zinc-800/60">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                data-stat-cell
                data-testid={`stat-${i}`}
                className="border-r border-b border-zinc-800/60 p-6 md:p-8 flex flex-col justify-between min-h-[200px] md:min-h-[260px] bg-[#050505]/50 backdrop-blur-sm"
                style={{ opacity: 0 }}
              >
                <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">
                  {String(i + 1).padStart(2, "0")} /
                </div>
                <GsapCounter value={s.value} suffix={s.suffix} />
                <div className="font-mono text-[11px] tracking-[0.25em] text-zinc-400 mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
