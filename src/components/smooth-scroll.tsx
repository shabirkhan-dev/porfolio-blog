"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/**
 * Inertial smooth scrolling via Lenis. Loaded after idle so it stays off the
 * critical path. Disabled for reduced-motion users and touch devices.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let lenis: Lenis | undefined;
    let cancelled = false;
    let idleId = 0;
    let timeoutId = 0;

    const start = () => {
      void import("lenis").then(({ default: LenisCtor }) => {
        if (cancelled) return;
        lenis = new LenisCtor({
          autoRaf: true,
          anchors: true,
          lerp: 0.12,
        });
      });
    };

    const win = window as Window & {
      requestIdleCallback?: (
        cb: IdleRequestCallback,
        opts?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (win.requestIdleCallback) {
      idleId = win.requestIdleCallback(start, { timeout: 10000 });
    } else {
      timeoutId = window.setTimeout(start, 5000);
    }

    return () => {
      cancelled = true;
      win.cancelIdleCallback?.(idleId);
      window.clearTimeout(timeoutId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
