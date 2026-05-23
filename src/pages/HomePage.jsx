import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { certifications, metrics } from "../data/index.js";
import { openResume } from "../utils/resume.js";

const rotatingPhrases = [
  "Enterprise Architecture",
  "Adobe Experience Cloud",
  "React Engineering",
  "Cloud Platforms",
  "AI-Driven Systems",
  "Experimentation Platforms",
  "Headless CMS",
  "Martech Systems",
];

const companies = ["HD Supply", "American Express", "Verizon", "PeakActivity", "Cummins"];

const stack = [
  { label: "Content Management", value: "AEM Cloud · Edge Delivery", color: "#9f1f2a" },
  { label: "Data Platform",       value: "AEP · Real-Time CDP",       color: "#4d7a69" },
  { label: "Journey Layer",       value: "AJO · Offer Decisioning",   color: "#a86f25" },
  { label: "Frontend Delivery",   value: "React · SPA Editor",        color: "#9f1f2a" },
];

const deliveryFlow = [
  { title: "AEM Cloud", detail: "Authoring models, components and content architecture" },
  { title: "Edge Delivery", detail: "Fast page delivery with clean publishing paths" },
  { title: "Dispatcher + CDN", detail: "Caching, routing and Core Web Vitals tuning" },
  { title: "AEP + AJO", detail: "Profile data, journeys and decisioning activation" },
  { title: "React Experience", detail: "Modern UI delivery with measurable performance" },
];

const metricDetails = [
  {
    visual: "10+",
    visualLabel: "years",
    focus: "Enterprise delivery depth",
    nodes: ["AEM", "Cloud", "Lead", "Scale"],
    theme: "experience",
    ringLabels: ["Architecture", "Delivery", "Leadership"],
    points: [
      "Led AEM delivery across enterprise environments",
      "Partnered with product, authoring and release teams",
      "Balanced frontend, backend and platform ownership",
    ],
  },
  {
    visual: "50%",
    visualLabel: "faster loads",
    focus: "Page performance",
    nodes: ["EDS", "CDN", "Cache", "CWV"],
    theme: "speed",
    ringLabels: ["Edge", "Cache", "Vitals"],
    points: [
      "Optimized AEM Cloud and Edge Delivery patterns",
      "Improved Dispatcher and CDN cache behavior",
      "Reduced page weight through delivery best practices",
    ],
  },
  {
    visual: "30%",
    visualLabel: "lower latency",
    focus: "Runtime tuning",
    nodes: ["Route", "CDN", "Origin", "Assets"],
    theme: "latency",
    ringLabels: ["Route", "Origin", "Assets"],
    points: [
      "Tuned CDN routing and asset delivery paths",
      "Reduced unnecessary origin traffic",
      "Improved enterprise site response consistency",
    ],
  },
  {
    visual: "F500",
    visualLabel: "delivery",
    focus: "Enterprise scale",
    nodes: ["HD", "Amex", "VZ", "CX"],
    theme: "enterprise",
    ringLabels: ["Clients", "Teams", "Scale"],
    points: [
      "Delivered for Fortune 500 product teams",
      "Supported regulated and high-traffic experiences",
      "Worked across commerce, telecom and finance domains",
    ],
  },
];

const impactMetrics = metrics.map((metric, index) => ({
  ...metric,
  ...metricDetails[index],
}));

