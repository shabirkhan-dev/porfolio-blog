import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Corners } from "@/components/corners";
import type { Project } from "@/data/site";
import { cn } from "@/lib/utils";
import {
  PayloadTrace,
  MultiTenantFlow,
  PolicyEngine,
  ScaleMetrics,
  PipelineFlow
} from "@/components/portfolio/micro-worlds";

function getMicroWorld(slug: string) {
  switch (slug) {
    case "autobay": return <PayloadTrace />;
    case "school-os": return <MultiTenantFlow />;
    case "redcore": return <PolicyEngine />;
    case "excelorithm-ems": return <ScaleMetrics />;
    case "starter-kit": return <PipelineFlow />;
    default: return null;
  }
}

function hrefFor(project: Project) {
  return project.caseStudy
    ? `/case-studies/${project.slug}`
    : `/projects#${project.slug}`;
}

function TileShell({
  project,
  className,
  children,
}: {
  project: Project;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn("relative block", className)}>
      <Corners />
      <Link
        href={hrefFor(project)}
        className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background-2 p-7 transition-colors duration-500 hover:border-border-strong sm:p-8"
      >
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-0 transition-opacity duration-500 group-hover:opacity-70 z-0" />
        <div className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(70%_55%_at_50%_0%,rgb(var(--accent-rgb)/0.07),transparent_70%)] z-0" />
        
        {/* Render micro-world in the background for smaller tiles, masked to avoid text overlap */}
        {project.slug !== "autobay" && (
           <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100 [mask-image:linear-gradient(to_bottom,transparent_0%,black_50%)] sm:[mask-image:linear-gradient(to_right,transparent_0%,black_50%)]">
             {getMicroWorld(project.slug)}
           </div>
        )}
        
        <div className="relative z-10 flex flex-col h-full">
           {children}
        </div>
      </Link>
    </span>
  );
}

function MetaRow({ project, index }: { project: Project; index: number }) {
  return (
    <div className="relative flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.62rem] tabular-nums text-faint">
          [{String(index + 1).padStart(2, "0")}]
        </span>
        <span className="inline-flex items-center rounded-sm border border-accent/25 bg-accent/[0.08] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent backdrop-blur-md">
          {project.category}
        </span>
      </div>
      <ArrowUpRight
        aria-hidden="true"
        size={18}
        className="text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </div>
  );
}

function Metric({
  project,
  size = "sm",
}: {
  project: Project;
  size?: "sm" | "lg";
}) {
  return (
    <div className="relative">
      <p
        className={cn(
          "font-display font-semibold leading-none tracking-tight text-accent",
          size === "lg"
            ? "text-[clamp(2rem,1.4rem+2vw,3rem)]"
            : "text-[clamp(1.5rem,1.2rem+1vw,2rem)]",
        )}
      >
        {project.metric.value}
      </p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        {project.metric.label}
      </p>
    </div>
  );
}

/* Featured — large tile with the explicit product visual container */
function FeaturedTile({ project, index }: { project: Project; index: number }) {
  return (
    <TileShell project={project} className="lg:col-span-2 lg:row-span-2">
      <MetaRow project={project} index={index} />

      <div className="relative mt-6">
        <h3 className="font-display text-[clamp(1.9rem,1.4rem+1.8vw,2.9rem)] font-semibold leading-[0.98] tracking-tight transition-colors duration-300 group-hover:text-accent">
          {project.title}
        </h3>
        {project.subtitle ? (
          <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
            {project.subtitle}
          </p>
        ) : null}
        <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
          {project.tagline}
        </p>
      </div>

      {/* product visual replacing ProjectPreview with Micro-World */}
      <div className="relative mt-8 overflow-hidden rounded-md border border-border shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)] transition-colors duration-500 group-hover:border-border-strong bg-[#0a0a0a]">
        <div className="code-surface z-20 relative">
          <div className="code-header flex items-center gap-3 border-b px-4 py-2.5">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-accent/60 animate-pulse" />
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em]">
              {project.slug} — verification
            </span>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 z-20 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />
        <div className="h-64 relative w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]">
          {getMicroWorld(project.slug)}
        </div>
      </div>

      {/* footer */}
      <div className="relative mt-auto flex items-end justify-between gap-6 pt-8">
        <Metric project={project} size="lg" />
        <span className="inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground">
          Read case study
          <ArrowUpRight aria-hidden="true" size={14} className="text-accent" />
        </span>
      </div>
    </TileShell>
  );
}

/* Wide — title, tagline, metric */
function WideTile({ project, index }: { project: Project; index: number }) {
  return (
    <TileShell project={project} className="lg:col-span-2">
      <MetaRow project={project} index={index} />
      <div className="relative mt-6 max-w-[60%]">
        <h3 className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)] font-semibold leading-tight tracking-tight transition-colors duration-300 group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {project.tagline}
        </p>
      </div>
      <div className="relative mt-auto flex items-end justify-between gap-4 pt-8">
        <Metric project={project} />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-faint bg-background/50 backdrop-blur-sm px-2 py-1 rounded">
          {project.year}
        </span>
      </div>
    </TileShell>
  );
}

/* Small — compact tile */
function SmallTile({ project, index }: { project: Project; index: number }) {
  return (
    <TileShell project={project} className="lg:col-span-1">
      <MetaRow project={project} index={index} />
      <div className="relative mt-6">
        <h3 className="font-display text-xl font-semibold leading-tight tracking-tight transition-colors duration-300 group-hover:text-accent inline-block bg-background-2/80 backdrop-blur-sm pr-2">
          {project.title}
        </h3>
        <p className="mt-2.5 text-sm leading-6 text-muted-foreground relative z-10 mix-blend-screen">
          <span className="bg-background-2/80 backdrop-blur-sm">{project.tagline}</span>
        </p>
      </div>
      <div className="relative mt-auto pt-8">
        <Metric project={project} />
      </div>
    </TileShell>
  );
}

export function ProjectsBento({ projects }: { projects: Project[] }) {
  const [featured, wide, ...rest] = projects;

  return (
    <div className="grid auto-rows-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:[grid-template-rows:repeat(2,minmax(15rem,1fr))]">
      {featured ? <FeaturedTile project={featured} index={0} /> : null}
      {wide ? <WideTile project={wide} index={1} /> : null}
      {rest.map((project, i) => (
        <SmallTile key={project.slug} project={project} index={i + 2} />
      ))}
    </div>
  );
}

