import { useEffect, useRef } from "react";

const IS_TOUCH =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

const TRAIL_COUNT = 5;
const TRAIL_LERPS = [0.45, 0.32, 0.22, 0.15, 0.10];
const TRAIL_SIZES = [5, 4, 3.5, 3, 2];
const TRAIL_OPACITIES = [0.55, 0.40, 0.28, 0.18, 0.10];

function getLabel(el) {
  const explicit = el?.closest("[data-cursor-label]");
  if (explicit) return explicit.dataset.cursorLabel;

  const link = el?.closest("a");
  if (link) {
    const href = link.getAttribute("href") || "";
    if (href.includes(".pdf")) return "DOWNLOAD";
    if (href.startsWith("mailto:")) return "EMAIL";
    if (href.startsWith("tel:")) return "CALL";
    if (href.includes("linkedin")) return "CONNECT";
    if (href.includes("calendly")) return "BOOK";
    if (href.startsWith("http")) return "OPEN";
    return "";
  }

  const btn = el?.closest("button");
  if (btn) {
    const text = (btn.textContent || "").toUpperCase();
    if (text.includes("HIRE") || text.includes("BOOK") || text.includes("CALL")) return "BOOK";
    if (text.includes("SEND") || text.includes("TRANSMIT")) return "SEND";
    if (text.includes("RESUME") || text.includes("DOWNLOAD")) return "DOWNLOAD";
    return "";
  }

  if (el?.closest("[data-cursor='hover']")) return "VIEW";

  return "";
}

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const trailRefs = useRef([]);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const trailPos = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );

  useEffect(() => {
    if (IS_TOUCH) return;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${e.clientX + 18}px,${e.clientY + 14}px,0)`;
      }
    };

    const onOver = (e) => {
      const isInteractive = e.target.closest("a,button,[data-cursor='hover'],input,textarea,select,[role='button']");
      if (isInteractive) {
        ringRef.current?.classList.add("is-hover");
        const label = getLabel(e.target);
        if (labelRef.current) {
          labelRef.current.textContent = label;
          labelRef.current.style.opacity = label ? "1" : "0";
        }
      }
    };

    const onOut = (e) => {
      if (e.target.closest("a,button,[data-cursor='hover'],input,textarea,select,[role='button']")) {
        ringRef.current?.classList.remove("is-hover");
        if (labelRef.current) {
          labelRef.current.style.opacity = "0";
        }
      }
    };

    let raf;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px,${pos.current.y}px,0) translate(-50%,-50%)`;
      }

      let prev = target.current;
      trailPos.current.forEach((tp, i) => {
        tp.x += (prev.x - tp.x) * TRAIL_LERPS[i];
        tp.y += (prev.y - tp.y) * TRAIL_LERPS[i];
        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${tp.x}px,${tp.y}px,0) translate(-50%,-50%)`;
        }
        prev = tp;
      });

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (IS_TOUCH) return null;

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          aria-hidden="true"
          style={{
            position: "fixed", top: 0, left: 0,
            width: TRAIL_SIZES[i], height: TRAIL_SIZES[i],
            borderRadius: "50%", background: "#E5FE40",
            opacity: TRAIL_OPACITIES[i], pointerEvents: "none",
            zIndex: 9997, willChange: "transform",
            transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)",
          }}
        />
      ))}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      {/* Contextual label — no mix-blend-mode, floats near cursor */}
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "9px", letterSpacing: "0.25em",
          color: "#E5FE40", pointerEvents: "none",
          zIndex: 10000, opacity: 0,
          transition: "opacity 0.15s ease",
          willChange: "transform",
          transform: "translate3d(-100px,-100px,0)",
          whiteSpace: "nowrap",
        }}
      />
    </>
  );
}
