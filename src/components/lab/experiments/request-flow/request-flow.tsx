"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { RequestFlowControls } from "./request-flow-controls";
import type { EdgeCase } from "./request-flow-edge-cases";
import { DEFAULT_SIMULATION_CONFIG } from "./request-flow.types";
import { ResultSummary } from "./request-flow-result";
import { RequestFlowTabs } from "./request-flow-tabs";
import { idleNodes, RequestPipeline } from "./request-node";
import { RequestFlowSimulation } from "./simulation-engine";
import { TracePanel } from "./trace-panel";
import type {
  AggregateResult,
  SimulationConfig,
  SimulationSnapshot,
  SourceFileEntry,
} from "./request-flow.types";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useElementInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { rootMargin: "-10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

export function RequestFlow({
  compact = false,
  sourceFiles = [],
}: {
  compact?: boolean;
  sourceFiles?: SourceFileEntry[];
}) {
  if (compact) {
    return <RequestFlowCompactPreview />;
  }

  return <RequestFlowFull sourceFiles={sourceFiles} />;
}

function RequestFlowFull({ sourceFiles }: { sourceFiles: SourceFileEntry[] }) {
  const simRef = useRef<RequestFlowSimulation | null>(null);
  const cancelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [config, setConfig] = useState<SimulationConfig>(DEFAULT_SIMULATION_CONFIG);
  const [snapshot, setSnapshot] = useState<SimulationSnapshot>({
    nodes: idleNodes(),
    trace: [],
    activeTraceId: null,
    running: false,
    aggregate: null,
    burstActive: 0,
  });
  const [result, setResult] = useState<AggregateResult | null>(null);
  const [canReplay, setCanReplay] = useState(false);

  useEffect(() => {
    const sim = new RequestFlowSimulation();
    simRef.current = sim;
    const unsub = sim.subscribe({
      onSnapshot: setSnapshot,
      onComplete: (aggregate) => {
        setResult(aggregate);
        setCanReplay(true);
      },
    });
    return () => {
      unsub();
      sim.dispose();
      if (cancelTimerRef.current) clearTimeout(cancelTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const send = useCallback(
    (nextConfig: SimulationConfig = config) => {
      simRef.current?.start(nextConfig);
    },
    [config],
  );

  const handleEdgeCase = useCallback(
    (edgeCase: EdgeCase) => {
      const merged = { ...DEFAULT_SIMULATION_CONFIG, ...edgeCase.config };
      setConfig(merged);
      send(merged);

      if (cancelTimerRef.current) clearTimeout(cancelTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

      if (edgeCase.action === "cancelMid") {
        cancelTimerRef.current = setTimeout(() => {
          simRef.current?.cancel();
        }, 280);
      }

      if (edgeCase.action === "resetMid") {
        resetTimerRef.current = setTimeout(() => {
          simRef.current?.reset();
          setResult(null);
        }, 320);
      }
    },
    [send],
  );

  const burstCount =
    config.traffic === "burst5" ? 5 : config.traffic === "burst20" ? 20 : 1;

  return (
    <div className="space-y-5 pb-24 sm:pb-8">
      <div className="border border-border bg-background-2 p-4 sm:p-6">
        <RequestPipeline nodes={snapshot.nodes} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_min(22rem,100%)] xl:items-start">
        <div className="space-y-5">
          <RequestFlowControls
            config={config}
            onChange={setConfig}
            running={snapshot.running}
            onSend={() => send()}
            onCancel={() => simRef.current?.cancel()}
            onReset={() => {
              simRef.current?.reset();
              setResult(null);
            }}
            onReplay={() => simRef.current?.replayLast()}
            canReplay={canReplay}
          />
          <div className="xl:hidden">
            <TracePanel
              entries={snapshot.trace}
              activeId={snapshot.activeTraceId}
              burstCount={burstCount}
            />
          </div>
          <ResultSummary result={result} running={snapshot.running} />
        </div>

        <div className="hidden xl:block">
          <TracePanel
            entries={snapshot.trace}
            activeId={snapshot.activeTraceId}
            burstCount={burstCount}
          />
        </div>
      </div>

      <RequestFlowTabs
        result={result}
        sourceFiles={sourceFiles}
        running={snapshot.running}
        onRunEdgeCase={handleEdgeCase}
      />
    </div>
  );
}

function RequestFlowCompactPreview() {
  const rootRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<RequestFlowSimulation | null>(null);
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleRef = useRef(false);
  const inView = useElementInView(rootRef);
  const reducedMotion = usePrefersReducedMotion();
  const [nodes, setNodes] = useState(idleNodes());

  const startRun = useCallback(() => {
    if (!visibleRef.current || !simRef.current) return;
    simRef.current.start({
      ...DEFAULT_SIMULATION_CONFIG,
      cacheBehavior: "forceMiss",
    });
  }, []);

  useEffect(() => {
    visibleRef.current = inView;
    if (!simRef.current) return;

    if (loopRef.current) {
      clearTimeout(loopRef.current);
      loopRef.current = null;
    }

    if (inView) {
      startRun();
    } else {
      simRef.current.reset();
    }
  }, [inView, startRun]);

  useEffect(() => {
    const sim = new RequestFlowSimulation();
    simRef.current = sim;
    const unsub = sim.subscribe({
      onSnapshot: (snap) => setNodes(snap.nodes),
      onComplete: () => {
        if (!visibleRef.current) return;
        loopRef.current = setTimeout(
          startRun,
          reducedMotion ? 1200 : 2200,
        );
      },
    });

    if (visibleRef.current) startRun();

    return () => {
      unsub();
      sim.dispose();
      if (loopRef.current) clearTimeout(loopRef.current);
    };
  }, [reducedMotion, startRun]);

  return (
    <div ref={rootRef} className="relative flex h-full min-h-[14rem] flex-col">
      <div className="flex flex-1 items-center overflow-x-auto px-3 py-4">
        <RequestPipeline nodes={nodes} compact />
      </div>
      <Link
        href="/lab/request-flow"
        className="flex min-h-11 items-center justify-between gap-2 border-t border-border px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-accent"
      >
        Request Flow — full instrument
        <ArrowUpRight aria-hidden size={12} className="text-accent" />
      </Link>
    </div>
  );
}
