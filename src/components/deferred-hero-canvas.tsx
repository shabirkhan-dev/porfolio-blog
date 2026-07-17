"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroCanvas = dynamic(
  () =>
    import("@/components/hero-canvas").then((m) => ({ default: m.HeroCanvas })),
  { ssr: false },
);

type DeferredHeroCanvasProps = {
  className?: string;
};

/**
 * Decorative canvas stays off the LCP path. Loads only after user interaction.
 */
export function DeferredHeroCanvas({ className }: DeferredHeroCanvasProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let done = false;

    const activate = () => {
      if (done) return;
      done = true;
      setReady(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("keydown", activate);
      window.removeEventListener("scroll", activate);
    };

    window.addEventListener("pointerdown", activate, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", activate, { once: true });
    window.addEventListener("scroll", activate, { once: true, passive: true });

    return cleanup;
  }, []);

  if (!ready) {
    return <div className={className} aria-hidden="true" />;
  }

  return <HeroCanvas className={className} />;
}
