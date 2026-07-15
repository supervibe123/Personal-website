"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Page-wide scroll polish. Runs after hydration so the static HTML stays
 * fully visible for crawlers, no-JS visitors, and reduced-motion users.
 */
export function ScrollEffects() {
  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Count numeric case-study metrics up from zero when they enter view.
      gsap.utils.toArray<HTMLElement>(".metric-grid strong").forEach((el) => {
        const match = el.textContent?.match(/^([\d,]+)(.*)$/);
        if (!match) return;
        const target = Number(match[1].replace(/,/g, ""));
        const suffix = match[2] ?? "";
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(counter.value).toLocaleString("en-US") + suffix;
          },
        });
      });

      // Staggered rise-in for the EventFlow plates and experience rows.
      const reveals = gsap.utils.toArray<HTMLElement>(".eventflow-plate, .experience-row");
      if (reveals.length) {
        gsap.set(reveals, { autoAlpha: 0, y: 20 });
        ScrollTrigger.batch(reveals, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.09,
              ease: "power2.out",
            }),
        });
      }
    });

    return () => media.revert();
  });

  return null;
}
