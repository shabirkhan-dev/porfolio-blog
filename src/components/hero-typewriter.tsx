"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export const HERO_BUILD_PHRASES = [
  "web applications.",
  "mobile applications.",
  "backend systems.",
  "developer tools.",
  "production platforms.",
] as const;

type Phase = "typing" | "holding" | "deleting";

type HeroBuildTypewriterProps = {
  phrases?: readonly string[];
  className?: string;
  holdMs?: number;
  gapMs?: number;
  typeMs?: number;
  deleteMs?: number;
};

/**
 * Single-line phrase rotator with a reserved width so the hero never shifts.
 */
export function HeroBuildTypewriter({
  phrases = HERO_BUILD_PHRASES,
  className,
  holdMs = 2400,
  gapMs = 320,
  typeMs = 42,
  deleteMs = 28,
}: HeroBuildTypewriterProps) {
  const list =
    Array.isArray(phrases) && phrases.length > 0
      ? phrases
      : HERO_BUILD_PHRASES;

  const longest = useMemo(
    () => Math.max(...list.map((p) => p.length)),
    [list],
  );

  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [reduced, setReduced] = useState(false);

  const current = list[index % list.length] ?? list[0]!;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;

    if (phase === "typing") {
      if (charIndex < current.length) {
        const id = window.setTimeout(() => setCharIndex((c) => c + 1), typeMs);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => setPhase("holding"), 0);
      return () => window.clearTimeout(id);
    }

    if (phase === "holding") {
      const id = window.setTimeout(() => setPhase("deleting"), holdMs);
      return () => window.clearTimeout(id);
    }

    if (charIndex > 0) {
      const id = window.setTimeout(() => setCharIndex((c) => c - 1), deleteMs);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % list.length);
      setCharIndex(0);
      setPhase("typing");
    }, gapMs);
    return () => window.clearTimeout(id);
  }, [
    charIndex,
    current.length,
    deleteMs,
    gapMs,
    holdMs,
    list.length,
    phase,
    reduced,
    typeMs,
  ]);

  const shown = reduced ? list[0]! : current.slice(0, charIndex);

  return (
    <span
      className={cn(
        "relative mt-1 block whitespace-nowrap",
        className,
      )}
      style={{ minWidth: `${longest}ch`, width: `${longest}ch` }}
      aria-live="polite"
      aria-label={reduced ? list[0] : current}
    >
      {shown}
      {!reduced ? (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[0.85em] w-[0.08em] translate-y-[0.08em] bg-accent align-baseline motion-safe:animate-pulse"
        />
      ) : null}
    </span>
  );
}
