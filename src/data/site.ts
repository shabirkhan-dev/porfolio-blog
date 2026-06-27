import {
  AppWindow,
  Boxes,
  ChartNoAxesCombined,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Network,
  Phone,
  Sparkles,
} from "lucide-react";

export type BlogCategory =
  | "Engineering"
  | "Frontend"
  | "Backend"
  | "AI"
  | "Product"
  | "Design"
  | "Personal";

export type ArticleBlock =
  | {
      type: "paragraph";
      content: string;
      lead?: boolean;
    }
  | {
      /** Renders an <h2>; also collected into the table of contents. */
      type: "heading";
      content: string;
    }
  | {
      /** Renders an <h3>; not collected into the TOC. */
      type: "subheading";
      content: string;
    }
  | {
      type: "quote";
      content: string;
      cite?: string;
    }
  | {
      type: "list";
      ordered?: boolean;
      items: string[];
    }
  | {
      type: "callout";
      label?: string;
      content: string;
    }
  | {
      type: "code";
      language: string;
      filename?: string;
      code: string;
    }
  | {
      type: "divider";
    };

export type BlogPost = {
  title: string;
  slug: string;
  category: BlogCategory;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  excerpt: string;
  summary: string;
  /** Short standfirst shown under the title in the article hero. */
  standfirst?: string;
  /** Bulleted "what you'll take away" shown near the top of the essay. */
  takeaways?: string[];
  body: ArticleBlock[];
};

/** Build a slug-safe id from a heading string (for TOC anchors). */
export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Extract the h2 headings of a post for an in-page table of contents. */
export function getTableOfContents(post: BlogPost) {
  return post.body
    .filter((block): block is Extract<ArticleBlock, { type: "heading" }> =>
      block.type === "heading",
    )
    .map((block) => ({
      id: slugifyHeading(block.content),
      label: block.content,
    }));
}

