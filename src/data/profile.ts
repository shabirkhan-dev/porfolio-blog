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
  id: "grid" | "auspira" | "starter" | "school-os";
  name: string;
  label: string;
  year: string;
  href?: string;
};

export const highlights: Highlight[] = [
  {
    id: "grid",
    name: "Grid",
    label: "Agent workspace",
    year: "2026",
    href: "https://github.com/shabirkhan-dev/grid",
  },
  { id: "auspira", name: "Auspira", label: "Contract management", year: "2026" },
  {
    id: "starter",
    name: "Starter",
    label: "SaaS monorepo",
    year: "2025",
    href: "https://starter-two-henna.vercel.app",
  },
  {
    id: "school-os",
    name: "School OS",
    label: "School platform",
    year: "2025",
    href: "https://github.com/shabirkhan-dev/school-os",
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
  period: string;
};

export const work: Job[] = [
  { company: "Nexora AI", role: "Senior frontend lead", period: "2026—Now" },
  { company: "RabtX", role: "Founder", period: "2025—Now" },
  {
    company: "Kansai Group",
    role: "Frontend engineer, web and mobile",
    period: "2024—2026",
  },
  { company: "Excelorithm", role: "Lead frontend engineer", period: "2023—2025" },
  { company: "Revoxai", role: "Senior full-stack developer", period: "2021—2023" },
  { company: "Freelance", role: "Software developer", period: "2018—2021" },
];
