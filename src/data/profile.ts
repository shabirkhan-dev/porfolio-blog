export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shabirkhan.dev";

export const links = {
  github: "https://github.com/shabirkhan-dev",
  linkedin: "https://linkedin.com/in/shabirkhan23",
  email: "mailto:shabirkhan.dev@gmail.com",
};

export const profile = {
  name: "Shabir Khan",
  role: "Senior Full-Stack Engineer",
  location: "Islamabad, Pakistan",
  availability: "Open to remote, hybrid and relocation, full-time or contract",
  description:
    "Senior full-stack engineer in Islamabad, building web and mobile products end to end.",
};

export type Highlight = {
  id: "grid" | "starter" | "school-os";
  name: string;
  label: string;
  year: string;
  isNew?: boolean;
  /** Product screenshot in public/projects, shown on the card and first in the dialog. */
  image: string;
  /** Further screens, shown below the first one in the dialog. */
  screens?: string[];
  about: string[];
  facts: [label: string, value: string][];
  github?: string;
  live?: string;
};

export const highlights: Highlight[] = [
  {
    id: "grid",
    name: "Grid",
    label: "Agent workspace",
    year: "2026",
    isNew: true,
    image: "/projects/grid-board.webp",
    screens: [
      "/projects/grid-thread.webp",
      "/projects/grid-home.webp",
      "/projects/grid-pr.webp",
      "/projects/grid-ship.webp",
    ],
    about: [
      "A self-hosted workspace where people and AI coding agents share one project board, live agent threads, a file editor, terminals and pull request checks, from desktop or phone",
      "Works with Claude Code, Codex, opencode and any ACP agent",
    ],
    facts: [
      ["Role", "Founder and lead engineer"],
      ["Stack", "SolidJS, Hono, PostgreSQL, Bun"],
      ["Status", "Public beta, v0.1.0"],
      ["License", "MIT / Apache-2.0"],
    ],
    github: "https://github.com/shabirkhan-dev/grid",
  },
  {
    id: "starter",
    name: "Starter",
    label: "SaaS monorepo",
    year: "2025",
    image: "/projects/starter.webp",
    about: [
      "A production-ready SaaS monorepo on Bun and Turborepo: Next.js, Expo, NestJS, Fumadocs and FastAPI apps sharing one UI layer, one TypeScript config and one CI pipeline",
    ],
    facts: [
      ["Role", "Author"],
      ["Stack", "Next.js, Expo, NestJS, Bun, Turborepo"],
      ["License", "MIT / Apache-2.0"],
    ],
    github: "https://github.com/shabirkhan-dev/starter",
    live: "https://starter-two-henna.vercel.app",
  },
  {
    id: "school-os",
    name: "School OS",
    label: "School platform",
    year: "2025",
    image: "/projects/school-os.webp",
    screens: ["/projects/school-os-students.webp"],
    about: [
      "A multi-tenant school platform: a teacher scans a student's QR code at the gate, the parent gets a WhatsApp alert, and the principal's dashboard updates",
      "Students, guardians, staff, attendance, homework and assessments are built; parent alerts are next",
    ],
    facts: [
      ["Role", "Author"],
      ["Stack", "Next.js, Expo, NestJS, PostgreSQL"],
      ["Status", "In development"],
    ],
    github: "https://github.com/shabirkhan-dev/school-os",
  },
];

export type Project = {
  name: string;
  description: string;
  isNew?: boolean;
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    name: "Grid",
    description:
      "A workspace where people and AI coding agents share one board, threads, terminals and pull requests",
    isNew: true,
    github: "https://github.com/shabirkhan-dev/grid",
  },
  {
    name: "Starter",
    description:
      "A production monorepo with Next.js, Expo, NestJS and docs, ready on the first day",
    github: "https://github.com/shabirkhan-dev/starter",
    live: "https://starter-two-henna.vercel.app",
  },
  {
    name: "School OS",
    description:
      "School operations for many schools at once, with QR attendance and alerts to parents",
    github: "https://github.com/shabirkhan-dev/school-os",
  },
  {
    name: "Personal OS",
    description:
      "Routines, money, food and daily habits in one place, on web and phone",
    github: "https://github.com/shabirkhan-dev/personal-os",
  },
];

export type Job = {
  company: string;
  role: string;
  summary: string;
  period: string;
};

export const work: Job[] = [
  {
    company: "Nexora AI",
    role: "Senior frontend lead · Contract",
    summary:
      "Leading the frontend of Auspira, a contract-management platform for a UK client",
    period: "2026—Now",
  },
  {
    company: "RabtX",
    role: "Founder",
    summary: "Building Grid, an open-source workspace for people and AI coding agents",
    period: "2025—Now",
  },
  {
    company: "Kansai Group",
    role: "Frontend engineer, web and mobile · Part-time",
    summary:
      "Built the Expo app, the vehicle listing site and the admin panel for a used-car exporter in Osaka",
    period: "2024—2026",
  },
  {
    company: "Excelorithm",
    role: "Lead frontend engineer",
    summary:
      "Led the rebuild of BullseyeEngagement, an HR platform used by PepsiCo, Intel and Emory, with 35% faster page loads",
    period: "2023—2025",
  },
  {
    company: "Revoxai",
    role: "Senior full-stack developer",
    summary:
      "Built an AI e-learning platform across Next.js, Node.js and Python services",
    period: "2021—2023",
  },
  {
    company: "Freelance",
    role: "Software developer",
    summary:
      "Web and mobile apps for clients on Fiverr and direct, on Node.js, PostgreSQL and React",
    period: "2018—2021",
  },
];
