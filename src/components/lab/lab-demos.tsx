"use client";

import { CipherDeck } from "@/components/lab/experiments/cipher-deck";
import { IronField } from "@/components/lab/experiments/iron-field";
import { SignalRadar } from "@/components/lab/experiments/signal-radar";

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
        <p className="pointer-events-none absolute bottom-4 left-4 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-faint">
          Move pointer · filings answer
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

export const labDemoMap = {
  "iron-field": IronFieldDemo,
  "cipher-deck": CipherDeckDemo,
  "signal-radar": SignalRadarDemo,
} as const;
