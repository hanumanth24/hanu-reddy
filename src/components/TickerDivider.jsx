import { useEffect, useRef } from "react";
import gsap from "gsap";

const WORDS = [
  "AEM CLOUD SERVICE", "EDGE DELIVERY", "REACT", "GRAPHQL",
  "JOURNEY OPTIMIZER", "RT-CDP", "SLING MODELS", "TYPESCRIPT",
  "ADOBE ANALYTICS", "DISPATCHER", "OSGi", "JAVA",
  "ADOBE LAUNCH", "CJA", "HTL", "EXPERIENCE PLATFORM",
];

export default function TickerDivider({ reversed = false, className = "" }) {
  const rowRef = useRef(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    let tl;
    const id = requestAnimationFrame(() => {
      const w = el.scrollWidth / 2;
      tl = gsap.to(el, {
        x: reversed ? w : -w,
        duration: 32,
        ease: "none",
        repeat: -1,
      });
    });
    return () => { cancelAnimationFrame(id); tl?.kill(); };
  }, [reversed]);

  const doubled = [...WORDS, ...WORDS];

  return (
    <div className={`border-t border-b border-zinc-800/50 py-2.5 overflow-hidden ${className}`}>
      <div ref={rowRef} className="flex w-max">
        {doubled.map((word, i) => (
          <span key={i} className="flex items-center">
            <span className="font-mono text-[9px] tracking-[0.28em] text-zinc-700 whitespace-nowrap px-5 uppercase">
              {word}
            </span>
            <span className="text-zinc-800 text-[7px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
