import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, Component, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { bootAnalytics } from "@/lib/analytics";

// Homepage loads eagerly — it's the entry point
import Portfolio from "@/pages/Portfolio";
import SkillsPage from "@/pages/SkillsPage";

// All other routes lazy-loaded — their JS (incl. Three.js for canvas pages)
// only downloads when the user navigates there
const CaseStudy        = lazy(() => import("@/pages/CaseStudy"));
const AchievementsPage = lazy(() => import("@/pages/AchievementsPage"));
const ResumePage       = lazy(() => import("@/pages/ResumePage"));
const PageTransition   = lazy(() => import("@/components/PageTransition"));
const CommandPalette   = lazy(() => import("@/components/CommandPalette"));
const ThemePicker      = lazy(() => import("@/components/ThemePicker"));

const shouldShowMobileSplash = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

function SplashScreen() {
  const firstName = "HANU";
  const lastName = "REDDY";
  const role = "SENIOR AEM-RTCDP LEAD";
  const stacks = ["AEP", "RT-CDP", "AJO", "AEM"];

  return (
    <div className="splash-screen" role="status" aria-label="Loading Hanu Reddy portfolio">
      <div className="splash-grid" aria-hidden="true" />
      <div className="splash-panel" aria-hidden="true" />
      <div className="splash-rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="splash-energy" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="splash-core">
        <div className="splash-role" aria-hidden="true">
          {role.split("").map((letter, index) => (
            <span key={`role-${letter}-${index}`} style={{ "--i": index }}>{letter === " " ? "\u00A0" : letter}</span>
          ))}
        </div>
        <div className="splash-monogram" aria-label="HR">
          <span className="splash-letter-h">H</span>
          <span className="splash-letter-r">R</span>
        </div>
        <div className="splash-name" aria-label="Hanu Reddy">
          {firstName.split("").map((letter, index) => (
            <span key={`first-${letter}-${index}`} style={{ "--i": index }}>{letter}</span>
          ))}
          <span className="splash-space" aria-hidden="true" />
          {lastName.split("").map((letter, index) => (
            <span key={`last-${letter}-${index}`} style={{ "--i": index + firstName.length }}>{letter}</span>
          ))}
        </div>
        <div className="splash-stack-row" aria-hidden="true">
          {stacks.map((stack, index) => (
            <span key={stack} style={{ "--i": index }}>{stack}</span>
          ))}
        </div>
        <div className="splash-loading-overlay" aria-hidden="true">
          <span className="splash-loading-text">INITIALIZING PORTFOLIO</span>
          <span className="splash-loading-track">
            <span className="splash-loading-fill" />
          </span>
        </div>
      </div>
      <div className="splash-bottom-bar" aria-hidden="true">
        <span>01</span>
        <span>MOBILE INTRO</span>
      </div>
    </div>
  );
}

function useMobilePullRefresh() {
  const [pullStatus, setPullStatus] = useState({ distance: 0, refreshing: false });

  useEffect(() => {
    if (!shouldShowMobileSplash()) return undefined;

    let startY = 0;
    let currentPull = 0;
    let tracking = false;

    const onTouchStart = (event) => {
      if (window.scrollY > 0 || event.touches.length !== 1) return;
      startY = event.touches[0].clientY;
      currentPull = 0;
      tracking = true;
    };

    const onTouchMove = (event) => {
      if (!tracking) return;
      if (window.scrollY > 0) {
        tracking = false;
        currentPull = 0;
        setPullStatus({ distance: 0, refreshing: false });
        return;
      }

      currentPull = Math.max(0, event.touches[0].clientY - startY);
      setPullStatus({ distance: Math.min(currentPull, 132), refreshing: false });
    };

    const onTouchEnd = () => {
      if (!tracking) return;
      tracking = false;

      if (currentPull >= 104) {
        setPullStatus({ distance: 132, refreshing: true });
        window.setTimeout(() => window.location.reload(), 180);
        return;
      }

      currentPull = 0;
      setPullStatus({ distance: 0, refreshing: false });
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return pullStatus;
}

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ background: "#050505", color: "#E5FE40", padding: "40px", fontFamily: "monospace", fontSize: "14px", minHeight: "100vh" }}>
          <h1 style={{ color: "#fff", marginBottom: "16px" }}>RENDER ERROR</h1>
          <pre style={{ whiteSpace: "pre-wrap", color: "#ff4444" }}>{String(this.state.error)}</pre>
          <pre style={{ whiteSpace: "pre-wrap", color: "#a1a1aa", marginTop: "16px", fontSize: "12px" }}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [showSplash, setShowSplash] = useState(shouldShowMobileSplash);
  const pullStatus = useMobilePullRefresh();

  useEffect(() => {
    bootAnalytics();
    if (!shouldShowMobileSplash()) return undefined;
    const splashId = window.setTimeout(() => setShowSplash(false), 2300);
    return () => window.clearTimeout(splashId);
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        {showSplash && <SplashScreen />}
        <div
          className={`pull-refresh-indicator${pullStatus.distance > 0 ? " is-visible" : ""}${pullStatus.refreshing ? " is-refreshing" : ""}`}
          style={{ "--pull": `${pullStatus.distance}px` }}
          aria-hidden="true"
        >
          <span />
          <strong>{pullStatus.refreshing ? "REFRESHING" : "PULL TO REFRESH"}</strong>
        </div>
        <BrowserRouter>
          <Suspense fallback={null}>
            <PageTransition />
          </Suspense>
          <Suspense fallback={null}>
            <CommandPalette />
          </Suspense>
          <Suspense fallback={null}>
            <ThemePicker />
          </Suspense>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/work/:slug" element={
              <Suspense fallback={null}><CaseStudy /></Suspense>
            } />
            <Route path="/achievements" element={
              <Suspense fallback={null}><AchievementsPage /></Suspense>
            } />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/resume" element={
              <Suspense fallback={null}><ResumePage /></Suspense>
            } />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0a0a0a",
              color: "#ffffff",
              border: "1px solid #27272a",
              borderRadius: 0,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "12px",
              letterSpacing: "0.05em",
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
