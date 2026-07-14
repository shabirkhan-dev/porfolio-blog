"use client";

import { CipherDeck } from "@/components/lab/experiments/cipher-deck";
import { IronField } from "@/components/lab/experiments/iron-field";
import { RequestFlow } from "@/components/lab/experiments/request-flow/request-flow";
import { SignalRadar } from "@/components/lab/experiments/signal-radar";
import type { SourceFileEntry } from "@/components/lab/experiments/request-flow/request-flow.types";

export function IronFieldDemo({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "relative h-full min-h-[14rem] w-full overflow-hidden bg-background"
          : "relative h-[min(28rem,70vh)] w-full overflow-hidden border border-border bg-background"
      }
    >
      <IronField className="absolute inset-0 h-full w-full" />
      {!compact ? (
        <p className="pointer-events-none absolute bottom-4 left-4 right-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
          <span className="sm:hidden">Tap or drag the field</span>
          <span className="hidden sm:inline">Move pointer · tap · press Enter</span>
        </p>
      ) : null}
    </div>
  );
}

export function CipherDeckDemo({ compact = false }: { compact?: boolean }) {
  return <CipherDeck compact={compact} />;
}

export function SignalRadarDemo({ compact = false }: { compact?: boolean }) {
  return <SignalRadar compact={compact} />;
}

export function RequestFlowDemo({
  compact = false,
  sourceFiles = [],
}: {
  compact?: boolean;
  sourceFiles?: SourceFileEntry[];
}) {
  return (
    <div
      className={
        compact
          ? "relative h-full min-h-[14rem] w-full overflow-hidden bg-background"
          : "relative w-full overflow-hidden border border-border bg-background"
      }
    >
      <RequestFlow compact={compact} sourceFiles={sourceFiles} />
    </div>
  );
}

export const labDemoMap = {
  "request-flow": RequestFlowDemo,
  "iron-field": IronFieldDemo,
  "cipher-deck": CipherDeckDemo,
  "signal-radar": SignalRadarDemo,
} as const;
