"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Maximize2, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { assetPath } from "@/lib/asset-path";

const screens = [
  {
    id: "league-selection",
    number: "01",
    title: "Choose the league",
    description: "The entry screen narrows the event feed before a rep reaches the calendar.",
    previewSrc: "/assets/eventflow-league-selection.webp",
    fullSrc: "/assets/eventflow-league-selection-full.webp",
    width: 2400,
    height: 1119,
    alt: "EventFlow start screen with professional, college, and other league options",
    className: "eventflow-plate-establishing",
  },
  {
    id: "calendar-selection",
    number: "02",
    title: "Review the calendar",
    description:
      "Daily game volume, selected events, and a direct path into nearby customer opportunities.",
    previewSrc: "/assets/eventflow-calendar.webp",
    fullSrc: "/assets/eventflow-calendar-full.webp",
    width: 2400,
    height: 1109,
    alt: "EventFlow July 2026 calendar showing five games for the selected day",
    className: "eventflow-plate-calendar",
  },
] as const;

type Screen = (typeof screens)[number];

function EventFlowPlate({ screen, index }: { screen: Screen; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className={`eventflow-plate ${screen.className}`}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.68, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className="eventflow-frame"
            type="button"
            aria-label={`Inspect ${screen.title} interface at full size`}
          >
            <Image
              alt={screen.alt}
              height={screen.height}
              sizes="(max-width: 48rem) 100vw, 50vw"
              src={assetPath(screen.previewSrc)}
              width={screen.width}
            />
            <span className="eventflow-inspect-badge">
              <Maximize2 aria-hidden="true" /> Inspect
            </span>
          </button>
        </Dialog.Trigger>

        <figcaption>
          <span>{screen.number}</span>
          <div>
            <strong>{screen.title}</strong>
            <p>{screen.description}</p>
          </div>
          <Dialog.Trigger asChild>
            <button className="eventflow-inspect-label" type="button">
              Inspect image <span aria-hidden="true">↗</span>
            </button>
          </Dialog.Trigger>
        </figcaption>

        <Dialog.Portal>
          <Dialog.Overlay className="eventflow-dialog-overlay" />
          <Dialog.Content className="eventflow-dialog-content">
            <Dialog.Title className="sr-only">{screen.title}</Dialog.Title>
            <Dialog.Description className="sr-only">{screen.description}</Dialog.Description>
            <div className="eventflow-dialog-scroll">
              <Image
                alt={screen.alt}
                height={screen.height}
                sizes="96vw"
                src={assetPath(screen.fullSrc)}
                width={screen.width}
              />
            </div>
            <Dialog.Close className="eventflow-dialog-close" aria-label="Close full-screen screenshot">
              <X aria-hidden="true" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </motion.figure>
  );
}

export function LogoBrandsShowcase() {
  return (
    <div className="eventflow-showcase">
      {screens.map((screen, index) => (
        <EventFlowPlate index={index} key={screen.id} screen={screen} />
      ))}
      <div className="eventflow-disclosure">
        <span>Project note</span>
        <p>
          EventFlow · Power Apps · Summer 2026. These screens show schedule selection and
          opportunity navigation only; customer, account, and rep-activity data is not displayed.
        </p>
      </div>
    </div>
  );
}
