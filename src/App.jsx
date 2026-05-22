import { useState } from "react";
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

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  const pages = {
    home:        <HomePage setActivePage={setActivePage} />,
    expertise:   <ExpertisePage />,
    work:        <WorkPage />,
    experience:  <ExperiencePage />,
    credentials: <CredentialsPage />,
    contact:     <ContactPage />,
  };

  return (
    <main className="portfolio-light">
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

        <button
          type="button"
          className={`mobile-menu-btn button-reset ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-nav"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-nav"
          className={`nav ${mobileMenuOpen ? "open" : ""}`}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`nav-link button-reset ${activePage === item.id ? "active" : ""}`}
              aria-current={activePage === item.id ? "page" : undefined}
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
        <span>{profile.name} — {profile.role}</span>
        <span>Adobe Certified Professional — AJO — Real-Time CDP</span>
      </footer>
    </main>
  );
}
