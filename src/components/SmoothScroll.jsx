import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const lenisRaf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenisRaf);
      lenis.destroy();
    };
  }, []);

  return children;
}
