"use client";

import { PIPELINE_STAGES, STAGE_LABELS, type SimulationConfig } from "./request-flow.types";

export type EdgeCase = {
  id: string;
  label: string;
  description: string;
  config: Partial<SimulationConfig>;
  action?: "send" | "cancelMid" | "resetMid";
};

export const EDGE_CASES: EdgeCase[] = [
  {
    id: "cancel-auth",
    label: "Cancel during auth",
    description: "Start a slow request and cancel while authentication is active.",
    config: { requestMode: "slow", failureInjection: "none", traffic: "single" },
    action: "cancelMid",
  },
  {
    id: "db-timeout",
    label: "Database timeout",
    description: "Inject a database timeout and observe timed-out state.",
    config: { failureInjection: "dbTimeout", retryPolicy: "none" },
    action: "send",
  },
  {
    id: "cache-fallback",
    label: "Cache failure → DB",
    description: "Cache unavailable with automatic fallback to database.",
    config: { failureInjection: "cacheUnavailable", cacheBehavior: "automatic" },
    action: "send",
  },
  {
    id: "service-retry",
    label: "Retry after service error",
    description: "Service error with exponential backoff retry.",
    config: { failureInjection: "service", retryPolicy: "exponential" },
    action: "send",
  },
  {
    id: "auth-no-retry",
    label: "Auth failure (no retry)",
    description: "Authentication failures must not schedule retries.",
    config: { failureInjection: "auth", retryPolicy: "exponential" },
    action: "send",
  },
  {
    id: "rate-limit",
    label: "Rate-limit rejection",
    description: "429 response at the rate limiter stage.",
    config: { failureInjection: "rateLimit", retryPolicy: "one" },
    action: "send",
  },
  {
    id: "reset-mid",
    label: "Reset during run",
    description: "Reset simulation while a burst is in flight.",
    config: { traffic: "burst5", requestMode: "slow" },
    action: "resetMid",
  },
  {
    id: "concurrent",
    label: "Concurrent requests",
    description: "Burst of five requests with aggregate results.",
    config: { traffic: "burst5", failureInjection: "none" },
    action: "send",
  },
];

export function RequestFlowEdgeCases({
  running,
  onRunCase,
}: {
  running: boolean;
  onRunCase: (edgeCase: EdgeCase) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Trigger an edge case to watch how the pipeline responds.
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {EDGE_CASES.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              disabled={running}
              onClick={() => onRunCase(item)}
              className="flex min-h-11 w-full flex-col border border-border bg-background px-3 py-3 text-left transition-colors hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-accent">
                {item.label}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="border border-border bg-background-2 p-4">
        <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-faint">
          Manual checks
        </p>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>Reduced motion: enable OS setting — animations shorten instantly.</li>
          <li>Viewport: scroll away during a run — preview pauses off-screen.</li>
        </ul>
      </div>
    </div>
  );
}

export function HowItWorksPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Diagram
        title="Request state machine"
        rows={[
          "idle → waiting → active → passed",
          "active → failed | timedOut | cancelled",
          "failed → retrying → active (if policy allows)",
          "cache → cacheHit | cacheMiss | skipped",
        ]}
      />
      <Diagram
        title="Pipeline order"
        rows={PIPELINE_STAGES.map((s, i) => `${i + 1}. ${STAGE_LABELS[s]}`)}
      />
      <Diagram
        title="Retry scheduling"
        rows={[
          "Auth & rate-limit failures never retry",
          "One retry: fixed 120ms delay",
          "Exponential: 100ms × 2^n",
          "Jitter adds 0–50ms to backoff",
        ]}
      />
      <Diagram
        title="Latency & cancellation"
        rows={[
          "Each stage adds its own duration to total",
          "Trace timestamps are relative to request start",
          "Cancel marks active stage cancelled (499)",
          "Reset clears timers and node states",
        ]}
      />
    </div>
  );
}

function Diagram({ title, rows }: { title: string; rows: string[] }) {
  return (
    <div className="border border-border bg-background-2 p-4">
      <h4 className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent">
        {title}
      </h4>
      <ul className="mt-3 space-y-1.5 font-mono text-[0.68rem] leading-6 text-muted-foreground">
        {rows.map((row) => (
          <li key={row} className="flex gap-2">
            <span className="text-border-strong">│</span>
            <span>{row}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
