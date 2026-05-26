import { events } from "@/lib/analytics";

export function openCalendly(surface = "unknown") {
  events.calendlyClick(surface);
  if (typeof window === "undefined") return false;
  window.dispatchEvent(new CustomEvent("open-calendly", { detail: { surface } }));
  return false;
}
