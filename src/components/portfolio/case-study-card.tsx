"use client";

import { ArrowUpRight } from "lucide-react";
import { ProjectPreview } from "@/components/portfolio/project-preview";
import { useActiveOnScroll } from "@/lib/use-active-on-scroll";

type Project = {
  title: string;
  role: string;
  category: string;
  year: string;
  description: string;
  impact: string;
  stack: string[];
  tags: string[];
  visual: string;
};

export function CaseStudyCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, active } = useActiveOnScroll<HTMLElement>();

  return (
    <article
      ref={ref}
      data-active={active}
      className="rule group relative grid items-center gap-8 py-12 last:border-b lg:grid-cols-[4rem_1fr_minmax(0,30rem)] lg:gap-12"
    >
      {/* Accent rail that grows across the row on hover / in view */}
      <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-700 ease-out group-hover:w-full group-data-[active=true]:w-full" />

      <div className="flex items-start gap-2">
        <span className="font-display text-3xl font-semibold leading-none tracking-tight text-foreground/15 transition-colors duration-300 group-hover:text-accent/70 group-data-[active=true]:text-accent/70">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.14em]">
          <span className="text-accent">{project.category}</span>
          <span className="text-faint">·</span>
          <span className="text-faint">{project.year}</span>
        </div>

        <h3 className="mt-5 inline-block font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] font-semibold leading-[0.98] tracking-tight transition-colors duration-300 group-hover:text-accent group-data-[active=true]:text-accent">
          {project.title}
        </h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {project.role}
        </p>

        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
          {project.description}
        </p>

        <p className="mt-5 max-w-xl border-l border-accent/40 pl-5 text-sm leading-7 text-foreground/75">
          {project.impact}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-faint transition-colors duration-300 group-hover:text-muted-foreground group-data-[active=true]:text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>

        <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground">
          View thinking
          <ArrowUpRight
            aria-hidden="true"
            size={15}
            className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-data-[active=true]:-translate-y-0.5 group-data-[active=true]:translate-x-0.5"
          />
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border transition-colors duration-500 group-hover:border-border-strong group-data-[active=true]:border-border-strong">
        {/* Sheen sweep on hover / in view */}
        <div className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full group-data-[active=true]:translate-x-full" />
        <div className="transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-data-[active=true]:scale-[1.04]">
          <ProjectPreview visual={project.visual} title={project.title} />
        </div>
      </div>
    </article>
  );
}
