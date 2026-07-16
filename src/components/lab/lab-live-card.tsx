"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import type { LabExperiment } from "@/data/lab";
import type { SourceFileEntry } from "@/components/lab/experiments/request-flow/request-flow.types";

type DemoProps = {
  compact?: boolean;
  sourceFiles?: SourceFileEntry[];
};

const demoLoaders: Record<
  string,
  () => Promise<{ default: ComponentType<DemoProps> }>
> = {
  "request-flow": () =>
    import("@/components/lab/experiments/request-flow/request-flow").then(
      (m) => ({
        default: ({ compact }: DemoProps) => (
          <div
            className={
              compact
                ? "relative h-full min-h-[14rem] w-full overflow-hidden bg-background"
                : "relative w-full overflow-hidden border border-border bg-background"
            }
          >
            <m.RequestFlow compact={compact} />
          </div>
        ),
      }),
    ),
  "iron-field": () =>
    import("@/components/lab/experiments/iron-field").then((m) => ({
      default: ({ compact }: DemoProps) => (
        <div
          className={
            compact
              ? "relative h-full min-h-[14rem] w-full overflow-hidden bg-background"
              : "relative h-[min(28rem,70vh)] w-full overflow-hidden border border-border bg-background"
          }
        >
          <m.IronField className="absolute inset-0 h-full w-full" />
        </div>
      ),
    })),
  "cipher-deck": () =>
    import("@/components/lab/experiments/cipher-deck").then((m) => ({
      default: ({ compact }: DemoProps) => <m.CipherDeck compact={compact} />,
    })),
  "signal-radar": () =>
    import("@/components/lab/experiments/signal-radar").then((m) => ({
      default: ({ compact }: DemoProps) => <m.SignalRadar compact={compact} />,
    })),
};

export function LabLiveCard({
  experiment,
  index,
  featured = false,
  headingLevel = "h2",
}: {
  experiment: LabExperiment;
  index: number;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const stageRef = useRef<HTMLDivElement>(null);
  const [Demo, setDemo] = useState<ComponentType<DemoProps> | null>(null);

  useEffect(() => {
    const node = stageRef.current;
    const loader = demoLoaders[experiment.slug];
    if (!node || !loader) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void loader().then((mod) => {
          if (!cancelled) setDemo(() => mod.default);
        });
      },
      { rootMargin: "160px 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [experiment.slug]);

  return (
    <article
      className={
        featured
          ? "overflow-hidden border border-border bg-background-2"
          : "flex h-full flex-col overflow-hidden border border-border bg-background-2"
      }
    >
      <div
        ref={stageRef}
        className={
          featured
            ? "relative h-[min(22rem,52vw)] w-full overflow-hidden border-b border-border bg-background sm:h-[26rem]"
            : "relative h-56 w-full overflow-hidden border-b border-border bg-background sm:h-64"
        }
      >
        {Demo ? <Demo compact /> : null}
      </div>

      <Link
        href={`/lab/${experiment.slug}`}
        className="group flex flex-1 flex-col p-5 transition-colors hover:bg-background/40 sm:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent">
            {String(index + 1).padStart(2, "0")} · {experiment.category}
          </p>
          <span className="inline-flex items-center gap-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-foreground">
            Full instrument
            <ArrowUpRight
              aria-hidden
              size={12}
              className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
        <Heading
          className={
            featured
              ? "mt-3 font-display text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] font-semibold tracking-tight transition-colors group-hover:text-accent"
              : "mt-3 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent"
          }
        >
          {experiment.title}
        </Heading>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {experiment.description}
        </p>
        <p className="mt-4 border-t border-border pt-3 font-mono text-[0.62rem] leading-5 text-muted-foreground">
          <span className="mr-2 uppercase tracking-[0.12em] text-accent">
            Interaction
          </span>
          {experiment.instruction}
        </p>
      </Link>
    </article>
  );
}
