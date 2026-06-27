"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  body: string;
};

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const height = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative mt-14 max-w-3xl">
      {/* Beam track */}
      <div className="absolute bottom-3 left-[8px] top-3 w-px">
        <div className="absolute inset-0 bg-border" />
        <motion.div
          style={{ height }}
          className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-accent/20 via-accent to-accent"
        />
        {/* Glowing comet head */}
        <motion.span
          style={{ top: height }}
          className="absolute -left-[3.5px] z-10 size-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_5px_rgb(var(--accent-rgb)/0.55)]"
        />
      </div>

      <ol className="flex flex-col">
        {items.map((item, index) => {
          const isCurrent = /present/i.test(item.period);
          return (
            <li
              key={`${item.company}-${item.role}`}
              className="group relative pb-14 pl-14 last:pb-0"
            >
              {/* Node */}
              <span className="absolute left-0 top-1 z-10 grid size-[17px] place-items-center rounded-full border border-accent/40 bg-background-2">
                {isCurrent ? (
                  <span className="absolute inline-flex size-[17px] animate-ping rounded-full bg-accent/40" />
                ) : null}
                <motion.span
                  initial={{ scale: 0.2, opacity: 0.3 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ margin: "-45% 0px -45% 0px", once: false }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="relative size-[7px] rounded-full bg-accent"
                />
              </span>

              <div className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                    {item.period}
                  </span>
                  {isCurrent ? (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">
                      <span className="size-1.5 rounded-full bg-accent" />
                      Current
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-5 font-display text-[clamp(1.5rem,1.2rem+1.1vw,2.1rem)] font-semibold leading-tight tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {item.role}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {item.company}
                  <span className="mx-2 text-faint">/</span>
                  {item.location}
                </p>

                <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
