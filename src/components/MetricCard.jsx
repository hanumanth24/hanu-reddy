import { motion } from "framer-motion";

export default function MetricCard({ metric, index }) {
  return (
    <motion.div
      className="metric-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="metric-icon" aria-hidden="true">{metric.icon}</div>
      <div>
        <div className="metric-value">{metric.value}</div>
        <div className="metric-label">{metric.label}</div>
        <p>{metric.detail}</p>
      </div>
    </motion.div>
  );
}
