import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { metrics } from "../data/index.js";
import { openResume } from "../utils/resume.js";

const companies = ["HD Supply", "American Express", "Verizon", "PeakActivity", "Cummins"];

const stack = [
  { label: "Content Management", value: "AEM Cloud · Edge Delivery", color: "#f87171" },
  { label: "Data Platform",       value: "AEP · Real-Time CDP",       color: "#fb923c" },
  { label: "Journey Layer",       value: "AJO · Offer Decisioning",   color: "#fbbf24" },
  { label: "Frontend Delivery",   value: "React · SPA Editor",        color: "#f87171" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(null);

  return (
    <div className="home-dark">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-dark">
        <div className="hero-dark-bg" aria-hidden="true" />

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
                  <strong>3</strong><small>Certifications</small>
                </div>
              </div>

              <div className="t-cursor-line">
                <span className="t-ps">$</span>
                <span className="t-blink" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── DARK FLIP METRIC CARDS ─────────────────────────── */}
      <section className="dark-flip-grid" aria-label="Key metrics">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className={`dark-flip-card${flipped === index ? " is-flipped" : ""}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            onMouseEnter={() => setFlipped(index)}
            onMouseLeave={() => setFlipped(null)}
            onClick={() => setFlipped(flipped === index ? null : index)}
          >
            <div className="dfc-inner">
              <div className="dfc-front">
                <span className="dfc-num">{metric.icon}</span>
                <div className="dfc-value">{metric.value}</div>
                <div className="dfc-label">{metric.label}</div>
              </div>
              <div className="dfc-back">
                <div className="dfc-bvalue">{metric.value}</div>
                <p className="dfc-bdetail">{metric.detail}</p>
                <span className="dfc-btag">{metric.label}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

    </div>
  );
}
