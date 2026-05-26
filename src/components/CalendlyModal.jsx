import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { PROFILE } from "@/lib/data";

const IFRAME_URL =
  `${PROFILE.calendly}?embed_type=Inline` +
  `&background_color=050505&primary_color=E5FE40&text_color=ffffff` +
  `&hide_gdpr_banner=1&hide_landing_page_details=0`;

export default function CalendlyModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-calendly", handler);
    return () => window.removeEventListener("open-calendly", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center px-4"
      style={{ zIndex: 100000, backgroundColor: "rgba(5,5,5,0.88)", backdropFilter: "blur(6px)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Schedule a call"
    >
      {/* Backdrop — click to close */}
      <div className="absolute inset-0" onClick={() => setOpen(false)} />

      {/* Modal panel */}
      <div
        className="relative flex flex-col w-full border border-zinc-800 bg-[#080808]"
        style={{ maxWidth: 920, height: "min(90vh, 720px)" }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40] animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.35em] text-[#E5FE40]">
              SCHEDULE A CALL · HANU REDDY
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block font-mono text-[9px] tracking-[0.25em] text-zinc-600">
              30 MIN · GOOGLE MEET
            </span>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-7 h-7 border border-zinc-800 text-zinc-500 hover:text-[#E5FE40] hover:border-[#E5FE40] transition-colors"
              aria-label="Close"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* ── Calendly iframe ── */}
        <div className="flex-1 min-h-0">
          <iframe
            key={open}
            src={IFRAME_URL}
            title="Schedule a call with Hanu Reddy"
            width="100%"
            height="100%"
            frameBorder="0"
            allowTransparency="true"
            allow="camera; microphone; fullscreen"
          />
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-zinc-800 px-5 py-2 flex items-center justify-between shrink-0">
          <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-700">
            FORT MILL, SC · UTC-5
          </span>
          <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-700">
            POWERED BY CALENDLY
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
