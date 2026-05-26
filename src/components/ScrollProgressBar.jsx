import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef(null);
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (barRef.current) barRef.current.style.width = pct + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-zinc-900/60 pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-[#E5FE40] transition-none"
        style={{ width: "0%", boxShadow: "0 0 8px 1px #E5FE4066" }}
      />
    </div>
  );
}
