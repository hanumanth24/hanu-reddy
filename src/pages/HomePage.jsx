import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { metrics, profile } from "../data/index.js";
import { openResume } from "../utils/resume.js";

const techStack = ["AEM Cloud", "AEP", "AJO", "RT-CDP", "Edge Delivery", "React"];

export default function HomePage() {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(null);

  return (
    <div className="home-v2">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-v2">
        <div className="hero-bg-grid" aria-hidden="true" />

        <div className="hero-v2-left">
          <motion.div
            className="status-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="status-dot" />
            Available for Senior Roles
          </motion.div>

          <motion.h1
            className="hero-v2-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            Senior AEM<br />
            <span className="title-accent">Full Stack</span><br />
            Lead
          </motion.h1>

          <motion.p
            className="hero-v2-sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26 }}
          >
            Architecting scalable Adobe Experience Cloud solutions across AEM,
            AEP, AJO and Edge Delivery — 10+ years, Fortune 500.
          </motion.p>

          <motion.div
            className="tech-chips"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
          >
            {techStack.map((t) => (
              <span key={t} className="tech-chip">{t}</span>
            ))}
          </motion.div>

          <motion.div
            className="hero-v2-actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="primary-btn button-reset"
            >
              Let's Connect
            </button>
            <button
              type="button"
              onClick={openResume}
              className="secondary-btn button-reset"
            >
              Download Resume
            </button>
          </motion.div>
        </div>

        {/* ── Orbit Scene ── */}
        <motion.div
          className="hero-v2-right"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.18, ease: "easeOut" }}
        >
          <div className="orbit-scene">
            {/* 3D-tilted spinning rings */}
            <div className="orbit-ring or-1" aria-hidden="true" />
            <div className="orbit-ring or-2" aria-hidden="true" />
            <div className="orbit-ring or-3" aria-hidden="true" />

            {/* Orbiting tech badges */}
            <div className="orbit-dot od-1" aria-hidden="true"><span>AEM</span></div>
            <div className="orbit-dot od-2" aria-hidden="true"><span>AEP</span></div>
            <div className="orbit-dot od-3" aria-hidden="true"><span>AJO</span></div>
            <div className="orbit-dot od-4" aria-hidden="true"><span>CDP</span></div>

            {/* Profile nucleus */}
            <motion.div
              className="profile-nucleus"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="nucleus-glow" aria-hidden="true" />
              <img
                src={profile.photo}
                alt={profile.shortName}
                className="nucleus-photo"
              />
              <div className="nucleus-ring" aria-hidden="true" />
              <div className="nucleus-ring nr-2" aria-hidden="true" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── FLIP METRIC CARDS ─────────────────────────────── */}
      <section className="flip-grid" aria-label="Key metrics">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className={`flip-card${flipped === index ? " is-flipped" : ""}`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + index * 0.1 }}
            onMouseEnter={() => setFlipped(index)}
            onMouseLeave={() => setFlipped(null)}
            onClick={() => setFlipped(flipped === index ? null : index)}
          >
            <div className="flip-inner">
              <div className="flip-front">
                <div className="flip-index">{metric.icon}</div>
                <div className="flip-value">{metric.value}</div>
                <div className="flip-label">{metric.label}</div>
                <div className="flip-hint">hover to reveal</div>
              </div>
              <div className="flip-back">
                <div className="flip-back-value">{metric.value}</div>
                <p className="flip-back-detail">{metric.detail}</p>
                <div className="flip-back-tag">{metric.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

    </div>
  );
}
