"use client";

import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Check,
  Circle,
  Clock,
  Loader2,
  RefreshCw,
  SkipForward,
  X,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  STAGE_LABELS,
  type NodeSnapshot,
  type NodeVisualState,
  type PipelineStage,
} from "./request-flow.types";

const STATE_META: Record<
  NodeVisualState,
  { label: string; icon: typeof Circle; pulse?: boolean }
> = {
  idle: { label: "Idle", icon: Circle },
  waiting: { label: "Waiting", icon: Clock },
  active: { label: "Active", icon: Loader2, pulse: true },
  passed: { label: "Passed", icon: Check },
  failed: { label: "Failed", icon: X },
  timedOut: { label: "Timed out", icon: Clock },
  retrying: { label: "Retrying", icon: RefreshCw, pulse: true },
  cacheHit: { label: "Cache hit", icon: Check },
  cacheMiss: { label: "Cache miss", icon: AlertTriangle },
  skipped: { label: "Skipped", icon: SkipForward },
  cancelled: { label: "Cancelled", icon: Ban },
};

function stateClasses(state: NodeVisualState): string {
  switch (state) {
    case "active":
    case "retrying":
      return "border-accent bg-accent/10 ring-1 ring-accent/40";
    case "passed":
    case "cacheHit":
      return "border-border-strong bg-background";
    case "failed":
    case "timedOut":
      return "border-destructive/60 bg-destructive/5";
    case "cacheMiss":
      return "border-accent/50 bg-background-2";
    case "waiting":
      return "border-border-strong bg-background-2";
    case "skipped":
      return "border-border bg-background/60 opacity-80";
    case "cancelled":
      return "border-border-strong bg-background/40 opacity-70";
    default:
      return "border-border bg-background-2";
  }
}

export function RequestNode({
  snapshot,
  vertical = false,
  compact = false,
  showConnector = true,
}: {
  snapshot: NodeSnapshot;
  vertical?: boolean;
  compact?: boolean;
  showConnector?: boolean;
}) {
  const meta = STATE_META[snapshot.state];
  const Icon = meta.icon;
  const reducedMotion = useReducedMotion();
  const spinning =
    !reducedMotion &&
    (snapshot.state === "active" || snapshot.state === "retrying");

  return (
    <div
      className={cn(
        "flex items-center",
        vertical ? "flex-col gap-2" : "flex-row gap-2 sm:gap-3",
      )}
    >
      <div
        className={cn(
          "relative flex flex-col border transition-colors duration-300",
          compact ? "min-w-[4.5rem] px-2 py-2" : "min-w-[5.5rem] px-3 py-3 sm:min-w-[6.5rem]",
          stateClasses(snapshot.state),
          meta.pulse && !compact && !reducedMotion && "animate-pulse",
        )}
        role="status"
        aria-label={`${STAGE_LABELS[snapshot.stage]}: ${meta.label}${
          snapshot.requestCount > 1 ? `, ${snapshot.requestCount} requests` : ""
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "font-mono uppercase tracking-[0.12em] text-faint",
              compact ? "text-[0.5rem]" : "text-[0.54rem]",
            )}
          >
            {compact
              ? STAGE_LABELS[snapshot.stage].split(" ")[0]?.slice(0, 5)
              : STAGE_LABELS[snapshot.stage]}
          </span>
          <Icon
            aria-hidden
            size={compact ? 11 : 13}
            className={cn(
              "shrink-0",
              spinning && "animate-spin",
              snapshot.state === "failed" || snapshot.state === "timedOut"
                ? "text-destructive"
                : snapshot.state === "active" || snapshot.state === "retrying"
                  ? "text-accent"
                  : "text-muted-foreground",
            )}
          />
        </div>
        {!compact ? (
          <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-foreground">
            {meta.label}
          </p>
        ) : null}
        {snapshot.requestCount > 1 ? (
          <span className="mt-1 inline-flex w-fit border border-border px-1 font-mono text-[0.5rem] uppercase tracking-[0.08em] text-accent">
            ×{snapshot.requestCount}
          </span>
        ) : null}
      </div>
      {showConnector ? (
        <ArrowRight
          aria-hidden
          size={compact ? 12 : 14}
          className={cn(
            "shrink-0 text-border-strong",
            vertical && "rotate-90",
          )}
        />
      ) : null}
    </div>
  );
}

export function RequestPipeline({
  nodes,
  vertical = false,
  compact = false,
}: {
  nodes: NodeSnapshot[];
  vertical?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full",
        vertical
          ? "flex-col items-stretch gap-1"
          : "flex-col gap-4 overflow-x-auto pb-2 lg:flex-row lg:items-center lg:overflow-visible",
      )}
      aria-label="Request pipeline"
    >
      {vertical ? (
        nodes.map((node, index) => (
          <RequestNode
            key={node.stage}
            snapshot={node}
            vertical
            compact={compact}
            showConnector={index < nodes.length - 1}
          />
        ))
      ) : (
        <>
          <div className="hidden lg:flex lg:flex-wrap lg:items-center lg:gap-2">
            {nodes.map((node, index) => (
              <RequestNode
                key={node.stage}
                snapshot={node}
                compact={compact}
                showConnector={index < nodes.length - 1}
              />
            ))}
          </div>
          <div className="flex flex-col gap-1 lg:hidden">
            {nodes.map((node, index) => (
              <RequestNode
                key={node.stage}
                snapshot={node}
                vertical
                compact={compact}
                showConnector={index < nodes.length - 1}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function idleNodes(): NodeSnapshot[] {
  const stages: PipelineStage[] = [
    "client",
    "gateway",
    "authentication",
    "rateLimiter",
    "service",
    "cache",
    "database",
    "response",
  ];
  return stages.map((stage) => ({
    stage,
    state: "idle",
    requestCount: 0,
  }));
}
