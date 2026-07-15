import { ArrowUpRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/lib/content";

export function Contact() {
  return (
    <footer className="contact-section" id="contact">
      <div className="container-shell contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let’s talk about the work.</h2>
        </div>
        <div>
          <p>
            I’m interested in analytics, automation, and product-focused data opportunities. Reach
            me by email or connect with me on LinkedIn.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="light">
              <a href={`mailto:${profile.email}`}>
                Email me <Mail aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="lightOutline">
              <a
                href={profile.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="container-shell footer-base">
        <span>James “Mills” Paquin</span>
        <span>Knoxville, Tennessee</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
