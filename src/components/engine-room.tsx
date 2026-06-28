"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

const layers = [
  {
    id: "surface",
    label: "Surface",
    title: "Product thinking",
    detail: "Flows, hierarchy, and the decisions users feel first.",
    depth: 0,
  },
  {
    id: "frontend",
    label: "Layer 01",
    title: "Frontend systems",
    detail: "Components, state, interaction contracts, and render discipline.",
    depth: 1,
  },
  {
    id: "backend",
    label: "Layer 02",
    title: "Backend architecture",
    detail: "API boundaries, validation, permissions, and data ownership.",
    depth: 2,
  },
  {
    id: "mobile",
    label: "Layer 03",
    title: "Mobile apps",
    detail: "Native-feeling flows, offline states, and cross-platform sync.",
    depth: 3,
  },
  {
    id: "ai",
    label: "Layer 04",
    title: "AI workflows",
    detail: "Structured inputs, verifiable outputs, and product-shaped automation.",
    depth: 4,
  },
  {
    id: "infra",
    label: "Layer 05",
    title: "Infrastructure",
    detail: "Containers, caching, queues, and the paths data travels.",
    depth: 5,
  },
  {
    id: "perf",
    label: "Layer 06",
    title: "Performance",
    detail: "Latency budgets, payload shaping, and honest loading behavior.",
    depth: 6,
  },
  {
    id: "release",
    label: "Layer 07",
    title: "Release flow",
    detail: "CI gates, security checks, and deploy paths that hold under pressure.",
    depth: 7,
  },
];

function LayerRow({
  layer,
  index,
  progress,
}: {
  layer: (typeof layers)[number];
  index: number;
  progress: ReturnType<typeof useTransform<number, number>>;
}) {
  const opacity = useTransform(progress, [index * 0.08, index * 0.08 + 0.12], [0.35, 1]);
  const x = useTransform(progress, [index * 0.08, index * 0.08 + 0.12], [12, 0]);

  return (
    <m.div
      style={{ opacity, x }}
      className={cn(
        "group relative flex items-start gap-5 border-t border-border py-6 transition-colors duration-500 sm:gap-8 sm:py-7",
        layer.depth === 0 && "border-t-0 pt-0",
      )}
    >
      <span
        className="w-16 shrink-0 pt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint sm:w-20"
        style={{ paddingLeft: `${layer.depth * 0.75}rem` }}
      >
        {layer.label}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[clamp(1.15rem,1rem+0.8vw,1.5rem)] font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
          {layer.title}
        </h3>
        <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
          {layer.detail}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="hidden h-px flex-1 self-center bg-border transition-all duration-500 group-hover:bg-accent/40 sm:block"
      />
    </m.div>
  );
}

export function EngineRoom() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const diagramScale = useTransform(scrollYProgress, [0, 0.5], [0.96, 1]);
  const diagramOpacity = useTransform(scrollYProgress, [0, 0.25], [0.6, 1]);

  return (
    <section
      ref={containerRef}
      id="engine-room"
      className="relative overflow-hidden border-y border-border bg-background-2"
    >
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-30 [mask-image:radial-gradient(90%_70%_at_50%_50%,black,transparent_85%)]" />

      <div className="shell section-y relative">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left — statement */}
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">The Engine Room</span>
            <h2 className="t-h2 mt-6 text-balance">
              Calm on the surface.{" "}
              <span className="font-serif font-normal italic text-accent">
                Engineered
              </span>{" "}
              underneath.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
              Products that feel inevitable usually have a system behind them —
              layers of decisions most users never see.
            </p>

            {/* Stacked diagram */}
            <m.div
              style={{ scale: diagramScale, opacity: diagramOpacity }}
              className="relative mt-12 hidden aspect-[4/3] max-w-sm lg:block"
            >
              {layers
                .slice()
                .reverse()
                .map((layer, i) => (
                  <div
                    key={layer.id}
                    className="absolute inset-x-0 rounded-xl border border-border bg-background/80 backdrop-blur-sm transition-colors duration-500"
                    style={{
                      top: `${i * 14}px`,
                      bottom: `${(layers.length - 1 - i) * 14}px`,
                      opacity: 0.4 + i * 0.08,
                      zIndex: i,
                    }}
                  >
                    <div className="flex h-full items-end p-4">
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
                        {layer.title}
                      </span>
                    </div>
                  </div>
                ))}
              <div className="absolute -inset-4 -z-10 rounded-2xl bg-[radial-gradient(circle_at_50%_80%,rgb(var(--accent-rgb)/0.12),transparent_70%)]" />
            </m.div>
          </Reveal>

          {/* Right — scroll-revealed layers */}
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent sm:left-20" />
            {layers.map((layer, index) => (
              <LayerRow
                key={layer.id}
                layer={layer}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
