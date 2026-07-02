"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
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
  index: "06",
};

/** One bold line, one accent word — same lockup every section uses. */
function HeadingTitle() {
  return (
    <>
      Where the <span className="text-accent">six years</span> went.
    </>
  );
}

/**
 * Dwell-zone scroll mapping. The progress domain is split into `total` equal
 * segments; each panel HOLDS centered for most of its segment and the slide
 * to the next panel happens in a narrow window (2×TRANSITION_HALF) around the
 * segment boundary. Without this, panels only align at exact scroll points
 * and readers spend most of the section looking at two clipped half-panels.
 */
const TRANSITION_HALF = 0.05;

function trackKeyframes(total: number): { inputs: number[]; outputs: string[] } {
  const inputs: number[] = [0];
  const outputs: string[] = ["0vw"];
  for (let i = 1; i < total; i++) {
    const boundary = i / total;
    inputs.push(boundary - TRANSITION_HALF, boundary + TRANSITION_HALF);
    outputs.push(`-${(i - 1) * 100}vw`, `-${i * 100}vw`);
  }
  inputs.push(1);
  outputs.push(`-${(total - 1) * 100}vw`);
  return { inputs, outputs };
}

/**
 * Per-panel keyframes aligned with trackKeyframes: slide in → hold → slide
 * out. The first panel starts docked and the last ends docked. All inputs
 * stay inside [0, 1] — they can become WAAPI keyframe offsets, which throw
 * on out-of-range values.
 */
type PanelStop = "in" | "hold" | "out";

function panelKeyframes(
  index: number,
  total: number,
): { inputs: number[]; stops: PanelStop[] } {
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const inputs: number[] = [];
  const stops: PanelStop[] = [];

  if (index === 0) {
    inputs.push(0);
    stops.push("hold");
  } else {
    inputs.push(segStart - TRANSITION_HALF, segStart + TRANSITION_HALF);
    stops.push("in", "hold");
  }

  if (index === total - 1) {
    inputs.push(1);
    stops.push("hold");
  } else {
    inputs.push(segEnd - TRANSITION_HALF, segEnd + TRANSITION_HALF);
    stops.push("hold", "out");
  }

  return { inputs, stops };
}

const STOP_VALUES = {
  yearX: { in: "30%", hold: "0%", out: "-30%" },
  yearScale: { in: 1.08, hold: 1, out: 0.92 },
  contentX: { in: "10%", hold: "0%", out: "-10%" },
  fade: { in: 0.18, hold: 1, out: 0.18 },
} as const;

/* ------------------------------------------------------------------ */
/* Active-driven metric counter                                        */
/* ------------------------------------------------------------------ */
function parseMetric(value: string) {
  const match = value.match(/^(\D*)([\d.]+)(.*)$/);
  if (!match) return null;
  const [, prefix, num, suffix] = match;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return { prefix, target: parseFloat(num), suffix, decimals };
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
  const parsed = parseMetric(value);
  const [display, setDisplay] = useState(parsed ? 0 : value);

  useEffect(() => {
    if (!parsed) return;
    if (!active || reduced) {
      setDisplay(active ? value : 0);
      return;
    }
    const controls = animate(0, parsed.target, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) =>
        setDisplay(`${parsed.prefix}${latest.toFixed(parsed.decimals)}${parsed.suffix}`),
    });
    return () => controls.stop();
  }, [active, reduced, value]);

  if (!parsed) return <>{value}</>;
  return <>{typeof display === "number" ? value : display}</>;
}

