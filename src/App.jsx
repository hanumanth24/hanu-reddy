import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import HRLogo from "./components/HRLogo.jsx";
import { navItems, profile } from "./data/index.js";
import { openResume } from "./utils/resume.js";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ExpertisePage = lazy(() => import("./pages/ExpertisePage.jsx"));
const WorkPage = lazy(() => import("./pages/WorkPage.jsx"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage.jsx"));
const CredentialsPage = lazy(() => import("./pages/CredentialsPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));

const routeMap = {
  home:        "/",
  expertise:   "/expertise",
  work:        "/work",
  experience:  "/experience",
  credentials: "/credentials",
  contact:     "/contact",
};

function RouteSplash() {
  return (
    <div className="route-splash" role="status" aria-live="polite" aria-label="Loading page">
      <div className="splash-card">
        <div className="splash-mark">
          <span>AEM</span>
          <i aria-hidden="true" />
        </div>
        <div className="splash-orbit" aria-hidden="true">
          <span className="splash-node splash-node-a">EDS</span>
          <span className="splash-node splash-node-b">CDN</span>
          <span className="splash-node splash-node-c">AJO</span>
        </div>
        <div className="splash-copy">
          <strong>Adobe Experience Cloud</strong>
          <span>Loading enterprise AEM delivery portfolio</span>
        </div>
        <div className="splash-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showInitialSplash, setShowInitialSplash] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const splashTimer = window.setTimeout(() => setShowInitialSplash(false), 1000);
    return () => window.clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("app-splash-open", showInitialSplash);
    return () => document.body.classList.remove("app-splash-open");
  }, [showInitialSplash]);

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
      {showInitialSplash && (
        <div className="initial-splash" aria-label="Loading portfolio">
          <RouteSplash />
        </div>
      )}

      {/* ── Header ── */}
      <header className="header">
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
              className={`nav-link button-reset ${activeId === item.id ? "active" : ""}`}
              aria-current={activeId === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={openResume}
            className="resume-btn button-reset"
          >
            Resume
          </button>
        </nav>

        {/* Mobile hamburger */}
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

      {/* ── Mobile full-screen overlay ── */}
      {menuOpen && (
          <div
            className="mobile-overlay"
            onClick={() => setMenuOpen(false)}
          >
            <nav
              id="mobile-nav"
              className="mobile-nav"
              aria-label="Mobile navigation"
              onClick={(event) => event.stopPropagation()}
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
              <Route path="/" element={<HomePage />} />
              <Route path="/expertise" element={<ExpertisePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/credentials" element={<CredentialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/400" element={<ErrorPage code={400} />} />
              <Route path="/500" element={<ErrorPage code={500} />} />
              <Route path="/error" element={<ErrorPage code={500} />} />
              <Route path="*" element={<ErrorPage code={404} />} />
            </Routes>
          </Suspense>
        </div>

      <footer className="footer">
        <span>{profile.name} — {profile.role}</span>
        <span>Adobe Certified Professional — AJO — Real-Time CDP</span>
      </footer>
    </main>
  );
}
