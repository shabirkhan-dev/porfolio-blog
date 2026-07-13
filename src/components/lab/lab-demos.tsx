"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ActionSwapButton } from "@/components/motion/action-swap";
import { CountUp } from "@/components/count-up";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ButtonSystemDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-5">
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="subtle">Subtle</Button>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="primary" size="sm">
          Small
        </Button>
        <Button variant="primary" size="md">
          Medium
        </Button>
        <Button variant="primary" size="lg">
          Large
        </Button>
      </div>
    </div>
  );
}

export function MagneticCtaDemo() {
  return (
    <Magnetic strength={0.28}>
      <Button variant="primary" size="lg">
        Pull toward the cursor
        <ArrowUpRight aria-hidden size={15} />
      </Button>
    </Magnetic>
  );
}

export function CountUpMetricsDemo() {
  return (
    <div className="grid w-full max-w-xl gap-6 sm:grid-cols-3">
      {[
        { value: "100k+", label: "users served" },
        { value: "50%", label: "lighter payloads" },
        { value: "35%", label: "faster loads" },
      ].map((item) => (
        <div key={item.label} className="text-center sm:text-left">
          <p className="font-display text-3xl font-semibold tracking-tight text-accent">
            <CountUp value={item.value} />
          </p>
          <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ActionSwapDemo() {
  return (
    <ActionSwapButton
      variant="outline"
      animation="roll"
      cycle
      items={[
        { id: "idle", label: "Save draft" },
        { id: "busy", label: "Saving…" },
        { id: "done", label: "Saved" },
      ]}
    />
  );
}

export function FailureStatesDemo() {
  const [mode, setMode] = useState<"loading" | "empty" | "error">("empty");

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["loading", "empty", "error"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={cn(
              "border px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] transition-colors",
              mode === id
                ? "border-accent bg-accent/[0.1] text-accent"
                : "border-border text-faint hover:text-foreground",
            )}
          >
            {id}
          </button>
        ))}
      </div>

      <div className="border border-border bg-background px-5 py-8 text-center">
        {mode === "loading" ? (
          <>
            <div className="mx-auto h-2 w-24 animate-pulse rounded-full bg-border" />
            <div className="mx-auto mt-3 h-2 w-40 animate-pulse rounded-full bg-border" />
            <p className="mt-5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
              Loading layout preserved
            </p>
          </>
        ) : null}
        {mode === "empty" ? (
          <>
            <p className="font-display text-lg font-semibold tracking-tight">
              Nothing here yet
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Create the first record to unlock this view.
            </p>
            <button
              type="button"
              className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent"
            >
              Add record
            </button>
          </>
        ) : null}
        {mode === "error" ? (
          <>
            <p className="font-display text-lg font-semibold tracking-tight">
              Couldn&apos;t save
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Your draft is still here. Check the connection and try again.
            </p>
            <button
              type="button"
              className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent"
            >
              Retry
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export function FieldStatesDemo() {
  const [state, setState] = useState<"idle" | "error" | "success">("idle");

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["idle", "error", "success"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setState(id)}
            className={cn(
              "border px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] transition-colors",
              state === id
                ? "border-accent bg-accent/[0.1] text-accent"
                : "border-border text-faint hover:text-foreground",
            )}
          >
            {id}
          </button>
        ))}
      </div>

      <label className="block">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
          Work email
        </span>
        <input
          key={state}
          defaultValue={
            state === "error" ? "not-an-email" : "you@studio.com"
          }
          aria-invalid={state === "error"}
          className={cn(
            "mt-2 h-11 w-full border bg-background px-3 text-sm outline-none transition-colors",
            state === "error"
              ? "border-red-400/60 focus:border-red-400"
              : state === "success"
                ? "border-accent/50 focus:border-accent"
                : "border-border focus:border-accent/50",
          )}
        />
        {state === "error" ? (
          <p className="mt-2 text-sm text-red-400">Enter a valid email.</p>
        ) : null}
        {state === "success" ? (
          <p className="mt-2 text-sm text-accent">Looks good.</p>
        ) : null}
      </label>
    </div>
  );
}
