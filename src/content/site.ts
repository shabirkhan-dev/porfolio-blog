import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export const profile = {
  name: "S. Khan",
  role: "Designer and full-stack builder",
  location: "United States",
  email: "hello@example.com",
  intro:
    "I design and ship polished digital products, write about the process, and turn rough ideas into clear, useful web experiences.",
  availability: "Available for select collaborations",
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export const socials = [
  { href: "mailto:hello@example.com", label: "Email", icon: Mail },
  { href: "https://github.com/", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/", label: "LinkedIn", icon: Linkedin },
  { href: "https://example.com/", label: "Website", icon: ArrowUpRight },
];

export const projects = [
  {
    title: "Studio Operating System",
    slug: "studio-operating-system",
    category: "Product Design",
    year: "2026",
    summary:
      "A focused workspace for managing creative projects from brief to delivery.",
    impact: "Reduced review cycles by 38%",
    palette: "from-blue-600 via-sky-400 to-emerald-400",
  },
  {
    title: "Editorial Commerce",
    slug: "editorial-commerce",
    category: "Next.js Build",
    year: "2025",
    summary:
      "A content-led storefront that blends product drops, interviews, and buying guides.",
    impact: "Launched in six weeks",
    palette: "from-rose-500 via-orange-400 to-amber-300",
  },
  {
    title: "Signal Dashboard",
    slug: "signal-dashboard",
    category: "Data Experience",
    year: "2025",
    summary:
      "A decision dashboard for tracking growth, acquisition, and retention signals.",
    impact: "Unified five data views",
    palette: "from-slate-700 via-violet-500 to-cyan-400",
  },
];

export const posts = [
  {
    title: "Designing a Portfolio That Still Feels Human",
    slug: "designing-a-portfolio-that-still-feels-human",
    publishedAt: "2026-06-18",
    readingTime: "4 min read",
    excerpt:
      "A practical approach to balancing polish, proof, and personality on a personal site.",
    body: [
      {
        heading: "Start With Proof",
        paragraphs: [
          "A strong portfolio makes the important work easy to find. Lead with the outcomes, the decisions you owned, and the parts of the process that show your judgment.",
          "The design can be expressive, but the structure should stay calm enough that a visitor can scan it quickly.",
        ],
      },
      {
        heading: "Give Writing a Real Home",
        paragraphs: [
          "A blog is most useful when it has a point of view. Short notes, project breakdowns, and careful essays can all sit together when the taxonomy is simple.",
          "This starter keeps posts as typed content so you can move quickly, then graduate to MDX or a CMS when the publishing rhythm asks for it.",
        ],
      },
    ],
  },
  {
    title: "What I Track Before Shipping a Web Project",
    slug: "what-i-track-before-shipping-a-web-project",
    publishedAt: "2026-05-30",
    readingTime: "3 min read",
    excerpt:
      "A small launch checklist for performance, accessibility, analytics, and deployment confidence.",
    body: [
      {
        heading: "Make the Basics Boring",
        paragraphs: [
          "The best launch setup is predictable. Check responsive states, metadata, core user paths, and production environment variables before the final deploy.",
          "Vercel previews make this easier because every push can become a reviewable version of the site.",
        ],
      },
    ],
  },
  {
    title: "A Content Model for Independent Builders",
    slug: "a-content-model-for-independent-builders",
    publishedAt: "2026-04-12",
    readingTime: "5 min read",
    excerpt:
      "How to structure work, notes, and essays without turning your personal site into a tiny CMS too early.",
    body: [
      {
        heading: "Keep the First Model Small",
        paragraphs: [
          "A lean content model is easier to change. Start with a title, slug, date, excerpt, and a few body sections.",
          "Once the site has a publishing habit, it becomes much clearer whether MDX, a database, or a headless CMS is worth adding.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
