import {
  AppWindow,
  ChartNoAxesCombined,
  Github,
  Linkedin,
  Mail,
  Network,
  Phone,
  Sparkles,
} from "lucide-react";


/** Build a slug-safe id from a heading string (for TOC anchors). */
export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const profile = {
  name: "Shabir Khan",
  initials: "SK",
  title: "Senior Full-Stack Engineer",
  descriptor:
    "TypeScript-first product builder, frontend-focused systems engineer, startup founder, and creative UI engineer.",
  location: "Islamabad, Pakistan",
  availability: "Open to remote senior roles and focused product builds",
  email: "shabirkhan.dev@gmail.com",
  phone: "+92 316 665 1488",
  github: "https://github.com/shabirkhan-dev",
  linkedin: "https://linkedin.com/in/shabirkhan23",
  hero:
    "TypeScript-first engineer with 6+ years shipping production systems — React frontends serving 100k+ users, Node.js APIs, React Native apps, and delivery pipelines with security built in.",
  intro:
    "Six years shipping SaaS, admin systems, mobile apps, and AI workflows. I care about the boring parts that make software survive: state, latency, permissions, release flow, and the details users never see.",
};

export const education = {
  degree: "ICS — Intermediate in Computer Science",
  school: "GCCE Gilgit",
  year: "Completed 2021",
};

export const languages = [
  { name: "Urdu", level: "Native" },
  { name: "English", level: "Professional" },
];

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/lab", label: "Lab" },
  { href: "/resume", label: "Résumé" },
  { href: "/#contact", label: "Contact" },
];

export const socials = [
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
  { href: profile.github, label: "GitHub", icon: Github },
  { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: "tel:+923166651488", label: "Phone", icon: Phone },
];

/** Compact "core stack" shown as a quiet static strip under the hero. */
export const coreStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "React Native",
  "PostgreSQL",
  "Redis",
  "Docker",
  "AWS",
  "AI Workflows",
];

export const proof = [
  { value: "6+", label: "years shipping production systems" },
  { value: "100k+", label: "users served by frontend platforms" },
  { value: "35%", label: "page-load performance improvement" },
  { value: "50%", label: "API payload overhead reduced" },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Shabir is the rare engineer who owns the interface and the architecture at once. He shipped a platform that felt polished on day one and stayed maintainable a year later.",
    author: "Hira Aslam",
    role: "VP of Engineering",
    company: "Excelorithm",
  },
  {
    quote:
      "He cut our page loads by a third without a rewrite — just disciplined frontend decisions and a real understanding of where the cost was.",
    author: "Daniel Mercer",
    role: "Head of Product",
    company: "Northbeam",
  },
  {
    quote:
      "Security and delivery were an afterthought before Shabir. He built the gates into our pipeline so well the team forgot they were even there.",
    author: "Omar Farooq",
    role: "Engineering Manager",
    company: "Rovoxia",
  },
  {
    quote:
      "What stands out is product judgment. He pushes back on the right things and ships the features that actually move the metric.",
    author: "Sarah Lindqvist",
    role: "Founder",
    company: "Tidewave",
  },
  {
    quote:
      "Our React Native app finally feels native. Offline states, transitions, the small details — all handled with obvious care.",
    author: "Bilal Khan",
    role: "CTO",
    company: "Rabtx",
  },
  {
    quote:
      "Calm interfaces, clean code, zero drama. Working with Shabir raised the bar for how the whole team thinks about craft.",
    author: "Mei Tanaka",
    role: "Lead Designer",
    company: "Studio Kaen",
  },
];

export type Project = {
  title: string;
  subtitle?: string;
  slug: string;
  role: string;
  category: string;
  year: string;
  tagline: string;
  built: string;
  stack: string[];
  impact: string[];
  /** Headline metric used on scannable bento tiles. */
  metric: { value: string; label: string };
  tags: string[];
  visual: string;
  caseStudy?: boolean;
};

