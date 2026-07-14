"use client";

import { cn } from "@/lib/utils";
import { PIPELINE_STAGES, STAGE_LABELS, type AggregateResult } from "./request-flow.types";

function formatLatency(ms: number): string {
  if (ms >= 1000) return `${(ms / 1000).toFixed(2)}s`;
  return `${ms}ms`;
}

export function ResultSummary({
  result,
  running,
}: {
  result: AggregateResult | null;
  running: boolean;
}) {
  return (
    <section
      aria-live="polite"
      aria-atomic="true"
      className="border border-border bg-background-2 p-4 sm:p-5"
    >
      <h3 className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
        Result summary
      </h3>
      {running ? (
        <p className="mt-3 text-sm text-muted-foreground">Simulation running…</p>
      ) : result ? (
        <div className="mt-3 space-y-3">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p
              className={cn(
                "font-display text-xl font-semibold tracking-tight",
                result.success ? "text-foreground" : "text-destructive",
              )}
            >
              {result.httpStatus} {result.statusText}
            </p>
            <p className="font-mono text-sm tabular-nums text-muted-foreground">
              {formatLatency(result.totalLatencyMs)} total
            </p>
          </div>
          <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Cache" value={formatCache(result.cacheResult)} />
            <Stat label="Retries" value={String(result.retryCount)} />
            <Stat
              label="Stages"
              value={`${result.completedStages} completed`}
            />
            {result.failedAt ? (
              <Stat label="Failed at" value={STAGE_LABELS[result.failedAt]} />
            ) : null}
            {result.runs.length > 1 ? (
              <>
                <Stat
                  label="Completed"
                  value={String(result.requestsCompleted)}
                />
                <Stat label="Failed" value={String(result.requestsFailed)} />
              </>
            ) : null}
          </dl>
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          No runs yet. Send a request to see results.
        </p>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border px-3 py-2">
      <dt className="font-mono text-[0.54rem] uppercase tracking-[0.12em] text-faint">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-sm text-foreground">{value}</dd>
    </div>
  );
}

function formatCache(result: AggregateResult["cacheResult"]): string {
  if (result === "n/a") return "N/A";
  if (result === "hit") return "Cache hit";
  if (result === "miss") return "Cache miss";
  if (result === "skipped") return "Cache skipped";
  return "Cache unavailable";
}

export function StageLatencyTimeline({
  result,
}: {
  result: AggregateResult | null;
}) {
  if (!result) {
    return (
      <p className="text-sm text-muted-foreground">
        Run a simulation to see per-stage latency.
      </p>
    );
  }

  const rows = PIPELINE_STAGES.reduce<
    { stage: (typeof PIPELINE_STAGES)[number]; ms: number; cumulative: number }[]
  >((acc, stage) => {
    const ms = result.stageLatencies[stage];
    if (ms == null) return acc;
    const cumulative = (acc[acc.length - 1]?.cumulative ?? 0) + ms;
    acc.push({ stage, ms, cumulative });
    return acc;
  }, []);

  const max = rows[rows.length - 1]?.cumulative ?? 1;

  return (
    <div className="space-y-2" aria-label="Stage latency timeline">
      {rows.map((row) => (
        <div key={row.stage} className="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-2">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground">
            {STAGE_LABELS[row.stage]}
          </span>
          <div className="relative h-2 border border-border bg-background">
            <div
              className="absolute inset-y-0 left-0 bg-accent/70"
              style={{ width: `${(row.cumulative / max) * 100}%` }}
            />
          </div>
          <span className="text-right font-mono text-[0.62rem] tabular-nums text-faint">
            +{row.ms}ms
          </span>
        </div>
      ))}
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-accent">
        Total {formatLatency(result.totalLatencyMs)}
      </p>
    </div>
  );
}
