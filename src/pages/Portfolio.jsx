import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Navigation from "@/components/Navigation";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import TickerDivider from "@/components/TickerDivider";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
        <TickerDivider />
        <About />
        <TickerDivider reversed />
        <Projects />
        <TickerDivider />
        <Experience />
        <TickerDivider reversed />
        <Skills />
        <Stats />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