/** Roughly estimate reading time from the rendered text of a post. */
export function estimateReadingTime(post: BlogPost) {
  const words = post.body.reduce((total, block) => {
    if (block.type === "paragraph" || block.type === "heading" || block.type === "subheading" || block.type === "quote" || block.type === "callout") {
      return total + block.content.split(/\s+/).length;
    }
    if (block.type === "list") {
      return total + block.items.join(" ").split(/\s+/).length;
    }
    if (block.type === "code") {
      return total + block.code.split(/\s+/).length;
    }
    return total;
  }, 0);
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export const profile = {
  name: "Shabir Khan",
  initials: "SK",
  title: "Senior Full-Stack Engineer",
  descriptor:
    "TypeScript-first product builder, frontend-focused systems engineer, startup founder, and creative UI engineer.",
  location: "Islamabad, Pakistan",
  availability: "Open to remote senior engineering roles and focused product builds",
  email: "shabirkhan.dev@gmail.com",
  phone: "+92 316 665 1488",
  github: "https://github.com/shabirkhan-dev",
  linkedin: "https://linkedin.com/in/shabirkhan23",
  hero:
    "I build polished digital products where frontend craft, backend architecture, and product judgment meet.",
  intro:
    "For 6+ years I have shipped SaaS platforms, admin systems, React frontends, Node APIs, mobile apps, AI-powered products, and secure delivery pipelines. I like software that feels calm on the surface and disciplined underneath.",
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export const socials = [
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
  { href: profile.github, label: "GitHub", icon: Github },
  { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: "tel:+923166651488", label: "Phone", icon: Phone },
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

export const projects = [
  {
    title: "RedCore",
    slug: "redcore",
    role: "Founder and systems architect",
    category: "Cybersecurity tooling platform",
    year: "In development",
    description:
      "A modular security tooling platform with policy enforcement, workflow automation, and performance-focused architecture.",
    impact:
      "Designed as a serious operator-grade platform for repeatable security workflows.",
    stack: ["TypeScript", "Rust", "Policy engines", "Workflow automation"],
    tags: ["Security", "Automation", "Systems"],
    visual: "security",
  },
  {
    title: "School OS",
    slug: "school-os",
    role: "Product architect and lead engineer",
    category: "Multi-tenant school management platform",
    year: "2025 - Present",
    description:
      "AI-powered attendance, analytics, and management system designed for scalable deployment across school networks.",
    impact:
      "Built around multi-tenant architecture, operational clarity, and product workflows schools can actually run.",
    stack: ["Next.js", "Node.js", "AI integration", "Analytics"],
    tags: ["SaaS", "AI", "Multi-tenant"],
    visual: "dashboard",
  },
  {
    title: "Starter Kit",
    slug: "starter-kit",
    role: "Open-source maintainer",
    category: "Production monorepo",
    year: "2024 - Present",
    description:
      "A production-grade monorepo with polyglot services, CI/CD pipelines, and automated security enforcement.",
    impact:
      "Created a reusable foundation for disciplined delivery across TypeScript, Python, and Rust services.",
    stack: ["TypeScript", "Python", "Rust", "GitHub Actions"],
    tags: ["DevEx", "Infrastructure", "CI/CD"],
    visual: "monorepo",
  },
];

export const philosophy = [
  {
    title: "Product-first engineering",
    body: "A system is only elegant if it makes the product easier to ship, understand, and improve.",
    icon: Sparkles,
  },
  {
    title: "Systems thinking",
    body: "Service boundaries, API contracts, data flow, and deployment paths are designed together.",
    icon: Network,
  },
  {
    title: "Clean architecture",
    body: "Readable structure, clear ownership, and boring primitives keep codebases healthy.",
    icon: Layers3,
  },
  {
    title: "Beautiful interfaces matter",
    body: "The frontend is where trust becomes visible. Details, states, and motion all matter.",
    icon: AppWindow,
  },
  {
    title: "Performance and reliability",
    body: "Fast interfaces and dependable services are part of the product experience, not polish added later.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Maintainability",
    body: "A good system lets the next person move with confidence instead of fear.",
    icon: Boxes,
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
    items: ["Docker", "AWS", "GitHub Actions", "CodeQL", "Linux"],
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

export const experience = [
  {
    role: "Founder & Lead Engineer",
    company: "Rabtx",
    period: "Sep 2025 - Present",
    location: "Remote",
    body:
      "Building web, backend, and React Native systems as the sole lead engineer, from service boundaries and API contracts to deployment infrastructure and CI/CD security gates.",
  },
  {
    role: "Lead Frontend Engineer",
    company: "Excelorithm LLC",
    period: "Jun 2023 - Sep 2025",
    location: "Rawalpindi",
    body:
      "Architected a 100k+ user employee management platform, improved page load performance by 35 percent, reduced server load by 20 percent, and defined component standards for the team.",
  },
  {
    role: "Senior Full-Stack Engineer",
    company: "Rovoxia",
    period: "Mar 2021 - May 2023",
    location: "Remote",
    body:
      "Delivered MERN, Next.js, and TypeScript applications, improved performance by 40 percent with SSR/SSG and caching, and reduced API payload overhead by 50 percent.",
  },
  {
    role: "Full-Stack Developer",
    company: "Dot Austere",
    period: "Sep 2018 - Dec 2019",
    location: "Gilgit",
    body:
      "Built client applications with Node.js, Express, and PostgreSQL while improving API reliability and security posture with OWASP practices.",
  },
];

export const categories: BlogCategory[] = [
  "Engineering",
  "Frontend",
  "Backend",
  "AI",
  "Product",
  "Design",
  "Personal",
];

export const posts: BlogPost[] = [
  {
    title: "The quiet discipline behind production-grade product engineering",
    slug: "quiet-discipline-production-grade-product-engineering",
    category: "Engineering" satisfies BlogCategory,
    publishedAt: "2026-06-22",
    readingTime: "9 min read",
    featured: true,
    excerpt:
      "Good systems rarely feel dramatic. They feel predictable, clear, and easy to trust.",
    summary:
      "A practical field guide to service boundaries, interface quality, and delivery discipline — the unglamorous habits that make a product calm to operate and cheap to change.",
    standfirst:
      "After six years and a few hundred production incidents, I have stopped admiring clever code. The systems I trust now are the boring ones — and boring is much harder to build than it looks.",
    takeaways: [
      "Architecture is a product decision, not an implementation detail.",
      "The cost of a system is dominated by how much it asks you to remember.",
      "Guardrails should be automated, typed, and impossible to forget.",
      "Calm interfaces come from honest states, not from more animation.",
    ],
    body: [
      {
        type: "paragraph",
        lead: true,
        content:
          "The best production systems I have worked on do not feel loud. They feel calm. The frontend has fewer surprising states. The API has fewer ambiguous contracts. The deployment path has fewer manual rituals. The product can move quickly precisely because the system is not constantly asking for attention.",
      },
      {
        type: "paragraph",
        content:
          "Early in my career I thought seniority was measured in cleverness — the trick that saved twenty lines, the abstraction nobody else saw. I was wrong. Cleverness is a tax the rest of the team pays later. What actually separates senior work is a kind of quiet discipline: the willingness to make a system boring on purpose so the product on top of it can be interesting.",
      },
      {
        type: "heading",
        content: "Architecture is a product decision",
      },
      {
        type: "paragraph",
        content:
          "Service boundaries, caching strategy, validation, and the permission model all shape what the product is allowed to become. When those decisions are treated as private implementation details, the interface quietly inherits the confusion. A muddy ownership model becomes a muddy settings screen. A leaky boundary becomes a race condition the support team learns to apologize for.",
      },
      {
        type: "paragraph",
        content:
          "So I try to make architecture legible. Every meaningful unit of the system should be able to answer three questions without a meeting: what do I own, what do I expose, and what do I protect? If a module cannot answer those crisply, it is not a boundary — it is a future incident.",
      },
      {
        type: "code",
        language: "ts",
        filename: "boundary.ts",
        code: `// A boundary that can describe itself is a boundary you can trust.
type ProductBoundary = {
  owns: "state" | "workflow" | "policy";
  exposes: "typed-api";
  protects: Array<"security" | "performance" | "maintainability">;
};

const billing: ProductBoundary = {
  owns: "workflow",
  exposes: "typed-api",
  protects: ["security", "maintainability"],
};`,
      },
      {
        type: "callout",
        label: "Heuristic",
        content:
          "If you cannot draw the boundary on a whiteboard in under a minute, the code will not respect it either. Ambiguity is not neutral — it compounds.",
      },
      {
        type: "heading",
        content: "Reduce what the team has to remember",
      },
      {
        type: "paragraph",
        content:
          "Most production pain is not caused by hard problems. It is caused by easy problems that everyone forgot. The deploy step that one person knows. The env var that is only documented in a Slack thread from 2024. The validation that lives in the frontend but not the API. Every one of these is a small debt that charges interest at the worst possible moment.",
      },
      {
        type: "quote",
        content:
          "A senior engineer should reduce the number of things the team has to remember.",
        cite: "The one line I would attach to every code review",
      },
      {
        type: "paragraph",
        content:
          "That single idea reorganizes how I build. It is why I prefer guardrails that cannot be skipped over documentation that can. Documentation is a request for discipline. A typed contract, a pre-commit hook, or a CI gate is discipline that has already happened.",
      },
      {
        type: "list",
        items: [
          "Typed contracts at every boundary, so a wrong shape fails at compile time, not at 2am.",
          "Predictable folder structure, so a new engineer can guess where code lives and be right.",
          "One command to run, test, and deploy — no tribal knowledge, no ceremony.",
          "Observability that answers 'what changed?' before anyone has to ask in chat.",
        ],
      },
      {
        type: "subheading",
        content: "Boring is a feature, not a compromise",
      },
      {
        type: "paragraph",
        content:
          "When I say a system should be boring, I do not mean it should be primitive. I mean it should be predictable. Predictable systems let you spend your limited attention on the product, the customer, and the parts that genuinely require taste. Unpredictable systems spend your attention for you, whether you can afford it or not.",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        content: "Calm interfaces are an honesty problem",
      },
      {
        type: "paragraph",
        content:
          "The same discipline shows up at the surface. A calm interface is not one with more motion or more polish. It is one that tells the truth about its state. It admits when it is loading, when it is empty, when something failed, and when an action is irreversible. Most 'janky' products are not ugly — they are dishonest. They pretend a slow request is instant, then surprise the user when reality catches up.",
      },
      {
        type: "paragraph",
        content:
          "On the last large platform I led, we improved perceived performance more by designing honest pending and empty states than by shaving milliseconds off the bundle. The page was not dramatically faster. It simply stopped lying about how fast it was, and trust went up immediately.",
      },
      {
        type: "callout",
        label: "In practice",
        content:
          "Before adding a feature, I write down its empty state, its loading state, its error state, and its irreversible action. If any of those is undefined, the feature is not designed yet — it is just drawn.",
      },
      {
        type: "heading",
        content: "The compounding return on discipline",
      },
      {
        type: "paragraph",
        content:
          "None of this is glamorous. There is no demo for 'we removed a class of bug.' But discipline compounds. A boundary you drew clearly last quarter is the reason a risky migration ships safely this quarter. The guardrail you automated last year is the reason a junior engineer can move with confidence today. This is the real work, and it is mostly invisible — which is exactly why it is worth doing well.",
      },
      {
        type: "paragraph",
        content:
          "This is not about over-engineering. It is the opposite. It is about doing the small, durable things so consistently that the product feels easy to reason about precisely when the stakes are highest.",
      },
    ] satisfies ArticleBlock[],
  },
  {
    title: "Designing frontend systems for 100k+ users",
    slug: "designing-frontend-systems-for-100k-users",
    category: "Frontend" satisfies BlogCategory,
    publishedAt: "2026-05-30",
    readingTime: "10 min read",
    featured: false,
    excerpt:
      "Performance is not only bundle size. It is rendering behavior, data ownership, and interface honesty.",
    summary:
      "What it actually takes to keep a large React application fast, coherent, and pleasant to work in — drawn from rebuilding an employee platform used by over a hundred thousand people.",
    standfirst:
      "A frontend does not become hard because of one big problem. It becomes hard because a thousand small screens each quietly decided to do things their own way.",
    takeaways: [
      "Scale breaks consistency before it breaks performance.",
      "Interaction contracts matter more than the component library.",
      "Most 'slow' apps are slow because they render dishonestly.",
      "Own your data flow deliberately, or it will own you.",
    ],
    body: [
      {
        type: "paragraph",
        lead: true,
        content:
          "A large frontend rarely fails dramatically. It degrades. Loading spinners drift apart in style. Two forms disagree about how to show an error. Data fetching becomes incidental — a hook here, a fetch there — until nobody can say with confidence where a given value comes from. Performance suffers, and there is no single villain to point at.",
      },
      {
        type: "paragraph",
        content:
          "When I joined the team behind a 100k-user employee management platform, the codebase was not bad. It was inconsistent, which at scale is worse. Every screen was individually reasonable and collectively exhausting. Fixing it was less about a rewrite and more about installing shared agreements the whole app could lean on.",
      },
      {
        type: "heading",
        content: "Start with interaction contracts",
      },
      {
        type: "paragraph",
        content:
          "The screens that scale best are explicit about the states users actually encounter. Before touching components, we wrote down the contract every data view had to honor. It sounds bureaucratic. In practice it removed an entire category of arguments and bugs.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Empty: there is genuinely nothing, and we say so with intent — not a blank box.",
          "Loading: we show structure, not a spinner that hides the layout shift to come.",
          "Partial: some data arrived; we render it without blocking on the rest.",
          "Error: we explain what failed and offer the next action, not a red stack trace.",
          "Success: the happy path — designed last, on purpose, so the edges are not afterthoughts.",
        ],
      },
      {
        type: "callout",
        label: "Why it works",
        content:
          "Once every list, table, and detail view answers the same five questions, new screens stop reinventing behavior. Consistency becomes the default instead of a code-review battle.",
      },
      {
        type: "heading",
        content: "Own your data flow on purpose",
      },
      {
        type: "paragraph",
        content:
          "The single biggest source of accidental complexity was unclear data ownership. The same entity was fetched in four places, cached differently in each, and reconciled nowhere. We drew a hard line: server state and client state are different problems and deserve different tools.",
      },
      {
        type: "code",
        language: "ts",
        filename: "use-employees.ts",
        code: `// Server state: one owner, one cache key, one source of truth.
export function useEmployees(filters: EmployeeFilters) {
  return useQuery({
    queryKey: ["employees", filters],
    queryFn: () => api.employees.list(filters),
    staleTime: 30_000,        // tolerate brief staleness for fewer refetches
    placeholderData: keepPreviousData, // no layout flash on filter change
  });
}`,
      },
      {
        type: "paragraph",
        content:
          "Centralizing server state did more for performance than any micro-optimization. Refetch storms disappeared. Filter changes stopped flashing the layout. And because there was exactly one cache key per entity, invalidation became something we could reason about instead of fear.",
      },
      {
        type: "subheading",
        content: "Render less, and render honestly",
      },
      {
        type: "paragraph",
        content:
          "Most of our wins came from rendering less work, not faster work. Virtualized long tables. Memoized rows keyed by stable ids. Suspense boundaries placed where the user expects a unit of content to appear, so the page streams in meaningful chunks instead of one large, late paint.",
      },
      {
        type: "quote",
        content:
          "A fast interface is usually an honest interface running on a tidy data flow.",
      },
      {
        type: "paragraph",
        content:
          "When we eventually reported a 35 percent improvement in page load, there was no single trick behind it. It was fewer unnecessary renders, better cache boundaries, cleaner data dependencies, and an interface that stopped pretending slow things were instant. The work was unglamorous and entirely worth it.",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        content: "Make the right thing the easy thing",
      },
      {
        type: "paragraph",
        content:
          "The lasting fix was not any individual optimization — it was lowering the cost of doing things correctly. We shipped a small set of primitives (a data view, a form field, a page shell) that already handled the hard states. After that, the fast and consistent path was also the path of least resistance. That is the only kind of consistency that survives a growing team.",
      },
      {
        type: "callout",
        label: "Takeaway",
        content:
          "You scale a frontend by making good decisions cheap to repeat, not by asking every engineer to be heroic on every screen.",
      },
    ] satisfies ArticleBlock[],
  },
  {
    title: "Security gates that should live in the delivery path",
    slug: "security-gates-delivery-path",
    category: "Backend" satisfies BlogCategory,
    publishedAt: "2026-04-12",
    readingTime: "8 min read",
    featured: false,
    excerpt:
      "CodeQL, Dependabot, secret scanning, and practical OWASP habits belong in the workflow, not in a late audit.",
    summary:
      "A pragmatic blueprint for building security into the path engineers already use — so risk becomes visible early, automatically, and without slowing delivery.",
    standfirst:
      "The most expensive security work is the kind that happens in a review meeting two weeks before launch. The cheapest is the kind that happens automatically on every push.",
    takeaways: [
      "Security that lives outside the workflow gets skipped under pressure.",
      "Different tools catch different classes of risk — layer them.",
      "Automated gates make risky changes visible, not slower.",
      "The goal is fewer surprises, not zero trust in people.",
    ],
    body: [
      {
        type: "paragraph",
        lead: true,
        content:
          "Security becomes reliable when it stops being an event and starts being a property of the pipeline. A late audit is a snapshot of one moment. A gate in the delivery path is a standing promise: this class of mistake cannot reach production unnoticed, no matter who is shipping or how tired they are.",
      },
      {
        type: "paragraph",
        content:
          "I am not interested in security theater that slows everyone down to feel responsible. I am interested in moving risk to the left — making it visible at the exact moment it is cheapest to fix, which is while the author still has the change in their head.",
      },
      {
        type: "heading",
        content: "Automate the checks that never should have been manual",
      },
      {
        type: "paragraph",
        content:
          "There is a tier of security work that humans are simply bad at doing consistently: spotting a leaked key in a diff, noticing a dependency picked up a known CVE, remembering that this endpoint needed an authorization check. Machines are excellent at exactly this. So we let them own it.",
      },
      {
        type: "list",
        items: [
          "Static analysis (CodeQL) on every pull request to catch injection, unsafe deserialization, and tainted data flows.",
          "Dependency scanning (Dependabot / audit) so a vulnerable transitive package is a failing check, not a future headline.",
          "Secret scanning on push and in history, because the credential you rotate today is cheaper than the breach you explain tomorrow.",
          "Required status checks, so none of the above is optional when the deadline is close.",
        ],
      },
      {
        type: "code",
        language: "yaml",
        filename: ".github/workflows/security.yml",
        code: `name: security
on: [pull_request]

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with: { languages: typescript }
      - uses: github/codeql-action/analyze@v3
      # This job is a *required* check — a finding blocks the merge.`,
      },
      {
        type: "callout",
        label: "Principle",
        content:
          "A control that can be skipped under deadline pressure is not a control. If it matters, it belongs in the required path — the same path that already runs your tests.",
      },
      {
        type: "heading",
        content: "Layer controls, because risk is not one thing",
      },
      {
        type: "paragraph",
        content:
          "No single tool is a strategy. Static analysis misses runtime misconfiguration. Dependency scanning says nothing about your own logic. Secret scanning will not save you from a broken authorization model. Each tool covers a different slice of the threat surface, and the value is in the overlap — defense in depth that a single bypassed control cannot defeat.",
      },
      {
        type: "subheading",
        content: "Keep humans for the judgment calls",
      },
      {
        type: "paragraph",
        content:
          "Automation exists to free people for the work only people can do: threat modeling a new feature, reasoning about trust boundaries, deciding whether a convenience is worth its risk. When the machine handles the rote checks, the human review can finally be about judgment instead of vigilance.",
      },
      {
        type: "quote",
        content:
          "Good security automation does not replace judgment. It makes sure judgment is spent on the things that actually need it.",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        content: "The goal is fewer surprises",
      },
      {
        type: "paragraph",
        content:
          "When security lives in the delivery path, the conversation changes. Risky changes announce themselves early. Findings arrive attached to the diff that caused them, with the author still present. Launches stop ending in frantic audits. None of this is dramatic — and that is the point. The best security work, like the best engineering, is the kind nobody has to notice because nothing went wrong.",
      },
    ] satisfies ArticleBlock[],
  },
  {
    title: "AI features need product taste",
    slug: "ai-features-need-product-taste",
    category: "AI" satisfies BlogCategory,
    publishedAt: "2026-03-18",
    readingTime: "5 min read",
    featured: false,
    excerpt:
      "The useful AI work is usually less theatrical: structured outputs, better workflows, and sharper context.",
    summary:
      "A product-minded approach to LLM features, RAG, and automation.",
    body: [
      {
        type: "paragraph",
        content:
          "AI features fail when they are treated like magic boxes. They work better when they are treated like product systems: inputs, constraints, feedback loops, failure states, and trust boundaries.",
      },
      {
        type: "heading",
        content: "Design for verification",
      },
      {
        type: "paragraph",
        content:
          "Structured outputs, citations, deterministic workflows, and clear escalation paths are often more valuable than a dramatic chat interface.",
      },
    ] satisfies ArticleBlock[],
  },
  {
    title: "Product engineering is mostly choosing what not to build",
    slug: "product-engineering-choosing-what-not-to-build",
    category: "Product" satisfies BlogCategory,
    publishedAt: "2026-02-28",
    readingTime: "4 min read",
    featured: false,
    excerpt:
      "Senior product work is often subtraction: fewer flows, clearer states, and more honest constraints.",
    summary:
      "A note on product judgment, technical restraint, and shipping features that keep their shape.",
    body: [
      {
        type: "paragraph",
        content:
          "Most products do not suffer from a lack of ideas. They suffer from too many half-shaped ideas arriving at the same interface. Product engineering is the discipline of making choices visible before the system absorbs them.",
      },
      {
        type: "heading",
        content: "Restraint is a technical skill",
      },
      {
        type: "paragraph",
        content:
          "When a feature has a clear owner, a clear failure state, and a clear reason to exist, it becomes easier to design, implement, monitor, and improve.",
      },
    ] satisfies ArticleBlock[],
  },
  {
    title: "Why beautiful admin software matters",
    slug: "why-beautiful-admin-software-matters",
    category: "Design" satisfies BlogCategory,
    publishedAt: "2026-02-08",
    readingTime: "4 min read",
    featured: false,
    excerpt:
      "Internal tools still shape trust, speed, and decision quality. They deserve care.",
    summary:
      "A design note on dashboards, workflows, and serious operational products.",
    body: [
      {
        type: "paragraph",
        content:
          "Admin software is often where important work happens. It should be dense, calm, and precise. Beauty here is not decoration. It is legibility, hierarchy, rhythm, and a product that does not make people feel lost.",
      },
      {
        type: "heading",
        content: "Trust is visual",
      },
      {
        type: "paragraph",
        content:
          "A well-designed dashboard helps the user understand where they are, what changed, and what action matters next.",
      },
    ] satisfies ArticleBlock[],
  },
  {
    title: "Notes from building as a founder-engineer",
    slug: "notes-from-building-as-a-founder-engineer",
    category: "Personal" satisfies BlogCategory,
    publishedAt: "2026-01-19",
    readingTime: "3 min read",
    featured: false,
    excerpt:
      "Owning the whole surface changes how you think about taste, tradeoffs, and momentum.",
    summary:
      "A quieter reflection on product ownership and engineering judgment.",
    body: [
      {
        type: "paragraph",
        content:
          "Founder-engineering forces a useful tension. You care about the interface, the architecture, the customer, the deployment, and the cost of every shortcut. That tension can be heavy, but it sharpens taste quickly.",
      },
      {
        type: "paragraph",
        content:
          "The work becomes less about proving technical range and more about making the product more coherent every week.",
      },
    ] satisfies ArticleBlock[],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getFeaturedPost() {
  return posts.find((post) => post.featured) ?? posts[0];
}

export function getRelatedPosts(slug: string, category: BlogCategory) {
  return posts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      if (a.category === category && b.category !== category) return -1;
      if (a.category !== category && b.category === category) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, 3);
}

export function getPostsByCategory(category?: string) {
  if (!category || category === "All") {
    return posts;
  }

  return posts.filter((post) => post.category === category);
}

/** Previous/next posts in chronological order for article footer navigation. */
export function getAdjacentPosts(slug: string) {
  const ordered = [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const index = ordered.findIndex((post) => post.slug === slug);

  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}
