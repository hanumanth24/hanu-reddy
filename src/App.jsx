import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import HRLogo from "./components/HRLogo.jsx";
import { navItems, profile } from "./data/index.js";
import { openResume } from "./utils/resume.js";

const HomePage         = lazy(() => import("./pages/HomePage.jsx"));
const AboutPage        = lazy(() => import("./pages/AboutPage.jsx"));
const ExpertisePage    = lazy(() => import("./pages/ExpertisePage.jsx"));
const ArchitecturePage = lazy(() => import("./pages/ArchitecturePage.jsx"));
const WorkPage         = lazy(() => import("./pages/WorkPage.jsx"));
const ExperiencePage   = lazy(() => import("./pages/ExperiencePage.jsx"));
const CredentialsPage  = lazy(() => import("./pages/CredentialsPage.jsx"));
const BlogPage         = lazy(() => import("./pages/BlogPage.jsx"));
const ContactPage      = lazy(() => import("./pages/ContactPage.jsx"));
const ErrorPage        = lazy(() => import("./pages/ErrorPage.jsx"));

const routeMap = {
  home:         "/",
  about:        "/about",
  expertise:    "/expertise",
  architecture: "/architecture",
  work:         "/work",
  experience:   "/experience",
  credentials:  "/credentials",
  blog:         "/blog",
  contact:      "/contact",
};

function RouteSplash() {
  return (
    <div className="route-splash" role="status" aria-live="polite" aria-label="Loading page">
      <div className="splash-dot-row" aria-hidden="true">
        <span /><span /><span />
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [showTop, setShowTop]     = useState(false);
  const [cursor, setCursor]       = useState({ x: -200, y: -200 });
  const lastScrollY = useRef(0);

  /* scroll-to-top on route change */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  /* auto-hide nav on scroll down, show on scroll up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavHidden(y > lastScrollY.current && y > 120);
      setShowTop(y > 400);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* cursor glow */
  useEffect(() => {
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* body class for overlay */
  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", menuOpen);
    return () => document.body.classList.remove("mobile-nav-open");
  }, [menuOpen]);

  const handleNavClick = (pageId) => {
    navigate(routeMap[pageId]);
    setMenuOpen(false);
  };

  const activeId = Object.entries(routeMap).find(
    ([, path]) => path === location.pathname
  )?.[0] ?? "home";

  return (
    <main className="portfolio-light">

      {/* cursor glow — only visible on non-touch devices */}
      <div
        className="cursor-glow"
        aria-hidden="true"
        style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
      />

      {/* ── Header ── */}
      <header className={`header${navHidden ? " nav-hidden" : ""}`}>
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="brand button-reset"
          aria-label="Go to home"
        >
          <HRLogo />
          <span className="brand-name">
            <strong>Hanu Reddy</strong>
            <small>Adobe Experience Cloud Engineer</small>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="nav-desktop" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`nav-link button-reset${activeId === item.id ? " active" : ""}`}
              aria-current={activeId === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
          <button type="button" onClick={openResume} className="resume-btn button-reset">
            Resume
          </button>
        </nav>

        {/* Hamburger */}
        <button
          type="button"
          className={`hamburger button-reset${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </header>

      {/* ── Mobile overlay ── */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)}>
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-nav-head">
              <span>Navigation</span>
              <strong>Hanu Reddy</strong>
            </div>
            {navItems.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`mobile-nav-link button-reset${activeId === item.id ? " active" : ""}`}
              >
                <span className="mnl-num">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => { openResume(); setMenuOpen(false); }}
              className="mobile-resume-btn button-reset"
            >
              Download Resume
            </button>
          </nav>
        </div>
      )}

      {/* ── Page content ── */}
      <div className="page-transition">
        <Suspense fallback={<RouteSplash />}>
          <Routes location={location}>
            <Route path="/"             element={<HomePage />} />
            <Route path="/about"        element={<AboutPage />} />
            <Route path="/expertise"    element={<ExpertisePage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="/work"         element={<WorkPage />} />
            <Route path="/experience"   element={<ExperiencePage />} />
            <Route path="/credentials"  element={<CredentialsPage />} />
            <Route path="/blog"         element={<BlogPage />} />
            <Route path="/contact"      element={<ContactPage />} />
            <Route path="*"             element={<ErrorPage code={404} />} />
          </Routes>
        </Suspense>
      </div>

      {/* ── Footer ── */}
      <footer className="footer">
        <span>{profile.name} — {profile.role}</span>
        <span>Adobe Certified Professional — AJO — Real-Time CDP</span>
        <button
          type="button"
          className={`back-to-top button-reset${showTop ? " visible" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </footer>
    </main>
  );
}
