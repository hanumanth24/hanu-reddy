import { motion } from "framer-motion";
import PageShell from "../components/PageShell.jsx";
import { expertiseCards, skills } from "../data/index.js";

export default function ExpertisePage() {
  return (
    <PageShell
      eyebrow="Expertise"
      title="Adobe platform expertise"
      text="A senior-level view of how I connect content, data, journeys, experimentation and engineering delivery across Adobe Experience Cloud."
    >
      <div className="expertise-layout">
        <motion.div
          className="expertise-command"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="command-top">
            <span>Platform Command Center</span>
            <strong>AEM + AEP + AJO</strong>
          </div>
          <div className="command-orbit" aria-hidden="true">
            <div className="command-core">
              <b>Adobe</b>
              <small>Experience Cloud</small>
            </div>
            {expertiseCards.map((item, index) => (
              <div className={`command-node command-node-${index + 1}`} key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title.split(" ")[0]}</strong>
              </div>
            ))}
          </div>
          <p>
            I focus on building scalable Adobe ecosystems where authoring, personalization,
            analytics and frontend delivery work together as one production-ready platform.
          </p>
        </motion.div>

        <div className="expertise-panel-grid">
          {expertiseCards.map((item, index) => (
            <motion.article
              className="expertise-panel"
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
            >
              <div className="expertise-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="tag-row">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="stack-matrix">
        {skills.map((skillGroup, index) => (
          <motion.article
            className="stack-column"
            key={skillGroup.group}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 + index * 0.06 }}
          >
            <div className="stack-heading">
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{skillGroup.group}</h3>
            </div>
            <div>
              {skillGroup.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