export default function HomePage() {
  const navigate = useNavigate();
  const [activeMetric, setActiveMetric]   = useState(1);
  const [flippedMetric, setFlippedMetric] = useState(null);
  const [phraseIndex, setPhraseIndex]     = useState(0);
  const activeImpact = impactMetrics[activeMetric];

  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % rotatingPhrases.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="home-dark">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-dark">
        <div className="hero-dark-bg" aria-hidden="true" />
        <div className="hero-signal-field" aria-hidden="true">
          <span className="signal-line signal-line-one" />
          <span className="signal-line signal-line-two" />
          <span className="signal-line signal-line-three" />
        </div>

        {/* Left: copy */}
        <div className="hero-dark-left">
          <motion.div
            className="hero-avail"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="avail-dot" />
            Available for Senior Roles
          </motion.div>

          <motion.span
            className="hero-dark-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Adobe Experience Cloud Engineer
          </motion.span>

          {/* Rotating expertise label */}
          <div className="hero-rotate-wrap" aria-live="polite" aria-label="Current expertise">
            <span className="hero-rotate-prefix">—</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                className="hero-rotate-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32 }}
              >
                {rotatingPhrases[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.h1
            className="hero-dark-h1"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
          >
            Senior AEM<br />
            <em>Full Stack</em><br />
            Lead.
          </motion.h1>

          <motion.p
            className="hero-dark-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Architecting scalable, high-performance Adobe Experience Cloud
            solutions that drive growth and measurable business impact.
          </motion.p>

          <motion.div
            className="hero-dark-ctas"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.44 }}
          >
            <button type="button" onClick={() => navigate("/contact")} className="hd-btn-primary button-reset">
              Let's Connect →
            </button>
            <button type="button" onClick={openResume} className="hd-btn-ghost button-reset">
              Download Resume
            </button>
          </motion.div>

          <motion.div
            className="hero-dark-companies"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.58 }}
          >
            <span className="delivered-label">Delivered for</span>
            {companies.map((c, i) => (
              <span key={c} className="co-tag">{c}{i < companies.length - 1 && <span className="co-sep"> ·</span>}</span>
            ))}
          </motion.div>
        </div>

        {/* Right: platform stack terminal */}
        <motion.div
          className="hero-dark-right"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.72, delay: 0.22, ease: "easeOut" }}
        >
          <div className="platform-visual" aria-label="Animated Adobe platform graphic">
            <div className="stack-terminal">
              <div className="t-bar">
                <span className="t-dot t-red" />
                <span className="t-dot t-amber" />
                <span className="t-dot t-green" />
                <span className="t-title-text">platform-stack.aem</span>
              </div>

              <div className="t-body">
                <div className="t-prompt">
                  <span className="t-ps">$</span>
                  <span className="t-cmd">adobe --expertise --senior</span>
                </div>

                <div className="t-tree-output">
                  {stack.map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="t-row"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.38, delay: 0.68 + i * 0.16 }}
                    >
                      <span className="t-branch">{i < stack.length - 1 ? "├──" : "└──"}</span>
                      <span className="t-col">
                        <span className="t-key">{item.label}</span>
                        <span className="t-val" style={{ color: item.color }}>{item.value}</span>
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="t-stats">
                  <div className="t-stat-cell">
                    <strong>10+</strong><small>Years</small>
                  </div>
                  <div className="t-stat-sep" />
                  <div className="t-stat-cell">
                    <strong>Fortune 500</strong><small>Clients</small>
                  </div>
                  <div className="t-stat-sep" />
                  <div className="t-stat-cell">
                    <strong>{certifications.length}</strong><small>Certifications</small>
                  </div>
                </div>

                <div className="credential-mini" aria-label="Adobe certifications">
                  {certifications.map((certification) => (
                    <div key={certification.title} className="credential-mini-card">
                      <span>Adobe</span>
                      <strong>{certification.title}</strong>
                      <small>{certification.subtitle}</small>
                    </div>
                  ))}
                </div>

                <div className="t-cursor-line">
                  <span className="t-ps">$</span>
                  <span className="t-blink" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="proof-points" aria-label="Professional proof points">
        <motion.div
          className="proof-head"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <span>Impact System</span>
          <h2>Performance, platform delivery and enterprise scale in one operating model</h2>
        </motion.div>

        <div className="impact-board">
          <motion.div
            className="impact-story"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.48 }}
          >
            <span className="impact-kicker">Enterprise Adobe Experience Cloud delivery</span>
            <h3>Build once for authors, customers and performance teams.</h3>
            <p>
              I connect AEM Cloud, Edge Delivery, Dispatcher, CDN, AEP and AJO
              into production systems that are measurable, maintainable and fast.
            </p>
            <div className="impact-tags" aria-label="Core delivery capabilities">
              <span>AEM Cloud</span>
              <span>EDS</span>
              <span>Dispatcher</span>
              <span>CDN</span>
              <span>AEP</span>
              <span>AJO</span>
            </div>
          </motion.div>

          <motion.div
            className={`impact-radar radar-theme-${activeImpact.theme}`}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.32, delay: 0.08 }}
            aria-label="Performance impact graphic"
          >
            <motion.div
              key={activeImpact.label}
              className="radar-system"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.14 }}
            >
              <span className="radar-ring radar-ring-one" />
              <span className="radar-ring radar-ring-two" />
              <span className="radar-ring radar-ring-three" />
              <span className="radar-sweep" />
              {activeImpact.ringLabels.map((label, index) => (
                <span key={label} className={`radar-ring-label radar-ring-label-${index + 1}`}>
                  {label}
                </span>
              ))}
              {activeImpact.nodes.map((node, index) => (
                <span key={`${activeImpact.label}-${node}`} className={`radar-node radar-node-${index + 1}`}>
                  {node}
                </span>
              ))}
              <div className="radar-core">
                <strong>{activeImpact.visual}</strong>
                <span>{activeImpact.visualLabel}</span>
              </div>
            </motion.div>
            <motion.div
              key={activeImpact.focus}
              className="radar-caption"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.14 }}
            >
              {activeImpact.focus}
            </motion.div>
          </motion.div>

          <div className="impact-rail" aria-label="Delivery metrics">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className={`impact-metric flip-metric${activeMetric === index ? " is-active" : ""}${flippedMetric === index ? " is-flipped" : ""}`}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: 0.08 * index }}
                tabIndex={0}
                onMouseEnter={() => {
                  setActiveMetric(index);
                  setFlippedMetric(index);
                }}
                onMouseLeave={() => setFlippedMetric(null)}
                onFocus={() => {
                  setActiveMetric(index);
                  setFlippedMetric(index);
                }}
                onBlur={() => setFlippedMetric(null)}
              >
                <div className="flip-metric-inner">
                  <div className="metric-face metric-front">
                    <span>{metric.icon}</span>
                    <div>
                      <strong>{metric.value}</strong>
                      <small>{metric.label}</small>
                    </div>
                  </div>
                  <div className="metric-face metric-back">
                    <strong>{metric.detail}</strong>
                    <ul>
                      {metric.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="enterprise-strip" aria-label="Enterprise delivery clients">
          <span>Delivered across</span>
          {companies.map((company) => (
            <strong key={company}>{company}</strong>
          ))}
        </div>
      </section>

      <section className="delivery-flow" aria-label="Adobe delivery flow">
        <motion.div
          className="flow-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
        >
          <span>Delivery System</span>
          <h2>From content architecture to real-time activation</h2>
        </motion.div>

        <div className="flow-track">
          <div className="flow-rail" aria-hidden="true">
            <span className="flow-pulse flow-pulse-one" />
            <span className="flow-pulse flow-pulse-two" />
          </div>
          {deliveryFlow.map((item, index) => (
            <motion.div
              key={item.title}
              className="flow-step"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
            >
              <span className="flow-index">{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
