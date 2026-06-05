export const PROFILE = {
  name: "HANUMANTH REDDY BARLA",
  title: "Senior RT-CDP Architect & AEP Lead",
  location: "Fort Mill, SC",
  email: "hanureddy4268@gmail.com",
  phone: "(810) 493-7039",
  linkedin: "https://www.linkedin.com/in/hanu-reddy-8b04b7167/",
  calendly: "https://calendly.com/hanureddy4268",
  resumeUrl: "/Hanumanth_Reddy_RTCDP_Architect_Resume.pdf",
  manifesto:
    "Senior Adobe Real-Time CDP Architect and Certified AEP Professional with 10+ years delivering enterprise customer data platform solutions for Fortune 500 clients including HD Supply, American Express, Verizon, and Cummins. Deep expertise leading end-to-end RT-CDP architecture — XDM schema design, source ingestion, identity resolution, profile strategy, audience segmentation, consent governance, and activation across B2C, B2B, and B2P use cases. Trusted senior technical advisor to executive and marketing stakeholders on architecture tradeoffs and implementation roadmaps; expertise spans RT-CDP, AJO, CJA, Marketo, Salesforce integration, and the full Adobe Experience Platform ecosystem. Consistent business impact: 25% engagement uplift, 50% faster page loads, 30% CDN latency reduction.",
};

export const STATS = [
  { value: 10, suffix: "+", label: "YEARS BUILDING" },
  { value: 50, suffix: "%", label: "PAGE LOAD REDUCTION" },
  { value: 30, suffix: "%", label: "CDN LATENCY DROP" },
  { value: 40, suffix: "%", label: "BUFFER REDUCTION" },
  { value: 25, suffix: "%", label: "ENGAGEMENT UPLIFT" },
];

