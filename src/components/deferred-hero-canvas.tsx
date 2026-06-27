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

export function DeferredHeroCanvas({ className }: DeferredHeroCanvasProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (
        cb: IdleRequestCallback,
        opts?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setReady(true), {
        timeout: 1500,
      });
      return () => win.cancelIdleCallback?.(id);
    }

    const id = window.setTimeout(() => setReady(true), 300);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) {
    return <div className={className} aria-hidden="true" />;
  }

  return <HeroCanvas className={className} />;
}
