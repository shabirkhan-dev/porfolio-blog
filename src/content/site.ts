import { Github, Linkedin, Mail, Phone } from "lucide-react";

export const profile = {
  name: "Shabir Khan",
  initials: "SK",
  role: "Senior Full-Stack Engineer",
  location: "Islamabad, Pakistan",
  availability: "Open to remote",
  email: "shabirkhan.dev@gmail.com",
  phone: "+92 316 665 1488",
  github: "https://github.com/shabirkhan-dev",
  linkedin: "https://linkedin.com/in/shabirkhan23",
  headline:
    "I architect secure, high-performance TypeScript systems across web, backend, and mobile.",
  intro:
    "6+ years building production-grade products with Node.js, React, Next.js, React Native, Bun, and cloud infrastructure. I can lead from zero, own architecture, and still go deep on performance, security, and delivery.",
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/#experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export const socials = [
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
  { href: profile.github, label: "GitHub", icon: Github },
  { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: "tel:+923166651488", label: "Phone", icon: Phone },
];

export const stats = [
  { value: "6+", label: "years building production systems" },
  { value: "100k+", label: "users served by frontend platforms" },
  { value: "35%", label: "page-load improvement through tuning" },
  { value: "50%", label: "API payload overhead reduced" },
];

export const focusAreas = [
  "Architecture from zero",
  "Performance optimisation",
  "Secure CI/CD",
  "React Native delivery",
];

export const experience = [
  {
    role: "Founder & Lead Engineer",
    company: "Rabtx",
    period: "Sep 2025 - Present",
    location: "Remote",
    summary:
      "Leading full-stack product architecture across web, backend, and React Native as the sole lead engineer.",
    bullets: [
      "Built product features across React/Next.js apps, Node.js APIs, and mobile applications.",
      "Designed service boundaries, API contracts, and deployment infrastructure from scratch.",
      "Shipped CI/CD pipelines with CodeQL, Dependabot, and secret scanning gates.",
    ],
  },
  {
    role: "Lead Frontend Engineer",
    company: "Excelorithm LLC",
    period: "Jun 2023 - Sep 2025",
    location: "Rawalpindi",
    summary:
      "Owned the frontend lifecycle for an employee management platform serving 100k+ users.",
    bullets: [
      "Improved page load performance by 35% with rendering optimisation and bundle tuning.",
      "Reduced server load by 20% through redesigned data-fetching and caching strategies.",
      "Defined component libraries and engineering standards for faster onboarding.",
    ],
  },
  {
    role: "Senior Full-Stack Engineer",
    company: "Rovoxia",
    period: "Mar 2021 - May 2023",
    location: "Remote",
    summary:
      "Delivered production MERN, Next.js, and TypeScript applications with scalable backend services.",
    bullets: [
      "Improved performance by 40% using SSR/SSG and optimised caching strategies.",
      "Reduced API payload overhead by 50% through endpoint and data-fetching redesign.",
      "Designed backend services for scalable distributed system architecture.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Dot Austere",
    period: "Sep 2018 - Dec 2019",
    location: "Gilgit",
    summary:
      "Built client applications with Node.js, Express, and PostgreSQL.",
    bullets: [
      "Developed full-stack applications for multiple clients.",
      "Improved API reliability and security posture using OWASP practices.",
    ],
  },
];

export const projects = [
  {
    title: "RedCore",
    slug: "redcore",
    category: "Cybersecurity Tooling Platform",
    year: "In development",
    summary:
      "Modular security tooling platform with policy enforcement, workflow automation, and performance-focused architecture.",
    impact: "TypeScript + Rust security platform",
    status: "Security automation",
    stack: ["TypeScript", "Rust", "Policy engines", "Workflow automation"],
    palette: "from-emerald-500 via-cyan-500 to-blue-600",
  },
  {
    title: "School OS",
    slug: "school-os",
    category: "Multi-Tenant School Management Platform",
    year: "2025 - Present",
    summary:
      "AI-powered attendance, analytics, and management system designed for scalable deployment across school networks.",
    impact: "Multi-tenant AI operations",
    status: "Product architecture",
    stack: ["Next.js", "Node.js", "AI integration", "Analytics"],
    palette: "from-slate-900 via-teal-700 to-lime-400",
  },
  {
    title: "Starter Kit",
    slug: "starter-kit",
    category: "Production Monorepo",
    year: "2024 - Present",
    summary:
      "Open-source production monorepo with polyglot services, CI/CD pipelines, and automated security enforcement.",
    impact: "Open-source delivery system",
    status: "Developer platform",
    stack: ["TypeScript", "Python", "Rust", "GitHub Actions"],
    palette: "from-rose-500 via-orange-400 to-amber-300",
  },
];

export const skillGroups = [
  {
    title: "Core Stack",
    items: [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express",
      "Hono",
      "NestJS",
      "Bun",
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Tailwind CSS",
      "Shadcn UI",
      "Docker",
    ],
  },
  {
    title: "AI Integration",
    items: [
      "LLM APIs",
      "Ollama",
      "RAG fundamentals",
      "Embeddings",
      "Vector search",
      "ChromaDB",
      "Structured outputs",
    ],
  },
  {
    title: "Data & Infra",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "AWS EC2",
      "AWS Lambda",
      "AWS SES",
      "GitHub Actions",
      "Kafka",
      "Linux",
    ],
  },
  {
    title: "Security",
    items: [
      "OWASP",
      "CodeQL",
      "Ethical hacking",
      "Dependabot",
      "Secret scanning",
    ],
  },
];

export const posts = [
  {
    title: "Building Production Systems as a Solo Lead",
    slug: "building-production-systems-as-a-solo-lead",
    publishedAt: "2026-06-22",
    readingTime: "4 min read",
    excerpt:
      "How I think about boundaries, contracts, CI/CD, and product momentum when owning architecture from zero.",
    body: [
      {
        heading: "Start With System Boundaries",
        paragraphs: [
          "A solo lead still needs team-grade architecture. I start by defining service boundaries, API contracts, deployment paths, and the operational checks that protect the product later.",
          "The goal is to keep early speed without creating a system that becomes expensive to change.",
        ],
      },
      {
        heading: "Automate the Guardrails",
        paragraphs: [
          "Security gates, dependency alerts, secret scanning, and repeatable deployments reduce the number of decisions that have to be remembered manually.",
          "That leaves more attention for product decisions, performance work, and user-facing quality.",
        ],
      },
    ],
  },
  {
    title: "Performance Lessons From a 100k+ User Frontend",
    slug: "performance-lessons-from-a-100k-user-frontend",
    publishedAt: "2026-05-30",
    readingTime: "3 min read",
    excerpt:
      "Rendering, bundle shape, caching, and data-fetching decisions that helped improve page load performance by 35%.",
    body: [
      {
        heading: "Tune the Flow, Not Just the Bundle",
        paragraphs: [
          "Bundle size matters, but many slow experiences come from fetch timing, redundant renders, and unclear loading states.",
          "The best performance work combines measurement with practical changes users can actually feel.",
        ],
      },
    ],
  },
  {
    title: "Security Gates That Belong in Every CI Pipeline",
    slug: "security-gates-that-belong-in-every-ci-pipeline",
    publishedAt: "2026-04-12",
    readingTime: "5 min read",
    excerpt:
      "CodeQL, Dependabot, secret scanning, and practical OWASP checks for modern TypeScript teams.",
    body: [
      {
        heading: "Make Security Continuous",
        paragraphs: [
          "Security is strongest when it becomes part of the delivery path instead of a late-stage audit.",
          "Automated gates catch obvious risk early, while clear ownership keeps remediation from drifting.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
