"use client";

import type { ReactNode } from "react";
import { Corners } from "@/components/corners";
import { useActiveOnScroll } from "@/lib/use-active-on-scroll";

export function PrincipleCard({
  index,
  title,
  body,
  practice,
  icon,
}: {
  index: number;
  title: string;
  body: string;
  practice: string;
  icon: ReactNode;
}) {
  const { ref, active } = useActiveOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-active={active}
      className="group relative flex h-full flex-col rounded-lg border border-border bg-background p-7 transition-colors duration-500 hover:border-accent/30 data-[active=true]:border-accent/30 sm:p-8"
    >
      <Corners />
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-0 transition-opacity duration-500 group-hover:opacity-40 group-data-[active=true]:opacity-40" />

      <div className="relative flex items-center justify-between gap-4">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-faint">
          Principle{" "}
          <span className="text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
        <span className="grid size-10 place-items-center rounded-md border border-border text-faint transition-colors duration-500 group-hover:border-accent/40 group-hover:text-accent group-data-[active=true]:border-accent/40 group-data-[active=true]:text-accent">
          {icon}
        </span>
      </div>

      <h3 className="t-h3 relative mt-6">{title}</h3>
      <p className="relative mt-3 text-sm leading-7 text-muted-foreground">
        {body}
      </p>

      <div className="relative mt-auto border-t border-border pt-5">
        <p className="flex gap-2.5 font-mono text-[0.68rem] leading-6 text-muted-foreground">
          <span className="shrink-0 uppercase tracking-[0.14em] text-accent">
            In practice
          </span>
          <span className="text-faint">—</span>
          {practice}
        </p>
      </div>
    </div>
  );
}
