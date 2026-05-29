import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE, CERTIFICATIONS } from "@/lib/data";
import { ShieldCheck, BadgeCheck } from "lucide-react";
import { useInView } from "motion/react";
import ProfilePicCanvas from "@/components/three/ProfilePicCanvas";
import LazyMount from "@/components/LazyMount";

const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

gsap.registerPlugin(ScrollTrigger);

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./";

const CLIENTS = [
  { name: "HD SUPPLY", note: "ATL · COMMERCE" },
  { name: "AMERICAN EXPRESS", note: "NYC · FINTECH" },
  { name: "VERIZON", note: "DAL · TELECOM" },
  { name: "CUMMINS", note: "IND · INDUSTRIAL" },
];

// ── Text scramble helper ──────────────────────────────────────────────────────
function scrambleTo(el, final, duration = 1.2) {
  const len = final.length;
  const proxy = { p: 0 };
  gsap.to(proxy, {
    p: 1,
    duration,
    ease: "power2.out",
    onUpdate() {
      const decoded = Math.floor(proxy.p * len);
      el.textContent = final
        .split("")
        .map((ch, i) => {
          if (ch === " " || ch === "." || ch === "_") return ch;
          if (i < decoded) return ch;
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join("");
    },
    onComplete() { el.textContent = final; },
  });
}

// ── Animated stat counter ─────────────────────────────────────────────────────
function AnimatedStat({ num, suffix, label, accent }) {
  const numRef = useRef(null);
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: num,
      duration: 1.8,
      ease: "power3.out",
      onUpdate() { if (numRef.current) numRef.current.textContent = Math.floor(proxy.val); },
      onComplete() { if (numRef.current) numRef.current.textContent = num; },
    });
  }, [inView, num]);

  return (
    <div
      ref={wrapRef}
      className="border-r border-b border-zinc-800 p-4 md:p-5 min-h-[100px] flex flex-col justify-between"
    >
      <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">/</div>
      <div
        className={`font-display font-semibold leading-none ${accent ? "text-[#E5FE40]" : "text-white"}`}
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
      >
        <span ref={numRef}>0</span>
        <span>{suffix}</span>
      </div>
      <div className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-zinc-400">{label}</div>
    </div>
  );
}

