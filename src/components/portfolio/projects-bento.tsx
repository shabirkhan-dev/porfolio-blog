import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectPreview } from "@/components/portfolio/project-preview";
import type { Project } from "@/data/site";
import { cn } from "@/lib/utils";

function detailHref(project: Project) {
  if (project.caseStudy) return `/case-studies/${project.slug}`;
  return `/projects#${project.slug}`;
}

function ProjectFrame({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-[#0c0c0c] shadow-[0_24px_48px_-28px_rgba(0,0,0,0.55)]">
      <div className="code-surface">
        <div className="code-header flex items-center gap-3 border-b border-white/10 px-3.5 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-accent/55" />
          </span>
          <span className="truncate font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/40">
            {project.slug}.app
          </span>
        </div>
      </div>
      <ProjectPreview visual={project.visual} title={project.title} compact />
    </div>
  );
}

export function ProjectWorkCard({
  project,
  index,
  variant = "home",
}: {
  project: Project;
  index: number;
  variant?: "home" | "page";
}) {
  const href = detailHref(project);
  const pad = variant === "page" ? "p-5 sm:p-7 lg:p-8" : "p-4 sm:p-5 lg:p-6";

  return (
    <article
      id={project.slug}
      className="group overflow-hidden border border-border bg-background-2 transition-colors duration-300 hover:border-border-strong"
    >
      <div
        className={cn(
          "grid",
          variant === "page"
            ? "lg:grid-cols-[1.2fr_0.8fr]"
            : "lg:grid-cols-[1.15fr_0.85fr]",
        )}
      >
        {/* Visual first — what it looks / feels like */}
        <div
          className={cn(
            "relative border-b border-border lg:border-b-0 lg:border-r",
            pad,
          )}
        >
          <div className="pointer-events-none absolute inset-0 hairline-grid opacity-30" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_30%_20%,rgb(var(--accent-rgb)/0.08),transparent_70%)]" />
          <div className="relative">
            <ProjectFrame project={project} />
          </div>
        </div>

        {/* Minimal signal: what it is + proof + actions */}
        <div className={cn("flex flex-col", pad)}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[0.6rem] uppercase tracking-[0.14em]">
              <span className="tabular-nums text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="border border-accent/30 bg-accent/[0.07] px-2 py-0.5 text-accent">
                {project.category}
              </span>
              <span className="text-faint">{project.year}</span>
            </div>
          </div>

          <h3 className="mt-4 font-display text-[clamp(1.35rem,1.1rem+1vw,1.85rem)] font-semibold leading-[1.05] tracking-tight">
            {project.title}
            {project.subtitle ? (
              <span className="mt-1 block font-mono text-[0.62rem] font-normal uppercase tracking-[0.14em] text-muted-foreground">
                {project.subtitle}
              </span>
            ) : null}
          </h3>

          <p className="mt-3 max-w-md text-[0.92rem] leading-6 text-muted-foreground">
            {project.tagline}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((item) => (
              <li
                key={item}
                className="border border-border px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.1em] text-faint"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-end gap-3 border-t border-border pt-4">
            <p className="font-display text-2xl font-semibold leading-none tracking-tight text-accent sm:text-[1.7rem]">
              {project.metric.value}
            </p>
            <p className="max-w-[18ch] pb-0.5 text-[0.72rem] leading-4 text-muted-foreground">
              {project.metric.label}
            </p>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 border border-border-strong bg-background px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent/40 hover:text-accent"
            >
              {project.caseStudy ? "Case study" : "Details"}
              <ArrowUpRight aria-hidden size={13} />
            </Link>

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              >
                <Github aria-hidden size={13} />
                GitHub
              </a>
            ) : null}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              >
                Live
                <ArrowUpRight aria-hidden size={13} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

/** Home + work page project list — visual first, minimal copy. */
export function ProjectsBento({
  projects,
  variant = "home",
}: {
  projects: Project[];
  variant?: "home" | "page";
}) {
  return (
    <div className={cn("grid gap-4", variant === "page" && "gap-5 lg:gap-6")}>
      {projects.map((project, index) => (
        <ProjectWorkCard
          key={project.slug}
          project={project}
          index={index}
          variant={variant}
        />
      ))}
    </div>
  );
}
