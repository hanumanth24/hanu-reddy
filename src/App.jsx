import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import HRLogo from "./components/HRLogo.jsx";
import HomePage from "./pages/HomePage.jsx";
import ExpertisePage from "./pages/ExpertisePage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import ExperiencePage from "./pages/ExperiencePage.jsx";
import CredentialsPage from "./pages/CredentialsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import { navItems, profile } from "./data/index.js";
import { openResume } from "./utils/resume.js";
import { useEffect, useState } from "react";

const routeMap = {
  home:        "/",
  expertise:   "/expertise",
  work:        "/work",
  experience:  "/experience",
  credentials: "/credentials",
  contact:     "/contact",
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              id="mobile-nav"
              className="mobile-nav"
              initial={{ x: 34, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 24, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              aria-label="Mobile navigation"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mobile-nav-head">
                <span>Navigation</span>
                <strong>Hanu Reddy</strong>
              </div>
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`mobile-nav-link button-reset${activeId === item.id ? " active" : ""}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.06 }}
                >
                  <span className="mnl-num">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                type="button"
                onClick={() => { openResume(); setMenuOpen(false); }}
                className="mobile-resume-btn button-reset"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
              >
                Download Resume
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="page-transition"
          initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(5px)" }}
          transition={{ duration: 0.34, ease: "easeOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/credentials" element={<CredentialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <footer className="footer">
        <span>{profile.name} — {profile.role}</span>
        <span>Adobe Certified Professional — AJO — Real-Time CDP</span>
      </footer>
    </main>
  );
}
