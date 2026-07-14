"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  HowItWorksPanel,
  RequestFlowEdgeCases,
  type EdgeCase,
} from "./request-flow-edge-cases";
import { RequestFlowSourcePanel } from "./request-flow-source";
import { StageLatencyTimeline } from "./request-flow-result";
import type { AggregateResult, SourceFileEntry } from "./request-flow.types";

type TabId = "result" | "how" | "source" | "edge";

const TABS: { id: TabId; label: string }[] = [
  { id: "result", label: "Result" },
  { id: "how", label: "How it works" },
  { id: "source", label: "Source" },
  { id: "edge", label: "Edge cases" },
];

export function RequestFlowTabs({
  result,
  sourceFiles,
  running,
  onRunEdgeCase,
}: {
  result: AggregateResult | null;
  sourceFiles: SourceFileEntry[];
  running: boolean;
  onRunEdgeCase: (edgeCase: EdgeCase) => void;
}) {
  const [tab, setTab] = useState<TabId>("result");

  return (
    <div className="overflow-hidden border border-border bg-background-2">
      <div
        className="flex flex-wrap gap-1 border-b border-border px-2 py-2 sm:px-3"
        role="tablist"
        aria-label="Request flow details"
      >
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            aria-controls={`rf-panel-${item.id}`}
            id={`rf-tab-${item.id}`}
            onClick={() => setTab(item.id)}
            className={cn(
              "min-h-11 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] transition-colors sm:min-h-9",
              tab === item.id
                ? "bg-accent text-accent-foreground"
                : "text-faint hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-5">
        {tab === "result" ? (
          <div
            id="rf-panel-result"
            role="tabpanel"
            aria-labelledby="rf-tab-result"
            className="space-y-4"
          >
            <StageLatencyTimeline result={result} />
          </div>
        ) : null}

        {tab === "how" ? (
          <div
            id="rf-panel-how"
            role="tabpanel"
            aria-labelledby="rf-tab-how"
          >
            <HowItWorksPanel />
          </div>
        ) : null}

        {tab === "source" ? (
          <div
            id="rf-panel-source"
            role="tabpanel"
            aria-labelledby="rf-tab-source"
          >
            <RequestFlowSourcePanel files={sourceFiles} />
          </div>
        ) : null}

        {tab === "edge" ? (
          <div
            id="rf-panel-edge"
            role="tabpanel"
            aria-labelledby="rf-tab-edge"
          >
            <RequestFlowEdgeCases running={running} onRunCase={onRunEdgeCase} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
