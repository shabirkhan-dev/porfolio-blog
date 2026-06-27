"use client";

import { ArrowUpRight } from "lucide-react";
import { ProjectPreview } from "@/components/portfolio/project-preview";
import { useActiveOnScroll } from "@/lib/use-active-on-scroll";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  slug?: string;
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
  // Even-numbered cards mirror so the showcase zig-zags down the page.
  const flip = index % 2 === 0;

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <article
      ref={ref}
      data-active={active}
      onMouseMove={handleMove}
      className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-background-2 transition-colors duration-500 hover:border-border-strong group-data-[active=true]:border-border-strong"
    >
      {/* Pointer-follow spotlight (desktop) + ambient glow (mobile in-view) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-data-[active=true]:opacity-100"
        style={{
          background:
            "radial-gradient(38rem circle at var(--mx, 50%) var(--my, 40%), rgb(var(--accent-rgb) / 0.1), transparent 45%)",
        }}
      />
      {/* Hairline grid wash */}
      <div className="pointer-events-none absolute inset-0 z-0 hairline-grid opacity-40" />

      {/* Giant index watermark */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-8 z-0 select-none font-display text-[9rem] font-bold leading-none tracking-tighter text-foreground/[0.04] transition-colors duration-500 group-hover:text-accent/[0.07] sm:text-[12rem] lg:-top-10",
          flip ? "left-6" : "right-6",
        )}
      >
        {String(index).padStart(2, "0")}
      </span>

      <div className="relative z-10 grid items-center gap-8 p-6 sm:p-9 lg:grid-cols-2 lg:gap-14 lg:p-12">
        {/* Text column */}
        <div className={cn(flip ? "lg:order-2" : "lg:order-1")}>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.14em]">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.08] px-3 py-1 text-accent">
              {project.category}
            </span>
            <span className="text-faint">{project.year}</span>
          </div>

          <h3 className="mt-6 font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.4rem)] font-semibold leading-[0.98] tracking-tight transition-colors duration-300 group-hover:text-accent group-data-[active=true]:text-accent">
            {project.title}
          </h3>
          <p className="mt-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {project.role}
          </p>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            {project.description}
          </p>

          {/* Impact callout */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4">
            <span className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">
              Impact
            </span>
            <p className="text-sm leading-7 text-foreground/80">
              {project.impact}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-300 group-hover:border-border-strong"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stack + CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-faint">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground">
              View thinking
              <ArrowUpRight
                aria-hidden="true"
                size={15}
                className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-data-[active=true]:-translate-y-0.5 group-data-[active=true]:translate-x-0.5"
              />
            </span>
          </div>
        </div>

        {/* Visual column — framed like an app window */}
        <div className={cn(flip ? "lg:order-1" : "lg:order-2")}>
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)] transition-all duration-500 group-hover:border-border-strong">
            {/* Window chrome */}
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
            {/* Sheen sweep */}
            <div className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full group-data-[active=true]:translate-x-full" />
            <div className="transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-data-[active=true]:scale-[1.03]">
              <ProjectPreview visual={project.visual} title={project.title} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
