import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { ScrollEffects } from "@/components/scroll-effects";
import { SelectedWork } from "@/components/selected-work";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/lib/content";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.preferredName,
  email: `mailto:${profile.email}`,
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: process.env.NEXT_PUBLIC_SITE_URL } : {}),
  sameAs: [profile.linkedin],
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "University of Tennessee, Knoxville",
  },
  knowsAbout: ["Business analytics", "Process automation", "Application development"],
};

export default function Home() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        type="application/ld+json"
      />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <ScrollEffects />
      <main id="main-content">
        <Hero />
        <SelectedWork />
        <Experience />
        <About />
      </main>
      <Contact />
    </>
  );
}
