"use client";

import { cn } from "@/lib/utils";

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  delay?: number;
};

/**
 * Lightweight scroll reveal — CSS only, no framer-motion on the critical path.
 */
export function Reveal({
  className,
  delay = 0,
  children,
  style,
  ...props
}: RevealProps) {
  return (
    <div
      className={cn("reveal-in", className)}
      style={{
        ...style,
        transitionDelay: delay ? `${delay}s` : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
