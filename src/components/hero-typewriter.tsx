"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type HeroHeadline = {
  lines: string[];
  /** Optional substring in the last line rendered in accent color. */
  accent?: string;
};

export const DEFAULT_HERO_HEADLINES: HeroHeadline[] = [
  {
    lines: ["Calm UI.", "Hard systems."],
    accent: "systems.",
  },
  {
    lines: ["Clear interfaces.", "Quiet power."],
    accent: "power.",
  },
  {
    lines: ["Software that", "holds under change."],
    accent: "change.",
  },
];

type HeroTypewriterProps = {
  headlines?: HeroHeadline[];
  className?: string;
  holdMs?: number;
  gapMs?: number;
  typeMs?: number;
  deleteMs?: number;
};

type Phase = "typing" | "holding" | "deleting";

function accentedSlice(headline: HeroHeadline, lineIndex: number, shown: string) {
  const accent = headline.accent;
  const last = (headline.lines?.length ?? 0) - 1;
  if (!accent || lineIndex !== last || !shown.includes(accent)) return shown;
  const at = shown.lastIndexOf(accent);
  return (
    <>
      {shown.slice(0, at)}
      <span className="text-accent">{shown.slice(at)}</span>
    </>
  );
}

/**
 * Cycles headlines with type/delete motion inside a reserved box so
 * surrounding layout never jumps — text expands and shrinks in place.
 */
export function HeroTypewriter({
  headlines = DEFAULT_HERO_HEADLINES,
  className,
  holdMs = 2200,
  gapMs = 280,
  typeMs = 36,
  deleteMs = 22,
}: HeroTypewriterProps) {
  const list =
    Array.isArray(headlines) && headlines.length > 0
      ? headlines
      : DEFAULT_HERO_HEADLINES;

  const slotCount = useMemo(
    () => Math.max(1, ...list.map((h) => h.lines.length)),
    [list],
  );
  const maxChars = useMemo(
    () => Math.max(1, ...list.flatMap((h) => h.lines.map((l) => l.length))),
    [list],
  );

  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [reduced, setReduced] = useState(false);

  const safeIndex = headlineIndex % list.length;
  const current = list[safeIndex] ?? list[0]!;
  const display = reduced ? list[0]! : current;
  const lines = display.lines ?? [];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || list.length === 0) return;

    const line = current.lines[lineIndex] ?? "";

    if (phase === "typing") {
      if (charIndex < line.length) {
        const id = window.setTimeout(() => setCharIndex((c) => c + 1), typeMs);
        return () => window.clearTimeout(id);
      }
      if (lineIndex < current.lines.length - 1) {
        const id = window.setTimeout(() => {
          setLineIndex((l) => l + 1);
          setCharIndex(0);
        }, 140);
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
    if (lineIndex > 0) {
      const prev = current.lines[lineIndex - 1] ?? "";
      const id = window.setTimeout(() => {
        setLineIndex((l) => l - 1);
        setCharIndex(prev.length);
      }, deleteMs);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      setHeadlineIndex((i) => (i + 1) % list.length);
      setLineIndex(0);
      setCharIndex(0);
      setPhase("typing");
    }, gapMs);
    return () => window.clearTimeout(id);
  }, [
    charIndex,
    current.lines,
    deleteMs,
    gapMs,
    holdMs,
    lineIndex,
    list.length,
    phase,
    reduced,
    typeMs,
  ]);

  const visibleFor = (index: number) => {
    if (reduced) return lines[index] ?? "";
    if (index > lineIndex) return "";
    if (index < lineIndex) return current.lines[index] ?? "";
    return (current.lines[index] ?? "").slice(0, charIndex);
  };

  return (
    <h1
      className={cn("t-display", className)}
      aria-live="polite"
      aria-label={lines.join(" ")}
      style={{
        width: `min(100%, ${maxChars}ch)`,
        height: `calc(${slotCount} * 1.05em)`,
      }}
    >
      {Array.from({ length: slotCount }, (_, index) => {
        const shown = visibleFor(index);
        return (
          <span
            key={index}
            className="block h-[1.05em] overflow-hidden whitespace-nowrap"
          >
            {shown ? accentedSlice(display, index, shown) : "\u00A0"}
          </span>
        );
      })}
    </h1>
  );
}
