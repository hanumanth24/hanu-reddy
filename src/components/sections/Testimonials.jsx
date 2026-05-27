import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TESTIMONIALS } from "@/lib/data";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Rock-solid GSAP infinite marquee: triples items so the jump at repeat is invisible
function InfiniteMarquee({ items, speed = 40, reverse = false }) {
  const rowRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    // Wait one frame for layout to settle, then measure
    const id = requestAnimationFrame(() => {
      const w = el.scrollWidth / 3; // one set width (we tripled the items)
      gsap.set(el, { x: reverse ? -w : 0 });

      tlRef.current = gsap.to(el, {
        x: reverse ? 0 : -w,
        duration: speed,
        ease: "none",
        repeat: -1,
        // At each repeat the position jumps by exactly one set-width —
        // invisible because all 3 copies are identical
      });
    });

    return () => {
      cancelAnimationFrame(id);
      tlRef.current?.kill();
    };
  }, [speed, reverse]);

  const pause = () => tlRef.current?.pause();
  const resume = () => tlRef.current?.play();

  // Triple items for seamless loop
  const tripled = [...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden cursor-default"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div ref={rowRef} className="flex gap-4 w-max py-2">
        {tripled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <figure
      data-cursor="hover"
      className="group w-[320px] md:w-[420px] shrink-0 border border-zinc-800 bg-[#0d0d0d] p-7 hover:border-[#E5FE40] transition-colors duration-300 hover:-translate-y-0.5 transform"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        <Quote size={20} strokeWidth={1.5} className="text-[#E5FE40]" />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 bg-[#E5FE40]" />
          ))}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="font-mono text-sm text-zinc-300 leading-relaxed mb-6">
        "{t.quote}"
      </blockquote>

      {/* Author */}
      <figcaption className="flex items-center gap-3 border-t border-zinc-800 pt-4">
        <div className="w-8 h-8 bg-[#E5FE40]/10 border border-[#E5FE40]/30 flex items-center justify-center shrink-0">
          <span className="font-mono text-[9px] font-bold text-[#E5FE40]">
            {t.nda ? "NDA" : (t.name || t.role).split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </span>
        </div>
        <div>
          <div className="font-mono text-xs text-white tracking-wide">
            {t.name || t.role}
            {t.nda && (
              <span className="ml-2 font-mono text-[7px] tracking-[0.25em] text-zinc-600 border border-zinc-800 px-1.5 py-0.5 align-middle">NDA</span>
            )}
          </div>
          <div className="font-mono text-[10px] text-[#E5FE40] tracking-[0.2em] mt-0.5">
            {t.company}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const featuredRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
        }
      );

      // Featured cards stagger
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current.querySelectorAll("[data-featured]"),
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.12,
            scrollTrigger: { trigger: featuredRef.current, start: "top 80%", once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // For the featured 2-up grid, pick the first two
  const featured = TESTIMONIALS.slice(0, 2);
  const marqueeSrc = TESTIMONIALS;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      data-testid="testimonials-section"
      className="relative py-24 md:py-32 border-t border-zinc-900 bg-[#080808] overflow-hidden"
    >
      {/* Subtle grid noise */}
      <div className="absolute inset-0 grid-noise opacity-[0.03] pointer-events-none" />

      {/* ── Header ── */}
      <div ref={headerRef} className="px-6 md:px-12 mb-14 max-w-[1600px] mx-auto" style={{ opacity: 0 }}>
        <div className="flex items-center gap-4 mb-8">
          <span className="section-label">[ 07 / PEER ENDORSEMENTS ]</span>
          <span className="flex-1 h-px bg-zinc-800" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="font-display uppercase font-semibold text-white leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
          >
            Teams <span className="text-[#E5FE40]">speak.</span>
          </h2>
          <p className="font-mono text-xs text-zinc-500 tracking-[0.15em] max-w-xs text-right">
            UNPROMPTED ENDORSEMENTS FROM ARCHITECTS,
            <br />DIRECTORS & VPS AT FORTUNE 500 CLIENTS.
          </p>
        </div>
      </div>

      {/* ── Featured 2-up cards ── */}
      <div
        ref={featuredRef}
        className="px-6 md:px-12 mb-14 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {featured.map((t, i) => (
          <div
            key={i}
            data-featured
            className="border border-zinc-800 bg-[#0d0d0d] p-8 md:p-10 hover:border-[#E5FE40] transition-colors group"
            style={{ opacity: 0 }}
          >
            <div className="flex items-start justify-between mb-6">
              <Quote size={28} strokeWidth={1.4} className="text-[#E5FE40]" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="w-2 h-2 bg-[#E5FE40]" />
                ))}
              </div>
            </div>
            <blockquote
              className="font-display font-semibold text-white leading-snug mb-8"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.35rem)" }}
            >
              "{t.quote}"
            </blockquote>
            <figcaption className="flex items-center gap-4 border-t border-zinc-800 pt-5">
              <div className="w-10 h-10 border border-[#E5FE40]/40 bg-[#E5FE40]/5 flex items-center justify-center shrink-0">
                <span className="font-mono text-xs font-bold text-[#E5FE40]">
                  {t.author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div>
                <div className="font-mono text-sm text-white tracking-wider">{t.author}</div>
                <div className="font-mono text-[10px] text-[#E5FE40] tracking-[0.25em] mt-1">
                  {t.company}
                </div>
              </div>
            </figcaption>
          </div>
        ))}
      </div>

      {/* ── Infinite marquee strip (all testimonials, looping) ── */}
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none z-10" />

        <div className="px-6 md:px-12">
          <InfiniteMarquee items={marqueeSrc} speed={36} reverse={false} />
        </div>
      </div>
    </section>
  );
}
