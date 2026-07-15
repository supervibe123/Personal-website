export type LinkAction = {
  label: string;
  href: string;
  download?: boolean;
};

export type Metric = {
  value: string;
  label: string;
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  introduction: string;
  location: string;
  focus: string;
  primaryAction: LinkAction;
  secondaryAction: LinkAction;
};

export type CaseStudy = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  headline: string;
  summary: string;
  pipeline: Array<{
    label: string;
    title: string;
    tools: string;
  }>;
  metrics: Metric[];
  closing: string;
  technologies: string[];
};

export type Project = {
  id: string;
  label: string;
  title: string;
  status: string;
  summary: string;
  detail: string;
  technologies: string[];
  image?: {
    desktop: string;
    mobile?: string;
    alt: string;
  };
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  focus: string[];
};

export type LeadershipItem = {
  organization: string;
  role: string;
  period: string;
  summary: string;
};

export type SkillCategory = {
  category: string;
  skills: string[];
};

export const profile = {
  name: "James Mills Paquin",
  preferredName: "Mills Paquin",
  email: "mills.paquin@gmail.com",
  linkedin: "https://www.linkedin.com/in/j-mills-paquin-18b337172",
  resume: "/assets/James-Mills-Paquin-Resume.pdf",
};

export const hero: HeroContent = {
  eyebrow: "Business Analytics student · University of Tennessee · May 2027",
  headline: "I build practical data tools and automated workflows.",
  introduction:
    "I’m James “Mills” Paquin, a University of Tennessee student working across analytics, automation, and application development. My experience includes Power Apps, SQL, Python, API integrations, and predictive modeling.",
  location: "Franklin and Knoxville, Tennessee",
  focus: "Analytics · automation · application development",
  primaryAction: {
    label: "View selected work",
    href: "#work",
  },
  secondaryAction: {
    label: "Download résumé",
    href: profile.resume,
    download: true,
  },
};

export const logoBrandsCase: CaseStudy = {
  id: "logobrands",
  company: "LogoBrands",
  role: "Digital Operations Intern",
  period: "May–July 2026",
  location: "Nashville, Tennessee",
  headline: "A sales prospecting app built around live sports schedules.",
  summary:
    "At LogoBrands, I built a location-based Power Apps platform that generates targeted customer call lists around upcoming professional and college sporting events.",
  pipeline: [
    {
      label: "Source",
      title: "Live sports schedules",
      tools: "ESPN API",
    },
    {
      label: "Automate",
      title: "Nightly refresh",
      tools: "Make.com + Power Automate",
    },
    {
      label: "Deliver",
      title: "Targeted call lists",
      tools: "Power Apps + Dataverse",
    },
  ],
  metrics: [
    {
      value: "60,000+",
      label: "records across customer, event, and rep-activity tables",
    },
    {
      value: "1,000+",
      label: "venue locations connected to the workflow",
    },
    {
      value: "Nightly",
      label: "schedule updates with manual entry eliminated",
    },
  ],
  closing:
    "I also built usage analytics to track rep adoption and outreach volume, then presented the platform and an expansion roadmap to sales leadership.",
  technologies: [
    "Power Apps",
    "Dataverse",
    "SQL",
    "Power Automate",
    "Make.com",
    "ESPN API",
  ],
};

export const jarvis: Project = {
  id: "jarvis",
  label: "Personal project",
  title: "Jarvis",
  status: "Active prototype",
  summary:
    "A local Windows assistant that combines voice input, desktop control, calendar tools, and phone access.",
  detail:
    "The Python prototype connects speech recognition and spoken responses to desktop actions, a configurable interface, local data, and a Telegram bridge.",
  technologies: [
    "Python",
    "Whisper",
    "Edge TTS",
    "Flask",
    "SQLite",
    "OpenRouter",
  ],
};

export const worldCupInterface: Project = {
  id: "world-cup",
  label: "Interface concept",
  title: "World Cup 2026 Forecast Dashboard",
  status: "June 2026",
  summary:
    "An interface concept for comparing match forecasts, model confidence, and scenario changes in one focused workspace.",
  detail:
    "The project explores how dense forecast information can be organized for quick comparison without presenting the interface itself as a validated predictive model.",
  technologies: ["Data visualization", "Product design", "Interface design"],
  image: {
    desktop: "/assets/world-cup-predictor.webp",
    mobile: "/assets/world-cup-predictor-mobile.webp",
    alt: "World Cup 2026 forecast dashboard interface showing forecasts and model signals",
  },
};

