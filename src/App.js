import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, Component, useEffect } from "react";
import { Toaster } from "sonner";
import { bootAnalytics } from "@/lib/analytics";

// Homepage loads eagerly — it's the entry point
import Portfolio from "@/pages/Portfolio";

// All other routes lazy-loaded — their JS (incl. Three.js for canvas pages)
// only downloads when the user navigates there
const CaseStudy       = lazy(() => import("@/pages/CaseStudy"));
const AchievementsPage = lazy(() => import("@/pages/AchievementsPage"));
const SkillsPage      = lazy(() => import("@/pages/SkillsPage"));
const ResumePage      = lazy(() => import("@/pages/ResumePage"));
const PageTransition  = lazy(() => import("@/components/PageTransition"));

// Minimal dark fallback while lazy chunk loads
function PageLoader() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "10px",
        letterSpacing: "0.35em",
        color: "#27272a",
      }}
    >
      LOADING…
    </div>
  );
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
  useEffect(() => {
    bootAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <BrowserRouter>
          <Suspense fallback={null}>
            <PageTransition />
          </Suspense>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/work/:slug" element={
              <Suspense fallback={<PageLoader />}><CaseStudy /></Suspense>
            } />
            <Route path="/achievements" element={
              <Suspense fallback={<PageLoader />}><AchievementsPage /></Suspense>
            } />
            <Route path="/skills" element={
              <Suspense fallback={<PageLoader />}><SkillsPage /></Suspense>
            } />
            <Route path="/resume" element={
              <Suspense fallback={<PageLoader />}><ResumePage /></Suspense>
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
