import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "../components/PageShell.jsx";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.45, delay },
});

const diagrams = [
  {
    id: "aem",
    label: "AEM Enterprise",
    title: "AEM Cloud + Edge Delivery Architecture",
    desc: "End-to-end authoring, publishing and delivery stack for high-traffic e-commerce platforms.",
    layers: [
      {
        name: "Author Layer",
        color: "#9f1f2a",
        nodes: ["AEM Author", "DAM / Assets", "Content Fragments", "Workflows"],
      },
      {
        name: "Delivery Layer",
        color: "#a86f25",
        nodes: ["AEM Publish", "Dispatcher", "CDN / Edge Rules", "Core Web Vitals"],
      },
      {
        name: "Edge Layer",
        color: "#4d7a69",
        nodes: ["Edge Delivery Services", "Block-based Pages", "Markup Delivery", "Lighthouse 100"],
      },
    ],
    stats: [
      { label: "Page Speed", value: "50%" },
      { label: "Cache Hit Rate", value: "~95%" },
      { label: "TTI Reduction", value: "40%" },
    ],
  },
  {
    id: "aep",
    label: "AEP + AJO",
    title: "Real-Time Personalization Pipeline",
    desc: "Customer data ingestion, profile unification, segment activation and journey orchestration.",
    layers: [
      {
        name: "Data Layer",
        color: "#9f1f2a",
        nodes: ["Data Sources", "AEP Datasets", "Identity Resolution", "XDM Schemas"],
      },
      {
        name: "Profile Layer",
        color: "#a86f25",
        nodes: ["Real-Time CDP", "Audience Segments", "Governance & Consent", "Profile Lookup"],
      },
      {
        name: "Activation Layer",
        color: "#4d7a69",
        nodes: ["AJO Journeys", "Offer Decisioning", "Cross-Channel Triggers", "Journey Analytics"],
      },
    ],
    stats: [
      { label: "Journey Activation", value: "Real-Time" },
      { label: "Profile Unification", value: "Multi-Source" },
      { label: "Segment Precision", value: "Rule-Based" },
    ],
  },
  {
    id: "headless",
    label: "Headless CMS",
    title: "Headless AEM + React Delivery",
    desc: "Author-controlled React experiences via SPA Editor, Content Fragments and GraphQL APIs.",
    layers: [
      {
        name: "Authoring Layer",
        color: "#9f1f2a",
        nodes: ["AEM Author", "Content Models", "Content Fragments", "Experience Fragments"],
      },
      {
        name: "API Layer",
        color: "#a86f25",
        nodes: ["GraphQL API", "Content Delivery API", "Headless SDK", "Preview Service"],
      },
      {
        name: "Frontend Layer",
        color: "#4d7a69",
        nodes: ["React SPA", "AEM SPA Editor", "Component Mapping", "Rehydration"],
      },
    ],
    stats: [
      { label: "Authoring Control", value: "Full" },
      { label: "Frontend Stack", value: "React" },
      { label: "API Mode", value: "GraphQL" },
    ],
  },
  {
    id: "pipeline",
    label: "Cloud Pipeline",
    title: "CI/CD and Cloud Deployment Pipeline",
    desc: "Automated build, test and deployment pipeline for AEM Cloud Service across environments.",
    layers: [
      {
        name: "Source Layer",
        color: "#9f1f2a",
        nodes: ["Git Repository", "Feature Branches", "Pull Request Review", "Code Quality Gates"],
      },
      {
        name: "Build Layer",
        color: "#a86f25",
        nodes: ["Maven Build", "Unit Tests", "SonarQube Scan", "Package Validation"],
      },
      {
        name: "Deploy Layer",
        color: "#4d7a69",
        nodes: ["Cloud Manager", "Dev → Stage → Prod", "Dispatcher Config", "Smoke Tests"],
      },
    ],
    stats: [
      { label: "Deploy Frequency", value: "Daily" },
      { label: "Rollback Support", value: "Automated" },
      { label: "Test Coverage", value: ">80%" },
    ],
  },
];

export default function ArchitecturePage() {
  const [active, setActive] = useState(0);
  const diagram = diagrams[active];

  return (
    <PageShell
      eyebrow="Architecture"
      title="System design at enterprise scale."
      text="Architectural patterns behind high-traffic, multi-team Adobe Experience Cloud platforms."
    >

      {/* Tab selector */}
      <div className="arch-tabs">
        {diagrams.map((d, i) => (
          <button
            key={d.id}
            type="button"
            className={`arch-tab button-reset${active === i ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Diagram panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={diagram.id}
          className="arch-panel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28 }}
        >
          <div className="arch-panel-head">
            <div>
              <h2>{diagram.title}</h2>
              <p>{diagram.desc}</p>
            </div>
            <div className="arch-stats">
              {diagram.stats.map((s) => (
                <div key={s.label} className="arch-stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="arch-layers">
            {diagram.layers.map((layer, i) => (
              <motion.div
                key={layer.name}
                className="arch-layer"
                style={{ "--layer-color": layer.color }}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <div className="arch-layer-label">
                  <span className="arch-layer-dot" />
                  {layer.name}
                </div>
                <div className="arch-layer-nodes">
                  {layer.nodes.map((node, ni) => (
                    <motion.div
                      key={node}
                      className="arch-node"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.26, delay: i * 0.08 + ni * 0.05 }}
                    >
                      {node}
                    </motion.div>
                  ))}
                </div>
                {i < diagram.layers.length - 1 && (
                  <div className="arch-layer-arrow" aria-hidden="true">↓</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* All diagrams overview */}
      <motion.div className="arch-overview-head" {...reveal(0)}>
        <span>All Patterns</span>
        <h2>Enterprise architecture blueprints</h2>
      </motion.div>

      <div className="arch-overview">
        {diagrams.map((d, i) => (
          <motion.button
            key={d.id}
            type="button"
            className={`arch-overview-card button-reset${active === i ? " is-active" : ""}`}
            onClick={() => setActive(i)}
            {...reveal(i * 0.07)}
          >
            <strong>{d.label}</strong>
            <p>{d.title}</p>
            <span className="arch-view-link">View diagram →</span>
          </motion.button>
        ))}
      </div>

    </PageShell>
  );
}
