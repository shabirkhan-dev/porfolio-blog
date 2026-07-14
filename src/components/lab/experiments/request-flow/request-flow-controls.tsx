"use client";

import { cn } from "@/lib/utils";
import type {
  CacheBehavior,
  FailureInjection,
  RequestMode,
  RetryPolicy,
  SimulationConfig,
  TrafficMode,
} from "./request-flow.types";

type OptionGroupProps<T extends string> = {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  disabled?: boolean;
};

function OptionGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
}: OptionGroupProps<T>) {
  return (
    <fieldset className="min-w-0" disabled={disabled}>
      <legend className="mb-2 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-faint">
        {label}
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={value === opt.value}
            className={cn(
              "min-h-11 border px-2.5 py-2 font-mono text-[0.58rem] uppercase tracking-[0.1em] transition-colors sm:min-h-9 sm:px-3",
              value === opt.value
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-background text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function RequestFlowControls({
  config,
  onChange,
  running,
  onSend,
  onCancel,
  onReset,
  onReplay,
  canReplay,
}: {
  config: SimulationConfig;
  onChange: (config: SimulationConfig) => void;
  running: boolean;
  onSend: () => void;
  onCancel: () => void;
  onReset: () => void;
  onReplay: () => void;
  canReplay: boolean;
}) {
  const patch = <K extends keyof SimulationConfig>(
    key: K,
    value: SimulationConfig[K],
  ) => onChange({ ...config, [key]: value });

  return (
    <div className="space-y-5 border border-border bg-background-2 p-4 sm:p-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onSend}
          disabled={running}
          className="min-h-11 border border-accent bg-accent px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send request
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={!running}
          className="min-h-11 border border-border px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-40"
        >
          Cancel active
        </button>
        <button
          type="button"
          onClick={onReset}
          className="min-h-11 border border-border px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-border-strong"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onReplay}
          disabled={!canReplay || running}
          className="min-h-11 border border-border px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-40"
        >
          Replay last
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <OptionGroup<RequestMode>
          label="Request mode"
          value={config.requestMode}
          onChange={(v) => patch("requestMode", v)}
          disabled={running}
          options={[
            { value: "standard", label: "Standard" },
            { value: "cached", label: "Cached" },
            { value: "write", label: "Write" },
            { value: "slow", label: "Slow" },
          ]}
        />
        <OptionGroup<CacheBehavior>
          label="Cache behavior"
          value={config.cacheBehavior}
          onChange={(v) => patch("cacheBehavior", v)}
          disabled={running}
          options={[
            { value: "automatic", label: "Automatic" },
            { value: "forceHit", label: "Force hit" },
            { value: "forceMiss", label: "Force miss" },
            { value: "disabled", label: "Disabled" },
          ]}
        />
        <OptionGroup<FailureInjection>
          label="Failure injection"
          value={config.failureInjection}
          onChange={(v) => patch("failureInjection", v)}
          disabled={running}
          options={[
            { value: "none", label: "None" },
            { value: "auth", label: "Auth fail" },
            { value: "rateLimit", label: "Rate limit" },
            { value: "service", label: "Service err" },
            { value: "cacheUnavailable", label: "Cache down" },
            { value: "dbTimeout", label: "DB timeout" },
            { value: "network", label: "Network" },
          ]}
        />
        <OptionGroup<RetryPolicy>
          label="Retry policy"
          value={config.retryPolicy}
          onChange={(v) => patch("retryPolicy", v)}
          disabled={running}
          options={[
            { value: "none", label: "No retry" },
            { value: "one", label: "One retry" },
            { value: "exponential", label: "Exp backoff" },
            { value: "exponentialJitter", label: "Backoff + jitter" },
          ]}
        />
        <OptionGroup<TrafficMode>
          label="Traffic"
          value={config.traffic}
          onChange={(v) => patch("traffic", v)}
          disabled={running}
          options={[
            { value: "single", label: "Single" },
            { value: "burst5", label: "Burst ×5" },
            { value: "burst20", label: "Burst ×20" },
          ]}
        />
      </div>
    </div>
  );
}