export const internships: Experience[] = [
  {
    company: "LogoBrands",
    role: "Digital Operations Intern",
    period: "May–July 2026",
    location: "Nashville, Tennessee",
    summary:
      "Built an event-based sales prospecting application and the automated data pipeline behind it.",
    focus: ["Application development", "Automation", "Data analytics"],
  },
  {
    company: "Chief Litigation Counsel Association",
    role: "Data Analytics, AI & Research Intern",
    period: "May–August 2025",
    location: "Nashville, Tennessee",
    summary:
      "Built a standardized Excel system for membership tracking and analyzed 500+ leadership records to identify recruitment targets.",
    focus: ["Excel systems", "Research", "Data validation"],
  },
  {
    company: "Kurtz Auction & Realty",
    role: "Data, AI & Real Estate Intern",
    period: "July–August 2024",
    location: "Owensboro, Kentucky",
    summary:
      "Used voice recognition and live spreadsheet validation to maintain bid accuracy during auctions, and conducted market research on 50+ properties.",
    focus: ["Market research", "Live data validation", "Property analysis"],
  },
  {
    company: "Legacy Franchise Concepts",
    role: "Data & Commercial Real Estate Intern",
    period: "May–July 2024",
    location: "Atlanta, Georgia",
    summary:
      "Built site-performance models and a decision-support location database using Excel, CoStar, and Crexi.",
    focus: ["Predictive modeling", "Site selection", "Commercial real estate"],
  },
];

export const additionalExperience: Experience[] = [
  {
    company: "University of Tennessee Rec Sports",
    role: "Part-time Associate · Head Official",
    period: "August 2024–Present",
    location: "Knoxville, Tennessee",
    summary:
      "Head official for 50+ intramural games; mentor new officials and lead pregame briefings.",
    focus: ["Leadership", "Communication", "Team accountability"],
  },
  {
    company: "French Fort Vineyards",
    role: "Part-time Associate",
    period: "May 2019–August 2023",
    location: "Brownsville, Kentucky",
    summary:
      "Supported seasonal operations, equipment maintenance, safety, and process improvements.",
    focus: ["Operations", "Safety", "Process improvement"],
  },
];

export const education = {
  school: "University of Tennessee, Knoxville",
  college: "Haslam College of Business",
  degree: "Bachelor of Science in Business Administration",
  major: "Business Analytics",
  collateral: "International Business",
  graduation: "Expected May 2027",
  location: "Knoxville, Tennessee",
  gpa: {
    overall: "3.49 / 4.0",
    inMajor: "4.0 / 4.0",
  },
  studyAbroad: {
    school: "John Cabot University",
    location: "Rome, Italy",
    period: "Spring 2026",
    summary: "Study-abroad semester in Rome, Italy.",
  },
  certification: {
    name: "Bloomberg Finance Fundamentals",
    issuer: "Bloomberg for Education",
    issued: "November 2025",
  },
};

export const leadership: LeadershipItem[] = [
  {
    organization: "Volunteer Impact Academy",
    role: "Member · Scholarship recipient",
    period: "August 2023–Present",
    summary:
      "Completed 75+ community service hours, including MLK Jr. Days of Service and the Catalyst Program.",
  },
  {
    organization: "Pi Kappa Phi Fraternity",
    role: "Member",
    period: "August 2023–Present",
    summary:
      "Participate in philanthropic, volunteer, leadership, and event-organizing activities in Knoxville.",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Data & analytics",
    skills: [
      "SQL",
      "Dataverse",
      "Excel",
      "Data analysis",
      "Predictive modeling",
    ],
  },
  {
    category: "Applications & automation",
    skills: [
      "Power Apps",
      "Power Automate",
      "Make.com",
      "API integration",
      "Process automation",
    ],
  },
  {
    category: "Development",
    skills: [
      "Python",
      "R",
      "RStudio",
      "JavaScript",
      "Flask",
      "T-SQL",
      "Microsoft SQL Server",
      "SQLite",
      "Database management",
      "Git & GitHub",
    ],
  },
  {
    category: "AI & agents",
    skills: [
      "Claude Code",
      "OpenAI Codex",
      "GPT tools",
      "Whisper",
      "Edge TTS",
      "OpenRouter",
      "Agentic workflows",
    ],
  },
  {
    category: "APIs & integrations",
    skills: [
      "U.S. Census Geocoding API",
      "Google Maps API",
      "ESPN API",
      "OpenRouter API",
      "Open-Meteo API",
      "Telegram Bot API",
    ],
  },
  {
    category: "Business platforms",
    skills: [
      "Shopify",
      "SAP",
      "HubSpot",
      "Asana",
      "Microsoft Teams",
      "CoStar",
      "Crexi",
      "Market research",
      "Project management",
      "Public speaking",
    ],
  },
];

export const careerContent = {
  profile,
  hero,
  logoBrandsCase,
  projects: [jarvis, worldCupInterface],
  internships,
  additionalExperience,
  education,
  leadership,
  skillCategories,
};
