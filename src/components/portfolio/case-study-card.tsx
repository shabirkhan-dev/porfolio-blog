"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectPreview } from "@/components/portfolio/project-preview";
import type { Project } from "@/data/site";
import { useActiveOnScroll } from "@/lib/use-active-on-scroll";
import { cn } from "@/lib/utils";

export function CaseStudyCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, active } = useActiveOnScroll<HTMLElement>();
  const flip = index % 2 === 0;
  const href = project.caseStudy
    ? `/case-studies/${project.slug}`
    : `/projects#${project.slug}`;

  return (
    <Link href={href} className="group block">
      <article
        ref={ref}
        data-active={active}
        className="relative overflow-hidden rounded-lg border border-border bg-background-2 transition-colors duration-500 hover:border-border-strong group-data-[active=true]:border-border-strong"
      >
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          {/* ---- Text column ---- */}
          <div
            className={cn(
              "flex flex-col p-7 sm:p-10 lg:p-12",
              flip ? "lg:order-2" : "lg:order-1",
            )}
          >
            {/* meta row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[0.64rem] uppercase tracking-[0.14em]">
                <span className="inline-flex items-center rounded-sm border border-accent/25 bg-accent/[0.08] px-3 py-1 text-accent">
                  {project.category}
                </span>
                <span className="text-faint">{project.year}</span>
              </div>
              <span className="font-mono text-sm tabular-nums text-faint">
                {String(index).padStart(2, "0")}
              </span>
            </div>

            {/* title */}
            <h3 className="mt-7 font-display text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold leading-[0.98] tracking-tight transition-colors duration-300 group-hover:text-accent group-data-[active=true]:text-accent">
              {project.title}
            </h3>
            {project.subtitle ? (
              <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
                {project.subtitle}
              </p>
            ) : null}

            <p className="mt-5 max-w-xl text-[0.95rem] leading-7 text-muted-foreground">
              {project.tagline}
            </p>

            {/* impact — the proof, given prominence */}
            <div className="mt-8 rounded-2xl border border-border bg-background/60 p-5 sm:p-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-accent">
                Impact
              </p>
              <ul className="mt-4 space-y-2.5">
                {project.impact.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-6 text-foreground/90"
                  >
                    <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* role + built */}
            <dl className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                  Role
                </dt>
                <dd className="mt-1.5 text-sm leading-6 text-foreground">
                  {project.role}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                  Built
                </dt>
                <dd className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {project.built}
                </dd>
              </div>
            </dl>

            {/* footer — stack + cta */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-border px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-faint transition-colors duration-300 group-hover:border-border-strong"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground">
                {project.caseStudy ? "Case study" : "View"}
                <ArrowUpRight
                  aria-hidden="true"
                  size={15}
                  className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-data-[active=true]:-translate-y-0.5 group-data-[active=true]:translate-x-0.5"
                />
              </span>
            </div>
          </div>

          {/* ---- Visual column ---- */}
          <div
            className={cn(
              "relative flex items-center justify-center overflow-hidden border-border bg-background p-7 sm:p-10 lg:p-12",
              flip
                ? "lg:order-1 lg:border-r"
                : "lg:order-2 lg:border-l",
            )}
          >
            <div className="pointer-events-none absolute inset-0 hairline-grid opacity-40" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_30%,rgb(var(--accent-rgb)/0.06),transparent_70%)]" />

            <div className="relative w-full overflow-hidden rounded-2xl border border-border shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)] transition-all duration-500 group-hover:border-border-strong group-data-[active=true]:border-border-strong">
              <div className="code-surface">
                <div className="code-header flex items-center gap-3 border-b px-4 py-3">
                  <span className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-accent/60" />
                  </span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em]">
                    {project.slug}
                  </span>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full group-data-[active=true]:translate-x-full" />
              <div className="transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-data-[active=true]:scale-[1.03]">
                <ProjectPreview visual={project.visual} title={project.title} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
