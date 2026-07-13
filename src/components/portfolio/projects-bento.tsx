import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/site";
import { cn } from "@/lib/utils";

function hrefFor(project: Project) {
  return project.caseStudy
    ? `/case-studies/${project.slug}`
    : `/projects#${project.slug}`;
}

function Meta({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2.5 font-mono text-[0.62rem] uppercase tracking-[0.14em]">
        <span className="tabular-nums text-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="border border-accent/30 bg-accent/[0.07] px-2.5 py-1 text-accent">
          {project.category}
        </span>
        <span className="text-faint">{project.year}</span>
      </div>
      <ArrowUpRight
        aria-hidden="true"
        size={16}
        className="text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={hrefFor(project)}
      className="group relative block border border-border bg-background-2 transition-colors duration-300 hover:border-border-strong"
    >
      <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="flex flex-col p-5 sm:p-7 lg:p-8">
          <Meta project={project} index={index} />

          <h3 className="mt-5 font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] font-semibold leading-[1.02] tracking-tight transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          {project.subtitle ? (
            <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
              {project.subtitle}
            </p>
          ) : null}
          <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-muted-foreground">
            {project.tagline}
          </p>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((item) => (
              <li
                key={item}
                className="border border-border px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-faint"
              >
                {item}
              </li>
            ))}
          </ul>

          <span className="mt-8 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground">
            {project.caseStudy ? "Read case study" : "View project"}
            <ArrowUpRight aria-hidden="true" size={14} className="text-accent" />
          </span>
        </div>

        <div className="flex flex-col justify-between border-t border-border p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
            Headline metric
          </p>
          <div className="mt-6 lg:mt-0">
            <p className="font-display text-[clamp(2.2rem,1.5rem+2.4vw,3.5rem)] font-semibold leading-none tracking-tight text-accent">
              {project.metric.value}
            </p>
            <p className="mt-3 max-w-[16ch] text-sm leading-6 text-muted-foreground">
              {project.metric.label}
            </p>
          </div>
          <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint lg:mt-10">
            {project.role}
          </p>
        </div>
      </div>
    </Link>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={hrefFor(project)}
      className="group relative flex h-full flex-col border border-border bg-background-2 p-5 transition-colors duration-300 hover:border-border-strong sm:p-6"
    >
      <Meta project={project} index={index} />

      <h3 className="mt-5 font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.65rem)] font-semibold leading-tight tracking-tight transition-colors duration-300 group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
        {project.tagline}
      </p>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-5">
        <div>
          <p className="font-display text-[clamp(1.35rem,1.1rem+0.8vw,1.85rem)] font-semibold leading-none tracking-tight text-accent">
            {project.metric.value}
          </p>
          <p className="mt-2 text-[0.7rem] leading-4 text-muted-foreground">
            {project.metric.label}
          </p>
        </div>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-faint">
          {project.caseStudy ? "Case study" : "Project"}
        </span>
      </div>
    </Link>
  );
}

/** Clean home work grid — featured lead + supporting cards. */
export function ProjectsBento({ projects }: { projects: Project[] }) {
  const [featured, ...rest] = projects;

  return (
    <div className="grid gap-4">
      {featured ? <FeaturedCard project={featured} index={0} /> : null}
      {rest.length > 0 ? (
        <div
          className={cn(
            "grid gap-4",
            rest.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {rest.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
