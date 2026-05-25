import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { events } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;
      if (totalWidth <= 0) return;
      const isMobile = window.innerWidth < 768;
      if (isMobile) return;

      gsap.to(track, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      data-testid="projects-section"
      className="relative bg-[#050505] border-t border-zinc-900 overflow-hidden px-6 md:px-0 py-20 md:py-0"
    >
      {/* Header — relative on mobile so it stacks, absolute on md+ to overlay pinned scroll */}
      <div className="md:absolute md:top-0 md:left-0 md:right-0 z-20 pointer-events-none md:px-12 md:pt-10 mb-10 md:mb-0">
        <div className="flex items-center gap-4 mb-4">
          <span className="section-label">[ 02 / SELECTED WORK ]</span>
          <span className="flex-1 h-px bg-zinc-800" />
          <span className="hidden sm:inline font-mono text-[11px] tracking-[0.3em] text-zinc-500">
            {PROJECTS.length.toString().padStart(2, "0")} CASE STUDIES
          </span>
        </div>
        <h2
          className="font-display uppercase font-semibold text-white leading-[0.9]"
          style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}
        >
          Featured <span className="text-[#E5FE40]">Case Studies</span>
        </h2>
      </div>

      <div className="md:h-screen md:flex md:items-center">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-6 md:gap-8 md:pl-12 md:pr-[10vw] md:pt-44 md:pb-8 will-change-transform"
        >
          {PROJECTS.map((p, i) => (
            <Link
              key={p.id}
              to={`/work/${p.slug}`}
              data-testid={`project-card-${p.id}`}
              data-cursor="hover"
              className="brutal-box group relative w-full md:w-[460px] lg:w-[560px] md:flex-shrink-0 overflow-hidden transition-colors duration-300 hover:border-[#E5FE40] block"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.3em] text-[#E5FE40] bg-black/60 backdrop-blur-sm px-3 py-1.5">
                  {p.code}
                </div>
                <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.3em] text-white/80 bg-black/60 backdrop-blur-sm px-3 py-1.5">
                  {p.client}
                </div>
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-[#E5FE40] text-[#050505] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3
                  className="font-display uppercase font-semibold text-white group-hover:text-[#E5FE40] transition-colors leading-[0.95] mb-4"
                  style={{ fontSize: "clamp(1.4rem, 2.2vw, 2.2rem)" }}
                >
                  {p.title}
                </h3>
                <p className="font-mono text-sm text-zinc-400 leading-relaxed mb-6">
                  {p.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] tracking-[0.15em] text-zinc-300 border border-zinc-800 px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="border-t border-zinc-800 pt-4 grid grid-cols-1 gap-1.5">
                  {p.metrics.map((m) => (
                    <div
                      key={m}
                      className="font-mono text-xs text-zinc-300 flex items-center gap-2"
                    >
                      <span className="text-[#E5FE40]">→</span>
                      {m}
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-zinc-500 group-hover:text-[#E5FE40] transition-colors">
                  <span>READ CASE STUDY</span>
                  <ArrowUpRight size={12} />
                </div>
              </div>
              <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.3em] text-zinc-700">
                {String(i + 1).padStart(2, "0")} / {PROJECTS.length}
              </div>
            </Link>
          ))}
          {/* end spacer card */}
          <div className="hidden md:flex w-[40vw] flex-shrink-0 items-center justify-center text-zinc-700 font-mono text-xs tracking-[0.3em]">
            END OF REEL ↗
          </div>
        </div>
      </div>
    </section>
  );
}
