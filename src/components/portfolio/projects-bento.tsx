import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/site";
import { cn } from "@/lib/utils";

function detailHref(project: Project) {
  if (project.caseStudy) return `/case-studies/${project.slug}`;
  return `/projects#${project.slug}`;
}

function ProjectTile({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const href = detailHref(project);

  return (
    <article id={project.slug} className="group flex flex-col">
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden bg-background-2 outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Image
          src={project.image}
          alt={`${project.title} interface`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.02]"
          priority={index < 2}
        />
      </Link>

      <div className="flex flex-1 flex-col border-x border-b border-border px-4 py-4 sm:px-5 sm:py-5">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
          {String(index + 1).padStart(2, "0")} · {project.category}
        </p>

        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-[1.35rem]">
          <Link href={href} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
          {project.tagline}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-foreground"
          >
            {project.caseStudy ? "Case study" : "Details"}
            <ArrowUpRight aria-hidden size={12} className="text-accent" />
          </Link>

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
            >
              <Github aria-hidden size={12} />
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** Simple scannable grid — every project visible, no hover theater. */
export function ProjectsBento({
  projects,
  variant = "home",
}: {
  projects: Project[];
  variant?: "home" | "page";
}) {
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
