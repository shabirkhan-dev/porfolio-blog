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
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
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
function SurfaceCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-background p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]">
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,rgb(var(--accent-rgb)/0.06),transparent_70%)]" />
      <div className="relative">
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
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Engine Room                                                         */
/* ------------------------------------------------------------------ */
export function EngineRoom() {
  const strataRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: strataRef,
    offset: ["start 0.75", "end 0.55"],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(layers.length - 1, Math.floor(v * layers.length));
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <section
      id="engine-room"
      className="relative overflow-hidden border-y border-border bg-background-2"
    >
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-25 [mask-image:radial-gradient(90%_70%_at_50%_30%,black,transparent_85%)]" />

      <div className="shell section-y relative">
        {/* Header */}
        <Reveal className="max-w-2xl">
          <span className="eyebrow">The Engine Room</span>
          <h2 className="t-h2 mt-6 text-balance">
            Calm on the surface.{" "}
            <span className="font-serif font-normal italic text-accent">
              Engineered
            </span>{" "}
            underneath.
          </h2>
          <p className="mt-6 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
            Every product I ship is one calm surface resting on layers of
            decisions most people never see. This is the cross-section.
          </p>
        </Reveal>

        {/* Cross-section */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left — surface, sticky */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                On the surface — what users feel
              </p>
              <SurfaceCard />

              <div className="mt-8 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">
                  Below, what holds it up
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
            </Reveal>
          </div>

          {/* Right — engineered strata */}
          <div ref={strataRef} className="relative pl-10 sm:pl-14">
            {/* Spine */}
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border sm:left-[15px]" />
            <m.div
              style={{ height: fillHeight }}
              className="absolute left-[11px] top-2 w-px origin-top bg-gradient-to-b from-accent/30 via-accent to-accent sm:left-[15px]"
            />

            <ol className="flex flex-col gap-3">
              {layers.map((layer, index) => {
                const Icon = layer.icon;
                const on = active >= index;
                const current = active === index;
                return (
                  <li key={layer.id} className="relative">
                    {/* Node on the spine */}
                    <span
                      className={cn(
                        "absolute -left-10 top-5 z-10 grid size-[23px] -translate-x-1/2 place-items-center rounded-full border bg-background-2 transition-colors duration-500 sm:-left-14",
                        on ? "border-accent/50" : "border-border",
                      )}
                      style={{ left: "0px" }}
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

                    <m.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                        delay: index * 0.04,
                      }}
                      className={cn(
                        "group relative overflow-hidden rounded-xl border bg-background/40 p-5 transition-all duration-500 sm:p-6",
                        on
                          ? "border-border-strong bg-background"
                          : "border-border",
                      )}
                    >
                      {/* depth tint — deeper layers feel further down */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent/[0.04] to-transparent opacity-0 transition-opacity duration-500"
                        style={{ opacity: on ? 0.6 + index * 0.04 : 0 }}
                      />

                      <div className="relative flex items-start gap-4">
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
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                              Layer {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h3
                            className={cn(
                              "mt-1.5 font-display text-[clamp(1.1rem,1rem+0.6vw,1.4rem)] font-semibold tracking-tight transition-colors duration-300",
                              on ? "text-foreground" : "text-foreground/80",
                            )}
                          >
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
                                  "rounded-full border px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] transition-colors duration-500",
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
                    </m.div>
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
