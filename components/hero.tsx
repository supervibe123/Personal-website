"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/asset-path";

const HeroDataField = dynamic(
  () => import("@/components/hero-data-field").then((module) => module.HeroDataField),
  { ssr: false },
);

export function Hero() {
  const reduceMotion = useReducedMotion();
  const enter = reduceMotion
    ? {}
    : {
        initial: false as const,
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="hero-section" id="top">
      <HeroDataField />
      <div className="hero-field-fallback" aria-hidden="true" />
      <div className="container-shell hero-grid">
        <motion.div className="hero-copy" {...enter}>
          <p className="eyebrow">Business Analytics · University of Tennessee · May 2027</p>
          <h1>I build practical data tools and automated workflows.</h1>
          <p className="hero-intro">
            I’m James “Mills” Paquin, a University of Tennessee student working across analytics,
            automation, and application development. My experience includes Power Apps, SQL,
            Python, API integrations, and predictive modeling.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#work">
                View selected work <ArrowDown aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={assetPath("/assets/James-Mills-Paquin-Resume.pdf")} download>
                Download résumé <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.figure
          className="portrait-frame"
          initial={false}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            alt="James Mills Paquin wearing a navy suit"
            height={1463}
            priority
            sizes="(max-width: 48rem) 100vw, 38vw"
            src={assetPath("/assets/james-mills-paquin-headshot.jpg")}
            width={951}
          />
          <figcaption>
            <span>James “Mills” Paquin</span>
            <span>Knoxville, Tennessee</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
