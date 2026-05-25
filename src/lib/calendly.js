// Calendly popup helper. Loads the official widget (already included in
// index.html) and opens the inline popup overlay. Falls back to opening the
// URL in a new tab if the widget script isn't ready yet (no network).

import { PROFILE } from "@/lib/data";
import { events } from "@/lib/analytics";

export function openCalendly(surface = "unknown") {
  events.calendlyClick(surface);
  const url = PROFILE.calendly;
  if (typeof window === "undefined") return;
  if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
    window.Calendly.initPopupWidget({
      url,
      pageSettings: {
        backgroundColor: "050505",
        primaryColor: "E5FE40",
        textColor: "ffffff",
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
      },
    });
    return false; // suppress default link behavior
  }
  // Fallback: open in a new tab
  window.open(url, "_blank", "noopener,noreferrer");
  return false;
}
