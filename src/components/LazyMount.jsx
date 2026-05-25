import { useEffect, useRef, useState } from "react";

// Mounts children only when the container scrolls within `rootMargin` of the
// viewport. Prevents off-screen WebGL canvases from initialising on page load.
export default function LazyMount({ children, rootMargin = "300px", className, style }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={style}>
      {mounted && children}
    </div>
  );
}
