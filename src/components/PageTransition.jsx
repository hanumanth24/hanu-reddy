import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

/**
 * Page transition overlay — a yellow slab that swipes up over the screen on
 * route change, then slides off the top to reveal the new page. Reads route
 * changes via react-router-dom's useLocation. GSAP-driven, no Barba.js
 * dependency.
 */
export default function PageTransition() {
  const overlayRef = useRef(null);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const el = overlayRef.current;
    if (!el) return;
    const tl = gsap.timeline();
    tl.set(el, { y: "100%", display: "block" })
      .to(el, { y: "0%", duration: 0.55, ease: "expo.inOut" })
      .to(el, { y: "-100%", duration: 0.55, ease: "expo.inOut", delay: 0.05 })
      .set(el, { display: "none" });
  }, [location.pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      data-testid="page-transition"
      className="fixed inset-0 z-[9000] pointer-events-none flex flex-col"
      style={{ display: "none", transform: "translateY(100%)" }}
    >
      <div className="flex-1 bg-[#E5FE40] flex items-end justify-end p-8">
        <div className="font-mono text-[10px] tracking-[0.3em] text-[#050505]">
          ↗ HANUMANTH.BARLA
        </div>
      </div>
    </div>
  );
}
