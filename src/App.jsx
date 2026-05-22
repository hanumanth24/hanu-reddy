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
    <motion.div className="hr-logo" initial={{ opacity: 0, scale: 0.88, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} whileHover={{ scale: 1.06, rotate: 1 }} transition={{ duration: 0.35 }} aria-label="HR logo">
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
          return <motion.line key={`line-${node.label}`} x1="350" y1="310" x2={x} y2={y} stroke="url(#redLine)" strokeWidth="1.5" strokeDasharray="10 14" animate={{ strokeDashoffset: [0, -90], opacity: [0.35, 0.72, 0.35] }} transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }} />;
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
          <motion.button type="button" key={node.label} className={`eco-node node-${node.tone}`} style={{ left: `${node.x}%`, top: `${node.y}%` }} whileHover={{ scale: 1.14, y: -8 }} whileTap={{ scale: 1.04 }} transition={{ duration: 0.22, ease: "easeOut" }} aria-label={`${node.label} ${node.sub}`}>
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
    <motion.div className="metric-card" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: index * 0.08 }}>
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
    <motion.section key={title} className="page-shell" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
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
          <motion.div className="eyebrow-pill" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}><b>*</b> Building Exceptional Digital Experiences</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.12 }}>Senior AEM<br />Full Stack Lead</motion.h1>
          <motion.div className="gold-line" initial={{ width: 0 }} animate={{ width: 104 }} transition={{ duration: 0.7, delay: 0.4 }} />
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.26 }}>I architect and deliver scalable, high-performance Adobe Experience Cloud solutions that drive growth, engagement, and measurable business impact.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.38 }}>
            <button type="button" onClick={() => setActivePage("contact")} className="primary-btn button-reset">Let's Connect</button>
            <button type="button" onClick={openResume} className="secondary-btn button-reset">Download Resume</button>
          </motion.div>
        </div>
        <div className="hero-right"><PlatformGraphic /></div>
      </section>
      <section className="metrics">{metrics.map((metric, index) => <MetricCard key={metric.label} metric={metric} index={index} />)}</section>
    </div>
  );
}

function ExpertisePage() {
  return (
    <PageShell eyebrow="Expertise" title="Adobe platform expertise" text="A senior-level view of how I connect content, data, journeys, experimentation and engineering delivery across Adobe Experience Cloud.">
      <div className="expertise-layout">
        <motion.div className="expertise-command" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="command-top"><span>Platform Command Center</span><strong>AEM + AEP + AJO</strong></div>
          <div className="command-orbit">
            <div className="command-core"><b>Adobe</b><small>Experience Cloud</small></div>
            {expertiseCards.map((item, index) => <div className={`command-node command-node-${index + 1}`} key={item.title}><span>0{index + 1}</span><strong>{item.title.split(" ")[0]}</strong></div>)}
          </div>
          <p>I focus on building scalable Adobe ecosystems where authoring, personalization, analytics and frontend delivery work together as one production-ready platform.</p>
        </motion.div>
        <div className="expertise-panel-grid">
          {expertiseCards.map((item, index) => <motion.article className="expertise-panel" key={item.title} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}><div className="expertise-index">0{index + 1}</div><h3>{item.title}</h3><p>{item.text}</p><div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></motion.article>)}
        </div>
      </div>
      <div className="stack-matrix">{skills.map((skillGroup, index) => <motion.article className="stack-column" key={skillGroup.group} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.06 }}><div className="stack-heading"><span>0{index + 1}</span><h3>{skillGroup.group}</h3></div><div>{skillGroup.items.map((item) => <span key={item}>{item}</span>)}</div></motion.article>)}</div>
    </PageShell>
  );
}

