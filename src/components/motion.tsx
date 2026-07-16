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

type WordRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
};

export function WordReveal({
  text,
  className,
  as: Tag = "h1",
}: WordRevealProps) {
  return <Tag className={cn(className)}>{text}</Tag>;
}

export function GentleLift({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("transition-transform duration-300 hover:-translate-y-1.5", className)} {...props}>
      {children}
    </div>
  );
}
