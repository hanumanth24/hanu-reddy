import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const profile = {
  name: "Hanumanth Reddy Barla",
  shortName: "Hanu Reddy",
  title: "Adobe Experience Cloud Engineer",
  role: "Senior AEM Full Stack Lead",
  location: "Fort Mill, SC",
  phone: "(810) 493-7039",
  email: "hanureddy4268@gmail.com",
  linkedin: "https://www.linkedin.com/in/hanu-reddy-8b04b7167/",
};

const navItems = [
  { id: "home", label: "Home" },
  { id: "expertise", label: "Expertise" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

const platformNodes = [
  { label: "AEM", sub: "Content", tone: "gold", x: 18, y: 18, icon: "M" },
  { label: "AJO", sub: "Journeys", tone: "red", x: 78, y: 18, icon: "A" },
  { label: "CJA", sub: "Insights", tone: "orange", x: 90, y: 48, icon: "C" },
  { label: "React", sub: "Experience", tone: "rose", x: 70, y: 82, icon: "R" },
  { label: "RT-CDP", sub: "Segments", tone: "dark", x: 30, y: 82, icon: "P" },
  { label: "AEP", sub: "Profiles", tone: "red", x: 10, y: 48, icon: "A" },
];

const metrics = [
  { icon: "01", value: "10+", label: "Years Experience", detail: "Enterprise Adobe Experience Cloud delivery" },
  { icon: "02", value: "50%", label: "Faster Page Loads", detail: "AEM Cloud, EDS, Dispatcher and CDN optimization" },
  { icon: "03", value: "30%", label: "Latency Reduction", detail: "CDN and performance tuning for enterprise sites" },
  { icon: "04", value: "Fortune 500", label: "Delivery", detail: "HD Supply, American Express, Verizon and Cummins" },
];

const expertiseCards = [
  {
    title: "AEM Architecture",
    text: "AEM Cloud Service, AEM 6.x, Edge Delivery Services, Dispatcher, DAM, workflows, Content Fragments, Experience Fragments, GraphQL, HTL and Sling Models.",
    tags: ["AEM Cloud", "EDS", "Dispatcher", "DAM"],
  },
  {
    title: "AEP and Real-Time CDP",
    text: "Customer profiles, identity resolution, datasets, segmentation, governance and activation-ready customer data foundations.",
    tags: ["AEP", "RT-CDP", "Profiles", "Segments"],
  },
  {
    title: "AJO Journey Delivery",
    text: "Event-triggered journeys, offer decisioning, eligibility rules, real-time profile usage and cross-channel activation.",
    tags: ["AJO", "Journeys", "Decisioning", "Activation"],
  },
  {
    title: "Analytics and Optimization",
    text: "Adobe Analytics, Adobe Target, CJA, Launch, experimentation, Core Web Vitals, SEO, accessibility and production support.",
    tags: ["Analytics", "Target", "CJA", "Performance"],
  },
];

const projects = [
  {
    title: "AEM Cloud and EDS Transformation",
    problem: "Enterprise pages needed faster delivery, scalable authoring and stronger caching strategy.",
    built: "Built AEM Cloud patterns, EDS delivery structure, Dispatcher/CDN rules and reusable authorable components.",
    impact: "50% faster page delivery",
    tech: ["AEM Cloud", "EDS", "Dispatcher", "CDN"],
  },
  {
    title: "AEP and AJO Personalization Foundation",
    problem: "Business teams needed real-time customer journeys connected to profile data and decisioning rules.",
    built: "Connected AEP profiles with AJO journeys, eligibility logic, segmentation and offer decisioning patterns.",
    impact: "Real-time journey activation",
    tech: ["AEP", "AJO", "RT-CDP", "Journeys"],
  },
  {
    title: "Headless AEM and React Experience Layer",
    problem: "Frontend teams needed modern React experiences while keeping AEM authoring control.",
    built: "Created authorable React components, mapped AEM content models and supported GraphQL-based delivery.",
    impact: "Authorable React UI",
    tech: ["React", "SPA Editor", "GraphQL", "Headless AEM"],
  },
];

const experience = [
  {
    date: "Jan 2023 - Mar 2026",
    company: "HD Supply",
    role: "Senior AEM Full Stack Lead",
    location: "Atlanta, GA",
    summary: "Led Adobe Experience Cloud delivery across AEM Cloud, Edge Delivery Services, AEP, AJO, CJA, personalization and performance optimization.",
    responsibilities: [
      "Architected scalable AEM Cloud and Edge Delivery Services solutions for high-traffic e-commerce platforms.",
      "Designed reusable AEM components, templates, content models, authoring patterns and workflow structures.",
      "Improved site performance through Dispatcher rules, CDN caching, image optimization and delivery best practices.",
      "Integrated AJO with AEP Real-Time Customer Profiles for journeys, decisioning and eligibility rules.",
      "Supported CJA and AEP dataset integration for cross-channel insights and journey reporting.",
    ],
    impact: ["AEM Cloud", "EDS", "AEP", "AJO", "Performance"],
  },
  {
    date: "Jun 2022 - Jan 2023",
    company: "American Express",
    role: "Senior AEM Developer",
    location: "New York, NY via TekSystems",
    summary: "Delivered enterprise AEM 6.5 components, DAM workflows, personalization and analytics integrations for customer-facing experiences.",
    responsibilities: [
      "Built responsive AEM 6.5 components, dialogs, templates, workflows, Sling Models and OSGi services.",
      "Worked with DAM assets, metadata, renditions and content authoring workflows.",
      "Integrated Adobe Analytics and Launch tracking patterns for component-level measurement.",
      "Implemented Adobe Target activities and SPA Editor personalization patterns.",
      "Improved page delivery through Publish, Dispatcher and CDN configuration support.",
    ],
    impact: ["AEM 6.5", "DAM", "Target", "Analytics", "CDN"],
  },
  {
    date: "Oct 2020 - Jun 2022",
    company: "HD Supply",
    role: "Senior AEM Developer",
    location: "Atlanta, GA",
    summary: "Focused on AEM performance, Dispatcher/CDN optimization, workflows and reusable content delivery models.",
    responsibilities: [
      "Configured Dispatcher and CDN caching strategies to improve page speed and production stability.",
      "Built custom AEM workflows for content review, approvals, publishing and author productivity.",
      "Developed reusable AEM components, templates and backend Sling Models.",
      "Implemented Content Fragments and Experience Fragments for reusable multi-channel content.",
      "Supported production troubleshooting, release validation and performance tuning.",
    ],
    impact: ["Dispatcher", "CDN", "CF/XF", "GraphQL", "Support"],
  },
  {
    date: "Jun 2019 - Sep 2020",
    company: "Verizon",
    role: "Senior AEM Developer",
    location: "Dallas, TX",
    summary: "Built AEM components, React SPA experiences, multi-site authoring patterns and cloud deployment support.",
    responsibilities: [
      "Designed and developed AEM components, templates, dialogs, workflows, listeners and schedulers.",
      "Implemented React micro-frontends using AEM SPA Editor patterns.",
      "Supported MSM and Live Copy structures for multi-site content delivery.",
      "Worked with AWS, Docker and deployment pipelines for release delivery.",
      "Partnered with business, QA and offshore teams to deliver production-ready features.",
    ],
    impact: ["React SPA", "AWS", "Docker", "MSM", "Workflows"],
  },
  {
    date: "Oct 2018 - May 2019",
    company: "PeakActivity",
    role: "Senior AEM Developer",
    location: "Boynton Beach, FL",
    summary: "Delivered AEM product-suite implementations with components, DAM, Target, Angular UI patterns and cloud delivery practices.",
    responsibilities: [
      "Developed digital consumer experiences using Adobe AEM, CRX, DAM and Adobe Target.",
      "Built reusable AEM components, templates, dialogs and backend services.",
      "Implemented Angular 6 interface patterns integrated with AEM authoring flows.",
      "Supported AEM Cloud Service environment configuration and deployment practices.",
      "Translated requirements into scalable component implementations.",
    ],
    impact: ["AEM", "Angular 6", "DAM", "Target", "Cloud"],
  },
  {
    date: "Jun 2018 - Oct 2018",
    company: "LiquidHub",
    role: "Senior AEM Developer",
    location: "Charlotte, NC",
    summary: "Supported enterprise AEM implementation work with reusable components, templates, integrations and release delivery.",
    responsibilities: [
      "Developed AEM templates, components, dialogs and services using Java, Sling, HTL and OSGi.",
      "Worked on content packages, Maven builds, environment promotion and release support.",
      "Supported backend integrations and reusable service layers.",
      "Participated in requirement analysis, design discussions and sprint delivery planning.",
      "Troubleshot AEM authoring, publishing and deployment issues.",
    ],
    impact: ["AEM", "Java", "OSGi", "Maven", "Release"],
  },
  {
    date: "May 2017 - May 2018",
    company: "Cummins",
    role: "Senior AEM Developer",
    location: "Columbus, IN",
    summary: "Built reusable AEM templates, Angular-based UI patterns, campaign integrations and design artifacts for web delivery.",
    responsibilities: [
      "Built AEM pages, templates and reusable components using JavaScript, HTML, CSS, Ajax and jQuery.",
      "Designed AngularJS add-on library patterns for reusable frontend behavior.",
      "Implemented Adobe Campaign support for targeted campaigns and marketing workflows.",
      "Prepared technical designs and reviewed implementation work across the team.",
      "Supported testing, defect resolution, deployment readiness and production releases.",
    ],
    impact: ["Campaign", "AngularJS", "Templates", "Design", "Release"],
  },
  {
    date: "May 2014 - May 2017",
    company: "Consuptra Info Solutions",
    role: "AEM Developer",
    location: "Hyderabad, India",
    summary: "Started AEM development career building components, templates, dialogs, workflows and backend services.",
    responsibilities: [
      "Developed AEM components, templates, dialogs, client libraries and backend Java services.",
      "Worked with CRXDE, JCR nodes, Sling Models, OSGi bundles and Maven project structures.",
      "Supported workflow customization, replication configurations, permissions and package deployments.",
      "Integrated frontend HTML, CSS and JavaScript with AEM authoring and rendering patterns.",
      "Participated in QA fixes, production support, documentation and release coordination.",
    ],
    impact: ["AEM", "CRXDE", "JCR", "Sling", "OSGi"],
  },
];

const certifications = [
  { title: "Journey Optimizer", subtitle: "Business Practitioner", label: "Adobe Certified Professional" },
  { title: "Real-Time CDP", subtitle: "Business Practitioner", label: "Adobe Certified Professional" },
];

const skills = [
  { group: "Adobe Platform", items: ["AEM Cloud", "AEM 6.x", "EDS", "AEP", "AJO", "Real-Time CDP", "CJA", "Adobe Target", "Adobe Analytics"] },
  { group: "AEM Engineering", items: ["HTL", "Sling Models", "OSGi", "JCR", "DAM", "Dispatcher", "Workflows", "Content Fragments", "GraphQL"] },
  { group: "Frontend and Backend", items: ["React", "AEM SPA Editor", "JavaScript", "HTML5", "CSS3", "Java", "Apache Sling", "REST APIs", "Maven"] },
  { group: "Delivery and Quality", items: ["CI/CD", "Jenkins", "Docker", "AWS", "Git", "Agile", "SEO", "Accessibility", "Production Support"] },
];

const resumeContent = `
Hanu Reddy
Senior AEM Full Stack Lead | Adobe Experience Cloud Engineer
Fort Mill, SC | ${profile.phone} | ${profile.email}
LinkedIn: ${profile.linkedin}

SUMMARY
Senior AEM Full Stack Lead with 10+ years of experience delivering enterprise Adobe Experience Cloud platforms across AEM Cloud, Edge Delivery Services, AEP, AJO, Real-Time CDP, CJA, Adobe Target, Adobe Analytics, React, Java, Dispatcher and CDN optimization.

CORE SKILLS
AEM Cloud Service, AEM 6.x, Edge Delivery Services, HTL, Sling Models, OSGi, JCR, DAM, Dispatcher, Workflows, Content Fragments, Experience Fragments, GraphQL, AEP, AJO, Real-Time CDP, CJA, Adobe Target, Adobe Analytics, React, JavaScript, Java, Maven, Jenkins, Docker, AWS, CI/CD.

CERTIFICATIONS
Adobe Certified Professional - Adobe Journey Optimizer Business Practitioner
Adobe Certified Professional - Adobe Real-Time CDP Business Practitioner
`;

function openResume() {
  const blob = new Blob([resumeContent], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Hanu_Reddy_Resume.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function HRLogo() {
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
      <i />
    </motion.div>
  );
}

function PlatformGraphic() {
  return (
    <div className="ecosystem" aria-label="Adobe Experience Cloud platform graphic">
      <div className="eco-grid" />
      <div className="eco-glow glow-one" />
      <div className="eco-glow glow-two" />

      <motion.div className="eco-ring ring-one" animate={{ rotate: 360 }} transition={{ duration: 42, repeat: Infinity, ease: "linear" }} />
      <motion.div className="eco-ring ring-two" animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
      <motion.div className="eco-ring ring-three" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />

      <svg className="eco-lines" viewBox="0 0 700 620" preserveAspectRatio="none">
        <defs>
          <linearGradient id="redLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(220,38,38,0.04)" />
            <stop offset="50%" stopColor="rgba(220,38,38,0.42)" />
            <stop offset="100%" stopColor="rgba(251,113,133,0.08)" />
          </linearGradient>
        </defs>
        {platformNodes.map((node) => {
          const x = (node.x / 100) * 700;
          const y = (node.y / 100) * 620;
          return (
            <motion.line
              key={`line-${node.label}`}
              x1="350"
              y1="310"
              x2={x}
              y2={y}
              stroke="url(#redLine)"
              strokeWidth="1.5"
              strokeDasharray="10 14"
              animate={{ strokeDashoffset: [0, -90], opacity: [0.35, 0.72, 0.35] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
            />
          );
        })}
      </svg>

      <motion.div className="eco-center" animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>
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
            aria-label={`${node.label} ${node.sub}`}
          >
            <span className="node-shine" />
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

function MetricCard({ metric, index }) {
  return (
    <motion.div
      className="metric-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="metric-icon">{metric.icon}</div>
      <div>
        <div className="metric-value">{metric.value}</div>
        <div className="metric-label">{metric.label}</div>
        <p>{metric.detail}</p>
      </div>
    </motion.div>
  );
}

function AdobeBadgeIcon() {
  return (
    <div className="adobe-badge-icon" aria-label="Adobe certification badge">
      <div className="adobe-a">A</div>
      <div className="adobe-word">Adobe</div>
      <div className="adobe-certified">CERTIFIED</div>
      <div className="adobe-level">PROFESSIONAL</div>
    </div>
  );
}

function PageShell({ eyebrow, title, text, children }) {
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

function HomePage({ setActivePage }) {
  return (
    <div>
      <section className="hero">
        <div className="hero-left">
          <motion.div className="eyebrow-pill" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <b>*</b> Building Exceptional Digital Experiences
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.12 }}>
            Senior AEM<br />Full Stack Lead
          </motion.h1>
          <motion.div className="gold-line" initial={{ width: 0 }} animate={{ width: 104 }} transition={{ duration: 0.7, delay: 0.4 }} />
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.26 }}>
            I architect and deliver scalable, high-performance Adobe Experience Cloud solutions that drive growth, engagement, and measurable business impact.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.38 }}>
            <button type="button" onClick={() => setActivePage("contact")} className="primary-btn button-reset">Let's Connect</button>
            <button type="button" onClick={openResume} className="secondary-btn button-reset">Download Resume</button>
          </motion.div>
        </div>
        <div className="hero-right">
          <PlatformGraphic />
        </div>
      </section>

      <section className="metrics">
        {metrics.map((metric, index) => <MetricCard key={metric.label} metric={metric} index={index} />)}
      </section>
    </div>
  );
}

function ExpertisePage() {
  return (
    <PageShell
      eyebrow="Expertise"
      title="Adobe platform expertise"
      text="A senior-level view of how I connect content, data, journeys, experimentation and engineering delivery across Adobe Experience Cloud."
    >
      <div className="expertise-layout">
        <motion.div className="expertise-command" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="command-top">
            <span>Platform Command Center</span>
            <strong>AEM + AEP + AJO</strong>
          </div>
          <div className="command-orbit">
            <div className="command-core">
              <b>Adobe</b>
              <small>Experience Cloud</small>
            </div>
            {expertiseCards.map((item, index) => (
              <div className={`command-node command-node-${index + 1}`} key={item.title}>
                <span>0{index + 1}</span>
                <strong>{item.title.split(" ")[0]}</strong>
              </div>
            ))}
          </div>
          <p>I focus on building scalable Adobe ecosystems where authoring, personalization, analytics and frontend delivery work together as one production-ready platform.</p>
        </motion.div>

        <div className="expertise-panel-grid">
          {expertiseCards.map((item, index) => (
            <motion.article className="expertise-panel" key={item.title} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}>
              <div className="expertise-index">0{index + 1}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="stack-matrix">
        {skills.map((skillGroup, index) => (
          <motion.article className="stack-column" key={skillGroup.group} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.06 }}>
            <div className="stack-heading">
              <span>0{index + 1}</span>
              <h3>{skillGroup.group}</h3>
            </div>
            <div>{skillGroup.items.map((item) => <span key={item}>{item}</span>)}</div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}

function WorkPage() {
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <PageShell
      eyebrow="Work"
      title="Selected Adobe case studies"
      text="Portfolio-style project stories focused on problem framing, platform solution and measurable delivery impact."
    >
      <motion.article className="featured-work" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className="featured-work-visual">
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
          <div className="tag-row">{featuredProject.tech.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      </motion.article>

      <div className="work-grid-redesign">
        {otherProjects.map((project, index) => (
          <motion.article className="work-card-redesign" key={project.title} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
            <div className="work-card-top">
              <span>0{index + 2}</span>
              <strong>{project.impact}</strong>
            </div>
            <h3>{project.title}</h3>
            <div className="work-mini-block"><b>Problem</b><p>{project.problem}</p></div>
            <div className="work-mini-block"><b>Solution</b><p>{project.built}</p></div>
            <div className="tag-row">{project.tech.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}

function ExperiencePage() {
  return (
    <PageShell
      eyebrow="Experience"
      title="Enterprise Adobe delivery"
      text="A clean summary of responsibilities, platform ownership and measurable delivery impact. This is not the full resume; the PDF can be downloaded from the header."
    >
      <div className="experience-showcase">
        {experience.map((job, index) => (
          <motion.article className="experience-card" key={`${job.company}-${job.date}`} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.07 }}>
            <div className="experience-side">
              <span className="experience-number">0{index + 1}</span>
              <small>{job.date}</small>
              <strong>{job.company}</strong>
              <em>{job.location}</em>
            </div>
            <div className="experience-main">
              <div className="experience-topline">
                <h3>{job.role}</h3>
                <div className="impact-row compact-impact">{job.impact.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>
              </div>
              <p className="experience-summary">{job.summary}</p>
              <div className="responsibility-grid">
                {job.responsibilities.map((point) => (
                  <div className="responsibility-item" key={point}><span>✓</span><p>{point}</p></div>
                ))}
              </div>
              <div className="impact-row">{job.impact.map((item) => <span key={item}>{item}</span>)}</div>
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}

function CredentialsPage() {
  return (
    <PageShell
      eyebrow="Credentials"
      title="Adobe certifications"
      text="Credentials aligned with Adobe Experience Cloud implementation, journeys and real-time customer data."
    >
      <div className="cert-grid">
        {certifications.map((cert, index) => (
          <motion.article className="cert-card" key={cert.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
            <AdobeBadgeIcon />
            <div className="cert-copy">
              <span>{cert.label}</span>
              <h3>{cert.title}</h3>
              <p>{cert.subtitle}</p>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">View Credential</a>
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Let's build scalable Adobe experiences"
      text="Available for Senior AEM Developer, AEM Full Stack Lead, AEM Architect, AEP Engineer, AJO Developer and Adobe Experience Cloud roles."
    >
      <div className="contact-card">
        <a href={`mailto:${profile.email}`} className="primary-btn">Email Me</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="secondary-btn">LinkedIn</a>
        <button type="button" onClick={openResume} className="secondary-btn button-reset">Download Resume</button>
        <p>{profile.phone} - {profile.location}</p>
      </div>
    </PageShell>
  );
}

export default function HanuPortfolioLight() {
  const [activePage, setActivePage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  const pages = {
    home: <HomePage setActivePage={setActivePage} />,
    expertise: <ExpertisePage />,
    work: <WorkPage />,
    experience: <ExperiencePage />,
    credentials: <CredentialsPage />,
    contact: <ContactPage />,
  };

  return (
    <main className="portfolio-light">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

        .portfolio-light {
          --header-height: 88px;
          --bg: #fff7f7;
          --surface: #ffffff;
          --surface2: #fff1f2;
          --navy: #240909;
          --text: #2b1111;
          --muted: #765858;
          --line: #f3d4d4;
          --red: #dc2626;
          --rose: #fb7185;
          --gold: #b45309;
          min-height: 100vh;
          background: radial-gradient(circle at 76% 10%, rgba(220,38,38,0.14), transparent 28%), radial-gradient(circle at 10% 8%, rgba(251,113,133,0.13), transparent 22%), linear-gradient(180deg, #ffffff 0%, #fff7f7 45%, #ffffff 100%);
          color: var(--text);
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow-x: hidden;
        }
        .portfolio-light * { box-sizing: border-box; }
        .portfolio-light a { text-decoration: none; }
        .button-reset { border: 0; background: transparent; font: inherit; cursor: pointer; }

        .header {
          position: sticky;
          position: -webkit-sticky;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 999;
          min-height: 88px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 12px 54px;
          background: rgba(255,255,255,0.88);
          border-bottom: 1px solid rgba(120,20,20,0.08);
          backdrop-filter: blur(18px);
          box-shadow: 0 14px 50px rgba(120,20,20,0.06);
        }
        .brand { display: flex; align-items: center; gap: 16px; min-width: 300px; color: inherit; text-align: left; }
        .hr-logo { position: relative; width: 64px; height: 64px; border-radius: 20px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: linear-gradient(135deg, #7f1d1d 0%, #dc2626 48%, #fb7185 100%); box-shadow: 0 18px 45px rgba(220,38,38,0.26), inset 0 1px 0 rgba(255,255,255,0.45); border: 2px solid rgba(255,255,255,0.95); }
        .hr-logo span { position: relative; z-index: 2; color: white; font-family: Cormorant Garamond, serif; font-size: 30px; font-weight: 800; letter-spacing: -0.06em; }
        .hr-logo i { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent); transform: translateX(-130%) rotate(15deg); animation: logoShine 4.8s ease-in-out infinite; }
        @keyframes logoShine { 0%, 42% { transform: translateX(-130%) rotate(15deg); } 68%, 100% { transform: translateX(130%) rotate(15deg); } }
        .brand-name { display: flex; flex-direction: column; }
        .brand-name strong { font-family: Cormorant Garamond, serif; font-size: 34px; line-height: 0.9; color: var(--navy); letter-spacing: -0.03em; }
        .brand-name small { margin-top: 8px; color: var(--muted); font-size: 14px; }
        .nav { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
        .nav-link { color: var(--navy); font-size: 14px; font-weight: 700; padding: 10px 14px; border-radius: 999px; transition: all 0.2s ease; }
        .nav-link:hover, .nav-link.active { color: var(--red); background: rgba(220,38,38,0.08); }
        .resume-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 13px 20px; border-radius: 12px; background: var(--red); color: white; font-size: 14px; font-weight: 800; box-shadow: 0 14px 30px rgba(220,38,38,0.25); }
        .mobile-menu-btn { display: none; width: 46px; height: 46px; border-radius: 14px; background: white; border: 1px solid rgba(220,38,38,0.14); box-shadow: 0 12px 28px rgba(120,20,20,0.08); align-items: center; justify-content: center; flex-direction: column; gap: 5px; }
        .mobile-menu-btn span { width: 20px; height: 2px; border-radius: 999px; background: var(--red); transition: transform 0.24s ease, opacity 0.24s ease; }
        .mobile-menu-btn.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .mobile-menu-btn.open span:nth-child(2) { opacity: 0; }
        .mobile-menu-btn.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .hero { position: relative; display: grid; grid-template-columns: 0.94fr 1.06fr; gap: 40px; min-height: calc(100vh - var(--header-height)); padding: 56px 54px 34px; overflow: hidden; }
        .hero::after { content: ""; position: absolute; right: -120px; top: 0; width: 66%; height: 100%; background: radial-gradient(circle at 50% 34%, rgba(220,38,38,0.14), transparent 42%), linear-gradient(135deg, rgba(255,235,235,0.7), rgba(255,255,255,0)); pointer-events: none; }
        .hero-left { position: relative; z-index: 3; display: flex; flex-direction: column; justify-content: center; max-width: 600px; }
        .eyebrow-pill { width: max-content; display: inline-flex; align-items: center; gap: 12px; padding: 12px 20px; border-radius: 999px; background: rgba(255,255,255,0.85); border: 1px solid rgba(180,83,9,0.18); box-shadow: 0 14px 40px rgba(120,20,20,0.08); color: #8a5a08; font-weight: 700; font-size: 14px; }
        .eyebrow-pill b { color: var(--gold); font-size: 22px; }
        .hero h1 { margin: 46px 0 24px; font-family: Cormorant Garamond, serif; font-size: clamp(58px, 6vw, 94px); line-height: 0.95; letter-spacing: -0.055em; color: var(--navy); }
        .gold-line { width: 104px; height: 4px; background: linear-gradient(90deg, var(--gold), rgba(180,83,9,0)); border-radius: 999px; margin-bottom: 28px; }
        .hero p { color: #3b1a1a; font-size: 19px; line-height: 1.7; max-width: 560px; margin: 0 0 34px; }
        .hero-actions { display: flex; gap: 18px; flex-wrap: wrap; }
        .primary-btn, .secondary-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 54px; padding: 0 26px; border-radius: 12px; font-weight: 800; font-size: 15px; transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer; }
        .primary-btn { color: white; background: var(--red); box-shadow: 0 18px 35px rgba(220,38,38,0.25); }
        .secondary-btn { color: var(--navy); background: white; border: 1px solid #f0b7b7; }
        .primary-btn:hover, .secondary-btn:hover { transform: translateY(-2px); }
        .primary-btn, .secondary-btn, .resume-btn { position: relative; overflow: hidden; }
        .primary-btn::after, .secondary-btn::after, .resume-btn::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent); transform: translateX(-130%) skewX(-18deg); transition: transform 0.55s ease; }
        .primary-btn:hover::after, .secondary-btn:hover::after, .resume-btn:hover::after { transform: translateX(130%) skewX(-18deg); }
        .hero-right { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; min-height: 570px; }

        .ecosystem { position: relative; width: min(720px, 100%); height: 640px; border-radius: 44px; overflow: visible; isolation: isolate; background: radial-gradient(circle at 52% 44%, rgba(255,255,255,0.96), rgba(255,238,238,0.82) 42%, rgba(254,202,202,0.28) 70%, transparent 84%); filter: drop-shadow(0 34px 80px rgba(120,20,20,0.14)); }
        .eco-grid { position: absolute; inset: 0; border-radius: 44px; opacity: 0.28; background-image: radial-gradient(rgba(220,38,38,0.35) 1.4px, transparent 1.4px); background-size: 22px 22px; mask-image: radial-gradient(circle at 76% 18%, black 0, transparent 31%); }
        .eco-glow { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(28px); }
        .glow-one { width: 340px; height: 340px; left: 35%; top: 24%; background: rgba(220,38,38,0.16); }
        .glow-two { width: 240px; height: 240px; left: 8%; top: 47%; background: rgba(251,113,133,0.20); }
        .eco-ring { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; pointer-events: none; z-index: 1; }
        .ring-one { width: 575px; height: 575px; border: 1px solid rgba(220,38,38,0.12); }
        .ring-two { width: 455px; height: 455px; border: 1px dashed rgba(220,38,38,0.28); }
        .ring-three { width: 305px; height: 305px; border: 1px solid rgba(180,83,9,0.18); }
        .eco-lines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2; }
        .eco-center { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 198px; height: 198px; border-radius: 50%; background: rgba(255,255,255,0.95); border: 1px solid rgba(220,38,38,0.20); box-shadow: 0 34px 90px rgba(220,38,38,0.20), inset 0 0 34px rgba(220,38,38,0.06); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--navy); z-index: 5; }
        .eco-center-halo { position: absolute; inset: -14px; border-radius: 50%; border: 1px solid rgba(220,38,38,0.22); box-shadow: 0 0 45px rgba(220,38,38,0.22); }
        .adobe-mark { position: relative; z-index: 2; color: var(--red); font-size: 58px; font-weight: 900; line-height: 0.75; margin-bottom: 14px; }
        .eco-center strong, .eco-center span { position: relative; z-index: 2; line-height: 1.05; font-weight: 800; font-size: 18px; }
        .eco-node-layer { position: absolute; inset: 0; z-index: 8; }
        .eco-node { position: absolute; transform: translate(-50%, -50%); appearance: none; cursor: pointer; width: clamp(90px, 8.8vw, 118px); min-height: clamp(90px, 8.6vw, 116px); border-radius: clamp(22px, 2.2vw, 30px); background: rgba(255,255,255,0.90); border: 1px solid rgba(255,255,255,0.96); box-shadow: 0 24px 60px rgba(120,20,20,0.13), inset 0 1px 0 rgba(255,255,255,0.9); backdrop-filter: blur(18px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; overflow: hidden; z-index: 9; }
        .eco-node:hover { z-index: 20; border-color: rgba(220,38,38,0.36); box-shadow: 0 38px 96px rgba(220,38,38,0.26), 0 0 0 12px rgba(220,38,38,0.08), inset 0 1px 0 rgba(255,255,255,0.95); }
        .node-shine { position: absolute; inset: 0; background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.55), transparent 60%); transform: translateX(-130%); transition: transform 0.7s ease; }
        .eco-node:hover .node-shine { transform: translateX(130%); }
        .eco-node-icon { width: clamp(36px, 3.7vw, 48px); height: clamp(36px, 3.7vw, 48px); border-radius: clamp(13px, 1.4vw, 17px); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: clamp(17px, 1.8vw, 22px); box-shadow: 0 14px 24px rgba(120,20,20,0.16); position: relative; z-index: 2; }
        .eco-node b { position: relative; z-index: 2; color: var(--navy); font-size: clamp(13px, 1.35vw, 17px); letter-spacing: 0.02em; }
        .eco-node small { position: relative; z-index: 2; color: var(--muted); font-weight: 800; font-size: clamp(10px, 1vw, 12px); }
        .node-red .eco-node-icon { background: linear-gradient(135deg, #ef4444, #b91c1c); }
        .node-gold .eco-node-icon { background: linear-gradient(135deg, #f4c95d, #8a5a08); }
        .node-dark .eco-node-icon { background: linear-gradient(135deg, #991b1b, #450a0a); }
        .node-orange .eco-node-icon { background: linear-gradient(135deg, #f97316, #7c2d12); }
        .node-rose .eco-node-icon { background: linear-gradient(135deg, #fb7185, #dc2626); }
        .eco-shadow { position: absolute; left: 50%; bottom: 30px; width: 500px; height: 76px; transform: translateX(-50%); border-radius: 50%; background: radial-gradient(ellipse at center, rgba(120,20,20,0.14), rgba(120,20,20,0.06) 56%, transparent 72%); filter: blur(6px); }

        .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; padding: 20px 54px 64px; }
        .metric-card { position: relative; display: flex; gap: 20px; min-height: 162px; padding: 34px 24px; border-radius: 18px; background: rgba(255,255,255,0.88); border: 1px solid var(--line); box-shadow: 0 18px 45px rgba(120,20,20,0.08); overflow: hidden; }
        .metric-card::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: linear-gradient(90deg, rgba(180,83,9,0), var(--gold), rgba(180,83,9,0)); }
        .metric-icon { width: 58px; height: 58px; flex: 0 0 58px; border-radius: 50%; background: #fff1f2; color: var(--red); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 900; }
        .metric-value { font-family: Cormorant Garamond, serif; font-size: 43px; font-weight: 700; line-height: 0.95; color: var(--navy); }
        .metric-label { margin-top: 8px; font-weight: 800; color: var(--navy); font-size: 14px; }
        .metric-card p { margin: 12px 0 0; color: var(--muted); font-size: 13px; line-height: 1.45; }

        .page-shell { min-height: calc(100vh - var(--header-height)); padding: 70px 54px; scroll-margin-top: var(--header-height); }
        .page-transition { min-height: calc(100vh - var(--header-height)); }
        .section-heading { text-align: center; max-width: 820px; margin: 0 auto 38px; }
        .section-heading span { display: inline-block; color: #986a13; font-size: 12px; font-weight: 900; letter-spacing: 0.32em; text-transform: uppercase; margin-bottom: 10px; }
        .section-heading h1 { margin: 0; font-family: Cormorant Garamond, serif; font-size: clamp(42px, 4vw, 58px); color: var(--navy); letter-spacing: -0.035em; }
        .section-heading h1::after { content: ""; display: block; width: 58px; height: 2px; margin: 16px auto 0; background: var(--gold); }
        .section-heading p { color: var(--muted); font-size: 16px; line-height: 1.7; margin: 18px auto 0; max-width: 700px; }

        .tag-row, .impact-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
        .tag-row span, .impact-row span { background: rgba(220,38,38,0.08); border: 1px solid rgba(220,38,38,0.16); color: var(--red); border-radius: 999px; padding: 7px 12px; font-size: 11px; font-weight: 800; }

        .expertise-layout { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 24px; max-width: 1180px; margin: 0 auto 28px; }
        .expertise-command, .expertise-panel, .stack-column, .featured-work, .work-card-redesign, .experience-card, .cert-card, .contact-card { background: white; border: 1px solid var(--line); border-radius: 28px; box-shadow: 0 18px 48px rgba(120,20,20,0.08); }
        .expertise-command { position: relative; min-height: 560px; padding: 30px; overflow: hidden; background: radial-gradient(circle at 50% 42%, rgba(220,38,38,0.14), transparent 38%), linear-gradient(180deg, white, #fff7f7); }
        .command-top { display: flex; justify-content: space-between; gap: 18px; align-items: flex-start; }
        .command-top span, .work-label { color: var(--red); font-size: 12px; font-weight: 900; letter-spacing: 0.18em; text-transform: uppercase; }
        .command-top strong { color: var(--navy); font-size: 16px; }
        .command-orbit { position: relative; height: 390px; margin-top: 26px; border-radius: 26px; background: radial-gradient(circle, rgba(255,255,255,0.72), rgba(255,241,242,0.54)); overflow: hidden; }
        .command-orbit::before, .command-orbit::after { content: ""; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border: 1px dashed rgba(220,38,38,0.22); border-radius: 50%; }
        .command-orbit::before { width: 310px; height: 310px; }
        .command-orbit::after { width: 220px; height: 220px; border-color: rgba(180,83,9,0.22); }
        .command-core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 132px; height: 132px; border-radius: 50%; background: white; border: 1px solid rgba(220,38,38,0.18); display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 22px 55px rgba(220,38,38,0.16); color: var(--navy); text-align: center; }
        .command-core b { font-size: 22px; }
        .command-core small { color: var(--muted); font-weight: 800; }
        .command-node { position: absolute; width: 112px; min-height: 82px; border-radius: 20px; background: rgba(255,255,255,0.88); border: 1px solid #f3d4d4; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 16px 34px rgba(120,20,20,0.08); }
        .command-node span { color: var(--red); font-weight: 900; font-size: 12px; }
        .command-node strong { color: var(--navy); margin-top: 5px; }
        .command-node-1 { left: 50%; top: 24px; transform: translateX(-50%); }
        .command-node-2 { left: 24px; top: 50%; transform: translateY(-50%); }
        .command-node-3 { right: 24px; top: 50%; transform: translateY(-50%); }
        .command-node-4 { left: 50%; bottom: 24px; transform: translateX(-50%); }
        .expertise-command p { color: var(--muted); line-height: 1.7; margin: 22px 0 0; }
        .expertise-panel-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        .expertise-panel { position: relative; padding: 26px; overflow: hidden; transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .expertise-panel:hover, .stack-column:hover, .featured-work:hover, .experience-card:hover, .cert-card:hover { transform: translateY(-6px); box-shadow: 0 24px 70px rgba(120,20,20,0.12); }
        .expertise-panel::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: linear-gradient(90deg, transparent, var(--red), transparent); }
        .expertise-index { width: 44px; height: 44px; border-radius: 16px; display: flex; align-items: center; justify-content: center; background: #fff1f2; color: var(--red); font-weight: 900; margin-bottom: 18px; }
        .expertise-panel h3, .stack-column h3, .featured-work h3, .work-card-redesign h3 { color: var(--navy); margin: 0 0 12px; }
        .expertise-panel h3 { font-size: 24px; }
        .expertise-panel p { color: var(--muted); line-height: 1.7; margin: 0; font-size: 14px; }
        .stack-matrix { max-width: 1180px; margin: 28px auto 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .stack-column { padding: 24px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .stack-heading { display: flex; gap: 12px; align-items: center; margin-bottom: 18px; }
        .stack-heading span { width: 34px; height: 34px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--red); color: white; font-weight: 900; font-size: 12px; }
        .stack-column div:last-child { display: flex; flex-wrap: wrap; gap: 8px; }
        .stack-column div:last-child span { border: 1px solid #f3d4d4; border-radius: 999px; padding: 7px 11px; color: var(--muted); font-size: 12px; font-weight: 700; background: #fff7f7; }

        .featured-work { max-width: 1180px; margin: 0 auto 24px; display: grid; grid-template-columns: 0.82fr 1.18fr; overflow: hidden; transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .featured-work-visual { min-height: 430px; background: radial-gradient(circle at center, rgba(220,38,38,0.16), transparent 48%), linear-gradient(135deg, #fff1f2, #ffffff); display: flex; align-items: center; justify-content: center; border-right: 1px solid var(--line); }
        .work-radar { position: relative; width: 280px; height: 280px; border-radius: 50%; border: 1px dashed rgba(220,38,38,0.32); animation: radarSpin 24s linear infinite; }
        .work-radar::before, .work-radar::after { content: ""; position: absolute; border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%, -50%); border: 1px solid rgba(180,83,9,0.18); }
        .work-radar::before { width: 190px; height: 190px; }
        .work-radar::after { width: 100px; height: 100px; background: white; box-shadow: 0 22px 55px rgba(220,38,38,0.16); }
        .work-radar span { position: absolute; width: 74px; height: 44px; border-radius: 16px; display: flex; align-items: center; justify-content: center; background: white; color: var(--red); font-weight: 900; box-shadow: 0 14px 28px rgba(120,20,20,0.1); animation: radarCounter 24s linear infinite; }
        .work-radar span:nth-child(1) { left: 50%; top: -20px; transform: translateX(-50%); }
        .work-radar span:nth-child(2) { right: -32px; top: 50%; transform: translateY(-50%); }
        .work-radar span:nth-child(3) { left: 50%; bottom: -20px; transform: translateX(-50%); }
        .work-radar span:nth-child(4) { left: -32px; top: 50%; transform: translateY(-50%); }
        @keyframes radarSpin { to { transform: rotate(360deg); } }
        @keyframes radarCounter { to { rotate: -360deg; } }
        .featured-work-copy { padding: 34px; }
        .featured-work h3 { font-size: clamp(32px, 3vw, 46px); line-height: 1.05; margin-top: 14px; font-family: Cormorant Garamond, serif; }
        .work-impact-large { display: inline-flex; margin: 10px 0 22px; padding: 10px 16px; border-radius: 999px; background: var(--red); color: white; font-weight: 900; }
        .work-story-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .work-story-grid div, .work-mini-block { border: 1px solid #f3d4d4; background: #fff7f7; border-radius: 18px; padding: 18px; }
        .work-story-grid strong, .work-mini-block b { color: var(--red); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
        .work-story-grid p, .work-mini-block p { color: var(--muted); line-height: 1.65; margin: 10px 0 0; font-size: 14px; }
        .work-grid-redesign { max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .work-card-redesign { padding: 28px; }
        .work-card-top { display: flex; justify-content: space-between; gap: 14px; align-items: center; margin-bottom: 18px; }
        .work-card-top span { width: 44px; height: 44px; border-radius: 16px; display: flex; align-items: center; justify-content: center; background: var(--red); color: white; font-weight: 900; }
        .work-card-top strong { color: var(--red); font-size: 13px; }
        .work-card-redesign h3 { font-size: 26px; }
        .work-mini-block { margin-top: 12px; }

        .experience-showcase { max-width: 1180px; margin: 0 auto; display: grid; gap: 24px; }
        .experience-card { display: grid; grid-template-columns: 245px 1fr; gap: 0; overflow: hidden; transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .experience-side { position: relative; padding: 30px; background: linear-gradient(180deg, #fff7f7, #fff1f2); border-right: 1px solid var(--line); display: flex; flex-direction: column; justify-content: flex-start; min-height: 100%; }
        .experience-number { width: 52px; height: 52px; border-radius: 18px; display: flex; align-items: center; justify-content: center; background: var(--red); color: white; font-weight: 900; box-shadow: 0 14px 28px rgba(220,38,38,0.22); margin-bottom: 26px; }
        .experience-side small { display: block; color: var(--muted); font-weight: 800; margin-bottom: 12px; line-height: 1.5; }
        .experience-side strong { color: var(--gold); font-size: 20px; line-height: 1.2; }
        .experience-side em { margin-top: 10px; color: var(--muted); font-style: normal; font-size: 13px; line-height: 1.5; }
        .experience-main { padding: 30px; }
        .experience-topline { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 14px; }
        .experience-topline h3 { margin: 0; color: var(--navy); font-size: 26px; line-height: 1.2; }
        .experience-summary { color: #3b1a1a; line-height: 1.75; margin: 0 0 22px; font-size: 15px; }
        .responsibility-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .responsibility-item { display: flex; gap: 12px; align-items: flex-start; padding: 14px; border-radius: 16px; background: #fff7f7; border: 1px solid #f3d4d4; }
        .responsibility-item span { width: 24px; height: 24px; flex: 0 0 24px; border-radius: 50%; background: rgba(220,38,38,0.1); color: var(--red); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 900; }
        .responsibility-item p { margin: 0; color: var(--muted); line-height: 1.55; font-size: 13px; }
        .compact-impact { margin-top: 0; justify-content: flex-end; min-width: 260px; }
        .compact-impact span { background: rgba(180,83,9,0.1); border-color: rgba(180,83,9,0.22); color: #986a13; }

        .cert-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 34px; max-width: 1000px; margin: 0 auto; }
        .cert-card { display: flex; align-items: center; gap: 34px; padding: 30px; transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .adobe-badge-icon { width: 118px; height: 136px; border-radius: 12px; background: linear-gradient(180deg, #e11d1d, #b91c1c 72%, white 72%); color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 12px 30px rgba(225,29,29,0.18); overflow: hidden; border: 1px solid rgba(185,28,28,0.18); flex: 0 0 118px; }
        .adobe-a { font-size: 48px; font-weight: 900; line-height: 0.8; }
        .adobe-word { font-weight: 800; font-size: 17px; margin-top: 6px; }
        .adobe-certified { font-size: 10px; font-weight: 900; letter-spacing: 0.16em; margin-top: 8px; }
        .adobe-level { margin-top: 14px; padding-top: 8px; color: #111827; width: 100%; text-align: center; font-size: 9px; font-weight: 900; letter-spacing: 0.11em; }
        .cert-copy span { color: #b91c1c; font-size: 13px; font-weight: 800; }
        .cert-copy h3 { margin: 12px 0 4px; color: var(--navy); font-size: 24px; }
        .cert-copy p { margin: 0 0 22px; color: var(--navy); font-size: 21px; }
        .cert-copy a { display: inline-flex; color: #b91c1c; border: 1px solid rgba(185,28,28,0.28); border-radius: 10px; padding: 11px 22px; font-weight: 800; font-size: 13px; }

        .contact-card { max-width: 780px; margin: 0 auto; padding: 34px; display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; text-align: center; }
        .contact-card p { flex: 0 0 100%; color: var(--muted); margin: 18px 0 0; }
        .footer { padding: 28px 54px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; gap: 18px; color: var(--muted); font-size: 13px; background: white; }

        @media (max-width: 1100px) {
          .header { padding: 12px 24px; }
          .hero { grid-template-columns: 1fr; padding: 46px 24px 24px; }
          .hero-right { min-height: auto; }
          .metrics, .stack-matrix { grid-template-columns: repeat(2, 1fr); padding-left: 24px; padding-right: 24px; }
          .expertise-layout, .featured-work { grid-template-columns: 1fr; }
          .expertise-panel-grid, .work-grid-redesign, .cert-grid { grid-template-columns: repeat(2, 1fr); }
          .featured-work-visual { border-right: 0; border-bottom: 1px solid var(--line); }
        }
        @media (max-width: 760px) {
          .portfolio-light { --header-height: 72px; }
          .header {
            position: sticky;
            position: -webkit-sticky;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 999;
            align-items: center;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 12px 14px;
            gap: 10px;
          }
          .brand {
            width: calc(100% - 58px);
            min-width: 0;
            flex: 1 1 auto;
            gap: 12px;
          }
          .mobile-menu-btn { display: flex; flex: 0 0 46px; }
          .brand-name strong { font-size: 25px; }
          .brand-name small { font-size: 11px; }
          .hr-logo {
            width: 48px;
            height: 48px;
            border-radius: 16px;
            flex: 0 0 48px;
          }
          .hr-logo span { font-size: 23px; }
          .nav {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            padding: 0;
            transform: translateY(-8px);
            transition: max-height 0.28s ease, opacity 0.24s ease, transform 0.24s ease, padding 0.24s ease;
          }
          .nav.open {
            max-height: 440px;
            opacity: 1;
            transform: translateY(0);
            padding: 10px 0 4px;
            background: rgba(255,255,255,0.96);
            border-radius: 18px;
            border: 1px solid rgba(220,38,38,0.10);
            box-shadow: 0 18px 40px rgba(120,20,20,0.08);
          }
          .nav-link {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 44px;
            white-space: nowrap;
            font-size: 13px;
            padding: 10px 12px;
            background: rgba(255,255,255,0.82);
            border: 1px solid rgba(220,38,38,0.12);
            box-shadow: 0 10px 22px rgba(120,20,20,0.06);
          }
          .resume-btn {
            grid-column: 1 / -1;
            width: 100%;
            min-height: 46px;
            padding: 10px 13px;
            font-size: 13px;
            white-space: nowrap;
          }

          .hero {
            grid-template-columns: 1fr;
            padding: 28px 14px 18px;
            min-height: auto;
            gap: 24px;
          }
          .hero-left {
            align-items: center;
            text-align: center;
            max-width: 100%;
          }
          .eyebrow-pill {
            max-width: 100%;
            width: auto;
            justify-content: center;
            font-size: 12px;
            padding: 10px 14px;
            gap: 8px;
          }
          .hero h1 {
            margin: 30px 0 18px;
            font-size: clamp(40px, 12vw, 52px);
            line-height: 0.98;
            letter-spacing: -0.045em;
          }
          .gold-line {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;
          }
          .hero p {
            font-size: 15px;
            line-height: 1.65;
            max-width: 95%;
            margin-bottom: 24px;
          }
          .hero-actions {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .primary-btn,
          .secondary-btn {
            width: 100%;
            min-height: 50px;
            padding: 0 18px;
            font-size: 14px;
          }
          .hero-right { min-height: auto; }

          .ecosystem {
            width: 100%;
            height: 430px;
            padding: 0;
            display: block;
            overflow: visible;
            border-radius: 26px;
            background: radial-gradient(circle at 52% 44%, rgba(255,255,255,0.96), rgba(255,238,238,0.82) 42%, rgba(254,202,202,0.28) 70%, transparent 84%);
          }
          .eco-lines,
          .eco-ring,
          .eco-shadow { display: block; }
          .eco-grid { opacity: 0.20; }
          .eco-glow { filter: blur(22px); }
          .glow-one {
            width: 230px;
            height: 230px;
            left: 25%;
            top: 8%;
          }
          .glow-two {
            width: 180px;
            height: 180px;
            left: 5%;
            top: 48%;
          }
          .ring-one { width: 360px; height: 360px; }
          .ring-two { width: 285px; height: 285px; }
          .ring-three { width: 190px; height: 190px; }
          .eco-center {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) !important;
            width: 132px;
            height: 132px;
            flex: none;
            box-shadow: 0 20px 55px rgba(220,38,38,0.16), inset 0 0 24px rgba(220,38,38,0.05);
          }
          .eco-center-halo { inset: -9px; }
          .adobe-mark {
            font-size: 38px;
            margin-bottom: 9px;
          }
          .eco-center strong,
          .eco-center span {
            font-size: 13px;
            line-height: 1.02;
          }
          .eco-node-layer {
            position: absolute;
            inset: 0;
            width: 100%;
            display: block;
            z-index: 9;
          }
          .eco-node {
            position: absolute !important;
            transform: translate(-50%, -50%) !important;
            width: clamp(72px, 21vw, 86px);
            min-height: clamp(72px, 21vw, 86px);
            border-radius: 18px;
            gap: 4px;
            box-shadow: 0 12px 30px rgba(120,20,20,0.10), inset 0 1px 0 rgba(255,255,255,0.9);
          }
          .eco-node:hover { transform: translate(-50%, -50%) scale(1.08) !important; }
          .eco-node-icon {
            width: 32px;
            height: 32px;
            font-size: 15px;
            border-radius: 12px;
          }
          .eco-node b { font-size: 11px; }
          .eco-node small { font-size: 8px; }

          .metrics,
          .stack-matrix,
          .expertise-panel-grid,
          .work-grid-redesign,
          .cert-grid {
            grid-template-columns: 1fr;
          }
          .metrics { padding: 10px 14px 46px; }
          .metric-card {
            min-height: auto;
            padding: 22px 18px;
          }
          .page-shell { padding: 42px 14px; }
          .section-heading { margin-bottom: 28px; }
          .section-heading h1 { font-size: 38px; }
          .section-heading p { font-size: 14px; }
          .expertise-layout { grid-template-columns: 1fr; }
          .expertise-command { min-height: auto; padding: 22px; }
          .command-orbit { height: 340px; }
          .work-story-grid,
          .responsibility-grid { grid-template-columns: 1fr; }
          .featured-work { grid-template-columns: 1fr; }
          .featured-work-visual { min-height: 300px; border-right: 0; border-bottom: 1px solid var(--line); }
          .work-radar {
            width: 220px;
            height: 220px;
          }
          .experience-card { grid-template-columns: 1fr; }
          .experience-side {
            border-right: 0;
            border-bottom: 1px solid var(--line);
            padding: 22px;
          }
          .experience-main { padding: 22px; }
          .experience-topline { flex-direction: column; }
          .compact-impact {
            justify-content: flex-start;
            min-width: 0;
          }
          .cert-card {
            display: grid;
            grid-template-columns: 1fr;
            justify-items: start;
          }
          .footer {
            padding: 24px 18px;
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 430px) {
          .hero { padding: 24px 12px 16px; }
          .hero h1 { font-size: 42px; }
          .ecosystem {
            height: 395px;
            padding: 0;
            gap: 0;
            border-radius: 22px;
          }
          .ring-one { width: 330px; height: 330px; }
          .ring-two { width: 260px; height: 260px; }
          .ring-three { width: 175px; height: 175px; }
          .eco-node-layer { gap: 0; }
          .eco-node {
            width: 72px;
            min-height: 72px;
            border-radius: 16px;
          }
          .eco-node-icon {
            width: 30px;
            height: 30px;
            font-size: 14px;
          }
          .eco-node b { font-size: 10px; }
          .eco-node small { font-size: 7.5px; }
          .eco-center {
            width: 118px;
            height: 118px;
            flex-basis: auto;
          }
          .adobe-mark { font-size: 34px; }
          .eco-center strong,
          .eco-center span { font-size: 12px; }
        }
      `}</style>

      <header className="header">
        <button type="button" onClick={() => handleNavClick("home")} className="brand button-reset">
          <HRLogo />
          <span className="brand-name">
            <strong>Hanu Reddy</strong>
            <small>Adobe Experience Cloud Engineer</small>
          </span>
        </button>

        <button
          type="button"
          className={`mobile-menu-btn button-reset ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${mobileMenuOpen ? "open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`nav-link button-reset ${activePage === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              openResume();
              setMobileMenuOpen(false);
            }}
            className="resume-btn button-reset"
          >
            Resume
          </button>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          className="page-transition"
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.38, ease: "easeOut" }}
        >
          {pages[activePage]}
        </motion.div>
      </AnimatePresence>

      <footer className="footer">
        <span>{profile.name} - {profile.role}</span>
        <span>Adobe Certified Professional - AJO - Real-Time CDP</span>
      </footer>
    </main>
  );
}
