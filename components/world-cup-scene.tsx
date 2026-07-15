"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { assetPath } from "@/lib/asset-path";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function WorldCupScene() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: "top 78%",
            end: "bottom 58%",
            scrub: 0.6,
          },
        });

        timeline
          .fromTo("[data-dashboard]", { scale: 0.965 }, { scale: 1, ease: "none" }, 0)
          .fromTo(
            "[data-note]",
            { opacity: 0.35, y: 24 },
            { opacity: 1, y: 0, stagger: 0.16, ease: "none" },
            0.05,
          );
      });

      return () => media.revert();
    },
    { scope },
  );

  return (
    <div className="predictor-scene" ref={scope}>
      <div className="predictor-image" data-dashboard>
        <picture>
          <source
            height="1000"
            media="(max-width: 48rem)"
            srcSet={assetPath("/assets/world-cup-predictor-mobile.webp")}
            width="430"
          />
          <img
            alt="World Cup 2026 forecast dashboard interface"
            height="980"
            loading="lazy"
            src={assetPath("/assets/world-cup-predictor.webp")}
            width="1440"
          />
        </picture>
      </div>
      <ol className="predictor-notes" aria-label="Dashboard design highlights">
        <li data-note>
          <span>01</span>
          <p>Match forecasts, model confidence, and scenario changes share one workspace.</p>
        </li>
        <li data-note>
          <span>02</span>
          <p>A focused interface concept for comparing outcomes without losing context.</p>
        </li>
      </ol>
    </div>
  );
}
