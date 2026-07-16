"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type VisibleMountProps = {
  children: ReactNode;
  className?: string;
  /** Approx reserved height so layout does not jump when content mounts. */
  minHeight?: string;
  /** Start loading a bit before the block enters the viewport. */
  rootMargin?: string;
};

/**
 * Keeps heavy below-the-fold UI out of the initial route work.
 * Children mount only when the placeholder approaches the viewport.
 */
export function VisibleMount({
  children,
  className,
  minHeight = "24rem",
  rootMargin = "100px 0px",
}: VisibleMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={visible ? undefined : { minHeight }}
    >
      {visible ? children : null}
    </div>
  );
}