// ── Magnetic client card ──────────────────────────────────────────────────────
function MagneticCard({ children }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * 0.18,
      y: (e.clientY - r.top - r.height / 2) * 0.18,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const onLeave = () =>
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
    >
      {children}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function About() {
  const mouse = useRef({ x: 0, y: 0 });

  // Refs for GSAP
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const picWrapRef = useRef(null);
  const borderTopRef = useRef(null);
  const borderRightRef = useRef(null);
  const nameTagRef = useRef(null);
  const availRef = useRef(null);
  const headingRef = useRef(null);
  const word1Ref = useRef(null);
  const word2Ref = useRef(null);
  const word3Ref = useRef(null);
  const manifestoRef = useRef(null);
  const sectionLineRef = useRef(null);
  const certLabelRef = useRef(null);
  const certItemsRef = useRef(null);

  // ── Mouse tracking + parallax ──────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;

      // Parallax: left col drifts opposite to right col
      gsap.to(leftColRef.current, {
        x: mouse.current.x * 10,
        y: mouse.current.y * 6,
        duration: 0.9,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(rightColRef.current, {
        x: mouse.current.x * -5,
        y: mouse.current.y * -3,
        duration: 1.1,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Profile pic: clip-path wipe + borders + badges ────────────────────────
  useEffect(() => {
    const wrap = picWrapRef.current;
    if (!wrap) return;
    const ctx = gsap.context(() => {
      // Clip wipe up
      gsap.fromTo(wrap,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: wrap, start: "top 80%", once: true },
        }
      );

      // Borders + labels sequential
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap, start: "top 80%", once: true },
        delay: 0.8,
      });
      tl.fromTo(borderTopRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "expo.out", transformOrigin: "left center" })
        .fromTo(borderRightRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: "expo.out", transformOrigin: "top center" }, "-=0.4")
        .fromTo([nameTagRef.current, availRef.current], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.14, ease: "expo.out" }, "-=0.3");
    });
    return () => ctx.revert();
  }, []);

  // ── Heading scramble on scroll ────────────────────────────────────────────
  useEffect(() => {
    const words = [
      { ref: word1Ref, text: "Engineer." },
      { ref: word2Ref, text: "Architect." },
      { ref: word3Ref, text: "Translator." },
    ];
    const triggers = [];
    words.forEach(({ ref, text }, i) => {
      const st = ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          setTimeout(() => ref.current && scrambleTo(ref.current, text, 1.0), i * 220);
        },
      });
      triggers.push(st);
    });
    return () => triggers.forEach((st) => st.kill());
  }, []);

  // ── Manifesto paragraph: word-by-word slide reveal ────────────────────────
  useEffect(() => {
    const para = manifestoRef.current;
    if (!para) return;

    const rawText = PROFILE.manifesto;
    // Wrap each word in a clip-reveal span
    para.innerHTML = rawText
      .split(" ")
      .map(
        (word) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span data-word-inner style="display:inline-block">${word}</span></span> `
      )
      .join("");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        para.querySelectorAll("[data-word-inner]"),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.55,
          ease: "expo.out",
          stagger: 0.022,
          scrollTrigger: { trigger: para, start: "top 82%", once: true },
        }
      );
    }, para);
    return () => ctx.revert();
  }, []);

  // ── Section label line draw ───────────────────────────────────────────────
  useEffect(() => {
    const line = sectionLineRef.current;
    if (!line) return;
    gsap.fromTo(line,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1, duration: 1.0, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
      }
    );
  }, []);

  // ── "ADOBE CERTIFIED" label CRT flicker ──────────────────────────────────
  useEffect(() => {
    const label = certLabelRef.current;
    if (!label) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: label,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          [0, 80, 160, 290, 400].forEach((ms) => {
            tl.to(label, { opacity: 0, duration: 0.05 }, ms / 1000)
              .to(label, { opacity: 1, duration: 0.05 });
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // ── Cert items: left-wipe clip reveal ────────────────────────────────────
  useEffect(() => {
    const container = certItemsRef.current;
    if (!container) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        container.querySelectorAll("[data-cert-row]"),
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 0.65,
          ease: "expo.out",
          stagger: 0.15,
          scrollTrigger: { trigger: container, start: "top 80%", once: true },
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-testid="about-section"
      className="relative px-6 md:px-12 py-24 md:py-36 border-t border-zinc-900 overflow-hidden"
    >
      {/* Subtle grid noise */}
      <div className="absolute inset-0 grid-noise opacity-[0.04] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Section label with animated line */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">[ 01 / MANIFESTO ]</span>
          <span
            ref={sectionLineRef}
            className="flex-1 h-px bg-zinc-800"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── Left: Profile pic ──────────────────────────────────────────── */}
          <div ref={leftColRef} className="lg:col-span-4">
            <div className="relative">
              {/* Yellow accent borders */}
              <div ref={borderTopRef} className="absolute -top-3 -left-3 right-6 h-px bg-[#E5FE40] z-10" style={{ transform: "scaleX(0)", transformOrigin: "left center" }} />
              <div ref={borderRightRef} className="absolute -top-3 -right-0 bottom-6 w-px bg-[#E5FE40] z-10" style={{ transform: "scaleY(0)", transformOrigin: "top center" }} />

              {/* Three.js profile canvas */}
              <div
                ref={picWrapRef}
                className="relative border border-zinc-800 overflow-hidden"
                style={{ aspectRatio: "4/5", clipPath: "inset(0 0 100% 0)" }}
              >
                {/* Instant blur-up placeholder — always present, painted over by canvas */}
                <img
                  src="/hanu.webp"
                  alt="Hanumanth Reddy Barla"
                  fetchpriority="high"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={isMobile ? {} : { filter: "blur(0px)" }}
                />

                {/* 3-D distortion canvas — desktop only */}
                {!isMobile && (
                  <LazyMount className="absolute inset-0">
                    <ProfilePicCanvas mouse={mouse} />
                  </LazyMount>
                )}

                {/* Name overlay */}
                <div
                  ref={nameTagRef}
                  className="absolute bottom-0 left-0 right-0 p-5 z-10"
                  style={{ background: "linear-gradient(to top, rgba(5,5,5,0.94) 60%, transparent)", opacity: 0 }}
                >
                  <div className="font-display font-semibold uppercase text-white text-lg leading-tight">
                    HANUMANTH REDDY BARLA
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 mt-1">
                    SR. RT-CDP ARCHITECT & AEP LEAD
                  </div>
                </div>
              </div>

              {/* Available badge */}
              <div ref={availRef} className="flex items-center gap-3 mt-4" style={{ opacity: 0 }}>
                <span className="w-1.5 h-1.5 bg-[#E5FE40] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400">
                  AVAILABLE FOR PROJECTS — 2026
                </span>
              </div>

              {/* GSAP-animated stat strip */}
              <div className="grid grid-cols-3 border-l border-t border-zinc-800 mt-6">
                <AnimatedStat num={10} suffix="+" label="YEARS" />
                <AnimatedStat num={7} suffix="" label="ENGAGEMENTS" />
                <AnimatedStat num={4} suffix="" label="F500 CLIENTS" accent />
              </div>
            </div>
          </div>

          {/* ── Right: Content ─────────────────────────────────────────────── */}
          <div ref={rightColRef} className="lg:col-span-8 space-y-10">

            {/* Scramble heading */}
            <div>
              <h2
                ref={headingRef}
                className="font-display uppercase font-semibold text-white leading-[0.9] mb-8"
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
              >
                <span ref={word1Ref} className="block">Engineer.</span>
                <span ref={word2Ref} className="block">Architect.</span>
                <span ref={word3Ref} className="block text-[#E5FE40]">Translator.</span>
              </h2>

              {/* Word-by-word manifesto */}
              <p
                ref={manifestoRef}
                className="font-mono text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl"
              >
                {PROFILE.manifesto}
              </p>
            </div>

            {/* Meta grid — slide-in from below */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "ROLE", value: "SR AEM LEAD" },
                { label: "CERTIFIED", value: "AJO · RT-CDP", accent: true },
                { label: "STACK", value: "AEM · REACT · AEP" },
                { label: "EDUCATION", value: "MS / UM-FLINT" },
              ].map((m, i) => (
                <div
                  key={m.label}
                  className="brutal-box p-4"
                  style={{ opacity: 0, transform: "translateY(20px)" }}
                  ref={(el) => {
                    if (!el) return;
                    gsap.to(el, {
                      opacity: 1,
                      y: 0,
                      duration: 0.55,
                      ease: "expo.out",
                      delay: i * 0.08,
                      scrollTrigger: { trigger: el, start: "top 88%", once: true },
                    });
                  }}
                >
                  <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">{m.label}</div>
                  <div className={`font-mono text-sm mt-2 ${m.accent ? "text-[#E5FE40]" : "text-white"}`}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Adobe Certifications with CRT flicker label + clip-wipe items */}
            <div className="brutal-box p-6 md:p-7">
              <div className="flex items-center justify-between mb-5">
                <div
                  ref={certLabelRef}
                  className="font-mono text-[10px] tracking-[0.3em] text-[#E5FE40]"
                >
                  ADOBE CERTIFIED PROFESSIONAL
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-zinc-500">
                  <span className="w-1.5 h-1.5 bg-[#E5FE40] animate-pulse" />
                  ACTIVE
                </div>
              </div>
              <div ref={certItemsRef} className="space-y-3">
                {CERTIFICATIONS.map((c, i) => (
                  <div
                    key={c.title}
                    data-cert-row
                    data-testid={`about-cert-${i}`}
                    className="flex items-start gap-4 py-3 border-t border-zinc-800 first:border-t-0"
                    style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                  >
                    <div className="w-10 h-10 border border-zinc-700 flex items-center justify-center shrink-0">
                      <BadgeCheck size={18} strokeWidth={1.7} className="text-[#E5FE40]" />
                    </div>
                    <div>
                      <div className="font-display uppercase font-semibold text-white text-base leading-tight">
                        {c.title.replace("Adobe ", "").replace(" — Business Practitioner", "")}
                      </div>
                      <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 mt-1.5">
                        BUSINESS PRACTITIONER
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fortune 500 — magnetic cards */}
            <div className="brutal-box p-6 md:p-7">
              <div className="flex items-center justify-between mb-5">
                <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-400">
                  FORTUNE 500 / TRUSTED BY
                </div>
                <ShieldCheck size={14} strokeWidth={1.7} className="text-zinc-600" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {CLIENTS.map((c, i) => (
                  <MagneticCard key={c.name}>
                    <div
                      className="border border-zinc-800 hover:border-[#E5FE40] transition-colors p-3 min-h-[78px] flex flex-col justify-between group"
                      style={{ opacity: 0 }}
                      ref={(el) => {
                        if (!el) return;
                        gsap.to(el, {
                          opacity: 1,
                          duration: 0.5,
                          delay: 0.1 + i * 0.1,
                          ease: "expo.out",
                          scrollTrigger: { trigger: el, start: "top 88%", once: true },
                        });
                      }}
                    >
                      <div className="font-display uppercase font-semibold text-white text-sm leading-[1.05] group-hover:text-[#E5FE40] transition-colors">
                        {c.name}
                      </div>
                      <div className="font-mono text-[9px] tracking-[0.2em] text-zinc-500">{c.note}</div>
                    </div>
                  </MagneticCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
