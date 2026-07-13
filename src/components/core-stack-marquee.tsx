"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type CoreStackShuffleProps = {
  items: string[];
  mobileItems: string[];
  className?: string;
  /** How often to reshuffle, in ms. */
  intervalMs?: number;
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
 * Centered single-row skills strip. Reshuffles every few seconds
 * with a short layout/fade animation — no continuous marquee.
 */
export function CoreStackShuffle({
  items,
  mobileItems,
  className,
  intervalMs = 3800,
}: CoreStackShuffleProps) {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [order, setOrder] = useState(items);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const pick = () => {
      if (isMobile) return shuffle(mobileItems);
      // Keep one centered row on desktop — rotate through the full pool.
      return shuffle(items).slice(0, 10);
    };

    setOrder(pick());
    setTick((t) => t + 1);
  }, [isMobile, items, mobileItems]);

  useEffect(() => {
    if (reduced) return;

    const pick = () => {
      if (isMobile) return shuffle(mobileItems);
      return shuffle(items).slice(0, 10);
    };

    const id = window.setInterval(() => {
      setOrder(pick());
      setTick((t) => t + 1);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, isMobile, items, mobileItems, reduced]);

  return (
    <div className={cn("w-full", className)}>
      <p className="text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
        Core stack
      </p>

      <LayoutGroup id="core-stack">
        <ul
          className="mt-4 flex flex-nowrap items-center justify-center gap-x-4 overflow-hidden sm:gap-x-5"
          aria-live="polite"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {order.map((item, index) => (
              <m.li
                key={`${item}-${tick}-${index}`}
                layout={!reduced}
                initial={
                  reduced ? false : { opacity: 0, y: 8, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={
                  reduced
                    ? undefined
                    : { opacity: 0, y: -8, filter: "blur(4px)" }
                }
                transition={{
                  duration: reduced ? 0 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reduced ? 0 : index * 0.03,
                }}
                className="shrink-0 whitespace-nowrap font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground sm:text-[0.72rem]"
              >
                <span className="inline-flex items-center gap-4 sm:gap-5">
                  {item}
                  {index < order.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="inline-block size-1 rounded-full bg-accent/70"
                    />
                  ) : null}
                </span>
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      </LayoutGroup>
    </div>
  );
}

/** @deprecated Use CoreStackShuffle — kept as alias during rename. */
export const CoreStackMarquee = CoreStackShuffle;
