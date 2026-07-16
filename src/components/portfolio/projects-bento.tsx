import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/site";
import { cn } from "@/lib/utils";

function detailHref(project: Project) {
  if (project.caseStudy) return `/case-studies/${project.slug}`;
  return `/projects#${project.slug}`;
}

function ProjectMeta({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const href = detailHref(project);

  return (
    <div
      className={cn(
        "flex flex-1 flex-col",
        featured ? "px-5 py-5 sm:px-6 sm:py-6 lg:justify-center lg:px-8 lg:py-8" : "px-4 py-4 sm:px-5 sm:py-5",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.58rem] uppercase tracking-[0.14em]">
        <p className="text-faint">
          {String(index + 1).padStart(2, "0")} · {project.category}
        </p>
        <p className="text-accent">{project.year}</p>
      </div>

      <h3
        className={cn(
          "mt-2.5 font-display font-semibold tracking-tight",
          featured
            ? "text-[clamp(1.55rem,1.25rem+1.2vw,2.15rem)]"
            : "text-xl sm:text-[1.35rem]",
        )}
      >
        <Link href={href} className="transition-colors hover:text-accent">
          {project.title}
        </Link>
      </h3>

      <p
        className={cn(
          "mt-2 text-muted-foreground",
          featured
            ? "max-w-xl text-[0.95rem] leading-7"
            : "flex-1 text-sm leading-6",
        )}
      >
        {project.tagline}
      </p>

      {featured ? (
        <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/80">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-faint">
            Decision
          </span>
          <span className="mt-1 block">{project.decision}</span>
        </p>
      ) : null}

      <div
        className={cn(
          "mt-auto flex flex-wrap items-end justify-between gap-3",
          featured ? "mt-6 pt-5 border-t border-border" : "mt-4 pt-4 border-t border-border",
        )}
      >
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-accent">
          <span className="text-foreground">{project.metric.value}</span>{" "}
          {project.metric.label}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            href={href}
            className="inline-flex min-h-9 items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-foreground"
          >
            {project.caseStudy ? "Case study" : "Details"}
            <ArrowUpRight aria-hidden size={12} className="text-accent" />
          </Link>

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github aria-hidden size={12} />
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ProjectTile({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const href = detailHref(project);

  return (
    <article
      id={project.slug}
      className={cn(
        "group flex overflow-hidden border border-border bg-background-2",
        featured
          ? "flex-col lg:grid lg:grid-cols-[1.15fr_0.85fr]"
          : "flex-col",
      )}
    >
      <Link
        href={href}
        aria-label={`View ${project.title}${project.caseStudy ? " case study" : " project details"}`}
        className={cn(
          "relative block overflow-hidden bg-background outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
          featured
            ? "aspect-[16/10] lg:aspect-auto lg:min-h-[18rem]"
            : "aspect-[16/10]",
        )}
      >
        <Image
          src={project.image}
          alt={`${project.title} interface`}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 58vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.015]"
          priority={featured || index === 0}
          loading={featured || index === 0 ? "eager" : "lazy"}
          fetchPriority={featured || index === 0 ? "high" : "auto"}
          decoding={featured || index === 0 ? "sync" : "async"}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:from-background/50"
        />
      </Link>

      <ProjectMeta project={project} index={index} featured={featured} />
    </article>
  );
}

/** Home + projects grid — featured lead on home, equal tiles elsewhere. */
export function ProjectsBento({
  projects,
  variant = "home",
}: {
  projects: Project[];
  variant?: "home" | "page";
}) {
  if (variant === "home" && projects.length > 1) {
    const [featured, ...rest] = projects;

    return (
      <div className="space-y-4 sm:space-y-5">
        {featured ? (
          <ProjectTile project={featured} index={0} featured />
        ) : null}
        {rest.length > 0 ? (
          <div
            className={cn(
              "grid gap-4 sm:gap-5",
              rest.length === 1 ? "grid-cols-1" : "sm:grid-cols-2",
            )}
          >
            {rest.map((project, index) => (
              <ProjectTile
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

  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-5",
        projects.length === 1 ? "grid-cols-1" : "sm:grid-cols-2",
        variant === "page" && "gap-5 sm:gap-6",
      )}
    >
      {projects.map((project, index) => (
        <ProjectTile key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