export const PROJECTS = [
  {
    id: "p01",
    slug: "edge-first-commerce",
    code: "01 / AEM CLOUD",
    title: "EDGE-FIRST COMMERCE",
    client: "HD Supply",
    period: "2023 — 2026",
    role: "Senior AEM Full Stack Lead",
    summary:
      "Migrated high-traffic e-commerce surfaces to AEM as a Cloud Service with Edge Delivery Services. Re-architected component-level caching and headless content fragments to cut TTFB in half.",
    metrics: ["50% faster page loads", "25% engagement uplift", "EDS caching"],
    tags: ["AEM CS", "EDS", "React SPA", "HTL", "Sling"],
    image:
      "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=srgb&fm=jpg",
    problem:
      "The legacy AEM 6.5 stack couldn't keep up with peak commerce traffic. Time-to-first-byte was bloating, dispatcher cache hit-rates were inconsistent, and product pages were redrawing on every navigation. The merchandising team needed a faster, more componentized authoring surface without giving up SSR or SEO.",
    solution:
      "We staged a phased migration to AEM as a Cloud Service paired with Edge Delivery Services. Critical routes (PLP, PDP, search) moved to EDS first to harvest sub-200ms TTFB. We rebuilt the component library on HTL + Sling Models with React islands for interactive surfaces, hoisted Content Fragments + Experience Fragments behind a GraphQL layer for omnichannel reuse, and tightened dispatcher caching rules around personalized fragments.",
    architecture: [
      "Edge Delivery Services for static-first PLP/PDP",
      "AEM Cloud Author + Publish + Dispatcher (Skyline)",
      "Headless via Content Fragments + GraphQL Persisted Queries",
      "React SPA islands hydrated on the AEM SPA Editor",
      "Adobe Analytics + Launch (ACDL) for unified data layer",
    ],
    stack: [
      "AEM Cloud Service",
      "Edge Delivery Services",
      "React 18",
      "HTL / Sightly",
      "Sling Models",
      "OSGi / Felix",
      "GraphQL",
      "Adobe Analytics",
    ],
    metricsDetail: [
      { value: "50%", label: "Page load reduction" },
      { value: "25%", label: "Engagement uplift" },
      { value: "<200ms", label: "Median TTFB on EDS routes" },
      { value: "99.9%", label: "Cache-hit ratio post-tuning" },
    ],
  },
  {
    id: "p02",
    slug: "event-triggered-journeys",
    code: "02 / JOURNEY OPTIMIZER",
    title: "EVENT-TRIGGERED JOURNEYS",
    client: "HD Supply",
    period: "2024 — 2026",
    role: "Senior AEM Full Stack Lead",
    summary:
      "Designed and deployed AJO journeys on top of Real-Time CDP profiles. Offer decisioning, eligibility rules, and cross-channel orchestration powered by AEP event-streams.",
    metrics: ["AJO + RT-CDP", "Offer decisioning", "Cross-channel"],
    tags: ["AJO", "RT-CDP", "AEP", "CJA"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg",
    problem:
      "Marketing was running siloed email campaigns with no shared identity layer. A customer browsing on web wouldn't be reflected in the next email send for hours. There was no way to react to real-time intent (cart abandon, browse abandon) across channels.",
    solution:
      "Stood up Adobe Experience Platform as the central data layer, with stitched profiles via Identity Resolution. Built event-triggered AJO journeys for cart-abandon, browse-abandon, and post-purchase. Connected the Offer Decisioning service so each touchpoint pulls eligible offers honoring exclusion + capping rules. Customer Journey Analytics gave the team unified cross-channel attribution.",
    architecture: [
      "AEP Real-Time Customer Profiles + Identity Service",
      "AJO event-triggered journeys with branching logic",
      "Offer Decisioning with eligibility + ranking + capping",
      "CJA dataset stitching for cross-channel attribution",
      "Source connectors: CRM, Web SDK, Mobile SDK, Server APIs",
    ],
    stack: [
      "Adobe Journey Optimizer",
      "Real-Time CDP",
      "Customer Journey Analytics",
      "Adobe Experience Platform",
      "Identity Service",
      "Offer Decisioning",
    ],
    metricsDetail: [
      { value: "Real-time", label: "Profile activation latency" },
      { value: "4+", label: "Channels orchestrated" },
      { value: "GDPR", label: "& CCPA compliant by design" },
      { value: "100%", label: "Test coverage on journey flows" },
    ],
  },
  {
    id: "p03",
    slug: "global-content-delivery",
    code: "03 / CDN / DISPATCHER",
    title: "GLOBAL CONTENT DELIVERY",
    client: "American Express",
    period: "2022 — 2023",
    role: "Senior AEM Developer",
    summary:
      "Tuned AEM Publish + Dispatcher + global CDN tiers, SSL/TLS edge termination, and DDoS posture for a high-security financial surface.",
    metrics: ["30% latency drop", "15% load improvement", "SSL / TLS / WAF"],
    tags: ["AEM 6.5", "Dispatcher", "CDN", "Adobe Launch"],
    image:
      "https://images.pexels.com/photos/30820142/pexels-photo-30820142.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    problem:
      "A high-stakes financial property was hitting latency ceilings during global campaign launches. SSL handshakes were slow on legacy origins and the WAF posture was over-blocking valid traffic during DDoS scrubbing. Personalization touched the same cacheable URLs as anonymous browsing, defeating dispatcher caching.",
    solution:
      "Re-tiered the CDN topology, moved SSL/TLS termination to the edge, and tuned WAF rules with deny/allow lists informed by analytics. Split anonymous and authenticated URL spaces so dispatcher could safely cache anonymous routes for hours. Adobe Launch (DTM) was rebuilt around granular eVars/props for funnel reporting.",
    architecture: [
      "Global CDN with edge SSL/TLS termination",
      "Two-tier dispatcher with split anon/auth URL spaces",
      "Adobe Launch + Analytics with custom eVars / events",
      "Adobe Target XT + MVT activities on landing surfaces",
      "WAF posture aligned with security + DevOps",
    ],
    stack: [
      "AEM 6.5",
      "Apache Dispatcher",
      "Global CDN (Akamai)",
      "Adobe Launch",
      "Adobe Target",
      "Adobe Analytics",
    ],
    metricsDetail: [
      { value: "30%", label: "CDN latency drop" },
      { value: "15%", label: "Page load improvement" },
      { value: "99.99%", label: "Uptime through campaign peaks" },
      { value: "0", label: "Critical security findings post-audit" },
    ],
  },
  {
    id: "p04",
    slug: "adaptive-streaming",
    code: "04 / VIDEO + DAM",
    title: "ADAPTIVE STREAMING PIPELINE",
    client: "HD Supply",
    period: "2020 — 2022",
    role: "Senior AEM Developer",
    summary:
      "Stood up adaptive bitrate video delivery through AEM-integrated CDN, optimized DAM renditions, and instrumented the player with Adobe Analytics data layer events.",
    metrics: ["40% buffer reduction", "DAM workflows", "Data layer ACDL"],
    tags: ["DAM", "Adobe Analytics", "ACDL", "Video"],
    image:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=srgb&fm=jpg",
    problem:
      "Product training videos and how-tos buffered constantly, especially on mobile networks. The DAM was producing one heavy MP4 rendition shared across every surface, and there was no analytics signal on which segments viewers abandoned.",
    solution:
      "Configured AEM DAM workflows to generate adaptive bitrate renditions (HLS + DASH ladders) on upload. Routed playback through the CDN with regional caching. Wrapped the player with ACDL events at start / 25% / 50% / 75% / complete + custom error events, feeding Adobe Workspace dashboards.",
    architecture: [
      "AEM DAM workflows → HLS/DASH renditions",
      "CDN-fronted manifest + segment delivery",
      "ACDL-instrumented player wrapper",
      "Adobe Analytics workspace dashboards",
    ],
    stack: [
      "AEM 6.5",
      "AEM Assets (DAM)",
      "HLS / DASH",
      "Adobe Client Data Layer",
      "Adobe Analytics",
    ],
    metricsDetail: [
      { value: "40%", label: "Reduction in buffer time" },
      { value: "3x", label: "Renditions per asset" },
      { value: "100%", label: "Coverage on engagement events" },
      { value: "HLS+DASH", label: "Dual-protocol delivery" },
    ],
  },
  {
    id: "p05",
    slug: "spa-editor-react",
    code: "05 / SPA EDITOR",
    title: "REACT IN-CONTEXT AUTHORING",
    client: "Verizon",
    period: "2019 — 2020",
    role: "Senior AEM Developer",
    summary:
      "Built React micro-frontends on the AEM SPA Editor SDK so business teams could author dynamic component props directly inside Touch UI — without losing SSR or SEO.",
    metrics: ["SPA Editor", "Micro-frontends", "Touch UI authoring"],
    tags: ["React", "SPA Editor", "MSM", "OSGi"],
    image:
      "https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    problem:
      "Authors couldn't edit React-driven components without engineering tickets. Multi-brand sites had drift between regions because each team copy-pasted instead of inheriting from a master.",
    solution:
      "Adopted the AEM SPA Editor SDK so React components register their schema with AEM and become first-class authorable components. Set up MSM + Live Copy across brand sites so master changes propagated automatically with regional overrides preserved.",
    architecture: [
      "AEM SPA Editor SDK + ModelManager",
      "React micro-frontends compiled per brand",
      "Multi-Site Manager + Live Copy hierarchy",
      "OSGi-backed Sling Servlets for dynamic data",
    ],
    stack: [
      "AEM 6.5",
      "React",
      "AEM SPA Editor SDK",
      "Multi-Site Manager",
      "OSGi",
      "AWS / Docker",
    ],
    metricsDetail: [
      { value: "5+", label: "Brands on shared SPA base" },
      { value: "0", label: "Engineering tickets per content edit" },
      { value: "<1d", label: "Time-to-launch for regional variants" },
      { value: "100%", label: "Author parity vs HTL components" },
    ],
  },
  {
    id: "p06",
    slug: "identity-governance",
    code: "06 / IDENTITY",
    title: "GOVERNED CUSTOMER PROFILES",
    client: "HD Supply",
    period: "2023 — 2026",
    role: "Senior AEM Full Stack Lead",
    summary:
      "Defined Identity Resolution standards inside AEP and stitched upstream/downstream pipelines into CRM and cloud systems — GDPR / CCPA compliant by design.",
    metrics: ["Identity stitching", "GDPR / CCPA", "AEP ↔ CRM"],
    tags: ["AEP", "Identity", "Governance", "Salesforce"],
    image:
      "https://images.pexels.com/photos/6214388/pexels-photo-6214388.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    problem:
      "Customer identities were fragmented across CRM, e-commerce, support, and marketing. There was no canonical merge rule, and consent state didn't propagate downstream — a real GDPR/CCPA risk.",
    solution:
      "Defined the identity namespace map (ECID + Email + CRMID) and authored merge policies in AEP. Built source connectors from Salesforce + cloud warehouse and destination connectors back to marketing tools. Embedded consent attributes into every audience segment with auto-suppression on opt-out.",
    architecture: [
      "AEP Identity Service with merge policies",
      "Source ingest: CRM, web SDK, server APIs",
      "Destination activation: AJO, Target, ad platforms",
      "Consent + governance metadata at the dataset layer",
    ],
    stack: [
      "Adobe Experience Platform",
      "Identity Service",
      "Real-Time CDP",
      "Salesforce",
      "Snowflake",
      "Web SDK",
    ],
    metricsDetail: [
      { value: "1", label: "Canonical customer profile" },
      { value: "GDPR + CCPA", label: "Compliant by design" },
      { value: "10+", label: "Source/destination integrations" },
      { value: "Stitched", label: "ECID · Email · CRMID identities" },
    ],
  },
];

export const EXPERIENCE = [
  {
    role: "SR RT-CDP ARCHITECT & AEP LEAD",
    company: "HD Supply",
    location: "Atlanta, GA",
    lat: 33.749,
    lng: -84.388,
    period: "Jan 2023 — Mar 2026",
    bullets: [
      "Led end-to-end RT-CDP solution architecture: XDM schemas for B2C + B2B + B2P use cases, batch/streaming ingestion via Web SDK and Server-Side API, merge policies with deterministic/probabilistic identity matching, profile collapse, householding, and identity graph hygiene across 10M+ customer profiles.",
      "Built ML-assisted + rule-based audience segments with streaming sub-second qualification; designed multi-step AJO journeys (event-triggered, scheduled, transactional) with Offer Decisioning — eligibility rules, AI ranking, frequency capping across Email/Push/In-App — driving 25% engagement uplift.",
      "Defined DULE + GDPR/CCPA data governance framework; integrated AEP with Salesforce CRM for B2P identity resolution and profile enrichment; served as senior technical advisor on architecture tradeoffs and roadmaps; AEM Cloud + EDS delivered 50% page-load reduction.",
    ],
  },
  {
    role: "SR AEM DEVELOPER",
    company: "American Express",
    location: "New York, NY",
    lat: 40.7128,
    lng: -74.006,
    period: "Jun 2022 — Jan 2023",
    bullets: [
      "Designed and built responsive AEM 6.5 web applications with custom templates, components, OSGi services, and Sling Servlets/Models; integrated AEM Publish + Dispatcher tiers with global CDN — 30% latency reduction and 15% page-load improvement backed by SSL/TLS and DDoS protection.",
      "Built React SPA components on the AEM SPA Editor SDK with server-side and client-side Adobe Target personalization experiments; integrated Adobe Analytics (Launch/DTM) for granular interaction tracking and A/B reporting across 3 global financial properties.",
      "Managed AEM DAM workflows for asset ingestion, metadata tagging, and rendition generation; configured Apache Felix Admin Console and registered custom OSGi services to extend platform capabilities.",
    ],
  },
  {
    role: "SR AEM DEVELOPER",
    company: "HD Supply",
    location: "Atlanta, GA",
    lat: 33.749,
    lng: -84.388,
    period: "Oct 2020 — Jun 2022",
    bullets: [
      "Implemented AEM Dispatcher + CDN caching strategies reducing page load times by 50%; optimized video delivery with HLS/DASH adaptive streaming decreasing buffering by 40%; configured ACDL for standardized event tracking feeding Adobe Analytics Workspace.",
      "Set up Adobe Target auto-personalization and Recommendations to improve product discovery metrics; leveraged Content Fragments + Experience Fragments for headless delivery across web, mobile, and third-party channels via React RemoteApp pattern.",
      "Built custom AEM workflows for automated content review, approval, and multi-channel publishing; configured replication agents and dispatcher flush rules; translated business requirements into modular component designs documented on Confluence.",
    ],
  },
  {
    role: "SR AEM DEVELOPER",
    company: "Verizon",
    location: "Dallas, TX",
    lat: 32.7767,
    lng: -96.797,
    period: "Jun 2019 — Sep 2020",
    bullets: [
      "Implemented AEM MSM + Live Copy across multiple brand sites; built React micro-frontends via AEM SPA Editor SDK; instrumented pages with Adobe Analytics custom eVars/props/events via Launch and configured Adobe Target XT + MVT activities for landing page and CTA optimization.",
      "Managed AWS services, automated Docker deployment pipelines, and developed OSGi event listeners and schedulers; led requirement analysis between business stakeholders and offshore engineering teams.",
      "Developed strategic metadata and SEO best practices; conducted ADA knowledge transfer with UI Development teams; configured AEM Dispatcher caching rules and URL mapping to optimize request handling.",
    ],
  },
  {
    role: "SR AEM DEVELOPER",
    company: "PeakActivity",
    location: "Boynton Beach, FL",
    lat: 26.5318,
    lng: -80.0905,
    period: "Oct 2018 — May 2019",
    bullets: [
      "Developed digital consumer experiences using AEM (CRX, Target, DAM) with Angular 6 UI, editable page templates, and CUG-based role access control across 3 e-commerce client properties.",
      "Integrated Adobe Analytics via Launch; configured Adobe Target Experience Fragments as audience- and geolocation-based personalized offers for targeted content delivery.",
      "Built React components via AEM SPA Editor preserving full Touch UI authoring capability; leveraged AEM Core Components and WCM Core as the accessible, extensible foundation for all component development.",
    ],
  },
  {
    role: "SR AEM DEVELOPER",
    company: "LiquidHub",
    location: "Columbia, SC",
    lat: 34.0007,
    lng: -81.0348,
    period: "Jun 2018 — Sep 2018",
    bullets: [
      "Migrated AEM 6.2 → 6.4; built React components mapped to Content Fragments via GraphQL for headless delivery; integrated Adobe Analytics and configured Adobe Target content swap offers.",
      "Integrated AEM with Apache Solr for optimized faceted search; implemented content package management and JUnit test pipeline integrated into Maven build for CI/CD quality assurance.",
      "Wrote JUnit tests for AEM backend services; developed Sling resource resolvers and resource mappings to support clean URL structures and API-first content delivery patterns.",
    ],
  },
  {
    role: "SR AEM DEVELOPER",
    company: "Cummins",
    location: "Columbus, IN",
    lat: 39.2014,
    lng: -85.9214,
    period: "May 2017 — May 2018",
    bullets: [
      "Built AEM components, templates, and Coral UI/Granite UI dialogs with AEM Query Builder + JCR-SQL2 and Oak index tuning; managed environment upgrades and hotfix installations across 3 global industrial product divisions.",
      "Set up Adobe Analytics report suites and classification rules; implemented Adobe Target A/B tests with response tokens for unified analytics reporting; deployed Adobe Campaign for targeted B2B acquisition campaigns.",
      "Developed custom Coral UI/Granite UI dialog frameworks standardizing authoring patterns across global divisions; improved content query performance via JCR-SQL2 and Oak index optimization.",
    ],
  },
  {
    role: "AEM DEVELOPER",
    company: "Consuptra Info Solutions",
    location: "Hyderabad, India",
    lat: 17.385,
    lng: 78.4867,
    period: "May 2014 — Jun 2015",
    bullets: [
      "Developed AEM templates, components, custom OSGi bundles, Sling resource resolvers, and replication agents for enterprise web properties; integrated Google Analytics and Adobe Analytics beacon calls for stakeholder dashboards.",
      "Implemented Adobe Target mbox calls for A/B testing of hero content; executed weekly builds using GIT and Jenkins CI/CD pipelines; coordinated security reviews and provided UAT support.",
      "Configured AEM replication and reverse replication agents to manage content activation and user-generated content flows between publish and author instances.",
    ],
  },
];

export const SKILLS = [
  {
    category: "AEM & ADOBE CLOUD",
    items: [
      "AEM 6.x",
      "AEM Cloud Service",
      "Edge Delivery (EDS)",
      "HTL / Sightly",
      "Sling Models",
      "OSGi / Felix",
      "JCR",
      "CRXDE",
      "Touch UI",
      "DAM",
    ],
  },
  {
    category: "ADOBE EXPERIENCE PLATFORM",
    items: [
      "Journey Optimizer (AJO)",
      "Real-Time CDP (B2C/B2B/B2P)",
      "Customer Journey Analytics",
      "Adobe Target",
      "Adobe Campaign",
      "Marketo",
      "Adobe Launch",
      "XDM Schema Design",
      "Offer Decisioning",
      "Identity Resolution",
      "Segment Builder",
      "Web SDK / Mobile SDK",
      "DULE / Data Governance",
      "AEP Destinations",
      "Salesforce Integration",
    ],
  },
  {
    category: "FRONTEND",
    items: [
      "React",
      "Angular 6",
      "JavaScript ES6+",
      "HTML5",
      "CSS3",
      "jQuery",
      "DOMPurify",
      "html-react-parser",
    ],
  },
  {
    category: "BACKEND & BUILD",
    items: [
      "Java",
      "SQL",
      "Apache Sling",
      "Maven",
      "Apache Solr",
      "REST APIs",
      "GraphQL",
      "Jenkins",
      "Docker",
      "AWS",
    ],
  },
  {
    category: "PRACTICES",
    items: [
      "Agile / Scrum",
      "CI / CD",
      "SSL / TLS",
      "SEO",
      "ADA / a11y",
      "GDPR / CCPA",
      "Workfront",
      "GIT",
      "Confluence",
    ],
  },
];

export const SKILL_DESCRIPTIONS = {
  "AEM 6.x": "Enterprise AEM foundations across templates, components, OSGi services, dispatcher, and author-publish workflows.",
  "AEM Cloud Service": "Cloud-native AEM delivery with Cloud Manager pipelines, modern authoring, scalable publish tiers, and Adobe-managed operations.",
  "Edge Delivery (EDS)": "CDN-first page delivery focused on fast TTFB, lightweight authoring, and high-performance content experiences.",
  "HTL / Sightly": "Secure AEM templating for component markup, authorable content rendering, and clean separation from backend logic.",
  "Sling Models": "Typed Java models for mapping AEM resources and content into reusable component and API data structures.",
  "OSGi / Felix": "Modular Java services, configurations, lifecycle management, and dependency injection inside the AEM runtime.",
  JCR: "Content repository structure, node modeling, queries, permissions, and content storage patterns for AEM sites.",
  CRXDE: "AEM repository inspection and development workflow for nodes, components, scripts, and low-level content debugging.",
  "Touch UI": "Modern AEM authoring interfaces, dialogs, component configuration, and editor-friendly content workflows.",
  DAM: "Digital asset management for metadata, renditions, workflows, search, and asset delivery across enterprise sites.",
  "Journey Optimizer (AJO)": "Cross-channel journey orchestration using events, segments, messages, decisions, and campaign logic.",
  "Real-Time CDP (B2C/B2B/B2P)": "Profile unification, identity strategy, audience segmentation, and activation for consumer and account-based use cases.",
  "Customer Journey Analytics": "Analysis over stitched customer journey datasets with attribution, dashboards, and cross-channel insights.",
  "Adobe Target": "Experimentation and personalization using activities, audiences, offers, and page-level content decisions.",
  "Adobe Campaign": "Campaign execution platform for audience targeting, message orchestration, and lifecycle marketing workflows.",
  Marketo: "Marketing automation for lead management, nurture programs, scoring, forms, and CRM-connected campaign operations.",
  "Adobe Launch": "Tag management for analytics, data layer rules, extensions, consent-aware tracking, and web SDK deployment.",
  "XDM Schema Design": "Experience Data Model planning for events, profiles, identities, field groups, and dataset consistency.",
  "Offer Decisioning": "Rules, eligibility, ranking, capping, and personalized offer selection across journey touchpoints.",
  "Identity Resolution": "Identity graph strategy for stitching profiles across devices, channels, accounts, and known identifiers.",
  "Segment Builder": "Audience definition using profile attributes, events, rules, and activation-ready qualification logic.",
  "Web SDK / Mobile SDK": "Client-side event collection, personalization calls, consent handling, and Adobe Experience Platform data capture.",
  "DULE / Data Governance": "Data usage labeling and enforcement to keep audience activation aligned with privacy and governance policies.",
  "AEP Destinations": "Activation of audiences and profile data to marketing, advertising, analytics, and partner endpoints.",
  "Salesforce Integration": "CRM integration patterns for leads, accounts, contacts, campaign data, and marketing activation loops.",
  React: "Component-driven frontend development with state, routing, hooks, performance tuning, and reusable UI systems.",
  "Angular 6": "Structured single-page application development using components, services, routing, and TypeScript-era Angular patterns.",
  "JavaScript ES6+": "Modern JavaScript with modules, async flows, DOM integration, data handling, and browser-side application logic.",
  HTML5: "Semantic page structure, accessible markup, forms, media, and browser-native web platform capabilities.",
  CSS3: "Responsive layout, visual systems, animation, transitions, and maintainable styling for production interfaces.",
  jQuery: "Legacy DOM scripting, event handling, AJAX interactions, and support for older enterprise frontend stacks.",
  DOMPurify: "Client-side HTML sanitization to reduce XSS risk when rendering dynamic or parsed markup.",
  "html-react-parser": "React rendering of controlled HTML strings with custom transforms and sanitization-friendly workflows.",
  Java: "Backend engineering for AEM services, Sling components, APIs, integrations, and enterprise application logic.",
  SQL: "Relational data querying, joins, reporting, persistence checks, and backend data troubleshooting.",
  "Apache Sling": "Resource-oriented web framework powering AEM routing, servlets, models, and content-backed request handling.",
  Maven: "Java build lifecycle, dependency management, plugin configuration, and repeatable package generation.",
  "Apache Solr": "Search indexing, query tuning, faceting, and retrieval support for content-heavy applications.",
  "REST APIs": "HTTP service design, integration contracts, JSON payloads, authentication, and backend communication patterns.",
  GraphQL: "Structured data querying for headless content, typed response shapes, and frontend-friendly API consumption.",
  Jenkins: "Automated build, test, deployment, and release workflows for enterprise delivery pipelines.",
  Docker: "Containerized development and deployment workflows with reproducible runtime environments.",
  AWS: "Cloud infrastructure familiarity across hosting, networking, storage, and deployment support patterns.",
  "Agile / Scrum": "Sprint planning, backlog grooming, delivery cadence, demos, stakeholder alignment, and team execution.",
  "CI / CD": "Automated build, verification, promotion, and deployment practices that reduce release risk.",
  "SSL / TLS": "Secure transport configuration, certificate handling, HTTPS enforcement, and production security basics.",
  SEO: "Technical search optimization including metadata, crawlability, performance, semantic markup, and structured content.",
  "ADA / a11y": "Accessibility practices for keyboard use, semantics, contrast, screen readers, and inclusive UX.",
  "GDPR / CCPA": "Privacy-aware implementation patterns around consent, data usage, retention, and consumer rights.",
  Workfront: "Project intake, workflow coordination, approvals, and delivery tracking for Adobe-aligned enterprise teams.",
  GIT: "Version control with branching, review workflows, merge discipline, and release-safe collaboration.",
  Confluence: "Technical documentation, decision logs, runbooks, and stakeholder-facing delivery notes.",
};

export const getSkillDescription = (label) =>
  SKILL_DESCRIPTIONS[label] || `Hands-on experience applying ${label} in enterprise Adobe and full-stack delivery.`;

export const CERTIFICATIONS = [
  {
    title: "Adobe Journey Optimizer — Business Practitioner",
    issuer: "Adobe Certified Professional",
  },
  {
    title: "Adobe Real-Time CDP — Business Practitioner",
    issuer: "Adobe Certified Professional",
  },
];

// Update name + company once approved for use. Set nda:true to show "Name withheld" label.
export const TESTIMONIALS = [
  {
    quote:
      "Hanumanth turned our AEM stack into something the marketing org could actually move at — journey-driven, measurable, and fast.",
    name: "",
    role: "VP, Digital Platforms",
    company: "Fortune 500 Retail",
    nda: true,
  },
  {
    quote:
      "A rare blend of Adobe-cert-deep architect and pragmatic engineer. Identity, governance, and personalization — he owns the whole stack.",
    name: "",
    role: "Director of Engineering",
    company: "Fortune 500 Financial Services",
    nda: true,
  },
  {
    quote:
      "He delivered an EDS rollout with measurable load-time wins inside a quarter. That doesn't happen without someone like him driving it.",
    name: "",
    role: "Principal Architect",
    company: "Fortune 500 Telecom",
    nda: true,
  },
  {
    quote:
      "Quiet, thorough, surgical. He bridges business and offshore teams without drama and ships on time.",
    name: "",
    role: "Program Manager",
    company: "Global Enterprise",
    nda: true,
  },
];

export const ACHIEVEMENTS = [
  {
    year: "2026",
    tag: "DELIVERY",
    title: "AEM Cloud + EDS Modernization",
    detail: "Led HD Supply's migration to AEM as a Cloud Service with Edge Delivery Services. 50% faster page loads and 25% engagement uplift across commerce surfaces.",
    color: "#E5FE40",
  },
  {
    year: "2025",
    tag: "CERTIFICATION",
    title: "Adobe Certified Journey Optimizer",
    detail: "Adobe Certified Professional — Journey Optimizer Business Practitioner. First-attempt pass covering event journeys, offer decisioning, and cross-channel flows.",
    color: "#4ade80",
  },
  {
    year: "2025",
    tag: "CERTIFICATION",
    title: "Adobe Certified RT-CDP",
    detail: "Adobe Certified Professional — Real-Time CDP Business Practitioner. Identity resolution, audience segments, profile activation, and data governance.",
    color: "#4ade80",
  },
  {
    year: "2024",
    tag: "ARCHITECTURE",
    title: "AEP Identity Resolution at Scale",
    detail: "Designed the enterprise identity namespace map (ECID + Email + CRMID) and authored AEP merge policies for GDPR/CCPA compliance across 10+ source connectors.",
    color: "#a78bfa",
  },
  {
    year: "2024",
    tag: "PLATFORM",
    title: "Journey Optimizer Orchestration",
    detail: "Deployed AJO + RT-CDP event-triggered journeys — cart-abandon, browse-abandon, post-purchase — with real-time profile activation and offer decisioning.",
    color: "#ff9a3c",
  },
  {
    year: "2022",
    tag: "PERFORMANCE",
    title: "American Express CDN Overhaul",
    detail: "Re-tiered global CDN topology for a Fortune 500 financial property. Achieved 30% latency drop and zero critical security findings post-audit.",
    color: "#60a5fa",
  },
  {
    year: "2021",
    tag: "PERFORMANCE",
    title: "Adaptive Video Streaming Pipeline",
    detail: "Designed AEM DAM-driven HLS + DASH adaptive bitrate streaming for HD Supply product training content. 40% buffer time reduction.",
    color: "#60a5fa",
  },
  {
    year: "2019",
    tag: "DELIVERY",
    title: "Multi-Brand SPA Editor Rollout",
    detail: "Built React micro-frontends on AEM SPA Editor SDK for Verizon — 5+ brands, zero engineering tickets per author content edit, <1 day time-to-launch for regional variants.",
    color: "#E5FE40",
  },
];
