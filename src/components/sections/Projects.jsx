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
      const getTotal = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getTotal(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getTotal()}`,
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
      className="relative bg-[#050505] border-t border-zinc-900 overflow-visible"
    >
      {/* Header — always absolute over the pinned section */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none px-6 md:px-12 pt-10 pb-0">
        <div className="flex items-center gap-4 mb-4">
          <span className="section-label">[ 02 / SELECTED WORK ]</span>
          <span className="flex-1 h-px bg-zinc-800" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-zinc-500">
            {PROJECTS.length.toString().padStart(2, "0")} CASE STUDIES
          </span>
        </div>
        <h2
          className="font-display uppercase font-semibold text-white leading-[0.9]"
          style={{ fontSize: "clamp(1.8rem, 6vw, 5.5rem)" }}
        >
          Featured <span className="text-[#E5FE40]">Case Studies</span>
        </h2>
      </div>

      {/* GSAP horizontal track — same on all screen sizes */}
      <div className="h-screen flex items-center">
        <div
          ref={trackRef}
          className="flex flex-row gap-5 md:gap-8 pl-6 md:pl-12 pr-[15vw] pt-40 pb-8 will-change-transform"
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
          <div className="flex w-[30vw] flex-shrink-0 items-center justify-center text-zinc-700 font-mono text-xs tracking-[0.3em]">
            END OF REEL ↗
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i }) {
  return (
    <Link
      to={`/work/${p.slug}`}
      onClick={() => events.projectClick?.(p.id)}
      data-testid={`project-card-${p.id}`}
      data-cursor="hover"
      className="brutal-box group relative overflow-hidden transition-colors duration-300 hover:border-[#E5FE40] block flex-shrink-0 w-[80vw] max-w-[360px] sm:max-w-[420px] md:w-[460px] lg:w-[560px]"
    >
      {/* Large background index number */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 font-display font-bold leading-none text-white/[0.035] pointer-events-none select-none pr-3 pb-1 transition-opacity duration-500 group-hover:opacity-60"
        style={{ fontSize: "clamp(5rem, 14vw, 9rem)" }}
      >
        {String(i + 1).padStart(2, "0")}
      </div>
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

      <div className="p-5 md:p-8">
        <h3
          className="font-display uppercase font-semibold text-white group-hover:text-[#E5FE40] transition-colors leading-[0.95] mb-3"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 2.2rem)" }}
        >
          {p.title}
        </h3>
        <p className="font-mono text-xs md:text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-3">
          {p.summary}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] tracking-[0.12em] text-zinc-300 border border-zinc-800 px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="border-t border-zinc-800 pt-3 grid grid-cols-1 gap-1">
          {p.metrics.map((m) => (
            <div key={m} className="font-mono text-[10px] text-zinc-300 flex items-center gap-2">
              <span className="text-[#E5FE40]">→</span>
              {m}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] text-zinc-500 group-hover:text-[#E5FE40] transition-colors">
          <span>READ CASE STUDY</span>
          <ArrowUpRight size={11} />
        </div>
      </div>

      <div className="absolute bottom-3 left-4 font-mono text-[9px] tracking-[0.3em] text-zinc-700">
        {String(i + 1).padStart(2, "0")} / {PROJECTS.length}
      </div>
    </Link>
  );
}
