import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text inside a heading into chars/words and reveals them as the
 * element enters the viewport. Works for any <h1>/<h2>/<h3> — call this hook
 * once per heading and pass its ref.
 */
export default function useTitleReveal(ref, options = {}) {
  const splitDone = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || splitDone.current) return;

    const wordNodes = [];
    // Walk text nodes and wrap each character.
    const wrap = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text || !text.trim()) return;
        const frag = document.createDocumentFragment();
        text.split(" ").forEach((word, wi, arr) => {
          if (!word.length) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          const wSpan = document.createElement("span");
          wSpan.style.display = "inline-block";
          wSpan.style.overflow = "hidden";
          wSpan.style.verticalAlign = "top";
          word.split("").forEach((ch) => {
            const cSpan = document.createElement("span");
            cSpan.textContent = ch;
            cSpan.style.display = "inline-block";
            cSpan.style.willChange = "transform, opacity";
            wSpan.appendChild(cSpan);
            wordNodes.push(cSpan);
          });
          frag.appendChild(wSpan);
          if (wi < arr.length - 1)
            frag.appendChild(document.createTextNode(" "));
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(wrap);
      }
    };
    Array.from(el.childNodes).forEach(wrap);
    splitDone.current = true;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordNodes,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: "expo.out",
          stagger: options.stagger ?? 0.018,
          scrollTrigger: {
            trigger: el,
            start: options.start ?? "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
