import { motion } from "framer-motion";

export default function HRLogo() {
  return (
    <motion.div
      className="hr-logo"
      initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.06, rotate: 1 }}
      transition={{ duration: 0.35 }}
      aria-label="HR logo"
    >
      <span>HR</span>
      {/* Decorative shine element — hidden from assistive tech */}
      <span className="logo-shine" aria-hidden="true" />
    </motion.div>
  );
}
