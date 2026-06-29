"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectPreview } from "@/components/portfolio/project-preview";
import type { Project } from "@/data/site";
import { useActiveOnScroll } from "@/lib/use-active-on-scroll";
import { cn } from "@/lib/utils";

const systemLayers = [
  "Product surface",
  "Frontend systems",
  "API & services",
  "Data & cache",
  "Deploy & infra",
];

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
  const leadImpact = project.impact[0];
  const peelActive = "group-hover:opacity-100 group-hover:translate-y-0 group-data-[active=true]:opacity-100 group-data-[active=true]:translate-y-0";

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <Link href={href} className="group block">
      <article
        ref={ref}
        data-active={active}
        onMouseMove={handleMove}
        className="relative min-h-[28rem] overflow-hidden rounded-[1.75rem] border border-border bg-background-2 transition-colors duration-500 hover:border-border-strong group-data-[active=true]:border-border-strong lg:min-h-[32rem]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-data-[active=true]:opacity-100"
          style={{
            background:
              "radial-gradient(38rem circle at var(--mx, 50%) var(--my, 40%), rgb(var(--accent-rgb) / 0.1), transparent 45%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-0 hairline-grid opacity-40" />

        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-8 z-0 select-none font-display text-[9rem] font-bold leading-none tracking-tighter text-foreground/[0.04] transition-colors duration-500 group-hover:text-accent/[0.07] sm:text-[12rem] lg:-top-10",
            flip ? "left-6" : "right-6",
          )}
        >
          {String(index).padStart(2, "0")}
        </span>

        <div className="relative z-10 grid h-full items-stretch gap-8 p-6 sm:p-9 lg:grid-cols-2 lg:gap-14 lg:p-12">
          {/* Left — peel between surface & system */}
          <div
            className={cn(
              "relative flex flex-col justify-center",
              flip ? "lg:order-2" : "lg:order-1",
            )}
          >
            {/* SURFACE — calm product face */}
            <div
              className={cn(
                "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "group-hover:pointer-events-none group-hover:opacity-0 group-hover:-translate-y-4",
                "group-data-[active=true]:pointer-events-none group-data-[active=true]:opacity-0 group-data-[active=true]:-translate-y-4",
              )}
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.14em]">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.08] px-3 py-1 text-accent">
                  {project.category}
                </span>
                <span className="text-faint">{project.year}</span>
              </div>

              <p className="mt-8 font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-semibold leading-[1.05] tracking-tight text-accent">
                {leadImpact}
              </p>

              <h3 className="mt-5 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-semibold leading-[0.98] tracking-tight">
                {project.title}
                {project.subtitle ? (
                  <span className="mt-1 block font-serif text-[0.55em] font-normal italic text-muted-foreground">
                    {project.subtitle}
                  </span>
                ) : null}
              </h3>

              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                {project.tagline}
              </p>

              <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
                Hover to see the system
              </p>
            </div>

            {/* SYSTEM — engineered underneath */}
            <div
              className={cn(
                "absolute inset-0 flex flex-col justify-center opacity-0 translate-y-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                peelActive,
              )}
            >
              <span className="eyebrow">Under the surface</span>

              <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {project.role}
              </p>

              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
                {project.built}
              </p>

              {/* Mini layer stack — Engine Room motif */}
              <div className="mt-8 space-y-2">
                {systemLayers.slice(0, 4).map((layer, i) => (
                  <div
                    key={layer}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background/60 px-4 py-2.5 transition-colors duration-300"
                    style={{ marginLeft: `${i * 0.65}rem` }}
                  >
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-foreground/85">{layer}</span>
                    {i < project.stack.length ? (
                      <span className="ml-auto font-mono text-[0.58rem] uppercase tracking-[0.1em] text-accent">
                        {project.stack[i]}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>

              <ul className="mt-8 space-y-2 border-t border-border pt-6">
                {project.impact.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-6 text-foreground/85"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground">
                {project.caseStudy ? "Read case study" : "View project"}
                <ArrowUpRight
                  aria-hidden="true"
                  size={15}
                  className="text-accent"
                />
              </span>
            </div>
          </div>

          {/* Right — visual with system overlay on peel */}
          <div
            className={cn(
              "relative flex items-center",
              flip ? "lg:order-1" : "lg:order-2",
            )}
          >
            <div className="relative w-full overflow-hidden rounded-2xl border border-border shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)] transition-all duration-500 group-hover:border-border-strong">
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
              {/* Stack tags overlay on peel */}
              <div
                className={cn(
                  "code-surface absolute inset-x-0 bottom-0 z-20 flex flex-wrap gap-2 border-t border-white/10 p-4 opacity-0 transition-all duration-700",
                  peelActive,
                )}
              >
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
