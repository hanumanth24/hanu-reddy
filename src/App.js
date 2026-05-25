import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "@/pages/Portfolio";
import CaseStudy from "@/pages/CaseStudy";
import PageTransition from "@/components/PageTransition";
import { Toaster } from "sonner";
import { bootAnalytics } from "@/lib/analytics";
import { useEffect, Component } from "react";

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
        <PageTransition />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
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
