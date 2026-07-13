"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/site";
import { cn } from "@/lib/utils";

function detailHref(project: Project) {
  if (project.caseStudy) return `/case-studies/${project.slug}`;
  return `/projects#${project.slug}`;
}

/** One locked stage; index swaps the shot without layout jump. */
export function ProjectsBento({
  projects,
  variant = "home",
}: {
  projects: Project[];
  variant?: "home" | "page";
}) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    const chip = chipRefs.current[active];
    chip?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!listRef.current?.contains(document.activeElement)) return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        setActive((i) => Math.min(i + 1, projects.length - 1));
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (event.key === "Home") {
        event.preventDefault();
        setActive(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        setActive(projects.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [projects.length]);

  const current = projects[active] ?? projects[0];
  if (!current) return null;

  const href = detailHref(current);
  const stageAspect =
    variant === "page" ? "aspect-[16/10] lg:aspect-[2/1]" : "aspect-[16/10]";

  return (
    <div ref={listRef} className="mt-2">
      {/* Mobile / tablet — snap chips */}
      <div
        className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Projects"
      >
        {projects.map((project, index) => {
          const isActive = index === active;
          return (
            <button
              key={project.slug}
              ref={(el) => {
                chipRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => select(index)}
              className={cn(
                "shrink-0 border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-colors",
                isActive
                  ? "border-accent bg-accent/[0.1] text-accent"
                  : "border-border text-faint hover:border-border-strong hover:text-foreground",
              )}
            >
              <span className="tabular-nums text-faint/80">
                {String(index + 1).padStart(2, "0")}
              </span>{" "}
              {project.title}
            </button>
          );
        })}
      </div>

      <div className="grid gap-0 lg:grid-cols-[11.5rem_minmax(0,1fr)] lg:border lg:border-border">
        {/* Desktop index */}
        <div
          className="hidden border-r border-border lg:flex lg:flex-col"
          role="tablist"
          aria-label="Projects"
        >
          {projects.map((project, index) => {
            const isActive = index === active;
            return (
              <button
                key={project.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onMouseEnter={() => select(index)}
                onFocus={() => select(index)}
                onClick={() => select(index)}
                className={cn(
                  "flex flex-1 items-center gap-3 border-b border-border px-4 py-4 text-left last:border-b-0 transition-colors",
                  isActive
                    ? "bg-background-2 text-foreground"
                    : "text-muted-foreground hover:bg-background-2/60 hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[0.58rem] tabular-nums tracking-[0.12em]",
                    isActive ? "text-accent" : "text-faint",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-display text-[0.95rem] font-semibold leading-tight tracking-tight",
                    isActive && "text-accent",
                  )}
                >
                  {project.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stage — all images stacked so height stays locked */}
        <div className="relative min-w-0 overflow-hidden border border-border bg-background-2 lg:border-0">
          <div className={cn("relative w-full", stageAspect)}>
            {projects.map((project, index) => {
              const isActive = index === active;
              return (
                <div
                  key={project.slug}
                  aria-hidden={!isActive}
                    className={cn(
                    "absolute inset-0 transition-opacity duration-300 ease-out",
                    isActive ? "z-10 opacity-100" : "z-0 opacity-0",
                  )}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} interface`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover object-top"
                    priority={index === 0}
                  />
                </div>
              );
            })}
            <span className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 z-20 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/75 sm:bottom-4 sm:left-4">
              {current.category} · {current.year}
            </span>
          </div>
        </div>
      </div>

      {/* Caption strip */}
      <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:mt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-8 sm:pt-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-[clamp(1.4rem,1.1rem+1.1vw,1.85rem)] font-semibold leading-none tracking-tight">
              <Link href={href} className="transition-colors hover:text-accent">
                {current.title}
              </Link>
            </h3>
            {current.subtitle ? (
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
                {current.subtitle}
              </span>
            ) : null}
          </div>
          <p className="mt-2.5 max-w-xl text-[0.92rem] leading-6 text-muted-foreground">
            {current.tagline}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {current.stack.slice(0, 4).map((item) => (
              <li
                key={item}
                className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-faint"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em]">
            <span className="text-foreground">{current.metric.value}</span>
            <span className="text-faint"> · {current.metric.label}</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
            <Link
              href={href}
              className="link-line inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-foreground"
            >
              {current.caseStudy ? "Case study" : "Details"}
              <ArrowUpRight aria-hidden size={13} className="text-accent" />
            </Link>
            {current.github ? (
              <a
                href={current.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
              >
                <Github aria-hidden size={13} />
                GitHub
              </a>
            ) : null}
            {current.liveUrl ? (
              <a
                href={current.liveUrl}
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
    </div>
  );
}
