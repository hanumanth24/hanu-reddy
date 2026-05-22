import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PlatformGraphic from "../components/PlatformGraphic.jsx";
import MetricCard from "../components/MetricCard.jsx";
import { metrics } from "../data/index.js";
import { openResume } from "../utils/resume.js";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="hero">
        <div className="hero-left">
          <motion.div
            className="eyebrow-pill"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <b>*</b> Building Exceptional Digital Experiences
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            Senior AEM<br />Full Stack Lead
          </motion.h1>
          <motion.div
            className="gold-line"
            initial={{ width: 0 }}
            animate={{ width: 104 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          />
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.26 }}
          >
            I architect and deliver scalable, high-performance Adobe Experience Cloud solutions
            that drive growth, engagement, and measurable business impact.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.38 }}
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
        <div className="hero-right">
          <PlatformGraphic />
        </div>
      </section>

      <section className="metrics" aria-label="Key metrics">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </section>
    </div>
  );
}
