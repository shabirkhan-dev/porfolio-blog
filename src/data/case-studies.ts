export type CaseStudySection = {
  title: string;
  content: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  year: string;
  role: string;
  stack: string[];
  problem: CaseStudySection;
  context: CaseStudySection;
  architecture: CaseStudySection;
  frontend: CaseStudySection;
  backend: CaseStudySection;
  infrastructure: CaseStudySection;
  challenge: CaseStudySection;
  impact: CaseStudySection;
  next: CaseStudySection;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "autobay",
    title: "Autobay",
    subtitle: "Kansai Group",
    tagline: "Production marketplace and internal operations system.",
    year: "2022 – 2023",
    role: "Lead frontend, backend, and DevOps",
    stack: [
      "Next.js",
      "React Native",
      "CodeIgniter",
      "WebSockets",
      "Redis",
      "Docker",
      "Nginx",
      "MySQL",
    ],
    problem: {
      title: "Problem",
      content: [
        "Kansai Group needed a unified platform for vehicle marketplace listings, dealer operations, and internal workflows — spread across a web admin, customer-facing surfaces, and a mobile app.",
        "Legacy endpoints were slow, payloads were bloated, and teams were shipping features against inconsistent API contracts.",
      ],
    },
    context: {
      title: "Context",
      content: [
        "Autobay served production dealers and internal ops staff across web and mobile. The product had to stay responsive under real listing volume, support live inventory updates, and remain maintainable as the team grew.",
        "I joined as the engineer who could own the full vertical — interface, API layer, mobile client, and deployment path.",
      ],
    },
    architecture: {
      title: "System architecture",
      content: [
        "Split the surface into three clear layers: Next.js admin and web, React Native mobile, and CodeIgniter API services behind Nginx.",
        "Redis handled session caching and hot listing data. WebSockets pushed inventory and status changes to connected clients without polling storms.",
        "Dockerized services with explicit environment boundaries so staging matched production closely enough to catch integration issues early.",
      ],
    },
    frontend: {
      title: "Frontend decisions",
      content: [
        "Built the admin as a typed Next.js app with predictable data-fetching patterns and shared interaction states across list, detail, and form views.",
        "Reduced unnecessary re-renders on large inventory tables through memoized row components and deliberate cache keys.",
        "Designed honest loading and empty states so ops staff always knew whether data was missing or still in flight.",
      ],
    },
    backend: {
      title: "Backend decisions",
      content: [
        "Refactored API responses to return only fields each client needed — admin, mobile, and public surfaces stopped sharing one bloated payload shape.",
        "Introduced Redis-backed caching for high-read listing endpoints and tightened MySQL query paths on the heaviest routes.",
        "Standardized validation and error contracts so frontend teams could handle failures without guessing server behavior.",
      ],
    },
    infrastructure: {
      title: "Infrastructure decisions",
      content: [
        "Containerized the API and supporting services with Docker, fronted by Nginx for TLS termination and static asset delivery.",
        "Structured deploy scripts around repeatable builds so releases did not depend on one engineer's local machine.",
        "Added basic health checks and log visibility so production issues surfaced before users reported them.",
      ],
    },
    challenge: {
      title: "Hardest technical challenge",
      content: [
        "Keeping inventory state consistent across web admin, mobile, and background jobs while WebSocket connections dropped and reconnected unpredictably on mobile networks.",
        "Solved it with idempotent update handlers, versioned listing records, and a reconciliation path on reconnect — clients could always recover without a full refresh.",
      ],
    },
    impact: {
      title: "Impact",
      content: [
        "Reduced API payload overhead by 50% through response shaping and field-level trimming.",
        "Improved page-load performance by 35% after cache boundaries and frontend render discipline.",
        "Supported production dealer workflows across web admin and mobile without a separate ops toolchain.",
      ],
    },
    next: {
      title: "What I would improve next",
      content: [
        "Move API services toward a typed Node or Bun layer with OpenAPI contracts generated at build time.",
        "Add observability dashboards for WebSocket connection health and listing sync lag.",
        "Introduce feature flags for safer rollout of marketplace experiments.",
      ],
    },
  },
  {
    slug: "school-os",
    title: "School OS",
    subtitle: "Multi-tenant education platform",
    tagline: "AI-powered attendance, analytics, and school operations.",
    year: "2025 – Present",
    role: "Product architect and lead engineer",
    stack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "LLM APIs",
      "Docker",
      "Tailwind CSS",
    ],
    problem: {
      title: "Problem",
      content: [
        "School networks need operational software that works across tenants — different schools, different roles, different reporting needs — without becoming a separate codebase per customer.",
        "Most off-the-shelf tools treat attendance and analytics as afterthoughts, and AI features are bolted on without product context.",
      ],
    },
    context: {
      title: "Context",
      content: [
        "School OS is a platform I architected for scalable deployment across school networks: attendance capture, admin dashboards, role-based access, and AI-assisted insights for staff who actually run the day.",
        "The product had to feel calm for non-technical users while supporting serious multi-tenant isolation underneath.",
      ],
    },
    architecture: {
      title: "System architecture",
      content: [
        "Multi-tenant data model with strict tenant scoping at the query layer — no tenant context, no data access.",
        "Next.js for admin and staff surfaces, Node.js API services for business logic, PostgreSQL for relational integrity, Redis for session and cache hot paths.",
        "AI workflows run as structured pipelines with typed inputs and verifiable outputs, not open-ended chat endpoints.",
      ],
    },
    frontend: {
      title: "Frontend decisions",
      content: [
        "Dashboard hierarchy built around the three questions staff ask daily: who is here, what changed, and what needs action.",
        "Shared interaction contracts for every data view — empty, loading, partial, error — so new screens inherit consistency by default.",
        "Motion kept minimal and scroll-aware; the interface earns trust through clarity, not decoration.",
      ],
    },
    backend: {
      title: "Backend decisions",
      content: [
        "Role and permission model designed before feature work — teachers, admins, and network operators each see only what their role requires.",
        "Attendance events stored as an append-friendly log so analytics can be recomputed without destructive migrations.",
        "AI insights generated from structured attendance summaries, not raw student data sent to a model without constraints.",
      ],
    },
    infrastructure: {
      title: "Infrastructure decisions",
      content: [
        "Docker-based deployment with environment-specific config and database migration discipline.",
        "Tenant-aware backup and restore paths planned from the start — multi-tenant systems fail operationally when this is an afterthought.",
        "CI pipeline runs type checks, lint, and integration tests before any deploy.",
      ],
    },
    challenge: {
      title: "Hardest technical challenge",
      content: [
        "Designing tenant isolation that is enforceable at the database layer without making every query painful to write or review.",
        "Implemented a tenant context middleware that injects scope into every data access path, with integration tests that assert cross-tenant reads are impossible.",
      ],
    },
    impact: {
      title: "Impact",
      content: [
        "Platform architecture supports multiple schools from a single codebase with tenant-scoped analytics.",
        "Staff workflows reduced manual attendance reconciliation through structured capture and automated summaries.",
        "AI insight layer gives operators signal without exposing raw sensitive data to unstructured prompts.",
      ],
    },
    next: {
      title: "What I would improve next",
      content: [
        "Parent-facing mobile app with offline-first attendance sync.",
        "Deeper analytics pipeline with exportable reports per tenant.",
        "Fine-grained audit logging for compliance-sensitive deployments.",
      ],
    },
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