/* ------------------------------------------------------------------ */
/* Full-screen immersive panel (desktop)                               */
/* ------------------------------------------------------------------ */
const panelContent: Variants = {
  hide: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const panelItem: Variants = {
  hide: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Panel({
  item,
  index,
  total,
  progress,
  active,
  reduced,
}: {
  item: ExperienceItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  active: boolean;
  reduced: boolean;
}) {
  const isCurrent = /present|now/i.test(item.period + item.year);

  const { inputs, stops } = panelKeyframes(index, total);
  const yearX = useTransform(progress, inputs, stops.map((s) => STOP_VALUES.yearX[s]));
  const yearScale = useTransform(progress, inputs, stops.map((s) => STOP_VALUES.yearScale[s]));
  const contentX = useTransform(progress, inputs, stops.map((s) => STOP_VALUES.contentX[s]));
  const fade = useTransform(progress, inputs, stops.map((s) => STOP_VALUES.fade[s]));

  return (
    <article className="relative flex h-screen w-screen shrink-0 items-center overflow-hidden">
      {/* Giant bleeding year — stroked + parallax */}
      <m.span
        aria-hidden="true"
        style={{ x: yearX, scale: yearScale }}
        className="text-stroke pointer-events-none absolute right-[-4vw] top-1/2 origin-right -translate-y-1/2 select-none font-display text-[40vw] font-bold leading-none tracking-tighter opacity-[0.45] lg:text-[32vw]"
      >
        {item.year}
      </m.span>
      <m.span
        aria-hidden="true"
        style={{ x: yearX, scale: yearScale }}
        className="pointer-events-none absolute right-[-4vw] top-1/2 origin-right -translate-y-1/2 select-none font-display text-[40vw] font-bold leading-none tracking-tighter text-foreground/[0.02] lg:text-[32vw]"
      >
        {item.year}
      </m.span>
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-[0.25] [mask-image:radial-gradient(80%_80%_at_30%_50%,black,transparent_80%)]" />
      <m.div
        aria-hidden="true"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute left-[8%] top-1/2 size-[42vw] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-rgb)/0.08),transparent_70%)] blur-2xl"
      />

      <m.div
        style={{ x: contentX, opacity: fade }}
        variants={panelContent}
        initial={false}
        animate={reduced ? "show" : active ? "show" : "hide"}
        className="shell relative grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
      >
        {/* Left — identity */}
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
            className="mt-7 max-w-[15ch] font-display text-[clamp(2.5rem,1.5rem+4.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
          >
            {item.role}
          </m.h3>

          <m.p
            variants={panelItem}
            className="mt-7 font-mono text-sm uppercase tracking-[0.16em] text-muted-foreground"
          >
            {item.company}
            <span className="mx-3 text-faint">/</span>
            {item.location}
            <span className="mx-3 text-faint">/</span>
            {item.period}
          </m.p>
        </div>

        {/* Right — narrative + metrics */}
        <div className="lg:pl-8">
          <m.p
            variants={panelItem}
            className="max-w-md text-[1.05rem] leading-8 text-muted-foreground"
          >
            {item.summary}
          </m.p>

          <m.div
            variants={panelItem}
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3"
          >
            {item.metrics.map((metric) => (
              <div key={metric.label} className="bg-background-2 p-5">
                <p className="font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.6rem)] font-semibold leading-none tracking-tight text-accent">
                  <MetricValue value={metric.value} active={active} reduced={reduced} />
                </p>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </m.div>

          <m.div variants={panelItem} className="mt-8 flex flex-wrap gap-2">
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

/* ------------------------------------------------------------------ */
/* Vertical fallback (mobile + reduced motion)                         */
/* ------------------------------------------------------------------ */
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
    <div className="shell section-y">
      <div className="flex items-center gap-4">
        <span className="eyebrow">{HEADING.eyebrow}</span>
        <span className="font-mono text-xs text-faint">/ {HEADING.index}</span>
      </div>
      <h2 className="t-h2 mt-6 max-w-2xl">
        <HeadingTitle />
      </h2>

      <ol className="mt-14 flex flex-col gap-5">
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
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-colors duration-500 hover:border-border-strong"
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
              <h3 className="mt-5 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.1rem)] font-semibold leading-tight tracking-tight">
                {item.role}
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {item.company}
                <span className="mx-2 text-faint">/</span>
                {item.period}
              </p>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                {item.summary}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
                {item.metrics.map((metric) => (
                  <div key={metric.label} className="bg-background p-4">
                    <p className="font-display text-xl font-semibold leading-none tracking-tight text-accent">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-[0.7rem] leading-4 text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
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

/* ------------------------------------------------------------------ */
/* Pinned immersive horizontal scroll (desktop)                        */
/* ------------------------------------------------------------------ */
function HorizontalScroll({
  items,
  reduced,
}: {
  items: ExperienceItem[];
  reduced: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const keyframes = trackKeyframes(items.length);
  const xRaw = useTransform(scrollYProgress, keyframes.inputs, keyframes.outputs);
  const x = useSpring(xRaw, { stiffness: 110, damping: 26, restDelta: 0.4 });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(items.length - 1, Math.floor(v * items.length));
    setActive((prev) => (prev === next ? prev : next));
  });

  const jumpTo = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const runway = el.offsetHeight - window.innerHeight;
    const start = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: start + ((index + 0.5) / items.length) * runway,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Track */}
        <m.div style={{ x }} className="flex h-full will-change-transform">
          {items.map((item, index) => (
            <Panel
              key={`${item.company}-${item.role}`}
              item={item}
              index={index}
              total={items.length}
              progress={scrollYProgress}
              active={active === index}
              reduced={reduced}
            />
          ))}
        </m.div>

        {/* Fixed overlay — heading top-left */}
        <div className="pointer-events-none absolute inset-x-0 top-0">
          <div className="shell flex items-start justify-between pt-[clamp(2rem,1.5rem+2vw,3.5rem)]">
            <div>
              <div className="flex items-center gap-4">
                <span className="eyebrow">{HEADING.eyebrow}</span>
                <span className="font-mono text-xs text-faint">
                  / {HEADING.index}
                </span>
              </div>
              {/* Sized between t-h3 and t-h2 so it never collides with the
                  centered panel content on short viewports. */}
              <h2 className="mt-4 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-semibold leading-tight tracking-tight">
                <HeadingTitle />
              </h2>
            </div>
            <span className="hidden items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint lg:inline-flex">
              <span className="size-1.5 rounded-full bg-accent" />
              Keep scrolling
            </span>
          </div>
        </div>

        {/* Career spine — connects all roles into one journey */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="shell pb-[clamp(2rem,1.5rem+2vw,3.5rem)]">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div className="flex items-baseline gap-3 overflow-hidden">
                <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {items[active]?.role}
                </span>
                <span className="hidden font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground sm:inline">
                  {items[active]?.company}
                </span>
              </div>
              <span className="shrink-0 font-mono text-sm tabular-nums text-faint">
                <span className="text-accent">
                  {String(active + 1).padStart(2, "0")}
                </span>{" "}
                / {String(items.length).padStart(2, "0")}
              </span>
            </div>

            <div className="relative">
              <div className="absolute inset-x-1 top-[7px] h-px bg-border" />
              <m.div
                style={{ width: progressWidth }}
                className="absolute left-1 top-[7px] h-px bg-accent"
              />
              <ol className="pointer-events-auto relative flex items-start justify-between">
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
                        onClick={() => jumpTo(index)}
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
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Entry                                                               */
/* ------------------------------------------------------------------ */
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
    return <div className="min-h-[60vh]" aria-hidden />;
  }

  if (!isDesktop || reducedMotion) {
    return <VerticalFallback items={items} />;
  }

  return <HorizontalScroll items={items} reduced={!!reducedMotion} />;
}
