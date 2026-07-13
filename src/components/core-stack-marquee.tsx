"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type CoreStackMarqueeProps = {
  items: string[];
  mobileItems: string[];
  className?: string;
};

function shuffle<T>(list: T[]) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j]!, next[i]!];
  }
  return next;
}

/**
 * Centered single-row skill shuffle under the hero.
 * Mobile uses a shorter list so the track never wraps to two rows.
 */
export function CoreStackMarquee({
  items,
  mobileItems,
  className,
}: CoreStackMarqueeProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [order, setOrder] = useState(items);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const source = isMobile ? mobileItems : items;
    setOrder(shuffle(source));
  }, [isMobile, items, mobileItems]);

  const sequence = useMemo(
    () => (
      <span className="inline-flex shrink-0 items-center whitespace-nowrap">
        {order.map((item) => (
          <Fragment key={item}>
            <span className="px-4 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors sm:px-5 sm:text-[0.72rem]">
              {item}
            </span>
            <span
              aria-hidden="true"
              className="size-1 shrink-0 rounded-full bg-accent/70"
            />
          </Fragment>
        ))}
      </span>
    ),
    [order],
  );

  // Two identical halves → animate -50% for a seamless loop.
  const half = (
    <span className="inline-flex shrink-0 items-center" aria-hidden="true">
      {Array.from({ length: isMobile ? 3 : 2 }, (_, i) => (
        <Fragment key={i}>{sequence}</Fragment>
      ))}
    </span>
  );

  return (
    <div className={cn("w-full", className)}>
      <p className="text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
        Core stack
      </p>
      <div className="core-stack-marquee relative mt-4 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent sm:w-16"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent sm:w-16"
        />
        <div className="core-stack-track flex w-max items-center">
          {half}
          <span className="inline-flex shrink-0 items-center" aria-hidden="true">
            {Array.from({ length: isMobile ? 3 : 2 }, (_, i) => (
              <Fragment key={`b-${i}`}>{sequence}</Fragment>
            ))}
          </span>
        </div>
        <ul className="sr-only">
          {order.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
