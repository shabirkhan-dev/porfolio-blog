"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Metric = { value: string; label: string };

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  year: string;
  location: string;
  summary: string;
  metrics: Metric[];
  tags: string[];
};

const HEADING = {
  eyebrow: "Experience",
  index: "05",
};

function HeadingTitle() {
  return (
    <>
      Where the <span className="text-accent">six years</span> went.
    </>
  );
}

function MetricValue({
  value,
  active,
  reduced,
}: {
  value: string;
  active: boolean;
  reduced: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const numeric = Number(String(value).replace(/[^\d.]/g, ""));
  const isNumeric = Number.isFinite(numeric) && /\d/.test(value);

  useEffect(() => {
    if (!ref.current || !isNumeric || reduced) return;
    if (!active) {
      ref.current.textContent = value;
      return;
    }
    const controls = animate(0, numeric, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (!ref.current) return;
        const rounded = Number.isInteger(numeric)
          ? Math.round(v).toString()
          : v.toFixed(1);
        ref.current.textContent = value.replace(/[\d.]+/, rounded);
      },
    });
    return () => controls.stop();
  }, [active, isNumeric, numeric, reduced, value]);

  return <span ref={ref}>{value}</span>;
}

const panelContent: Variants = {
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
  hide: {},
};

const panelItem: Variants = {
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  hide: { opacity: 0, y: 14 },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: index * 0.06,
    },
  }),
};

function VerticalFallback({ items }: { items: ExperienceItem[] }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="eyebrow">{HEADING.eyebrow}</span>
        <span className="font-mono text-xs text-faint">/ {HEADING.index}</span>
      </div>
      <h2 className="t-h2 mt-4 max-w-2xl">
        <HeadingTitle />
      </h2>

      <ol className="mt-10 flex flex-col gap-4">
        {items.map((item, index) => {
          const isCurrent = /present|now/i.test(item.period + item.year);
          return (
            <m.li
              key={`${item.company}-${item.role}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group relative overflow-hidden rounded-lg border border-border bg-background p-6 transition-colors duration-500 hover:border-border-strong"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  {item.year}
                </span>
                {isCurrent ? (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">
                    <span className="size-1.5 rounded-full bg-accent" />
                    Current
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 font-display text-[clamp(1.35rem,1.1rem+1vw,1.85rem)] font-semibold leading-tight tracking-tight">
                {item.role}
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {item.company}
                <span className="mx-2 text-faint">/</span>
                {item.period}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {item.summary}
              </p>
              <div
                className="mt-5 grid gap-px overflow-hidden rounded-md border border-border bg-border"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(item.metrics.length, 3)}, minmax(0, 1fr))`,
                }}
              >
                {item.metrics.map((metric) => (
                  <div key={metric.label} className="bg-background p-3.5">
                    <p className="font-display text-xl font-semibold leading-none tracking-tight text-accent">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-[0.7rem] leading-4 text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-border px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </m.li>
          );
        })}
      </ol>
    </div>
  );
}

function Panel({
  item,
  active,
  reduced,
}: {
  item: ExperienceItem;
  active: boolean;
  reduced: boolean;
}) {
  const isCurrent = /present|now/i.test(item.period + item.year);

  return (
    <article className="relative flex h-full w-full shrink-0 items-stretch overflow-hidden">
      <span
        aria-hidden="true"
        className="text-stroke pointer-events-none absolute right-[-2vw] top-1/2 origin-right -translate-y-1/2 select-none font-display text-[28vw] font-bold leading-none tracking-tighter opacity-[0.22] [mask-image:linear-gradient(to_right,transparent_30%,black_75%)] lg:text-[18vw]"
      >
        {item.year}
      </span>
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-[0.2] [mask-image:radial-gradient(80%_80%_at_30%_50%,black,transparent_80%)]" />

      <m.div
        variants={panelContent}
        initial={false}
        animate={reduced || active ? "show" : "hide"}
        className="relative grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10"
      >
        <div>
          <m.div variants={panelItem} className="flex items-center gap-4">
            <span className="font-mono text-sm uppercase tracking-[0.18em] text-accent">
              {item.year}
            </span>
            {isCurrent ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                Current
              </span>
            ) : (
              <span className="h-px w-10 bg-border" />
            )}
          </m.div>

          <m.h3
            variants={panelItem}
            className="mt-5 max-w-[15ch] font-display text-[clamp(2rem,1.3rem+2.8vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
          >
            {item.role}
          </m.h3>

          <m.p
            variants={panelItem}
            className="mt-4 font-mono text-sm uppercase tracking-[0.16em] text-muted-foreground"
          >
            {item.company}
            <span className="mx-3 text-faint">/</span>
            {item.location}
            <span className="mx-3 text-faint">/</span>
            {item.period}
          </m.p>
        </div>

        <div className="lg:pl-6">
          <m.p
            variants={panelItem}
            className="max-w-md text-[1rem] leading-7 text-muted-foreground"
          >
            {item.summary}
          </m.p>

          <m.div
            variants={panelItem}
            className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border"
            style={{
              gridTemplateColumns: `repeat(${Math.min(item.metrics.length, 3)}, minmax(0, 1fr))`,
            }}
          >
            {item.metrics.map((metric) => (
              <div key={metric.label} className="bg-background p-4">
                <p className="font-display text-[clamp(1.4rem,1.1rem+1vw,2rem)] font-semibold leading-none tracking-tight text-accent">
                  <MetricValue
                    value={metric.value}
                    active={active}
                    reduced={reduced}
                  />
                </p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </m.div>

          <m.div variants={panelItem} className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-faint"
              >
                {tag}
              </span>
            ))}
          </m.div>
        </div>
      </m.div>
    </article>
  );
}