export const projects: Project[] = [
  {
    title: "Autobay",
    subtitle: "Kansai Group",
    slug: "autobay",
    role: "Lead frontend, backend, and DevOps",
    category: "Marketplace & operations",
    year: "2022 – 2023",
    tagline: "Production marketplace and internal operations system.",
    built:
      "Next.js admin, React Native app, CodeIgniter APIs, WebSockets, Redis, Docker, Nginx, MySQL",
    stack: [
      "Next.js",
      "React Native",
      "CodeIgniter",
      "WebSockets",
      "Redis",
      "Docker",
    ],
    impact: [
      "Reduced API payload overhead by 50%",
      "Improved page-load performance by 35%",
      "Supported production workflows across web and mobile",
    ],
    metric: { value: "50%", label: "lighter API payloads" },
    tags: ["Marketplace", "Mobile", "DevOps"],
    visual: "marketplace",
    caseStudy: true,
  },
  {
    title: "School OS",
    slug: "school-os",
    role: "Product architect and lead engineer",
    category: "Multi-tenant SaaS",
    year: "2025 – Present",
    tagline: "AI-powered attendance, analytics, and school operations.",
    built:
      "Multi-tenant Next.js admin, Node.js APIs, PostgreSQL, Redis, structured AI insight pipelines",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "LLM APIs"],
    impact: [
      "Single codebase serving multiple school tenants",
      "Structured AI insights without exposing raw student data",
      "Role-scoped dashboards for staff and network operators",
    ],
    metric: { value: "Multi‑tenant", label: "one codebase, many schools" },
    tags: ["SaaS", "AI", "Multi-tenant"],
    visual: "dashboard",
    caseStudy: true,
  },
  {
    title: "RedCore",
    slug: "redcore",
    role: "Founder and systems architect",
    category: "Security tooling",
    year: "In development",
    tagline: "Modular security platform with policy enforcement and workflow automation.",
    built:
      "TypeScript core, Rust performance modules, policy engine, workflow automation layer",
    stack: ["TypeScript", "Rust", "Policy engines", "Workflow automation"],
    impact: [
      "Operator-grade platform for repeatable security workflows",
      "Policy enforcement designed into the delivery path",
    ],
    metric: { value: "Rust", label: "performance-critical core" },
    tags: ["Security", "Automation", "Systems"],
    visual: "security",
  },
  {
    title: "Excelorithm EMS",
    slug: "excelorithm-ems",
    role: "Lead frontend engineer",
    category: "Employee management platform",
    year: "2023 – 2025",
    tagline: "100k+ user platform for workforce management and operations.",
    built:
      "React frontend architecture, component standards, performance optimization, SSR/SSG strategy",
    stack: ["React", "TypeScript", "Node.js", "Redis"],
    impact: [
      "Served 100k+ users across production workflows",
      "Improved page-load performance by 35%",
      "Reduced server load by 20% through render discipline",
    ],
    metric: { value: "100k+", label: "users served" },
    tags: ["SaaS", "Frontend", "Scale"],
    visual: "monorepo",
  },
  {
    title: "Starter Kit",
    slug: "starter-kit",
    role: "Author and maintainer",
    category: "Open source",
    year: "2024 – Present",
    tagline:
      "Production-grade monorepo with polyglot services and automated security enforcement.",
    built:
      "TypeScript, Python, and Rust services, shared CI/CD pipelines, CodeQL, Dependabot, secret scanning",
    stack: ["TypeScript", "Python", "Rust", "GitHub Actions", "CodeQL"],
    impact: [
      "One repo pattern reused across client and product builds",
      "Security gates enforced automatically on every merge",
    ],
    metric: { value: "OSS", label: "open-source monorepo" },
    tags: ["Open source", "DevEx", "Security"],
    visual: "monorepo",
  },
];

export const philosophy = [
  {
    title: "Product judgment first",
    body: "Architecture only matters if it makes the product easier to ship and harder to break.",
    practice: "Scope is cut before code — the smallest system that ships wins.",
    icon: Sparkles,
  },
  {
    title: "Systems, not screens",
    body: "Boundaries, contracts, and data flow designed together — not patched together later.",
    practice: "API contracts and schema land before the first component does.",
    icon: Network,
  },
  {
    title: "Honest interfaces",
    body: "Trust comes from states that tell the truth: loading, empty, error, irreversible.",
    practice: "Every screen ships with its failure states designed, not defaulted.",
    icon: AppWindow,
  },
  {
    title: "Boring where it counts",
    body: "Release flow, permissions, and observability should be invisible — until you need them.",
    practice: "CI gates, CodeQL scans, and typed configs on every merge to main.",
    icon: ChartNoAxesCombined,
  },
];

export type StackIconName =
  | "frontend"
  | "backend"
  | "mobile"
  | "database"
  | "devops"
  | "ai"
  | "design";

type StackGroup = {
  title: string;
  description: string;
  focus: string;
  iconName: StackIconName;
  items: string[];
};

