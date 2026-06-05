import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, ArrowLeft, ArrowUpRight, Award, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Cursor from "@/components/Cursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/sections/Footer";
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
          delay: index * 0.07,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      className="border-b border-zinc-800 py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 group"
      style={{ opacity: 0 }}
    >
      <div className="shrink-0">
        <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-600 mb-1">{entry.period}</div>
        <div className="font-mono text-[10px] tracking-[0.2em] text-zinc-500">{entry.location}</div>
      </div>
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
  const cardRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  // Title lines fly up
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll("[data-hero-line]"),
      { y: "108%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, ease: "expo.out", stagger: 0.13, delay: 0.3 }
    );
  }, []);

  // Contact card slides in from right
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, x: 32 },
      { opacity: 1, x: 0, duration: 0.85, ease: "expo.out", delay: 0.55 }
    );
  }, []);

  // Stats strip stagger
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll("[data-stat]"),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: "expo.out", stagger: 0.08, delay: 0.8 }
    );
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <Cursor />
      <Navigation />
      <main>

        {/* ── HERO ── */}
        <section className="relative bg-[#050505] overflow-hidden">
          {/* Grid noise */}
          <div className="absolute inset-0 grid-noise opacity-[0.035] pointer-events-none" />
          {/* Accent glow */}
          <div className="absolute top-0 left-0 w-[60vw] h-[60vh] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(229,254,64,0.04) 0%, transparent 65%)" }} />

          <div className="relative z-10 px-6 md:px-12 pt-32 pb-0 max-w-[1500px] mx-auto w-full">

            {/* Breadcrumb */}
            <div className="flex items-center gap-4 mb-14">
              <Link to="/" className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 hover:text-[#E5FE40] transition-colors flex items-center gap-2">
                <ArrowLeft size={10} /> PORTFOLIO
              </Link>
              <span className="flex-1 h-px bg-zinc-800" />
              <span className="section-label">[ 00 / RESUME ]</span>
            </div>

            {/* ── Split layout: title + card ── */}
            <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px] gap-10 xl:gap-16 items-start mb-0">

              {/* Left — display title */}
              <div>
                <h1
                  className="font-display uppercase font-semibold leading-[0.82] mb-8"
                  style={{ fontSize: "clamp(3.5rem, 9.5vw, 10rem)" }}
                >
                  <span className="block overflow-hidden">
                    <span data-hero-line className="block text-white">CAREER</span>
                  </span>
                  <span className="block overflow-hidden">
                    <span data-hero-line className="block" style={{ color: "#E5FE40" }}>PROFILE.</span>
                  </span>
                </h1>

                <p
                  data-hero-line
                  className="font-mono text-zinc-500 leading-[1.9] max-w-lg overflow-hidden"
                  style={{ fontSize: "clamp(0.7rem, 1vw, 0.85rem)", letterSpacing: "0.12em" }}
                >
                  10+ YEARS · AEM-RTCDP LEAD · FORTUNE 500
                  <br />RT-CDP · AJO · CJA · MARKETO · SALESFORCE · AEM CLOUD
                </p>
              </div>

              {/* Right — contact card */}
              <div
                ref={cardRef}
                className="border border-zinc-800 bg-[#080808] flex flex-col"
                style={{ opacity: 0 }}
              >
                {/* Card header */}
                <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
                  <span className="font-mono text-[8px] tracking-[0.35em] text-zinc-600">CONTACT CARD</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40] animate-pulse" />
                </div>

                {/* Name block */}
                <div className="px-6 pt-6 pb-5 border-b border-zinc-800">
                  <div
                    className="font-display uppercase font-semibold text-white leading-tight mb-1"
                    style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
                  >
                    {PROFILE.name}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-[#E5FE40]">
                    {PROFILE.title}
                  </div>
                </div>

                {/* Contact rows */}
                <div className="flex flex-col divide-y divide-zinc-800">
                  {[
                    { icon: MapPin,   value: PROFILE.location,  label: "LOCATION" },
                    { icon: Mail,     value: PROFILE.email,     label: "EMAIL" },
                    { icon: Phone,    value: PROFILE.phone,     label: "PHONE" },
                  ].map(({ icon: Icon, value, label }) => (
                    <div key={label} className="flex items-center gap-4 px-6 py-3.5">
                      <Icon size={12} className="text-zinc-600 shrink-0" strokeWidth={1.5} />
                      <div className="min-w-0">
                        <div className="font-mono text-[7px] tracking-[0.3em] text-zinc-700 mb-0.5">{label}</div>
                        <div className="font-mono text-[11px] text-zinc-300 truncate">{value}</div>
                      </div>
                    </div>
                  ))}

                  {/* LinkedIn */}
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#0d0d0d] transition-colors group"
                  >
                    <ExternalLink size={12} className="text-zinc-600 group-hover:text-[#E5FE40] shrink-0 transition-colors" strokeWidth={1.5} />
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[7px] tracking-[0.3em] text-zinc-700 mb-0.5">LINKEDIN</div>
                      <div className="font-mono text-[11px] text-zinc-300 truncate">in/hanu-reddy-8b04b7167</div>
                    </div>
                    <ArrowUpRight size={10} className="text-zinc-700 group-hover:text-[#E5FE40] transition-colors shrink-0" />
                  </a>
                </div>

                {/* Download CTA */}
                <div className="px-6 py-5 mt-auto border-t border-zinc-800 flex gap-3">
                  <a
                    href={PROFILE.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => events.resumeClick("resume-hero")}
                    className="btn-brutal flex-1 justify-center text-center"
                  >
                    <Download size={13} strokeWidth={2.5} />
                    DOWNLOAD PDF
                  </a>
                  <button
                    type="button"
                    onClick={() => openCalendly("resume-hero")}
                    className="btn-brutal btn-brutal-outline px-4"
                    title="Schedule a call"
                  >
                    <ArrowUpRight size={13} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats strip ── */}
          <div ref={statsRef} className="relative z-10 max-w-[1500px] mx-auto w-full px-6 md:px-12 mt-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border border-zinc-800 bg-[#080808]">
              {[
                { value: "10+", label: "YRS EXPERIENCE" },
                { value: "6+",  label: "FORTUNE 500" },
                { value: "2",   label: "ADOBE CERTS" },
                { value: "50%", label: "PAGE LOAD GAIN" },
                { value: "25%", label: "ENGAGEMENT UPLIFT" },
              ].map((s) => (
                <div
                  key={s.label}
                  data-stat
                  className="px-6 py-5 border-r border-zinc-800 last:border-r-0 flex flex-col gap-1"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="font-display font-semibold text-[#E5FE40] leading-none"
                    style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)" }}
                  >
                    {s.value}
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-600">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade into next section */}
          <div className="h-20 md:h-28" />
        </section>

        {/* ── SUMMARY ── */}
        <section className="border-t border-zinc-900 bg-[#080808] px-6 md:px-12 py-24">
          <div className="max-w-[1500px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="section-label">[ 01 / SUMMARY ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 border border-zinc-800 bg-[#050505] p-8 md:p-12">
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
        </section>

        {/* ── EXPERIENCE ── */}
        <section className="border-t border-zinc-900 bg-[#050505] px-6 md:px-12 py-24">
          <div className="max-w-[1500px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="section-label">[ 02 / EXPERIENCE ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>
            <h2
              className="font-display uppercase font-semibold text-white leading-[0.9] mb-14"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
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
          <div className="max-w-[1500px] mx-auto">
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
            <div className="mt-5 text-right">
              <Link to="/skills" className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 hover:text-[#E5FE40] transition-colors inline-flex items-center gap-2">
                VIEW FULL SKILLS PAGE <ArrowUpRight size={11} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section className="border-t border-zinc-900 bg-[#050505] px-6 md:px-12 py-24">
          <div className="max-w-[1500px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="section-label">[ 04 / CERTIFICATIONS ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
              {CERTIFICATIONS.map((c) => (
                <div
                  key={c.title}
                  className="bg-[#050505] p-8 flex items-start gap-5 hover:bg-[#0a0a0a] transition-colors group"
                >
                  <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-[#E5FE40] transition-colors">
                    <Award size={20} strokeWidth={1.5} className="text-[#E5FE40]" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.3em] text-zinc-600 mb-2">{c.issuer}</div>
                    <div className="font-display uppercase font-semibold text-white text-xl leading-tight group-hover:text-[#E5FE40] transition-colors">
                      {c.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOWNLOAD CTA ── */}
        <section className="border-t border-zinc-900 bg-[#080808] px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="font-mono text-[9px] tracking-[0.4em] text-zinc-600 mb-6">FULL RESUME</div>
              <h2
                className="font-display uppercase font-semibold text-white leading-[0.88]"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
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
              <Link to="/achievements" className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 hover:text-[#E5FE40] transition-colors inline-flex items-center gap-2">
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
