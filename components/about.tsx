const skills = [
  { label: "Data", value: "SQL, Dataverse, Excel, predictive modeling" },
  { label: "Applications & automation", value: "Power Apps, Power Automate, Make.com, API integration" },
  {
    label: "APIs & integrations",
    value:
      "U.S. Census Geocoding API, Google Maps API, ESPN API, OpenRouter API, Open-Meteo API, Telegram Bot API",
  },
  {
    label: "Development",
    value:
      "Python, R, RStudio, JavaScript, Flask, T-SQL, Microsoft SQL Server, SQLite, database management, Git & GitHub",
  },
  {
    label: "AI & agents",
    value: "Claude Code, OpenAI Codex, GPT tools, Whisper, Edge TTS, OpenRouter, agentic workflows",
  },
  {
    label: "Business platforms",
    value: "Shopify, SAP, HubSpot, Asana, Microsoft Teams, CoStar, Crexi",
  },
];

export function About() {
  return (
    <section className="section-space" id="about">
      <div className="container-shell about-grid">
        <div>
          <p className="eyebrow">Education & credentials</p>
          <h2>University of Tennessee, Knoxville</h2>
          <p className="degree-copy">
            B.S. in Business Administration · Business Analytics concentration · Expected May 2027
          </p>
        </div>

        <dl className="education-facts">
          <div>
            <dt>GPA</dt>
            <dd>3.49 overall · 4.0 in-major</dd>
          </div>
          <div>
            <dt>Study abroad</dt>
            <dd>John Cabot University · Rome, Italy · Spring 2026</dd>
          </div>
          <div>
            <dt>Leadership & service</dt>
            <dd>Pi Kappa Phi · Volunteer Impact Academy</dd>
          </div>
        </dl>

        <div className="skills-ledger">
          <p className="eyebrow">Technical skills</p>
          {skills.map((skill) => (
            <div key={skill.label}>
              <strong>{skill.label}</strong>
              <span>{skill.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
