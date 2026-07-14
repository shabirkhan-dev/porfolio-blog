"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { labDemoMap } from "@/components/lab/lab-demos";
import type { LabExperiment } from "@/data/lab";

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
  const Demo = labDemoMap[experiment.slug as keyof typeof labDemoMap];
  const Heading = headingLevel;

  return (
    <article
      className={
        featured
          ? "overflow-hidden border border-border bg-background-2"
          : "flex h-full flex-col overflow-hidden border border-border bg-background-2"
      }
    >
      {/* Live end-result — interactive, not buried behind navigation */}
      <div
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
