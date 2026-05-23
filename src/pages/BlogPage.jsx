import { useState } from "react";
import { motion } from "framer-motion";
import PageShell from "../components/PageShell.jsx";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.45, delay },
});

const categories = ["All", "AEM", "AEP / AJO", "Performance", "React", "AI Engineering"];

const posts = [
  {
    category: "AEM",
    title: "Architecting AEM Cloud for High-Traffic E-Commerce",
    summary: "How to design scalable AEM Cloud authoring models, component architecture and Dispatcher caching strategies for enterprise e-commerce platforms under real production load.",
    tags: ["AEM Cloud", "Dispatcher", "CDN", "Authoring"],
    readTime: "8 min read",
    date: "Apr 2025",
  },
  {
    category: "AEM",
    title: "Edge Delivery Services: From Authoring to Lighthouse 100",
    summary: "A practical walkthrough of AEM Edge Delivery Services — block-based authoring, publishing paths, CDN configuration and achieving perfect Core Web Vitals scores.",
    tags: ["EDS", "Core Web Vitals", "Performance", "Authoring"],
    readTime: "6 min read",
    date: "Mar 2025",
  },
  {
    category: "AEP / AJO",
    title: "Building Real-Time Personalization with AEP and AJO",
    summary: "Step-by-step guide to connecting AEP Real-Time CDP profiles with AJO journey triggers, eligibility rules and offer decisioning for cross-channel personalization.",
    tags: ["AEP", "AJO", "RT-CDP", "Personalization"],
    readTime: "9 min read",
    date: "Feb 2025",
  },
  {
    category: "Performance",
    title: "Reducing Enterprise Site Latency by 30% with CDN Tuning",
    summary: "Deep dive into CDN routing rules, Dispatcher cache hierarchies, asset delivery optimization and the techniques used to reduce latency on Fortune 500 production sites.",
    tags: ["CDN", "Dispatcher", "Caching", "Latency"],
    readTime: "7 min read",
    date: "Jan 2025",
  },
  {
    category: "React",
    title: "AEM SPA Editor Patterns for Authorable React Applications",
    summary: "How to build authorable React micro-frontends using AEM SPA Editor — component mapping, model routing, in-context authoring and production-grade best practices.",
    tags: ["React", "SPA Editor", "GraphQL", "AEM"],
    readTime: "10 min read",
    date: "Dec 2024",
  },
  {
    category: "AI Engineering",
    title: "Integrating AI into AEM Engineering Workflows",
    summary: "Practical strategies for incorporating AI tooling into AEM development — intelligent content validation, automated authoring assistance and AI-driven performance analysis.",
    tags: ["AI", "AEM", "Automation", "Engineering"],
    readTime: "5 min read",
    date: "Nov 2024",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <PageShell
      eyebrow="Blog"
      title="Engineering insights and deep dives."
      text="Technical perspectives on Adobe Experience Cloud architecture, performance and modern delivery patterns."
    >

      {/* Category filter */}
      <div className="blog-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`blog-filter button-reset${activeCategory === cat ? " is-active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post grid */}
      <div className="blog-grid">
        {filtered.map((post, i) => (
          <motion.article
            key={post.title}
            className="blog-card"
            {...reveal(i * 0.07)}
          >
            <div className="blog-card-meta">
              <span className="blog-cat">{post.category}</span>
              <span className="blog-date">{post.date}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <div className="blog-card-footer">
              <div className="blog-tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <span className="blog-read-time">{post.readTime}</span>
            </div>
          </motion.article>
        ))}
      </div>

    </PageShell>
  );
}
