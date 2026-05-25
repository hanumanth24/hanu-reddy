// Lightweight analytics layer — pushes events to BOTH Adobe Client Data Layer
// (window.adobeDataLayer, consumed by Adobe Launch / AEP Web SDK) and GA4
// (window.dataLayer). No-ops gracefully if neither global is wired up at the
// page level. Keep payload shape close to ACDL conventions so a Launch rule
// can map straight to Analytics eVars / events without transformation.

let booted = false;

export function bootAnalytics() {
  if (booted || typeof window === "undefined") return;
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.dataLayer = window.dataLayer || [];
  // Page load event
  window.adobeDataLayer.push({
    event: "page.loaded",
    page: {
      path: window.location.pathname,
      title: document.title,
      site: "hrb-portfolio",
      timestamp: new Date().toISOString(),
    },
  });
  window.dataLayer.push({
    event: "page_view",
    page_path: window.location.pathname,
    page_title: document.title,
  });
  booted = true;
}

export function track(eventName, props = {}) {
  if (typeof window === "undefined") return;
  const payload = {
    event: eventName,
    site: "hrb-portfolio",
    timestamp: new Date().toISOString(),
    ...props,
  };
  try {
    (window.adobeDataLayer = window.adobeDataLayer || []).push(payload);
  } catch (_) {
    /* noop */
  }
  try {
    (window.dataLayer = window.dataLayer || []).push(payload);
  } catch (_) {
    /* noop */
  }
  // Helpful dev hint:
  if (
    typeof window !== "undefined" &&
    window.location?.hostname === "localhost"
  ) {
    // eslint-disable-next-line no-console
    console.debug("[track]", eventName, props);
  }
}

// Convenience wrappers — keep the call sites readable.
export const events = {
  resumeClick: (surface) => track("resume.download.clicked", { surface }),
  calendlyClick: (surface) => track("calendly.opened", { surface }),
  navClick: (label) => track("nav.link.clicked", { label }),
  projectCardClick: (slug, title) =>
    track("project.card.clicked", { slug, title }),
  caseStudyView: (slug) => track("case_study.viewed", { slug }),
  caseNav: (from, to, dir) =>
    track("case_study.navigated", { from, to, direction: dir }),
  contactSubmit: (success, message) =>
    track("contact.form.submitted", { success, message }),
  linkedinClick: (surface) => track("linkedin.opened", { surface }),
};
