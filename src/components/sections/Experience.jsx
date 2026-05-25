import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "@/lib/data";
import useTitleReveal from "@/hooks/useTitleReveal";

gsap.registerPlugin(ScrollTrigger);

// Build a unique companies list preserving first-occurrence order; collapse
// repeats (HD Supply appears twice) and tally the years per company so we can
// surface a meaningful "TRUSTED BY" badge grid in place of the 3D globe.
function buildCompanyList(exp) {
  const map = new Map();
  exp.forEach((e) => {
    if (!map.has(e.company)) {
      map.set(e.company, { name: e.company, location: e.location, count: 1 });
    } else {
      map.get(e.company).count += 1;
    }
  });
  return Array.from(map.values());
}

export default function Experience() {
  const companies = buildCompanyList(EXPERIENCE);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  useTitleReveal(titleRef);

  // GSAP timeline-draw: animate the vertical border + dot reveals as the user
  // scrolls through the experience section.
  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const line = root.querySelector("[data-timeline-line]");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          }
        );
      }
      gsap.utils.toArray("[data-timeline-dot]").forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: { trigger: dot, start: "top 85%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="relative px-6 md:px-12 py-24 md:py-36 border-t border-zinc-900"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-label">[ 03 / CAREER TRAJECTORY ]</span>
          <span className="flex-1 h-px bg-zinc-800" />
        </div>

        <h2
          ref={titleRef}
          className="font-display uppercase font-semibold text-white leading-[0.9] mb-12"
          style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}
        >
          A Decade of <span className="text-[#E5FE40]">Shipping</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left — Trusted-by company strip (sticky on desktop) */}
          <div
            className="lg:col-span-5 lg:sticky lg:top-24 self-start"
            data-testid="experience-companies"
          >
            <div className="brutal-box p-6 md:p-7">
              <div className="flex items-center justify-between mb-6">
                <div className="font-mono text-[10px] tracking-[0.3em] text-[#E5FE40]">
                  TRUSTED BY
                </div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">
                  {companies.length.toString().padStart(2, "0")} CLIENTS
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {companies.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    data-cursor="hover"
                    data-testid={`company-card-${i}`}
                    className="border border-zinc-800 hover:border-[#E5FE40] transition-colors p-3.5 min-h-[88px] flex flex-col justify-between group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {c.count > 1 && (
                        <span className="font-mono text-[9px] tracking-[0.2em] text-[#E5FE40] border border-[#E5FE40]/40 px-1.5 py-0.5">
                          ×{c.count}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-display uppercase font-semibold text-white text-sm leading-[1.05] group-hover:text-[#E5FE40] transition-colors">
                        {c.name}
                      </div>
                      <div className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 mt-1.5">
                        {c.location.toUpperCase()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-zinc-800 grid grid-cols-3 gap-3">
                <Mini label="YEARS" value="10+" />
                <Mini label="ROLES" value={EXPERIENCE.length} />
                <Mini label="STATES" value="6" accent />
              </div>
            </div>
          </div>

          {/* Right — timeline */}
          <div
            ref={timelineRef}
            className="lg:col-span-7 flex flex-col relative"
            data-testid="experience-timeline"
          >
            <span
              data-timeline-line
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-px bg-[#E5FE40]/30 pointer-events-none"
            />
            {EXPERIENCE.map((e, i) => (
              <motion.div
                key={`${e.company}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.04 }}
                className="relative border-l border-zinc-800 pl-8 pb-12 last:pb-0 group"
                data-testid={`experience-item-${i}`}
              >
                <span
                  data-timeline-dot
                  className="absolute -left-[6px] top-1 w-3 h-3 bg-[#E5FE40] group-hover:scale-150 transition-transform"
                />
                <div className="font-mono text-[11px] tracking-[0.25em] text-zinc-500 mb-2">
                  {e.period} · {e.location}
                </div>
                <h3
                  className="font-display uppercase font-semibold text-white leading-tight"
                  style={{ fontSize: "clamp(1.2rem, 2.2vw, 2rem)" }}
                >
                  {e.role}
                </h3>
                <div className="font-mono text-sm text-[#E5FE40] mt-1 mb-4 tracking-wider">
                  @ {e.company}
                </div>
                <ul className="space-y-2">
                  {e.bullets.map((b, idx) => (
                    <li
                      key={idx}
                      className="font-mono text-sm text-zinc-400 leading-relaxed flex gap-3"
                    >
                      <span className="text-zinc-700 shrink-0">→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Mini({ label, value, accent }) {
  return (
    <div>
      <div
        className={`font-display font-semibold leading-none ${
          accent ? "text-[#E5FE40]" : "text-white"
        }`}
        style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
      >
        {value}
      </div>
      <div className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 mt-1.5">
        {label}
      </div>
    </div>
  );
}
