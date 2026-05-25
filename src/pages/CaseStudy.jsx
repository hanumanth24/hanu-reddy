import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Download, Calendar } from "lucide-react";
import { PROJECTS, PROFILE } from "@/lib/data";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { events } from "@/lib/analytics";
import { openCalendly } from "@/lib/calendly";

export default function CaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];
  const prev = index > 0 ? PROJECTS[index - 1] : PROJECTS[PROJECTS.length - 1];
  const next =
    index < PROJECTS.length - 1 ? PROJECTS[index + 1] : PROJECTS[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <div className="font-mono text-[11px] tracking-[0.3em] text-[#E5FE40] mb-4">
            404 / NOT FOUND
          </div>
          <h1 className="font-display uppercase font-semibold text-4xl mb-6">
            Case study not found.
          </h1>
          <Link to="/" className="btn-brutal" data-testid="not-found-back">
            <ArrowLeft size={14} /> BACK TO PORTFOLIO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <Cursor />
      <main
        data-testid="case-study-page"
        className="relative min-h-screen bg-[#050505] text-white pb-24"
      >
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-zinc-900">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
            <Link
              to="/"
              data-testid="case-back-btn"
              className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-zinc-300 hover:text-[#E5FE40] transition-colors"
            >
              <ArrowLeft size={14} />
              BACK TO PORTFOLIO
            </Link>
            <div className="hidden md:flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-zinc-500">
              <span className="w-1.5 h-1.5 bg-[#E5FE40]" />
              CASE {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-12 pt-16 md:pt-24">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="font-mono text-[11px] tracking-[0.3em] text-[#E5FE40]">
                {project.code}
              </span>
              <span className="flex-1 h-px bg-zinc-800" />
              <span className="font-mono text-[11px] tracking-[0.3em] text-zinc-500">
                {project.client.toUpperCase()} · {project.period}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              data-testid="case-title"
              className="font-display uppercase font-semibold text-white leading-[0.88] mb-10"
              style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-base md:text-lg text-zinc-300 max-w-3xl leading-relaxed"
            >
              <span className="text-[#E5FE40]">// </span>
              {project.summary}
            </motion.p>
          </div>
        </section>

        {/* Image */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="px-6 md:px-12 mt-16"
        >
          <div className="max-w-[1600px] mx-auto brutal-box overflow-hidden">
            <div className="aspect-[21/9] relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
            </div>
          </div>
        </motion.section>

        {/* Meta strip */}
        <section className="px-6 md:px-12 mt-12">
          <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 border-l border-t border-zinc-800">
            <MetaBox label="CLIENT" value={project.client} />
            <MetaBox label="ROLE" value={project.role} />
            <MetaBox label="PERIOD" value={project.period} />
            <MetaBox
              label="STACK"
              value={`${project.stack.length} TECHNOLOGIES`}
              accent
            />
          </div>
        </section>

        {/* Problem + Solution */}
        <section className="px-6 md:px-12 mt-24">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Block label="[ THE PROBLEM ]" title="What we were up against.">
              {project.problem}
            </Block>
            <Block
              label="[ THE SOLUTION ]"
              title="What we built."
              accent
            >
              {project.solution}
            </Block>
          </div>
        </section>

        {/* Architecture */}
        <section className="px-6 md:px-12 mt-24">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <span className="section-label">[ ARCHITECTURE ]</span>
              <span className="flex-1 h-px bg-zinc-800" />
            </div>
            <h2
              className="font-display uppercase font-semibold text-white leading-[0.9] mb-12"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 4rem)" }}
            >
              How it's <span className="text-[#E5FE40]">wired.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-zinc-800">
              {project.architecture.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  data-testid={`arch-${i}`}
                  className="border-r border-b border-zinc-800 p-6 md:p-8 min-h-[180px] flex flex-col justify-between"
                >
                  <div className="font-mono text-[10px] tracking-[0.3em] text-[#E5FE40]">
                    {String(i + 1).padStart(2, "0")} /
                  </div>
                  <div className="font-mono text-base text-white leading-relaxed">
                    {item}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics + Stack */}
        <section className="px-6 md:px-12 mt-24">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-10">
                <span className="section-label">[ IMPACT ]</span>
                <span className="flex-1 h-px bg-zinc-800" />
              </div>
              <div className="grid grid-cols-2 border-l border-t border-zinc-800">
                {project.metricsDetail.map((m, i) => (
                  <div
                    key={i}
                    data-testid={`case-metric-${i}`}
                    className="border-r border-b border-zinc-800 p-6 md:p-8 min-h-[160px] flex flex-col justify-between"
                  >
                    <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">
                      {String(i + 1).padStart(2, "0")} /
                    </div>
                    <div
                      className="font-display font-semibold text-[#E5FE40] leading-none"
                      style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                    >
                      {m.value}
                    </div>
                    <div className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-zinc-400">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-10">
                <span className="section-label">[ STACK ]</span>
                <span className="flex-1 h-px bg-zinc-800" />
              </div>
              <div className="brutal-box p-6 md:p-8">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      data-cursor="hover"
                      className="brutal-tag text-zinc-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 mt-32">
          <div className="max-w-[1600px] mx-auto brutal-box p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#E5FE40] mb-5">
                → WANT THIS FOR YOUR STACK?
              </div>
              <h3
                className="font-display uppercase font-semibold text-white leading-[0.9]"
                style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}
              >
                Let's get on a call.
              </h3>
            </div>
            <div className="lg:col-span-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openCalendly(`case:${slug}`)}
                data-testid="case-calendly-btn"
                className="btn-brutal"
              >
                <Calendar size={14} strokeWidth={2.5} />
                BOOK A CALL
              </button>
              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => events.resumeClick(`case:${slug}`)}
                data-testid="case-resume-btn"
                className="btn-brutal btn-brutal-outline"
              >
                <Download size={14} strokeWidth={2.5} />
                RESUME
              </a>
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        <section className="px-6 md:px-12 mt-24">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <NavCard
              dir="prev"
              project={prev}
              onClick={() => {
                events.caseNav(slug, prev.slug, "prev");
                navigate(`/work/${prev.slug}`);
              }}
            />
            <NavCard
              dir="next"
              project={next}
              onClick={() => {
                events.caseNav(slug, next.slug, "next");
                navigate(`/work/${next.slug}`);
              }}
            />
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}

function MetaBox({ label, value, accent }) {
  return (
    <div className="border-r border-b border-zinc-800 p-6 min-h-[110px] flex flex-col justify-between">
      <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">
        {label}
      </div>
      <div
        className={`font-mono text-sm md:text-base ${
          accent ? "text-[#E5FE40]" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Block({ label, title, children, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="brutal-box p-8 md:p-12"
    >
      <div
        className={`font-mono text-[10px] tracking-[0.3em] mb-6 ${
          accent ? "text-[#E5FE40]" : "text-zinc-500"
        }`}
      >
        {label}
      </div>
      <h3
        className="font-display uppercase font-semibold text-white leading-[0.95] mb-6"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
      >
        {title}
      </h3>
      <p className="font-mono text-sm md:text-base text-zinc-300 leading-relaxed">
        {children}
      </p>
    </motion.div>
  );
}

function NavCard({ dir, project, onClick }) {
  const isPrev = dir === "prev";
  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      data-testid={`case-nav-${dir}`}
      className={`brutal-box p-8 group hover:border-[#E5FE40] transition-colors text-left ${
        isPrev ? "" : "md:text-right"
      }`}
    >
      <div
        className={`font-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-4 flex items-center gap-2 ${
          isPrev ? "" : "md:justify-end"
        }`}
      >
        {isPrev && <ArrowLeft size={12} />}
        {isPrev ? "PREVIOUS CASE" : "NEXT CASE"}
        {!isPrev && <ArrowUpRight size={12} />}
      </div>
      <div className="font-mono text-[10px] tracking-[0.3em] text-[#E5FE40] mb-2">
        {project.code}
      </div>
      <div
        className="font-display uppercase font-semibold text-white group-hover:text-[#E5FE40] transition-colors leading-tight"
        style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)" }}
      >
        {project.title}
      </div>
    </button>
  );
}
