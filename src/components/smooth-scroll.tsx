"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/**
 * Inertial smooth scrolling via Lenis. Loaded lazily inside the effect so it
 * stays off the critical path. Disabled for reduced-motion users and touch
 * devices, where native scrolling is the right behavior.
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

    void import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      lenis = new LenisCtor({
        autoRaf: true,
        anchors: true,
        lerp: 0.12,
      });
    });

    return () => {
      cancelled = true;
      lenis?.destroy();
    };
  }, []);

  return null;
}
