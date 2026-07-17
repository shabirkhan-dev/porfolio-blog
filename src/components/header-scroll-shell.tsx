"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Client island that only toggles the sticky glass state on scroll.
 * Keeps the rest of the header tree free to be composed from the server.
 */
export function HeaderScrollShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 12);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-400",
        scrolled
          ? "glass border-b border-border"
          : "border-b border-transparent bg-transparent",
        className,
      )}
    >
      {children}
    </header>
  );
}
