export const PROFILE = {
  name: "HANUMANTH REDDY BARLA",
  title: "Senior AEM Full Stack Lead",
  location: "Fort Mill, SC",
  email: "hanureddy4268@gmail.com",
  phone: "(810) 493-7039",
  linkedin: "https://www.linkedin.com/in/hanu-reddy-8b04b7167/",
  calendly: "https://calendly.com/hanureddy4268",
  resumeUrl:
    "https://customer-assets.emergentagent.com/job_2de79c03-24f2-460d-b2d6-4adf6d029cff/artifacts/oy4kns8e_Hanumanth_Reddy_Resume-AEM-2026.pdf",
  manifesto:
    "Senior AEM Full Stack Lead and Adobe Certified Professional with 10+ years architecting enterprise-scale digital experiences for Fortune 500 — HD Supply, American Express, Verizon, Cummins. I design and ship Adobe Experience Cloud platforms end-to-end: AEM as a Cloud Service, Edge Delivery, Journey Optimizer, Real-Time CDP, and Customer Journey Analytics. Equal parts engineer, architect, and translator between business and code.",
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
    role: "SR AEM FULL STACK LEAD",
    company: "HD Supply",
    location: "Atlanta, GA",
    lat: 33.749,
    lng: -84.388,
    period: "Jan 2023 — Mar 2026",
    bullets: [
      "Architected AEM Cloud + EDS surfaces; slashed TTFB 820ms → 190ms serving 4M+ monthly visitors — 50% load reduction.",
      "Deployed AJO journeys on RT-CDP real-time profiles, orchestrating 4 channels; drove 25% engagement uplift.",
      "Defined AEP identity resolution across 10+ source/destination connectors; GDPR/CCPA compliant by design.",
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
      "Re-tiered global CDN + Dispatcher; 30% latency drop and 99.99% uptime maintained through peak campaign launches.",
      "AEM 6.5 + React SPA Editor — 0 engineering tickets per content edit across 3 global financial properties.",
      "Adobe Target A/B + MVT testing on Launch; drove double-digit conversion lifts on primary landing surfaces.",
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
      "Dispatcher + CDN caching re-architecture; halved page load times across 500K+ SKU product catalog.",
      "Adaptive streaming pipeline (HLS/DASH); 40% buffer reduction + 100% engagement event coverage via ACDL.",
      "Headless Content Fragments + GraphQL layer; enabled same-day omnichannel content rollouts across 6 surfaces.",
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
      "Dockerized AEM on AWS; cut deployment time from 3+ hours to 12-minute fully automated CI/CD pipelines.",
      "MSM + Live Copy across 5+ multi-brand sites; regional variant launch time reduced to under 1 day.",
      "React micro-frontends on SPA Editor SDK — 0 engineering tickets per content authoring operation.",
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
      "AEM + Angular 6 consumer experiences with editable templates, layout policies, and policy-driven component locking.",
      "Adobe Target experience fragments as offers — 8 A/B tests shipped across 3 client e-commerce properties.",
      "Delivered full component library; reduced time-to-author new pages from days to under 2 hours.",
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
      "AEM 6.2 → 6.4 in-place migration; 0 content loss and zero-downtime cutover across 40K+ pages.",
      "Apache Solr search integration with faceted navigation; cut search result latency by 60%.",
      "GraphQL headless content delivery layer adopted as the standard API pattern for downstream mobile teams.",
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
      "AngularJS custom-elements component library adopted across 3 industrial product divisions globally.",
      "Adobe Campaign + Target — ran 20+ A/B tests informing B2B acquisition flows; statistically significant lift on 14.",
      "Coral UI / Granite UI custom dialog framework; reduced author training overhead by standardising component configs.",
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
      "Real-Time CDP",
      "Customer Journey Analytics",
      "Adobe Target",
      "Adobe Campaign",
      "Adobe Launch",
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
