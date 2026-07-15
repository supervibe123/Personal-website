"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { assetPath } from "@/lib/asset-path";
import { ScrollProgress } from "@/components/scroll-progress";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-18% 0px -66%", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <ScrollProgress />
      <div className="container-shell flex h-18 items-center justify-between gap-6">
        <a className="brand-mark" href="#top" aria-label="Mills Paquin, home">
          <span>MP</span>
          <span className="hidden sm:inline">Mills Paquin</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a
              aria-current={activeSection === link.href ? "location" : undefined}
              className={`nav-link${activeSection === link.href ? " is-active" : ""}`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
          <Button asChild size="sm">
            <a href={assetPath("/assets/James-Mills-Paquin-Resume.pdf")} download>
              Résumé
            </a>
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button aria-label="Open navigation" size="icon" variant="outline">
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>James “Mills” Paquin</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate the portfolio or download Mills Paquin’s résumé.
              </SheetDescription>
            </SheetHeader>
            <nav className="mt-10 flex flex-col border-t border-[var(--line)]" aria-label="Mobile navigation">
              {links.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a className="mobile-nav-link" href={link.href}>
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <Button asChild className="mt-8 w-full">
                <a href={assetPath("/assets/James-Mills-Paquin-Resume.pdf")} download>
                  Download résumé
                </a>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
