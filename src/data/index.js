export const profile = {
  name: "Hanumanth Reddy Barla",
  shortName: "Hanu Reddy",
  title: "Adobe Experience Cloud Engineer",
  role: "Senior AEM Full Stack Lead",
  location: "Fort Mill, SC",
  phone: "(810) 493-7039",
  email: "hanureddy4268@gmail.com",
  linkedin: "https://www.linkedin.com/in/hanu-reddy-8b04b7167/",
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "expertise", label: "Expertise" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

// Fixed: AEM uses "M", AJO uses "J", AEP uses "P", avoiding duplicate "A" icons
export const platformNodes = [
  { label: "AEM", sub: "Content",    tone: "gold",   x: 18, y: 18, icon: "M" },
  { label: "AJO", sub: "Journeys",   tone: "red",    x: 78, y: 18, icon: "J" },
  { label: "CJA", sub: "Insights",   tone: "orange", x: 90, y: 48, icon: "C" },
  { label: "React", sub: "Experience", tone: "rose", x: 70, y: 82, icon: "R" },
  { label: "RT-CDP", sub: "Segments", tone: "dark",  x: 30, y: 82, icon: "P" },
  { label: "AEP", sub: "Profiles",   tone: "red",    x: 10, y: 48, icon: "E" },
];

export const metrics = [
  { icon: "01", value: "10+",        label: "Years Experience",  detail: "Enterprise Adobe Experience Cloud delivery" },
  { icon: "02", value: "50%",        label: "Faster Page Loads", detail: "AEM Cloud, EDS, Dispatcher and CDN optimization" },
  { icon: "03", value: "30%",        label: "Latency Reduction", detail: "CDN and performance tuning for enterprise sites" },
  { icon: "04", value: "Fortune 500", label: "Delivery",         detail: "HD Supply, American Express, Verizon and Cummins" },
];

export const expertiseCards = [
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

export const projects = [
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

export const experience = [
  {
    date: "Jan 2023 – Present",
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
    date: "Jun 2022 – Jan 2023",
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
    date: "Oct 2020 – Jun 2022",
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
    date: "Jun 2019 – Sep 2020",
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
    date: "Oct 2018 – May 2019",
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
    date: "Jun 2018 – Oct 2018",
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
    date: "May 2017 – May 2018",
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
    date: "May 2014 – May 2017",
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

export const certifications = [
  {
    title: "Journey Optimizer",
    subtitle: "Business Practitioner",
    label: "Adobe Certified Professional",
    // Update credlyUrl with your personal Credly badge link from credly.com/my-badges
    credlyUrl: "https://www.credly.com/org/adobe/badge/adobe-certified-professional-adobe-journey-optimizer-business-practitioner",
  },
  {
    title: "Real-Time CDP",
    subtitle: "Business Practitioner",
    label: "Adobe Certified Professional",
    // Update credlyUrl with your personal Credly badge link from credly.com/my-badges
    credlyUrl: "https://www.credly.com/org/adobe/badge/adobe-certified-professional-adobe-real-time-cdp-business-practitioner",
  },
];

export const skills = [
  { group: "Adobe Platform",      items: ["AEM Cloud", "AEM 6.x", "EDS", "AEP", "AJO", "Real-Time CDP", "CJA", "Adobe Target", "Adobe Analytics"] },
  { group: "AEM Engineering",     items: ["HTL", "Sling Models", "OSGi", "JCR", "DAM", "Dispatcher", "Workflows", "Content Fragments", "GraphQL"] },
  { group: "Frontend and Backend", items: ["React", "AEM SPA Editor", "JavaScript", "HTML5", "CSS3", "Java", "Apache Sling", "REST APIs", "Maven"] },
  { group: "Delivery and Quality", items: ["CI/CD", "Jenkins", "Docker", "AWS", "Git", "Agile", "SEO", "Accessibility", "Production Support"] },
];
