import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, ArrowLeft, ArrowUpRight, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Cursor from "@/components/Cursor";
import Footer from "@/components/sections/Footer";
import LazyMount from "@/components/LazyMount";
import ResumeCanvas from "@/components/three/ResumeCanvas";
import { PROFILE, EXPERIENCE, SKILLS, CERTIFICATIONS, STATS } from "@/lib/data";
import { events } from "@/lib/analytics";
import { openCalendly } from "@/lib/calendly";

gsap.registerPlugin(ScrollTrigger);

// ── Experience entry ──────────────────────────────────────────────────────────
function ExpEntry({ entry, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, x: -28 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: "expo.out",
          delay: index * 0.08,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      className="border-b border-zinc-800 py-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 group"
      style={{ opacity: 0 }}
    >
      {/* Left: meta */}
      <div className="shrink-0">
        <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-600 mb-1">{entry.period}</div>
        <div className="font-mono text-[10px] tracking-[0.2em] text-zinc-500">{entry.location}</div>
      </div>

      {/* Right: content */}
      <div>
        <div className="font-display uppercase font-semibold text-white text-xl md:text-2xl leading-tight mb-1 group-hover:text-[#E5FE40] transition-colors">
          {entry.role}
        </div>
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#E5FE40] mb-4">{entry.company}</div>
        <ul className="space-y-1.5">
          {entry.bullets.map((b) => (
            <li key={b} className="font-mono text-xs text-zinc-400 leading-relaxed flex gap-3">
              <span className="text-[#E5FE40] shrink-0 mt-0.5">→</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ResumePage() {
  const heroRef = useRef(null);
  const summaryRef = useRef(null);

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
      { y: "0%", opacity: 1, duration: 0.95, ease: "expo.out", stagger: 0.14, delay: 0.35 }
    );
  }, []);

  useEffect(() => {
    const el = summaryRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Cursor />
      <Navigation />
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-screen bg-[#050505] flex flex-col justify-between overflow-hidden">
          <LazyMount className="absolute inset-0 z-0">
            <ResumeCanvas />
          </LazyMount>
          <div className="absolute inset-0 z-[1] pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.85) 100%)" }}
          />

          <div className="relative z-10 px-6 md:px-12 pt-32 pb-0 max-w-[1400px] mx-auto w-full">
            <div className="flex items-center gap-4 mb-10">
              <Link to="/" className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 hover:text-[#E5FE40] transition-colors flex items-center gap-2">
                <ArrowLeft size={10} />PORTFOLIO
              </Link>
              <span className="flex-1 h-px bg-zinc-800" />
              <span className="section-label">[ 00 / RESUME ]</span>
            </div>

            <div ref={heroRef} className="mb-10">
              <h1 className="font-display uppercase font-semibold leading-[0.85] mb-8"
                style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}>
                <span className="block overflow-hidden">
                  <span data-hero-line className="block text-white" style={{ display: "block" }}>CAREER</span>
                </span>
                <span className="block overflow-hidden">
                  <span data-hero-line className="block text-[#E5FE40]" style={{ display: "block" }}>PROFILE.</span>
                </span>
              </h1>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div>
                  <div className="font-display uppercase font-semibold text-white text-2xl leading-tight">{PROFILE.name}</div>
                  <div className="font-mono text-sm text-[#E5FE40] mt-1">{PROFILE.title}</div>
                  <div className="font-mono text-xs text-zinc-500 mt-1">{PROFILE.location} · {PROFILE.email}</div>
                </div>
                <div className="md:ml-auto shrink-0">
                  <a
                    href={PROFILE.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => events.resumeClick("resume-hero")}
                    className="btn-brutal inline-flex"
                  >
                    <Download size={14} strokeWidth={2.5} />
                    DOWNLOAD PDF
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Download strip at bottom of hero */}
          <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 pb-0">
            <div className="border border-zinc-800 bg-[#050505]/80 backdrop-blur-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[9px] tracking-[0.35em] text-zinc-600 mb-1">RESUME / 2026</div>
                <div className="font-display uppercase font-semibold text-white text-lg">Hanumanth Reddy Barla — AEM Full Stack Lead</div>
              </div>
              <div className="flex gap-3 shrink-0">
                <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer"
                  onClick={() => events.resumeClick("resume-strip")}
                  className="btn-brutal text-xs py-3 px-5">
                  <Download size={12} />PDF
                </a>
                <button type="button" onClick={() => openCalendly("resume")}
                  className="btn-brutal btn-brutal-outline text-xs py-3 px-5">
                  <ArrowUpRight size={12} />SCHEDULE CALL
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SUMMARY ── */}
        <section className="border-t border-zinc-900 bg-[#080808] px-6 md:px-12 py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="section-label">[ 01 / SUMMARY ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>
            <div
              ref={summaryRef}
              className="brutal-box p-8 md:p-12"
              style={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.35em] text-zinc-600 mb-6">QUICK FACTS</div>
                  <div className="space-y-4">
                    {STATS.map((s) => (
                      <div key={s.label} className="flex items-baseline gap-3">
                        <span className="font-display font-semibold text-[#E5FE40] text-2xl leading-none">{s.value}{s.suffix}</span>
                        <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] tracking-[0.35em] text-zinc-600 mb-4">ABOUT</div>
                  <p className="font-mono text-sm text-zinc-300 leading-[1.9]">{PROFILE.manifesto}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section className="border-t border-zinc-900 bg-[#050505] px-6 md:px-12 py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="section-label">[ 02 / EXPERIENCE ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>

            <h2 className="font-display uppercase font-semibold text-white leading-[0.9] mb-14"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
              10+ years. <span className="text-[#E5FE40]">Fortune 500 trust.</span>
            </h2>

            <div className="border-t border-zinc-800">
              {EXPERIENCE.map((entry, i) => (
                <ExpEntry key={`${entry.company}-${entry.period}`} entry={entry} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS SNAPSHOT ── */}
        <section className="border-t border-zinc-900 bg-[#080808] px-6 md:px-12 py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="section-label">[ 03 / SKILLS ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
              {SKILLS.map((group) => (
                <div key={group.category} className="bg-[#080808] p-6">
                  <h3 className="font-mono text-[10px] tracking-[0.3em] text-[#E5FE40] mb-4">{group.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="font-mono text-[9px] tracking-[0.1em] text-zinc-400 border border-zinc-800 px-2 py-0.5">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <Link to="/skills" className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 hover:text-[#E5FE40] transition-colors flex items-center gap-2 justify-end">
                VIEW FULL SKILLS PAGE <ArrowUpRight size={11} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section className="border-t border-zinc-900 bg-[#050505] px-6 md:px-12 py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="section-label">[ 04 / CERTIFICATIONS ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CERTIFICATIONS.map((c) => (
                <div key={c.title} className="brutal-box p-8 flex items-start gap-5 hover:border-[#E5FE40] transition-colors group">
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

        {/* ── DOWNLOAD CTA ── */}
        <section className="border-t border-zinc-900 bg-[#080808] px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="font-mono text-[9px] tracking-[0.4em] text-zinc-600 mb-6">FULL RESUME</div>
              <h2 className="font-display uppercase font-semibold text-white leading-[0.88]"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                Read the full<br />
                <span className="text-[#E5FE40]">career story.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => events.resumeClick("resume-cta")}
                className="btn-brutal"
              >
                <Download size={14} strokeWidth={2.5} />
                DOWNLOAD PDF RESUME
              </a>
              <button type="button" onClick={() => openCalendly("resume-cta")} className="btn-brutal btn-brutal-outline">
                <ArrowUpRight size={14} strokeWidth={2.5} />
                SCHEDULE A CALL
              </button>
              <Link to="/achievements" className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 hover:text-[#E5FE40] transition-colors flex items-center gap-2">
                VIEW ACHIEVEMENTS <ArrowUpRight size={11} />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
