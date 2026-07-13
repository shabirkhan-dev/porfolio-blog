import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/site";
import { cn } from "@/lib/utils";

function detailHref(project: Project) {
  if (project.caseStudy) return `/case-studies/${project.slug}`;
  return `/projects#${project.slug}`;
}

function ProjectEntry({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const href = detailHref(project);

  return (
    <article
      id={project.slug}
      className="group border-b border-border py-8 first:pt-0 last:border-b-0 last:pb-0 sm:py-10"
    >
      {/* Shot — the product, not a mock card */}
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden bg-background-2 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-accent sm:aspect-[2/1]"
      >
        <Image
          src={project.image}
          alt={`${project.title} interface`}
          fill
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="object-cover object-top transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
          priority={index === 0}
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-80" />
        <span className="absolute bottom-3 left-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/70 sm:bottom-4 sm:left-4">
          {String(index + 1).padStart(2, "0")} · {project.category}
        </span>
      </Link>

      {/* Caption — sparse, scannable */}
      <div className="mt-5 grid gap-5 sm:mt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-[clamp(1.45rem,1.15rem+1.2vw,2rem)] font-semibold leading-none tracking-tight">
              <Link
                href={href}
                className="transition-colors hover:text-accent"
              >
                {project.title}
              </Link>
            </h3>
            {project.subtitle ? (
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
                {project.subtitle}
              </span>
            ) : null}
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
              {project.year}
            </span>
          </div>

          <p className="mt-3 max-w-xl text-[0.95rem] leading-6 text-muted-foreground">
            {project.tagline}
          </p>

          <ul className="mt-3.5 flex flex-wrap gap-x-3 gap-y-1">
            {project.stack.slice(0, 4).map((item) => (
              <li
                key={item}
                className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-faint"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent">
            <span className="text-foreground">{project.metric.value}</span>
            <span className="text-faint"> · {project.metric.label}</span>
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
            <Link
              href={href}
              className="link-line inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-foreground"
            >
              {project.caseStudy ? "Case study" : "Details"}
              <ArrowUpRight aria-hidden size={13} className="text-accent" />
            </Link>

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
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
                className="link-line inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
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

/** Image-led project list for home and /projects. */
export function ProjectsBento({
  projects,
  variant = "home",
}: {
  projects: Project[];
  variant?: "home" | "page";
}) {
  return (
    <div className={cn(variant === "page" && "border-t border-border pt-2")}>
      {projects.map((project, index) => (
        <ProjectEntry key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
