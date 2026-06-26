import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Mail,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { ArchitectureVisual } from "@/components/architecture-visual";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  experience,
  focusAreas,
  posts,
  profile,
  projects,
  skillGroups,
  stats,
} from "@/content/site";
import { formatDate } from "@/lib/format";

export default function Home() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground">
              <MapPin aria-hidden="true" size={16} />
              {profile.location} - {profile.availability}
            </p>
            <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.03] text-foreground sm:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-5 text-xl font-semibold text-primary sm:text-2xl">
              {profile.role}
            </p>
            <p className="text-balance mt-6 max-w-3xl text-xl leading-9 text-foreground">
              {profile.headline}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              {profile.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:bg-primary hover:text-primary-foreground"
              >
                Start a conversation
                <Mail aria-hidden="true" size={18} />
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                View selected work
                <BriefcaseBusiness aria-hidden="true" size={18} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 aria-hidden="true" size={15} />
                  {area}
                </span>
              ))}
            </div>
          </div>

          <ArchitectureVisual />
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto grid w-full max-w-7xl gap-4 px-5 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border p-5">
                <p className="text-4xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8"
        >
          <SectionHeading
            eyebrow="Experience"
            title="Built for production, not just launch day"
            description="A track record across product architecture, frontend platforms, backend services, mobile apps, CI/CD, and security."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {experience.map((item) => (
              <article
                key={`${item.company}-${item.role}`}
                className="rounded-lg border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {item.company}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground sm:text-right">
                    {item.period}
                    <br />
                    {item.location}
                  </p>
                </div>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  {item.summary}
                </p>
                <ul className="mt-5 space-y-3">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-6 text-foreground"
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        size={17}
                        className="mt-1 shrink-0 text-primary"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
            <SectionHeading
              eyebrow="Technical range"
              title="Full-stack depth with security and AI at the edges"
              description="The stack is broad, but the center is consistent: TypeScript systems that are reliable, observable, and fast."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {skillGroups.map((group) => (
                <article
                  key={group.title}
                  className="rounded-lg border border-border bg-background p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary">
                      {group.title === "Security" ? (
                        <ShieldCheck aria-hidden="true" size={20} />
                      ) : (
                        <Zap aria-hidden="true" size={20} />
                      )}
                    </div>
                    <h3 className="font-semibold">{group.title}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Selected work"
              title="Platforms with architecture behind them"
              description="These projects reflect the CV pattern: systems thinking, secure delivery, product ownership, and performance."
            />
            <Link
              href="/projects"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary"
            >
              All projects
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
              >
                <div
                  className={`h-32 bg-gradient-to-br ${project.palette}`}
                  aria-hidden="true"
                />
                <div className="p-5">
                  <p className="text-sm font-medium text-primary">
                    {project.status}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {project.summary}
                  </p>
                  <p className="mt-5 text-sm font-semibold text-foreground">
                    {project.impact}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Writing"
                title="Notes from building serious software"
                description="Short essays shaped around architecture, performance, CI/CD, and security."
              />
              <Link
                href="/blog"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary"
              >
                All writing
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-lg border border-border bg-background p-5 transition hover:border-primary"
                >
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.publishedAt)} - {post.readingTime}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
          <div className="rounded-lg border border-border bg-foreground p-6 text-background sm:p-8 lg:flex lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-background/70">
                Available for remote work
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
                Need a senior engineer who can own the product surface and the
                system behind it?
              </h2>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-primary hover:text-primary-foreground lg:mt-0"
            >
              Email {profile.name.split(" ")[0]}
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
