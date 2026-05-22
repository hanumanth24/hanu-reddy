import { motion } from "framer-motion";

export default function PageShell({ eyebrow, title, text, children }) {
  return (
    <motion.section
      key={title}
      className="page-shell"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
    >
      <div className="section-heading">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        {text ? <p>{text}</p> : null}
      </div>
      {children}
    </motion.section>
  );
}
