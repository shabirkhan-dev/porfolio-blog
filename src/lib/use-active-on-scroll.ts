"use client";

import { useEffect, useRef, useState } from "react";

/**
 * On touch / no-hover devices, marks an element "active" while it sits near the
 * vertical center of the viewport. This lets mobile mirror the hover affordances
 * that desktop gets for free, so cards "light up" as you scroll past them.
 *
 * On devices with a real hover capability it stays inert (returns active=false)
 * so the normal :hover styles remain in charge.
 */
export function useActiveOnScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only drive the active state where hover doesn't exist.
    if (window.matchMedia("(hover: hover)").matches) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setActive(entry.isIntersecting);
        }
      },
      // A tall dead-zone top and bottom means only the item crossing the
      // middle band of the screen is considered active.
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, active };
}
