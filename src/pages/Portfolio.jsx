import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollProgressBar() {
  const barRef = useRef(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = pct + "%";
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

export default function Portfolio() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <SmoothScroll>
      <ScrollProgressBar />
      <Cursor />
      <Navigation />
      <main data-testid="portfolio-main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Stats />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