function WorkPage() {
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);
  return (
    <PageShell eyebrow="Work" title="Selected Adobe case studies" text="Portfolio-style project stories focused on problem framing, platform solution and measurable delivery impact.">
      <motion.article className="featured-work" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className="featured-work-visual"><div className="work-radar"><span>AEM</span><span>EDS</span><span>CDN</span><span>React</span></div></div>
        <div className="featured-work-copy"><span className="work-label">Featured Case Study</span><h3>{featuredProject.title}</h3><div className="work-impact-large">{featuredProject.impact}</div><div className="work-story-grid"><div><strong>Problem</strong><p>{featuredProject.problem}</p></div><div><strong>What I Built</strong><p>{featuredProject.built}</p></div></div><div className="tag-row">{featuredProject.tech.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      </motion.article>
      <div className="work-grid-redesign">{otherProjects.map((project, index) => <motion.article className="work-card-redesign" key={project.title} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}><div className="work-card-top"><span>0{index + 2}</span><strong>{project.impact}</strong></div><h3>{project.title}</h3><div className="work-mini-block"><b>Problem</b><p>{project.problem}</p></div><div className="work-mini-block"><b>Solution</b><p>{project.built}</p></div><div className="tag-row">{project.tech.map((tag) => <span key={tag}>{tag}</span>)}</div></motion.article>)}</div>
    </PageShell>
  );
}

function ExperiencePage() {
  return (
    <PageShell eyebrow="Experience" title="Enterprise Adobe delivery" text="A clean summary of responsibilities, platform ownership and measurable delivery impact. This is not the full resume; the PDF can be downloaded from the header.">
      <div className="experience-showcase">{experience.map((job, index) => <motion.article className="experience-card" key={`${job.company}-${job.date}`} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.07 }}><div className="experience-side"><span className="experience-number">0{index + 1}</span><small>{job.date}</small><strong>{job.company}</strong><em>{job.location}</em></div><div className="experience-main"><div className="experience-topline"><h3>{job.role}</h3><div className="impact-row compact-impact">{job.impact.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div></div><p className="experience-summary">{job.summary}</p><div className="responsibility-grid">{job.responsibilities.map((point) => <div className="responsibility-item" key={point}><span>✓</span><p>{point}</p></div>)}</div><div className="impact-row">{job.impact.map((item) => <span key={item}>{item}</span>)}</div></div></motion.article>)}</div>
    </PageShell>
  );
}

function CredentialsPage() {
  return (
    <PageShell eyebrow="Credentials" title="Adobe certifications" text="Credentials aligned with Adobe Experience Cloud implementation, journeys and real-time customer data.">
      <div className="cert-grid">{certifications.map((cert, index) => <motion.article className="cert-card" key={cert.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}><AdobeBadgeIcon /><div className="cert-copy"><span>{cert.label}</span><h3>{cert.title}</h3><p>{cert.subtitle}</p><a href={profile.linkedin} target="_blank" rel="noreferrer">View Credential</a></div></motion.article>)}</div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell eyebrow="Contact" title="Let's build scalable Adobe experiences" text="Available for Senior AEM Developer, AEM Full Stack Lead, AEM Architect, AEP Engineer, AJO Developer and Adobe Experience Cloud roles.">
      <div className="contact-card"><a href={`mailto:${profile.email}`} className="primary-btn">Email Me</a><a href={profile.linkedin} target="_blank" rel="noreferrer" className="secondary-btn">LinkedIn</a><button type="button" onClick={openResume} className="secondary-btn button-reset">Download Resume</button><p>{profile.phone} - {profile.location}</p></div>
    </PageShell>
  );
}

export default function App() {
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
      <header className="header">
        <button type="button" onClick={() => handleNavClick("home")} className="brand button-reset"><HRLogo /><span className="brand-name"><strong>Hanu Reddy</strong><small>Adobe Experience Cloud Engineer</small></span></button>
        <button type="button" className={`mobile-menu-btn button-reset ${mobileMenuOpen ? "open" : ""}`} onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen}><span /><span /><span /></button>
        <nav className={`nav ${mobileMenuOpen ? "open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => <button key={item.id} type="button" onClick={() => handleNavClick(item.id)} className={`nav-link button-reset ${activePage === item.id ? "active" : ""}`}>{item.label}</button>)}
          <button type="button" onClick={() => { openResume(); setMobileMenuOpen(false); }} className="resume-btn button-reset">Resume</button>
        </nav>
      </header>
      <AnimatePresence mode="wait"><motion.div key={activePage} className="page-transition" initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -14, filter: "blur(6px)" }} transition={{ duration: 0.38, ease: "easeOut" }}>{pages[activePage]}</motion.div></AnimatePresence>
      <footer className="footer"><span>{profile.name} - {profile.role}</span><span>Adobe Certified Professional - AJO - Real-Time CDP</span></footer>
    </main>
  );
}
