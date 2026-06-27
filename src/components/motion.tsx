"use client";

import { m, type MotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = React.HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    delay?: number;
  };

export function Reveal({ className, delay = 0, children, ...props }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </m.div>
  );
}

const lineVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

type WordRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
};

export function WordReveal({
  text,
  className,
  as = "h1",
  delay = 0,
}: WordRevealProps) {
  const Tag = m[as];
  const words = text.split(" ");

  return (
    <Tag
      variants={lineVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delayChildren: delay }}
      className={cn("flex flex-wrap", className)}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.25em] inline-flex overflow-hidden pb-[0.12em] last:mr-0"
        >
          <m.span variants={wordVariants} className="inline-block">
            {word}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}

export function GentleLift({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & MotionProps) {
  return (
    <m.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </m.div>
  );
}
