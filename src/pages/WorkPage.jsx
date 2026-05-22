import { motion } from "framer-motion";
import PageShell from "../components/PageShell.jsx";
import { projects } from "../data/index.js";

export default function WorkPage() {
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <PageShell
      eyebrow="Work"
      title="Selected Adobe case studies"
      text="Portfolio-style project stories focused on problem framing, platform solution and measurable delivery impact."
    >
      <motion.article
        className="featured-work"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="featured-work-visual" aria-hidden="true">
          <div className="work-radar">
            <span>AEM</span>
            <span>EDS</span>
            <span>CDN</span>
            <span>React</span>
          </div>
        </div>
        <div className="featured-work-copy">
          <span className="work-label">Featured Case Study</span>
          <h3>{featuredProject.title}</h3>
          <div className="work-impact-large">{featuredProject.impact}</div>
          <div className="work-story-grid">
            <div><strong>Problem</strong><p>{featuredProject.problem}</p></div>
            <div><strong>What I Built</strong><p>{featuredProject.built}</p></div>
          </div>
          <div className="tag-row">
            {featuredProject.tech.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </motion.article>

      <div className="work-grid-redesign">
        {otherProjects.map((project, index) => (
          <motion.article
            className="work-card-redesign"
            key={project.title}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="work-card-top">
              <span aria-hidden="true">{String(index + 2).padStart(2, "0")}</span>
              <strong>{project.impact}</strong>
            </div>
            <h3>{project.title}</h3>
            <div className="work-mini-block"><b>Problem</b><p>{project.problem}</p></div>
            <div className="work-mini-block"><b>Solution</b><p>{project.built}</p></div>
            <div className="tag-row">
              {project.tech.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
