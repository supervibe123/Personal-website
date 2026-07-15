import { additionalExperience, internships } from "@/lib/content";

export function Experience() {
  return (
    <section className="section-space section-tint" id="experience">
      <div className="container-shell">
        <header className="section-heading compact-heading">
          <p className="eyebrow">Experience</p>
          <h2>Four internships across operations, research, and analytics.</h2>
        </header>

        <div className="experience-list">
          {internships.map((item) => (
            <article className="experience-row" key={item.company}>
              <div>
                <h3>{item.company}</h3>
                <p>{item.role}</p>
              </div>
              <p className="experience-detail">{item.summary}</p>
              <p className="experience-period">{item.period}</p>
            </article>
          ))}
        </div>

        <div className="additional-experience">
          <p className="eyebrow">Additional experience</p>
          <div>
            {additionalExperience.map((item) => (
              <p key={item.company}>
                <strong>{item.company}</strong> — {item.summary}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
