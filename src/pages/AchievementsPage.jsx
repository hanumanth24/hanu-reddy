import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "motion/react";
import { Download, ArrowUpRight, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Cursor from "@/components/Cursor";
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
    <div ref={ref} className="border-r border-zinc-800 last:border-r-0 px-6 md:px-10 py-6 md:py-8 text-center flex-1">
      <div
        className="font-display font-semibold text-white leading-none mb-2"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
      >
        <span ref={numRef}>0</span>
        <span className="text-[#E5FE40]">{suffix}</span>
      </div>
      <div className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 uppercase">{label}</div>
    </div>
  );
}

// ── Achievement milestone card ────────────────────────────────────────────────
function MilestoneCard({ item, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="brutal-box p-6 md:p-8 flex flex-col gap-4 hover:border-zinc-600 transition-colors group"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[9px] tracking-[0.3em] px-2.5 py-1 border"
          style={{ color: item.color, borderColor: item.color + "44", background: item.color + "0f" }}
        >
          {item.tag}
        </span>
        <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-600">{item.year}</span>
      </div>

      <h3 className="font-display uppercase font-semibold text-white leading-tight text-xl md:text-2xl group-hover:text-[#E5FE40] transition-colors">
        {item.title}
      </h3>

      <p className="font-mono text-xs text-zinc-400 leading-relaxed">{item.detail}</p>

      <div className="mt-auto pt-3 border-t border-zinc-800 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
        <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-600">VERIFIED OUTCOME</span>
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
      className="border-r border-b border-zinc-800/60 p-6 md:p-10 flex flex-col justify-between min-h-[180px] md:min-h-[220px]"
    >
      <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-600">
        {String(index + 1).padStart(2, "0")} /
      </div>
      <div
        className="font-display font-semibold text-white leading-none"
        style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
      >
        <span ref={numRef}>0</span>
        <span className="text-[#E5FE40]">{stat.suffix}</span>
      </div>
      <div className="font-mono text-[11px] tracking-[0.25em] text-zinc-400">{stat.label}</div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AchievementsPage() {
  const heroTitleRef = useRef(null);
  const milestonesRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  // Hero title stagger reveal
  useEffect(() => {
    const el = heroTitleRef.current;
    if (!el) return;
    const words = el.querySelectorAll("[data-word]");
    gsap.fromTo(words,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.12, delay: 0.3 }
    );
  }, []);

  return (
    <>
      <Cursor />
      <Navigation />
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-screen bg-[#050505] flex flex-col justify-between overflow-hidden">
          <LazyMount className="absolute inset-0 z-0">
            <AchievementCanvas />
          </LazyMount>
          <div className="absolute inset-0 z-[1] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.25) 40%, rgba(5,5,5,0.85) 100%)" }}
          />

          <div className="relative z-10 px-6 md:px-12 pt-32 max-w-[1400px] mx-auto w-full">
            <div className="flex items-center gap-4 mb-10">
              <Link
                to="/"
                className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 hover:text-[#E5FE40] transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={10} />
                PORTFOLIO
              </Link>
              <span className="flex-1 h-px bg-zinc-800" />
              <span className="section-label">[ 00 / ACHIEVEMENTS ]</span>
            </div>

            <div ref={heroTitleRef} className="overflow-hidden">
              <h1
                className="font-display uppercase font-semibold leading-[0.85] mb-8"
                style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}
              >
                <span className="block overflow-hidden">
                  <span data-word className="block text-white" style={{ display: "block" }}>IMPACT</span>
                </span>
                <span className="block overflow-hidden">
                  <span data-word className="block text-[#E5FE40]" style={{ display: "block" }}>RECOGNIZED.</span>
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
            <div className="border border-zinc-800 bg-[#050505]/80 backdrop-blur-sm flex flex-wrap md:flex-nowrap divide-x-0 md:divide-x divide-zinc-800">
              <Counter value={10}  suffix="+"  label="YEARS IN AEM"        delay={0.5} />
              <Counter value={6}   suffix="+"  label="FORTUNE 500 CLIENTS" delay={0.65} />
              <Counter value={2}   suffix=""   label="ADOBE CERTIFICATIONS" delay={0.8} />
              <Counter value={50}  suffix="%"  label="PAGE LOAD GAINS"     delay={0.95} />
              <Counter value={40}  suffix="%"  label="BUFFER REDUCTION"    delay={1.1} />
            </div>
          </div>
        </section>

        {/* ── MILESTONES ── */}
        <section className="relative px-6 md:px-12 py-24 md:py-36 border-t border-zinc-900 bg-[#080808]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="section-label">[ 01 / CAREER MILESTONES ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>

            <h2
              className="font-display uppercase font-semibold text-white leading-[0.9] mb-14"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              Shipped. <span className="text-[#E5FE40]">Measured. Repeated.</span>
            </h2>

            <div
              ref={milestonesRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800"
            >
              {ACHIEVEMENTS.map((item, i) => (
                <div key={item.title} className="bg-[#080808]">
                  <MilestoneCard item={item} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IMPACT NUMBERS ── */}
        <section className="relative px-6 md:px-12 py-24 border-t border-zinc-900 bg-[#050505]">
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
        <section className="border-t border-zinc-900 bg-[#0a0a0a] px-6 md:px-12 py-16">
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
            <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 text-right shrink-0">
              SINCE 2016
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-zinc-900 bg-[#050505] px-6 md:px-12 py-24 md:py-32">
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