/**
 * Compact career stage: snaps into viewport center on enter, traps page
 * scroll through every role, then releases back to normal page scroll.
 */
function CompactStage({
  items,
  reduced,
}: {
  items: ExperienceItem[];
  reduced: boolean;
}) {
  const [active, setActive] = useState(0);
  const [holding, setHolding] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const lockedRef = useRef(false);
  const wheelAccRef = useRef(0);
  const touchStartX = useRef<number | null>(null);
  /** Holding scroll while roles advance. */
  const holdingRef = useRef(false);
  /** Smooth-scroll snapping in progress. */
  const snappingRef = useRef(false);
  /**
   * Gate prevents immediate re-trap after releasing at an edge:
   * ready → can snap/hold; spent-down / spent-up → wait until section mostly leaves.
   */
  const gateRef = useRef<"ready" | "spent-down" | "spent-up">("ready");

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    holdingRef.current = holding;
  }, [holding]);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(items.length - 1, index));
    if (next === activeRef.current) return false;
    lockedRef.current = true;
    setActive(next);
    window.setTimeout(
      () => {
        lockedRef.current = false;
        wheelAccRef.current = 0;
      },
      reduced ? 80 : 520,
    );
    return true;
  };

  const goNext = () => goTo(activeRef.current + 1);
  const goPrev = () => goTo(activeRef.current - 1);

  const snapStageCenter = () => {
    const el = stageRef.current;
    if (!el || snappingRef.current) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const offset = rect.top - (vh - rect.height) / 2;
    if (Math.abs(offset) < 18) {
      holdingRef.current = true;
      setHolding(true);
      return;
    }
    snappingRef.current = true;
    const top = window.scrollY + offset;
    window.scrollTo({
      top,
      behavior: reduced ? "auto" : "smooth",
    });
    window.setTimeout(
      () => {
        snappingRef.current = false;
        holdingRef.current = true;
        setHolding(true);
        wheelAccRef.current = 0;
      },
      reduced ? 40 : 580,
    );
  };

  // Enter → snap to center; leave → reset gate so next pass can trap again.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const ratio = entry.intersectionRatio;
        const rect = entry.boundingClientRect;
        const vh = window.innerHeight;
        const centerDelta = Math.abs(rect.top + rect.height / 2 - vh / 2);
        const approaching =
          ratio >= 0.42 || (ratio >= 0.28 && centerDelta < vh * 0.28);

        if (ratio < 0.12) {
          holdingRef.current = false;
          setHolding(false);
          snappingRef.current = false;
          gateRef.current = "ready";
          return;
        }

        if (!approaching || holdingRef.current || snappingRef.current) return;
        if (gateRef.current !== "ready") return;

        snapStageCenter();
      },
      { threshold: [0, 0.12, 0.28, 0.42, 0.55, 0.7, 1] },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Document-level wheel trap while holding (works even if cursor is outside the stage).
  useEffect(() => {
    const stageVisibleEnough = () => {
      const el = stageRef.current;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      return rect.top < vh * 0.9 && rect.bottom > vh * 0.1;
    };

    const onWheel = (event: WheelEvent) => {
      if (snappingRef.current) {
        event.preventDefault();
        return;
      }

      const predominantlyVertical =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX);
      if (!predominantlyVertical) return;

      // Reverse back into the carousel after releasing at an edge.
      if (!holdingRef.current) {
        const reverseIn =
          (gateRef.current === "spent-down" && event.deltaY < 0) ||
          (gateRef.current === "spent-up" && event.deltaY > 0);
        if (reverseIn && stageVisibleEnough()) {
          event.preventDefault();
          gateRef.current = "ready";
          holdingRef.current = true;
          setHolding(true);
          wheelAccRef.current = 0;
        } else {
          return;
        }
      }

      const scrollingDown = event.deltaY > 0;
      const atStart = activeRef.current === 0 && !scrollingDown;
      const atEnd =
        activeRef.current === items.length - 1 && scrollingDown;

      if (atStart || atEnd) {
        holdingRef.current = false;
        setHolding(false);
        gateRef.current = scrollingDown ? "spent-down" : "spent-up";
        wheelAccRef.current = 0;
        return;
      }

      event.preventDefault();
      if (lockedRef.current) return;

      wheelAccRef.current += event.deltaY;
      const THRESHOLD = 36;
      if (wheelAccRef.current > THRESHOLD) {
        wheelAccRef.current = 0;
        goNext();
      } else if (wheelAccRef.current < -THRESHOLD) {
        wheelAccRef.current = 0;
        goPrev();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, {
        capture: true,
      } as AddEventListenerOptions);
    };
  }, [items.length, reduced]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (!el.contains(document.activeElement) && document.activeElement !== el)
        return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        if (!goNext() && activeRef.current === items.length - 1) {
          holdingRef.current = false;
          setHolding(false);
          gateRef.current = "spent-down";
        }
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        if (!goPrev() && activeRef.current === 0) {
          holdingRef.current = false;
          setHolding(false);
          gateRef.current = "spent-up";
        }
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartX.current = event.touches[0]?.clientX ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartX.current == null) return;
      const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
      const dx = endX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(dx) < 48) return;
      if (dx < 0) goNext();
      else goPrev();
    };

    el.addEventListener("keydown", onKeyDown);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("keydown", onKeyDown);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [items.length, reduced]);

  const canPrev = active > 0;
  const canNext = active < items.length - 1;

  return (
    <div
      ref={stageRef}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Career experience"
      data-holding={holding ? "true" : "false"}
      className="relative outline-none"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4">
            <span className="eyebrow">{HEADING.eyebrow}</span>
            <span className="font-mono text-xs text-faint">
              / {HEADING.index}
            </span>
          </div>
          <h2 className="t-h2 mt-4 max-w-2xl">
            <HeadingTitle />
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden font-mono text-sm tabular-nums text-faint sm:inline">
            <span className="text-accent">
              {String(active + 1).padStart(2, "0")}
            </span>{" "}
            / {String(items.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              aria-label="Previous role"
              className="grid size-9 place-items-center border border-border font-mono text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              aria-label="Next role"
              className="grid size-9 place-items-center border border-border font-mono text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-8 overflow-hidden border border-border bg-background/50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background/80 to-transparent"
        />

        <m.div
          className="flex"
          animate={{ x: `${-active * 100}%` }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 160, damping: 26, mass: 0.85 }
          }
        >
          {items.map((item, index) => {
            const on = active === index;
            return (
              <div
                key={`${item.company}-${item.role}`}
                aria-hidden={!on}
                className="w-full shrink-0 p-6 sm:p-8 lg:px-10 lg:py-9"
              >
                <m.div
                  animate={{
                    opacity: on ? 1 : 0.35,
                    scale: on ? 1 : 0.985,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="origin-center"
                >
                  <Panel item={item} active={on} reduced={reduced} />
                </m.div>
              </div>
            );
          })}
        </m.div>
      </div>

      <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
        {holding
          ? "Scroll advances roles — page scroll resumes at the edges"
          : "Scroll into view to lock, then advance through each role"}
      </p>

      <div className="mt-5">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div className="flex min-w-0 items-baseline gap-3 overflow-hidden">
            <span className="truncate font-display text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {items[active]?.role}
            </span>
            <span className="hidden font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground sm:inline">
              {items[active]?.company}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-x-1 top-[7px] h-px bg-border" />
          <m.div
            className="absolute left-1 top-[7px] h-px bg-accent"
            animate={{
              width: `${(active / Math.max(items.length - 1, 1)) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 160, damping: 26 }}
          />
          <ol className="relative flex items-start justify-between">
            {items.map((item, index) => {
              const on = active === index;
              const passed = active >= index;
              return (
                <li
                  key={`node-${item.year}-${item.company}`}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Go to ${item.role} at ${item.company}`}
                    aria-current={on}
                    className="flex cursor-pointer flex-col items-center"
                  >
                    <span className="grid h-[15px] place-items-center">
                      {on ? (
                        <span className="absolute inline-flex size-[15px] animate-ping rounded-full bg-accent/40" />
                      ) : null}
                      <span
                        className={cn(
                          "relative rounded-full transition-all duration-500",
                          on
                            ? "size-[11px] bg-accent shadow-[0_0_14px_3px_rgb(var(--accent-rgb)/0.5)]"
                            : passed
                              ? "size-[7px] bg-accent"
                              : "size-[7px] bg-border-strong",
                        )}
                      />
                    </span>
                    <span
                      className={cn(
                        "mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-colors duration-500",
                        on
                          ? "text-accent"
                          : passed
                            ? "text-muted-foreground hover:text-foreground"
                            : "text-faint hover:text-muted-foreground",
                      )}
                    >
                      {item.year}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isDesktop === null) {
    return <div className="min-h-[22rem]" aria-hidden />;
  }

  if (!isDesktop) {
    return <VerticalFallback items={items} />;
  }

  return <CompactStage items={items} reduced={!!reducedMotion} />;
}
