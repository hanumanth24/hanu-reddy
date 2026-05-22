import { motion } from "framer-motion";
import PageShell from "../components/PageShell.jsx";
import AdobeBadgeIcon from "../components/AdobeBadgeIcon.jsx";
import { certifications } from "../data/index.js";

export default function CredentialsPage() {
  return (
    <PageShell
      eyebrow="Credentials"
      title="Adobe certifications"
      text="Credentials aligned with Adobe Experience Cloud implementation, journeys and real-time customer data."
    >
      <div className="cert-grid">
        {certifications.map((cert, index) => (
          <motion.article
            className="cert-card"
            key={cert.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <AdobeBadgeIcon />
            <div className="cert-copy">
              <span>{cert.label}</span>
              <h3>{cert.title}</h3>
              <p>{cert.subtitle}</p>
              {/* Links to Credly badge page — update credlyUrl in data/index.js with your personal badge link */}
              <a href={cert.credlyUrl} target="_blank" rel="noreferrer">
                View Credential
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
