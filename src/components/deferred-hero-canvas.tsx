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
 * Decorative WebGL stays off the LCP path. Loads after first interaction,
 * or on a late idle timeout as a fallback.
 */
export function DeferredHeroCanvas({ className }: DeferredHeroCanvasProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let idleId = 0;
    let timeoutId = 0;
    let done = false;

    const activate = () => {
      if (done) return;
      done = true;
      setReady(true);
      cleanup();
    };

    const win = window as Window & {
      requestIdleCallback?: (
        cb: IdleRequestCallback,
        opts?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const onInteract = () => activate();

    const cleanup = () => {
      win.cancelIdleCallback?.(idleId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("scroll", onInteract);
    };

    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    window.addEventListener("keydown", onInteract, { once: true });
    window.addEventListener("scroll", onInteract, { once: true, passive: true });

    if (win.requestIdleCallback) {
      idleId = win.requestIdleCallback(activate, { timeout: 12000 });
    } else {
      timeoutId = window.setTimeout(activate, 8000);
    }

    return cleanup;
  }, []);

  if (!ready) {
    return <div className={className} aria-hidden="true" />;
  }

  return <HeroCanvas className={className} />;
}
