import { motion } from "framer-motion";
import PageShell from "../components/PageShell.jsx";
import { experience } from "../data/index.js";

export default function ExperiencePage() {
  return (
    <PageShell
      eyebrow="Experience"
      title="Enterprise Adobe delivery"
      text="A clean summary of responsibilities, platform ownership and measurable delivery impact. This is not the full resume; the PDF can be downloaded from the header."
    >
      <div className="experience-showcase">
        <div className="experience-timeline-rail" aria-hidden="true">
          <span />
        </div>
        {experience.map((job, index) => (
          <motion.article
            className="experience-card"
            key={`${job.company}-${job.date}`}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
          >
            <div className="experience-side">
              <span className="experience-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <small>{job.date}</small>
              <strong>{job.company}</strong>
              <em>{job.location}</em>
            </div>
            <div className="experience-main">
              <div className="experience-topline">
                <h3>{job.role}</h3>
                <div className="impact-row compact-impact">
                  {job.impact.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
              <p className="experience-summary">{job.summary}</p>
              <div className="responsibility-grid">
                {job.responsibilities.map((point) => (
                  <div className="responsibility-item" key={point}>
                    <span aria-hidden="true">✓</span>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
              <div className="impact-row">
                {job.impact.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
