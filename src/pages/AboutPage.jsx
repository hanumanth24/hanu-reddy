import { motion } from "framer-motion";
import PageShell from "../components/PageShell.jsx";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.45, delay },
});

const timeline = [
  {
    period: "2023 – Present",
    company: "HD Supply",
    role: "Senior AEM Full Stack Lead",
    highlights: [
      "Architected AEM Cloud + Edge Delivery platform for high-traffic e-commerce",
      "Integrated AJO journeys with AEP Real-Time CDP for personalized activation",
      "Led Core Web Vitals optimization — 50% faster page delivery",
    ],
  },
  {
    period: "2022 – 2023",
    company: "American Express",
    role: "Senior AEM Developer",
    highlights: [
      "Built enterprise AEM 6.5 components, DAM workflows and SPA Editor patterns",
      "Integrated Adobe Analytics, Adobe Target and Launch at component level",
      "Improved CDN and Dispatcher delivery for high-traffic customer journeys",
    ],
  },
  {
    period: "2020 – 2022",
    company: "HD Supply",
    role: "Senior AEM Developer",
    highlights: [
      "Designed Dispatcher/CDN caching strategies for production stability",
      "Built Content Fragments and Experience Fragments for multi-channel delivery",
      "Delivered reusable AEM component library and authoring best practices",
    ],
  },
  {
    period: "2019 – 2020",
    company: "Verizon",
    role: "Senior AEM Developer",
    highlights: [
      "Built React micro-frontends with AEM SPA Editor at enterprise scale",
      "Supported AWS and Docker-based deployment pipelines",
      "Delivered MSM and Live Copy structures for multi-site content delivery",
    ],
  },
  {
    period: "2017 – 2019",
    company: "PeakActivity / LiquidHub",
    role: "Senior AEM Developer",
    highlights: [
      "Delivered AEM Cloud, DAM, Target and Angular UI integrations",
      "Built reusable component libraries and OSGi service layers",
      "Supported production release, deployment readiness and QA cycles",
    ],
  },
  {
    period: "2014 – 2017",
    company: "Cummins / Consuptra",
    role: "AEM Developer",
    highlights: [
      "Started AEM career building components, workflows and client libraries",
      "Implemented Adobe Campaign for targeted marketing workflows",
      "Supported CRXDE, JCR, Sling Models and Maven project structures",
    ],
  },
];

const pillars = [
  {
    icon: "⬡",
    title: "Architecture First",
    body: "I design systems before writing code. Every component, pipeline and data model is evaluated against production scale, author experience and long-term maintainability.",
  },
  {
    icon: "◈",
    title: "Enterprise Delivery",
    body: "10+ years delivering for Fortune 500 clients — HD Supply, American Express, Verizon, Cummins. I understand the complexity of regulated, high-traffic, multi-team environments.",
  },
  {
    icon: "⬙",
    title: "Platform Thinking",
    body: "I connect AEM, AEP, AJO, CDN and React into unified delivery systems. Not isolated tools — cohesive platforms with measurable business outcomes.",
  },
  {
    icon: "◎",
    title: "AI-Assisted Engineering",
    body: "I integrate AI tooling into engineering workflows — from intelligent authoring assistance to automated content validation and performance analysis.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Senior architect. Enterprise builder."
      text="10+ years designing and delivering scalable Adobe Experience Cloud platforms for Fortune 500 companies."
    >

      {/* Engineering pillars */}
      <div className="about-pillars">
        {pillars.map((p, i) => (
          <motion.div key={p.title} className="about-pillar" {...reveal(i * 0.08)}>
            <span className="pillar-icon" aria-hidden="true">{p.icon}</span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <motion.div className="about-timeline-head" {...reveal(0)}>
        <span>Career Timeline</span>
        <h2>A decade of enterprise Adobe delivery</h2>
      </motion.div>

      <div className="about-timeline">
        {timeline.map((entry, i) => (
          <motion.div key={entry.company + entry.period} className="tl-entry" {...reveal(i * 0.07)}>
            <div className="tl-left">
              <span className="tl-period">{entry.period}</span>
              <strong className="tl-company">{entry.company}</strong>
              <em className="tl-role">{entry.role}</em>
            </div>
            <div className="tl-dot" aria-hidden="true" />
            <div className="tl-right">
              {entry.highlights.map((h) => (
                <div key={h} className="tl-point">
                  <span aria-hidden="true">→</span>
                  <p>{h}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </PageShell>
  );
}
