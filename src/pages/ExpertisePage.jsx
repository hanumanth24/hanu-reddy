import { motion } from "framer-motion";
import { expertiseCards, skills } from "../data/index.js";

const operatingModel = [
  { label: "Content", value: "AEM Cloud, EDS, authoring models" },
  { label: "Performance", value: "Dispatcher, CDN, Core Web Vitals" },
  { label: "Activation", value: "AEP profiles, AJO journeys, RT-CDP" },
  { label: "Experience", value: "React, SPA Editor, headless delivery" },
];

export default function ExpertisePage() {
  return (
    <section className="expertise-v3">
      <motion.header
        className="expertise-v3-hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div>
          <span>Expertise</span>
          <h1>Adobe systems built for authors, journeys and performance.</h1>
        </div>
        <p>
          I connect AEM Cloud, Edge Delivery, AEP, AJO, analytics and frontend
          engineering into production platforms that teams can operate at scale.
        </p>
      </motion.header>

      <div className="expertise-command-v3">
        <motion.div
          className="expertise-map"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          aria-label="Adobe operating model"
        >
          <div className="map-head">
            <span>Operating Model</span>
            <strong>AEM + Data + Journeys + UI</strong>
          </div>
          <div className="map-core">
            <span className="map-ring map-ring-one" />
            <span className="map-ring map-ring-two" />
            <div className="map-center">
              <strong>Adobe</strong>
              <small>Experience Cloud</small>
            </div>
            {operatingModel.map((item, index) => (
              <div className={`map-node map-node-${index + 1}`} key={item.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
                <small>{item.value}</small>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="capability-lanes">
          {expertiseCards.map((item, index) => (
            <motion.article
              className="capability-lane"
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.07 }}
            >
              <div className="lane-index">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <div className="lane-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="skills-system">
        <div className="skills-system-head">
          <span>Technology System</span>
          <h2>Hands-on stack coverage</h2>
        </div>
        <div className="skills-system-grid">
          {skills.map((skillGroup, index) => (
            <motion.article
              className="skill-system-card"
              key={skillGroup.group}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.05 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{skillGroup.group}</h3>
              <div>
                {skillGroup.items.map((item) => <strong key={item}>{item}</strong>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
