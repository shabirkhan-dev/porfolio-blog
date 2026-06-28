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
  eyebrow: "Track record",
  index: "03",
  title: "Senior ownership across product and system.",
};

/** Safe scroll input range for per-panel parallax — always within [0, 1]. */
function panelScrollRange(index: number, total: number): [number, number, number] {
  if (total <= 1) return [0, 0.5, 1];

  const step = 1 / (total - 1);
  const center = index * step;
  const half = step * 0.42;

  let lo = Math.max(0, center - half);
  let hi = Math.min(1, center + half);
  let mid = Math.max(lo, Math.min(hi, center));

  if (lo >= mid) mid = lo + (hi - lo) * 0.5;
  if (mid >= hi) {
    hi = Math.min(1, mid + 0.08);
    if (mid >= hi) {
      lo = Math.max(0, hi - 0.08);
      mid = lo + (hi - lo) * 0.5;
    }
  }

  return [lo, mid, hi];
}

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

  const range = panelScrollRange(index, total);
  const yearX = useTransform(progress, range, ["30%", "0%", "-30%"]);
  const yearScale = useTransform(progress, range, [1.08, 1, 0.92]);
  const contentX = useTransform(progress, range, ["10%", "0%", "-10%"]);
  const fade = useTransform(progress, range, [0.18, 1, 0.18]);

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
                className="rounded-full border border-border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-faint"
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
      <h2 className="t-h2 mt-6 max-w-2xl">{HEADING.title}</h2>

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
                    className="rounded-full border border-border px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-faint"
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

  const xRaw = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(items.length - 1) * 100}vw`],
  );
  const x = useSpring(xRaw, { stiffness: 110, damping: 26, restDelta: 0.4 });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (items.length <= 1) {
      setActive(0);
      return;
    }
    const next = Math.round(v * (items.length - 1));
    setActive((prev) => (prev === next ? prev : next));
  });

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
            <div className="flex items-center gap-4">
              <span className="eyebrow">{HEADING.eyebrow}</span>
              <span className="font-mono text-xs text-faint">
                / {HEADING.index}
              </span>
            </div>
            <span className="hidden items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint lg:inline-flex">
              <span className="size-1.5 rounded-full bg-accent" />
              Keep scrolling
            </span>
          </div>
        </div>

        {/* Vertical side-rail navigator */}
        <nav
          aria-hidden="true"
          className="pointer-events-none absolute right-[clamp(1.25rem,0.5rem+2vw,2.5rem)] top-1/2 hidden -translate-y-1/2 flex-col gap-5 lg:flex"
        >
          {items.map((item, index) => {
            const on = active === index;
            return (
              <div key={`rail-${item.year}`} className="flex items-center justify-end gap-3">
                <span
                  className={cn(
                    "font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-all duration-500",
                    on ? "text-accent opacity-100" : "text-faint opacity-0",
                  )}
                >
                  {item.year}
                </span>
                <span
                  className={cn(
                    "block rounded-full transition-all duration-500",
                    on ? "h-6 w-1 bg-accent" : "h-1.5 w-1 bg-border-strong",
                  )}
                />
              </div>
            );
          })}
        </nav>

        {/* Fixed overlay — counter + progress bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="shell flex items-center gap-6 pb-[clamp(2rem,1.5rem+2vw,3.5rem)]">
            <span className="font-mono text-sm tabular-nums text-foreground">
              {String(active + 1).padStart(2, "0")}
            </span>
            <div className="relative h-px flex-1 overflow-hidden bg-border">
              <m.span
                style={{ width: progressWidth }}
                className="absolute inset-y-0 left-0 bg-accent"
              />
            </div>
            <span className="font-mono text-sm tabular-nums text-faint">
              {String(items.length).padStart(2, "0")}
            </span>
            <span className="hidden min-w-[8rem] text-right font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground sm:inline">
              {items[active]?.company}
            </span>
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
