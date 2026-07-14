"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { formatTraceTime } from "./simulation-engine";
import { STAGE_LABELS, type TraceEntry } from "./request-flow.types";

const STATUS_LABEL: Record<TraceEntry["status"], string> = {
  ok: "OK",
  warn: "Warn",
  error: "Error",
  info: "Info",
  skip: "Skip",
  cancel: "Cancel",
};

export function TracePanel({
  entries,
  activeId,
  burstCount = 1,
}: {
  entries: TraceEntry[];
  activeId: string | null;
  burstCount?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);
  const lastLength = useRef(0);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    userScrolledUp.current = distanceFromBottom > 48;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (entries.length > lastLength.current && !userScrolledUp.current) {
      el.scrollTop = el.scrollHeight;
    }
    lastLength.current = entries.length;
  }, [entries]);

  useEffect(() => {
    if (entries.length === 0) {
      userScrolledUp.current = false;
    }
  }, [entries.length]);

  return (
    <section aria-label="Live trace" className="border border-border bg-background-2">
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2 sm:px-4">
        <h3 className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
          Live trace
        </h3>
        {burstCount > 1 ? (
          <span className="font-mono text-[0.54rem] uppercase tracking-[0.12em] text-accent">
            {burstCount} requests
          </span>
        ) : null}
      </div>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="max-h-[min(16rem,40vh)] overflow-y-auto overscroll-contain font-mono text-[0.72rem] leading-6 sm:max-h-[18rem] sm:text-[0.76rem]"
        tabIndex={0}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {entries.length === 0 ? (
          <p className="px-3 py-4 text-muted-foreground sm:px-4">
            Send a request to populate the trace.
          </p>
        ) : (
          <table className="w-full min-w-[28rem] border-collapse">
            <thead className="sticky top-0 bg-background-2">
              <tr className="border-b border-border text-left text-[0.56rem] uppercase tracking-[0.12em] text-faint">
                <th className="px-3 py-2 font-normal sm:px-4">Time</th>
                <th className="px-2 py-2 font-normal">Stage</th>
                <th className="px-2 py-2 font-normal">Event</th>
                <th className="px-2 py-2 font-normal">Status</th>
                <th className="px-3 py-2 text-right font-normal sm:px-4">Latency</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const active = entry.id === activeId;
                return (
                  <tr
                    key={entry.id}
                    className={cn(
                      "border-b border-border/60 transition-colors",
                      active && "bg-accent/10",
                    )}
                    aria-current={active ? "true" : undefined}
                  >
                    <td className="whitespace-nowrap px-3 py-1.5 tabular-nums text-muted-foreground sm:px-4">
                      {formatTraceTime(entry.timestampMs)}
                    </td>
                    <td className="whitespace-nowrap px-2 py-1.5 text-foreground">
                      {STAGE_LABELS[entry.stage]}
                    </td>
                    <td className="px-2 py-1.5 text-foreground">{entry.event}</td>
                    <td className="px-2 py-1.5">
                      <span
                        className={cn(
                          "inline-flex border px-1.5 py-0.5 text-[0.56rem] uppercase tracking-[0.1em]",
                          entry.status === "error" || entry.status === "cancel"
                            ? "border-destructive/40 text-destructive"
                            : entry.status === "warn"
                              ? "border-accent/40 text-accent"
                              : entry.status === "skip"
                                ? "border-border text-faint"
                                : "border-border text-muted-foreground",
                        )}
                      >
                        {STATUS_LABEL[entry.status]}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-1.5 text-right tabular-nums text-muted-foreground sm:px-4">
                      {entry.stageLatencyMs != null ? `${entry.stageLatencyMs}ms` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