export const stackGroups: StackGroup[] = [
  {
    title: "Frontend",
    description: "Interfaces that feel fast, intentional, and production-ready.",
    focus: "Ship surfaces that stay fast, honest, and calm under real traffic.",
    iconName: "frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend",
    description: "APIs and service boundaries built for long-term ownership.",
    focus: "Design contracts and services teams can trust for years.",
    iconName: "backend",
    items: ["Node.js", "Express", "Hono", "NestJS", "Bun"],
  },
  {
    title: "Mobile",
    description: "Cross-platform product surfaces with native-feeling workflows.",
    focus: "Build mobile flows that feel native, not like a wrapped website.",
    iconName: "mobile",
    items: ["React Native", "Expo", "Mobile UX", "Offline states"],
  },
  {
    title: "Databases",
    description: "Data models, caching, and persistence with practical constraints.",
    focus: "Model data for the product you have — and the one you're growing into.",
    iconName: "database",
    items: ["PostgreSQL", "MongoDB", "Redis", "ChromaDB"],
  },
  {
    title: "DevOps",
    description: "Repeatable delivery with security and reliability built in.",
    focus: "Make shipping boring, observable, and safe by default.",
    iconName: "devops",
    items: ["Docker", "AWS", "GitHub Actions", "Kafka", "CodeQL", "Linux"],
  },
  {
    title: "AI and automation",
    description: "Useful AI features shaped by product context, not novelty.",
    focus: "Embed intelligence where it removes friction — not where it performs.",
    iconName: "ai",
    items: ["LLM APIs", "RAG", "Embeddings", "Structured outputs", "Ollama"],
  },
  {
    title: "UI and product design",
    description: "Clean flows, strong hierarchy, and interfaces that earn trust.",
    focus: "Turn complexity into hierarchy people can move through without fear.",
    iconName: "design",
    items: ["Design systems", "Dashboards", "Admin UX", "Interaction states"],
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  year: string;
  location: string;
  summary: string;
  metrics: { value: string; label: string }[];
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Founder & Lead Engineer",
    company: "Rabtx",
    period: "Sep 2025 — Present",
    year: "2025",
    location: "Remote",
    summary:
      "I own web, backend, and React Native systems end to end — from API contracts to deploy infrastructure and CI security gates.",
    metrics: [
      { value: "E2E", label: "web · API · mobile ownership" },
      { value: "CI", label: "security gates in the deploy path" },
    ],
    tags: ["Full-stack", "React Native", "DevOps"],
  },
  {
    role: "Lead Frontend Engineer",
    company: "Excelorithm LLC",
    period: "Jun 2023 — Sep 2025",
    year: "2023",
    location: "Rawalpindi",
    summary:
      "Architected a platform used by over a hundred thousand people, and set the component standards the rest of the team builds on.",
    metrics: [
      { value: "100k+", label: "users on the platform" },
      { value: "35%", label: "faster page loads" },
      { value: "20%", label: "less server load" },
    ],
    tags: ["Frontend systems", "Scale", "Performance"],
  },
  {
    role: "Senior Full-Stack Engineer",
    company: "Rovoxia",
    period: "Mar 2021 — May 2023",
    year: "2021",
    location: "Remote",
    summary:
      "Shipped Next.js and TypeScript products with a focus on rendering strategy, caching, and lean API contracts.",
    metrics: [
      { value: "40%", label: "performance gain via SSR/SSG" },
      { value: "50%", label: "smaller API payloads" },
    ],
    tags: ["Next.js", "SSR/SSG", "APIs"],
  },
  {
    role: "Full-Stack Developer",
    company: "Dot Austere",
    period: "Sep 2018 — Dec 2019",
    year: "2018",
    location: "Gilgit",
    summary:
      "Built client applications on Node, Express, and PostgreSQL with a focus on API reliability and a hardened security posture.",
    metrics: [
      { value: "OWASP", label: "security practices" },
      { value: "Postgres", label: "reliable data layer" },
    ],
    tags: ["Node.js", "PostgreSQL", "Security"],
  },
];
export const labExperiments = [
  {
    title: "Vector field hero",
    category: "Motion",
    description:
      "Cursor-reactive particle field powering the homepage hero — calm, performant, and scroll-aware.",
    tags: ["Canvas", "Interaction", "Performance"],
    href: "/",
  },
  {
    title: "Engine Room layers",
    category: "Systems visualization",
    description:
      "Scroll-driven layer diagram showing how product surfaces map to underlying system decisions.",
    tags: ["Framer Motion", "Scroll", "Architecture"],
  },
  {
    title: "AI workflow UI",
    category: "AI prototype",
    description:
      "Structured input/output panels for LLM features — verification-first, not chat-first.",
    tags: ["AI", "Product UI", "TypeScript"],
  },
  {
    title: "3D interface concepts",
    category: "Visual engineering",
    description:
      "Spatial navigation studies for dashboard and admin tools — depth without losing clarity.",
    tags: ["Three.js", "3D", "UX"],
  },
  {
    title: "Motion primitives",
    category: "Interaction design",
    description:
      "Reusable reveal, stagger, and magnetic interaction patterns used across the portfolio.",
    tags: ["Framer Motion", "Components"],
  },
  {
    title: "Generative typography",
    category: "Creative code",
    description:
      "Procedural letterform experiments exploring display type as a living surface.",
    tags: ["Canvas", "Typography"],
  },
];
