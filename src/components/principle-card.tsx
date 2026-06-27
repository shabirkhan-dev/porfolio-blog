"use client";

import type { ReactNode } from "react";
import { useActiveOnScroll } from "@/lib/use-active-on-scroll";

export function PrincipleCard({
  index,
  title,
  body,
  icon,
}: {
  index: number;
  title: string;
  body: string;
  icon: ReactNode;
}) {
  const { ref, active } = useActiveOnScroll<HTMLDivElement>();

  return (
    <div ref={ref} data-active={active} className="group relative">
      {/* baseline + animated accent segment */}
      <span className="block h-px w-full bg-border" />
      <span className="absolute left-0 top-0 h-px w-10 bg-accent transition-all duration-500 ease-out group-hover:w-full group-data-[active=true]:w-full" />

      <div className="flex items-center justify-between pt-6">
        <span className="font-serif text-3xl italic leading-none text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="grid size-10 place-items-center rounded-full border border-border text-faint transition-all duration-500 group-hover:rotate-6 group-hover:border-accent/40 group-hover:text-accent group-data-[active=true]:rotate-6 group-data-[active=true]:border-accent/40 group-data-[active=true]:text-accent">
          {icon}
        </span>
      </div>

      <h3 className="t-h3 mt-7 transition-transform duration-300 group-hover:translate-x-1 group-data-[active=true]:translate-x-1">
        {title}
      </h3>
      <p className="mt-3.5 text-sm leading-7 text-muted-foreground">{body}</p>
    </div>
  );
}
