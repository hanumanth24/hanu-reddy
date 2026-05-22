import { motion } from "framer-motion";
import { platformNodes } from "../data/index.js";

export default function PlatformGraphic() {
  return (
    <div className="ecosystem" aria-label="Adobe Experience Cloud platform graphic">
      <div className="eco-grid" />
      <div className="eco-glow glow-one" />
      <div className="eco-glow glow-two" />

      <motion.div className="eco-ring ring-one" animate={{ rotate: 360 }}  transition={{ duration: 42, repeat: Infinity, ease: "linear" }} />
      <motion.div className="eco-ring ring-two" animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
      <motion.div className="eco-ring ring-three" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />

      <svg className="eco-lines" viewBox="0 0 700 620" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="redLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="rgba(220,38,38,0.04)" />
            <stop offset="50%"  stopColor="rgba(220,38,38,0.42)" />
            <stop offset="100%" stopColor="rgba(251,113,133,0.08)" />
          </linearGradient>
        </defs>
        {platformNodes.map((node) => {
          const x = (node.x / 100) * 700;
          const y = (node.y / 100) * 620;
          return (
            <motion.line
              key={`line-${node.label}`}
              x1="350" y1="310" x2={x} y2={y}
              stroke="url(#redLine)" strokeWidth="1.5" strokeDasharray="10 14"
              animate={{ strokeDashoffset: [0, -90], opacity: [0.35, 0.72, 0.35] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
            />
          );
        })}
      </svg>

      <motion.div
        className="eco-center"
        animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="eco-center-halo" />
        <div className="adobe-mark">A</div>
        <strong>Adobe</strong>
        <span>Experience</span>
        <span>Cloud</span>
      </motion.div>

      <div className="eco-node-layer">
        {platformNodes.map((node) => (
          <motion.button
            type="button"
            key={node.label}
            className={`eco-node node-${node.tone}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            whileHover={{ scale: 1.14, y: -8 }}
            whileTap={{ scale: 1.04 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-label={`${node.label} — ${node.sub}`}
          >
            <span className="node-shine" aria-hidden="true" />
            <span className="eco-node-icon">{node.icon}</span>
            <b>{node.label}</b>
            <small>{node.sub}</small>
          </motion.button>
        ))}
      </div>

      <div className="eco-shadow" />
    </div>
  );
}
