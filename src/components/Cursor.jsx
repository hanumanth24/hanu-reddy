import { useEffect, useRef } from "react";

const IS_TOUCH =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

const TRAIL_COUNT = 5;
const TRAIL_LERPS = [0.45, 0.32, 0.22, 0.15, 0.10];
const TRAIL_SIZES = [5, 4, 3.5, 3, 2];
const TRAIL_OPACITIES = [0.55, 0.40, 0.28, 0.18, 0.10];

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
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
    };

    const onOver = (e) => {
      if (e.target.closest("a,button,[data-cursor='hover'],input,textarea,select,[role='button']")) {
        ringRef.current?.classList.add("is-hover");
      }
    };
    const onOut = (e) => {
      if (e.target.closest("a,button,[data-cursor='hover'],input,textarea,select,[role='button']")) {
        ringRef.current?.classList.remove("is-hover");
      }
    };

    let raf;
    const loop = () => {
      // Ring lerp
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px,${pos.current.y}px,0) translate(-50%,-50%)`;
      }

      // Trail: each dot chases the previous position (chained lerp → visible trail)
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
      {/* Trail dots — rendered behind ring/dot */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: TRAIL_SIZES[i],
            height: TRAIL_SIZES[i],
            borderRadius: "50%",
            background: "#E5FE40",
            opacity: TRAIL_OPACITIES[i],
            pointerEvents: "none",
            zIndex: 9997,
            willChange: "transform",
            transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)",
          }}
        />
      ))}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
