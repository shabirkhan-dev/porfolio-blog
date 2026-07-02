"use client";

import { useRef, useState } from "react";
import {
  LayoutGrid,
  Server,
  Smartphone,
  Sparkles,
  Boxes,
  Gauge,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import {
  m,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Corners } from "@/components/corners";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

type Layer = {
  id: string;
  title: string;
  detail: string;
  tech: string[];
  icon: LucideIcon;
};

/** Engineering strata that sit beneath the calm product surface. */
const layers: Layer[] = [
  {
    id: "frontend",
    title: "Frontend systems",
    detail: "Components, state, interaction contracts, and render discipline.",
    tech: ["React", "Next.js", "TypeScript"],
    icon: LayoutGrid,
  },
  {
    id: "backend",
    title: "Backend architecture",
    detail: "API boundaries, validation, permissions, and data ownership.",
    tech: ["Node.js", "REST", "PostgreSQL"],
    icon: Server,
  },
  {
    id: "mobile",
    title: "Mobile apps",
    detail: "Native-feeling flows, offline states, and cross-platform sync.",
    tech: ["React Native", "Expo"],
    icon: Smartphone,
  },
  {
    id: "ai",
    title: "AI workflows",
    detail: "Structured inputs, verifiable outputs, product-shaped automation.",
    tech: ["LLM APIs", "RAG", "Embeddings"],
    icon: Sparkles,
  },
  {
    id: "infra",
    title: "Infrastructure",
    detail: "Containers, caching, queues, and the paths data travels.",
    tech: ["Docker", "Redis", "Nginx"],
    icon: Boxes,
  },
  {
    id: "perf",
    title: "Performance",
    detail: "Latency budgets, payload shaping, and honest loading behavior.",
    tech: ["Caching", "SSR/SSG"],
    icon: Gauge,
  },
  {
    id: "release",
    title: "Release flow",
    detail: "CI gates, security checks, and deploy paths that hold under pressure.",
    tech: ["GitHub Actions", "CodeQL"],
    icon: GitBranch,
  },
];

/* ------------------------------------------------------------------ */
/* Calm product surface — what users feel                              */
/* ------------------------------------------------------------------ */
function SurfaceSkin() {
  return (
    <div className="relative p-5">
      {/* window chrome */}
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-accent/60" />
      </div>

      {/* calm content */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="h-2.5 w-24 rounded-full bg-foreground/20" />
        <div className="h-7 w-16 rounded-md bg-accent/90" />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-border bg-background-2 p-3">
            <div className="h-1.5 w-8 rounded-full bg-foreground/15" />
            <div className="mt-2.5 h-3 w-12 rounded-full bg-accent/40" />
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2 rounded-lg border border-border bg-background-2 p-3">
        <div className="h-1.5 w-full rounded-full bg-foreground/10" />
        <div className="h-1.5 w-4/5 rounded-full bg-foreground/10" />
        <div className="h-1.5 w-2/3 rounded-full bg-foreground/10" />
      </div>
      {/* activity chart — hidden on short screens so the pinned deck always fits */}
      <div className="mt-3 flex items-end gap-1.5 rounded-lg border border-border bg-background-2 p-3 [@media(max-height:850px)]:hidden">
        {[35, 55, 40, 70, 50, 85, 60, 75, 45, 90, 65, 80].map((h, i) => (
          <div
            key={i}
            className="w-full rounded-[2px] bg-accent/30"
            style={{ height: `${h * 0.4}px` }}
          />
        ))}
      </div>
    </div>
  );
}

/* The same surface, de-skinned: blueprint boxes + mono annotations. */
function SurfaceSkeleton() {
  return (
    <div className="relative h-full bg-background p-5">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-70" />

      {/* window chrome — outlined */}
      <div className="relative flex items-center gap-1.5">
        <span className="size-2 rounded-full border border-accent/40" />
        <span className="size-2 rounded-full border border-accent/40" />
        <span className="size-2 rounded-full border border-accent" />
        <span className="ml-auto font-mono text-[0.5rem] uppercase tracking-[0.14em] text-accent/80">
          x-ray
        </span>
      </div>

      {/* header — annotated wireframe */}
      <div className="relative mt-5 flex items-center justify-between gap-4">
        <div className="flex h-2.5 w-24 items-center rounded-sm border border-dashed border-foreground/30" />
        <div className="grid h-7 w-16 place-items-center rounded-sm border border-dashed border-accent/70">
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-accent">
            action
          </span>
        </div>
      </div>

      {/* stat cards — request annotations */}
      <div className="relative mt-5 grid grid-cols-3 gap-2.5">
        {["GET /stats", "redis hit", "p95 42ms"].map((label) => (
          <div
            key={label}
            className="rounded-sm border border-dashed border-foreground/25 p-3"
          >
            <p className="font-mono text-[0.5rem] leading-none text-accent/90">
              {label}
            </p>
            <div className="mt-2.5 h-3 w-12 rounded-sm border border-dashed border-accent/40" />
          </div>
        ))}
      </div>

      {/* list — data-flow annotation */}
      <div className="relative mt-3 rounded-sm border border-dashed border-foreground/25 p-3">
        <p className="font-mono text-[0.5rem] leading-none text-muted-foreground">
          stream: events · auth: rbac · cache: 60s
        </p>
        <div className="mt-2 space-y-2">
          <div className="h-px w-full border-t border-dotted border-foreground/30" />
          <div className="h-px w-4/5 border-t border-dotted border-foreground/30" />
          <div className="h-px w-2/3 border-t border-dotted border-foreground/30" />
        </div>
      </div>

      {/* chart — query annotation (must mirror the skin's visibility for x-ray alignment) */}
      <div className="relative mt-3 rounded-sm border border-dashed border-foreground/25 p-3 [@media(max-height:850px)]:hidden">
        <p className="font-mono text-[0.5rem] leading-none text-accent/90">
          SELECT day, count(*) GROUP BY 1 — idx scan
        </p>
        <div className="mt-2 flex items-end gap-1.5">
          {[35, 55, 40, 70, 50, 85, 60, 75, 45, 90, 65, 80].map((h, i) => (
            <div
              key={i}
              className="w-full rounded-[1px] border border-dashed border-accent/40"
              style={{ height: `${h * 0.4}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The signature move: as the reader scrolls the strata, a scanline sweeps
 * down this card and everything above it de-skins into the blueprint —
 * the section literally performs "calm surface, engineered underneath".
 */
function XraySurface({
  progress,
  reducedMotion,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
}) {
  const pct = useTransform(progress, [0, 1], [4, 96]);
  const clipPath = useMotionTemplate`inset(0% 0% calc(100% - ${pct}%) 0%)`;
  const scanTop = useMotionTemplate`${pct}%`;

  return (
    <div className="relative rounded-lg border border-border-strong bg-background shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]">
      <Corners />
      <div className="relative overflow-hidden rounded-lg">
        <div className="pointer-events-none absolute -inset-px bg-[radial-gradient(120%_80%_at_50%_0%,rgb(var(--accent-rgb)/0.06),transparent_70%)]" />

        <SurfaceSkin />

        {reducedMotion ? (
          <>
            <div
              className="absolute inset-0"
              style={{ clipPath: "inset(0% 0% 55% 0%)" }}
            >
              <SurfaceSkeleton />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 h-px bg-accent/70"
              style={{ top: "45%" }}
            />
          </>
        ) : (
          <>
            <m.div className="absolute inset-0" style={{ clipPath }}>
              <SurfaceSkeleton />
            </m.div>
            {/* scanline */}
            <m.div
              aria-hidden="true"
              className="absolute inset-x-0 -translate-y-1/2"
              style={{ top: scanTop }}
            >
              <div className="h-px w-full bg-accent" />
              <div className="absolute inset-x-0 -top-3 h-6 bg-accent/10 blur-sm" />
            </m.div>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Engine Room                                                         */
/* ------------------------------------------------------------------ */
const EASE = [0.22, 1, 0.36, 1] as const;

function ScanReadout({ active }: { active: number }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-4 rounded-md border border-border bg-background/50 px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.14em]">
      <span className="flex items-center gap-2.5 text-muted-foreground">
        <span
          className={cn(
            "size-1.5 rounded-full transition-colors duration-300",
            active >= 0 ? "animate-pulse bg-accent" : "bg-faint/50",
          )}
        />
        {active >= 0 ? (
          <>
            Scanning:{" "}
            <span className="text-accent">{layers[active].title}</span>
          </>
        ) : (
          "Scroll to scan the layers"
        )}
      </span>
      <span className="tabular-nums text-faint">
        {String(Math.max(active + 1, 0)).padStart(2, "0")} /{" "}
        {String(layers.length).padStart(2, "0")}
      </span>
    </div>
  );
}

/* Depth meter — filled blocks show how deep the scan has gone. */
function DepthMeter({ active }: { active: number }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
      Depth
      <span className="flex gap-1">
        {layers.map((layer, i) => (
          <span
            key={layer.id}
            className={cn(
              "h-2.5 w-1.5 transition-colors duration-300",
              i <= active ? "bg-accent" : "bg-border-strong",
            )}
          />
        ))}
      </span>
    </div>
  );
}

export function EngineRoom() {
  const reducedMotion = useReducedMotion();

  /* -- Desktop: pinned deck. Scroll swaps layers in place. ----------- */
  const deckRef = useRef<HTMLDivElement>(null);
  const [deckActive, setDeckActive] = useState(0);

  const { scrollYProgress: deckProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });
  const deckFill = useTransform(deckProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(deckProgress, "change", (v) => {
    const next = Math.min(
      layers.length - 1,
      Math.max(0, Math.floor(v * layers.length)),
    );
    setDeckActive((prev) => (prev === next ? prev : next));
  });

  const jumpTo = (index: number) => {
    const el = deckRef.current;
    if (!el) return;
    const runway = el.offsetHeight - window.innerHeight;
    const start = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: start + ((index + 0.5) / layers.length) * runway,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  /* -- Mobile: compact stacked list (pinning is hostile on small). --- */
  const listRef = useRef<HTMLDivElement>(null);
  const [listActive, setListActive] = useState(-1);

  const { scrollYProgress: listProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const listFill = useTransform(listProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(listProgress, "change", (v) => {
    const next = Math.min(layers.length - 1, Math.floor(v * layers.length));
    setListActive((prev) => (prev === next ? prev : next));
  });

  const activeLayer = layers[deckActive];
  const ActiveIcon = activeLayer.icon;

  return (
    // NOTE: no `overflow-hidden` here — any overflow clip on an ancestor
    // disables position:sticky, which the pinned deck depends on.
    <section
      id="engine-room"
      className="relative border-y border-border bg-background-2"
    >
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-25 [mask-image:radial-gradient(90%_70%_at_50%_30%,black,transparent_85%)]" />

      <div className="shell relative">
        {/* Header — mobile/tablet only; on desktop it lives inside the pinned screen */}
        <Reveal className="max-w-2xl pt-20 sm:pt-24 lg:hidden">
          <div className="flex items-center gap-4">
            <span className="eyebrow">The Engine Room</span>
            <span className="font-mono text-xs text-faint">/ 02</span>
          </div>
          <h2 className="t-h2 mt-6 text-balance">
            Calm on the surface.{" "}
            <span className="text-accent">Engineered</span> underneath.
          </h2>
          <p className="mt-6 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
            Every product I ship is one calm surface resting on layers of
            decisions most people never see. This is the cross-section.
          </p>
        </Reveal>

        {/* ---------- Desktop pinned deck ---------- */}
        <div
          ref={deckRef}
          className="relative hidden lg:block"
          style={{ height: `${layers.length * 52}vh` }}
        >
          {/* The whole pinned screen: header + deck fill the viewport together */}
          <div className="sticky top-0 flex h-[100svh] flex-col justify-center py-10">
            <div className="flex items-end justify-between gap-10">
              <div>
                <div className="flex items-center gap-4">
                  <span className="eyebrow">The Engine Room</span>
                  <span className="font-mono text-xs text-faint">/ 02</span>
                </div>
                <h2 className="t-h2 mt-5 text-balance">
                  Calm on the surface.{" "}
                  <span className="text-accent">Engineered</span> underneath.
                </h2>
              </div>
              <p className="max-w-sm pb-1.5 text-right text-[0.95rem] leading-7 text-muted-foreground">
                Every product I ship is one calm surface resting on layers of
                decisions most people never see. This is the cross-section.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-[0.9fr_1.1fr] items-center gap-16">
              {/* Left — the x-rayed surface */}
              <div>
                <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                  On the surface — what users feel
                </p>
                <XraySurface
                  progress={deckProgress}
                  reducedMotion={!!reducedMotion}
                />
                <ScanReadout active={deckActive} />
              </div>

              {/* Right — layer rail + active panel */}
              <div className="grid grid-cols-[minmax(0,12.5rem)_1fr] gap-10">
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 top-0 w-px bg-border"
                  />
                  <m.div
                    aria-hidden="true"
                    style={{ height: deckFill }}
                    className="absolute left-0 top-0 w-px origin-top bg-accent"
                  />
                  <ol>
                    {layers.map((layer, index) => (
                      <li key={layer.id}>
                        <button
                          type="button"
                          onClick={() => jumpTo(index)}
                          aria-current={deckActive === index}
                          className={cn(
                            "flex w-full items-baseline gap-3 py-2.5 pl-5 text-left font-mono text-[0.66rem] uppercase tracking-[0.12em] transition-colors duration-300",
                            deckActive === index
                              ? "text-foreground"
                              : deckActive > index
                                ? "text-muted-foreground hover:text-foreground"
                                : "text-faint hover:text-muted-foreground",
                          )}
                        >
                          <span
                            className={cn(
                              "tabular-nums",
                              deckActive === index && "text-accent",
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {layer.title}
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Active layer panel — swaps in place as you scroll */}
                <m.div
                  key={deckActive}
                  initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative flex min-h-[19rem] flex-col rounded-lg border border-accent/30 bg-background p-7"
                >
                  <Corners />
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-lg border border-accent/30 bg-accent/[0.08] text-accent">
                      <ActiveIcon aria-hidden="true" size={19} />
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                      Layer {String(deckActive + 1).padStart(2, "0")} —{" "}
                      {activeLayer.id}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-[clamp(1.4rem,1.2rem+0.9vw,2rem)] font-medium tracking-tight">
                    {activeLayer.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                    {activeLayer.detail}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {activeLayer.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-sm border border-border-strong px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto border-t border-border pt-5">
                    <DepthMeter active={deckActive} />
                  </div>
                </m.div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Mobile stacked list ---------- */}
        <div className="mt-14 pb-20 sm:pb-24 lg:hidden">
          <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
            On the surface — what users feel
          </p>
          <XraySurface progress={listProgress} reducedMotion={!!reducedMotion} />
          <ScanReadout active={listActive} />

          <div className="mt-10 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">
              Below, what holds it up
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div ref={listRef} className="relative mt-10 pl-9">
            {/* Spine */}
            <div className="absolute bottom-2 left-[11px] top-2 w-px bg-border" />
            <m.div
              style={{ height: listFill }}
              className="absolute left-[11px] top-2 w-px origin-top bg-gradient-to-b from-accent/30 via-accent to-accent"
            />

            <ol className="flex flex-col gap-3">
              {layers.map((layer, index) => {
                const Icon = layer.icon;
                const on = listActive >= index;
                const current = listActive === index;
                return (
                  <li key={layer.id} className="relative">
                    <span
                      className={cn(
                        "absolute top-5 z-10 grid size-[23px] -translate-x-1/2 place-items-center rounded-full border bg-background-2 transition-colors duration-500",
                        on ? "border-accent/50" : "border-border",
                      )}
                      style={{ left: "-22px" }}
                      aria-hidden="true"
                    >
                      {current ? (
                        <span className="absolute inline-flex size-[23px] animate-ping rounded-full bg-accent/30" />
                      ) : null}
                      <span
                        className={cn(
                          "relative rounded-full transition-all duration-500",
                          on ? "size-2.5 bg-accent" : "size-1.5 bg-border-strong",
                        )}
                      />
                    </span>

                    <div
                      className={cn(
                        "relative overflow-hidden rounded-lg border bg-background/40 p-5 transition-all duration-500",
                        current
                          ? "border-accent/40 bg-background"
                          : on
                            ? "border-border-strong bg-background"
                            : "border-border",
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={cn(
                            "grid size-10 shrink-0 place-items-center rounded-lg border transition-colors duration-500",
                            on
                              ? "border-accent/30 bg-accent/[0.08] text-accent"
                              : "border-border text-muted-foreground",
                          )}
                        >
                          <Icon aria-hidden="true" size={18} />
                        </span>

                        <div className="min-w-0 flex-1">
                          <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                            Layer {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="mt-1.5 font-display text-lg font-medium tracking-tight">
                            {layer.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {layer.detail}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {layer.tech.map((t) => (
                              <span
                                key={t}
                                className={cn(
                                  "rounded-sm border px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] transition-colors duration-500",
                                  on
                                    ? "border-border-strong text-muted-foreground"
                                    : "border-border text-faint",
                                )}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
