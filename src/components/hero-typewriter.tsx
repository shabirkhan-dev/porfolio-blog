"use client";

import { useEffect, useState } from "react";
import { HERO_BUILD_PHRASES } from "@/components/hero-phrases";

type Phase = "typing" | "holding" | "deleting";

/**
 * Takes over the server-rendered phrase after the LCP window.
 * Returns null until armed so the static sibling remains the LCP node.
 */
export function HeroBuildTypewriter({
  phrases = HERO_BUILD_PHRASES,
  holdMs = 2400,
  gapMs = 320,
  typeMs = 42,
  deleteMs = 28,
}: {
  phrases?: readonly string[];
  holdMs?: number;
  gapMs?: number;
  typeMs?: number;
  deleteMs?: number;
}) {
  const list =
    Array.isArray(phrases) && phrases.length > 0
      ? phrases
      : HERO_BUILD_PHRASES;

  const first = list[0]!;

  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(first.length);
  const [phase, setPhase] = useState<Phase>("holding");
  const [reduced, setReduced] = useState(false);

  const current = list[index % list.length] ?? first;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const arm = () => {
      const staticNode = document.querySelector("[data-hero-static-phrase]");
      if (staticNode instanceof HTMLElement) {
        staticNode.hidden = true;
      }
      setActive(true);
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
      window.removeEventListener("scroll", arm);
    };

    // Only after interaction — a timed swap becomes a late LCP candidate.
    window.addEventListener("pointerdown", arm, { once: true, passive: true });
    window.addEventListener("keydown", arm, { once: true });
    window.addEventListener("scroll", arm, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
      window.removeEventListener("scroll", arm);
    };
  }, [reduced]);

  useEffect(() => {
    if (!active || reduced) return;

    if (phase === "typing") {
      if (charIndex < current.length) {
        const id = window.setTimeout(
          () => setCharIndex((c: number) => c + 1),
          typeMs,
        );
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
      const id = window.setTimeout(
        () => setCharIndex((c: number) => c - 1),
        deleteMs,
      );
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      setIndex((i: number) => (i + 1) % list.length);
      setCharIndex(0);
      setPhase("typing");
    }, gapMs);
    return () => window.clearTimeout(id);
  }, [
    active,
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

  if (!active || reduced) return null;

  const shown = current.slice(0, charIndex);

  return (
    <span className="absolute inset-0" aria-live="polite" aria-label={current}>
      {shown}
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[0.85em] w-[0.08em] translate-y-[0.08em] bg-accent align-baseline motion-safe:animate-pulse"
      />
    </span>
  );
}
