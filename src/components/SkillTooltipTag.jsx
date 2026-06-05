import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { getSkillDescription } from "@/lib/data";

export default function SkillTooltipTag({ label, className = "", strength = 0.25 }) {
  const ref = useRef(null);
  const tooltipId = useId();
  const [tooltip, setTooltip] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const description = getSkillDescription(label);

  useEffect(() => {
    const query = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setIsTouch(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!tooltip) return undefined;
    const close = (event) => {
      if (ref.current?.contains(event.target)) return;
      setTooltip(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", close);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", close);
    };
  }, [tooltip]);

  const closeOnEscape = (event) => {
    if (event.key === "Escape") setTooltip(null);
  };

  const positionTooltip = (x, y) => {
    if (isTouch) {
      setTooltip({ mode: "sheet" });
      return;
    }
    const width = Math.min(360, window.innerWidth - 32);
    const height = 150;
    const nextX = Math.min(Math.max(x + 20, 16), window.innerWidth - width - 16);
    const shouldFlip = y + height + 24 > window.innerHeight;
    const nextY = shouldFlip ? Math.max(y - height - 20, 16) : y + 20;
    setTooltip({ mode: "float", x: nextX, y: nextY });
  };

  const onMove = (event) => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    positionTooltip(event.clientX, event.clientY);
    gsap.to(el, {
      x: (event.clientX - rect.left - rect.width / 2) * strength,
      y: (event.clientY - rect.top - rect.height / 2) * strength,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const onFocus = () => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    positionTooltip(rect.left + rect.width / 2, rect.bottom);
  };

  const closeTooltip = () => {
    setTooltip(null);
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
  };

  const onClick = (event) => {
    if (!isTouch) return;
    event.preventDefault();
    setTooltip((current) => (current ? null : { mode: "sheet" }));
  };

  const tooltipCard = (
    <div
      id={tooltipId}
      role="tooltip"
      className={
        tooltip?.mode === "sheet"
          ? "fixed inset-x-0 bottom-0 z-[90] border-t border-[#E5FE40] bg-[#070707] px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4 shadow-[0_-12px_40px_rgba(0,0,0,0.55)]"
          : "fixed z-[90] w-[min(22.5rem,calc(100vw-2rem))] border border-zinc-700 bg-[#070707]/95 p-4 shadow-[8px_8px_0_rgba(229,254,64,0.18)] pointer-events-none"
      }
      style={tooltip?.mode === "float" ? { left: tooltip.x, top: tooltip.y } : undefined}
    >
      <div className="mb-3 flex items-start justify-between gap-4 border-b border-zinc-800 pb-3">
        <div>
          <div className="mb-1 font-mono text-[8px] tracking-[0.32em] text-zinc-500">STACK NOTE</div>
          <div className="font-display text-lg font-semibold uppercase leading-none text-[#E5FE40]">
            {label}
          </div>
        </div>
        <span className="font-mono text-[9px] tracking-[0.28em] text-zinc-600">
          {tooltip?.mode === "sheet" ? "TAP OUT" : "HOVER"}
        </span>
      </div>
      <p className="max-w-xl font-mono text-[12px] leading-relaxed tracking-normal text-zinc-300">
        {description}
      </p>
    </div>
  );

  return (
    <>
      <span
        ref={ref}
        tabIndex={0}
        data-cursor="hover"
        aria-describedby={tooltip ? tooltipId : undefined}
        aria-expanded={isTouch ? Boolean(tooltip) : undefined}
        className={`brutal-tag text-zinc-300 cursor-default select-none inline-block focus:outline-none focus:border-[#E5FE40] focus:text-[#E5FE40] ${className}`}
        onMouseEnter={onMove}
        onMouseMove={onMove}
        onMouseLeave={isTouch ? undefined : closeTooltip}
        onFocus={onFocus}
        onBlur={isTouch ? undefined : closeTooltip}
        onClick={onClick}
      >
        {label}
      </span>
      {tooltip && createPortal(tooltipCard, document.body)}
    </>
  );
}
