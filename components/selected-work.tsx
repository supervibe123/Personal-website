import { LockKeyhole } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { LogoBrandsShowcase } from "@/components/logo-brands-showcase";
import { WorldCupScene } from "@/components/world-cup-scene";

export function SelectedWork() {
  return (
    <section className="section-space" id="work">
      <div className="container-shell">
        <header className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Applications, automation, and data interfaces.</h2>
          <p>One internship case study and two recent independent builds.</p>
        </header>

        <article className="feature-case">
          <div className="case-meta">
            <p className="eyebrow">LogoBrands · Digital Operations Internship · May–July 2026</p>
            <div className="case-title">
              <h3>EventFlow</h3>
              <p>A location-based sales prospecting app for upcoming sports events.</p>
            </div>
            <p>
              Sales reps needed a faster way to find customer accounts near upcoming games. I built
              EventFlow in Microsoft Power Apps so reps can choose a league, select games, and open
              the corresponding set of nearby sales opportunities.
            </p>
          </div>

          <div className="metric-grid" role="list" aria-label="EventFlow system scale">
            <div role="listitem">
              <strong>60,000+</strong>
              <span>customer, event, and rep-activity records in Dataverse</span>
            </div>
            <div role="listitem">
              <strong>1,000+</strong>
              <span>venue locations connected to the workflow</span>
            </div>
            <div role="listitem">
              <strong>Nightly</strong>
              <span>ESPN schedule refreshes through Make.com and Power Automate</span>
            </div>
          </div>

          <LogoBrandsShowcase />

          <div className="case-contribution">
            <span>Owned</span>
            <p>
              Data structure, schedule automation, Power Apps interface, ESPN API integration, and
              adoption reporting.
            </p>
          </div>

          <div className="case-contribution case-outcome">
            <span>Outcome</span>
            <p>
              Built-in analytics were designed to track rep adoption and outreach volume. I
              presented the finished platform and an expansion roadmap to sales leadership.
            </p>
          </div>
        </article>

        <Separator />

        <div className="project-grid">
          <article className="project-copy">
            <div>
              <p className="eyebrow">Personal project · Active prototype</p>
              <h3>Jarvis</h3>
            </div>
            <p>
              A local Windows assistant that combines voice input, desktop control, calendar tools,
              and phone access. Built in Python with Whisper, Edge TTS, Flask, SQLite, OpenRouter,
              and a configurable desktop interface.
            </p>
            <p className="project-meta">Python · Whisper · Edge TTS · Flask · SQLite</p>
            <a
              className="project-note"
              href="mailto:mills.paquin@gmail.com?subject=Jarvis%20demo"
            >
              <LockKeyhole aria-hidden="true" /> Private build · Demo available on request
            </a>
          </article>

          <article className="project-copy predictor-copy">
            <div>
              <p className="eyebrow">Interface concept · June 2026</p>
              <h3>World Cup 2026 Forecast Dashboard</h3>
            </div>
            <p>
              An interface concept for comparing match forecasts, model confidence, and scenario
              changes in one focused workspace.
            </p>
            <p className="project-meta">Data visualization · Product design</p>
          </article>
        </div>

        <WorldCupScene />
      </div>
    </section>
  );
}
