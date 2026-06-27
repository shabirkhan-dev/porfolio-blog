"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonials({
  items,
  title = "Testimonials",
  duration = 6500,
}: {
  items: Testimonial[];
  title?: string;
  duration?: number;
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const count = items.length;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const y = useSpring(mouseY, { damping: 25, stiffness: 200 });
  const numberX = useTransform(x, [-220, 220], [-22, 22]);
  const numberY = useTransform(y, [-220, 220], [-12, 12]);

  // Auto-advance; resets whenever the active index changes (incl. manual nav).
  useEffect(() => {
    if (count <= 1) return;
    const t = window.setTimeout(
      () => setActive((i) => (i + 1) % count),
      duration,
    );
    return () => window.clearTimeout(t);
  }, [active, count, duration]);

  if (count === 0) return null;

  const current = items[active];
  const paddedIndex = String(active + 1).padStart(2, "0");
  const progressHeight = `${((active + 1) / count) * 100}%`;

  const goNext = () => setActive((i) => (i + 1) % count);
  const goPrev = () => setActive((i) => (i - 1 + count) % count);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const wordVariants: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 22, rotateX: 90 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: { duration: 0.5, delay: i * 0.045, ease: EASE },
        }),
        exit: (i: number) => ({
          opacity: 0,
          y: -10,
          transition: { duration: 0.2, delay: i * 0.015 },
        }),
      };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative mx-auto w-full max-w-5xl overflow-hidden px-[var(--gutter)]"
    >
      {/* Oversized parallax index */}
      <motion.div
        aria-hidden="true"
        style={{ x: numberX, y: numberY }}
        className="pointer-events-none absolute -left-2 top-1/2 z-0 -translate-y-1/2 select-none font-display text-[clamp(9rem,28vw,22rem)] font-bold leading-none tracking-tighter text-foreground/[0.05]"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            className="block"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {paddedIndex}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex">
        {/* Left rail */}
        <div className="hidden flex-col items-center justify-center border-r border-border pr-10 md:flex lg:pr-16">
          <span
            className="font-mono text-[0.66rem] uppercase tracking-[0.28em] text-muted-foreground"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {title}
          </span>
          <div className="relative mt-8 h-32 w-px bg-border">
            <motion.div
              className="absolute left-0 top-0 w-full origin-top bg-accent"
              animate={{ height: progressHeight }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        </div>

        {/* Center */}
        <div className="relative flex-1 py-10 md:pl-10 lg:pl-16">
          {/* Company badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent" />
                {current.company}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Quote */}
          <div className="relative mb-12 min-h-[9rem] [perspective:900px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="font-display text-[clamp(1.6rem,1.1rem+2.4vw,3rem)] font-light leading-[1.15] tracking-tight text-foreground"
              >
                {current.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={`${active}-${i}`}
                    custom={i}
                    variants={wordVariants}
                    className="mr-[0.28em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Author + nav */}
          <div className="flex items-end justify-between gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <motion.div
                  className="h-px w-8 origin-left bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                />
                <div>
                  <p className="font-display text-base font-semibold tracking-tight text-foreground">
                    {current.author}
                  </p>
                  <p className="text-sm text-muted-foreground">{current.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-3">
              <NavButton label="Previous testimonial" onClick={goPrev}>
                <ArrowLeft size={17} />
              </NavButton>
              <NavButton label="Next testimonial" onClick={goNext}>
                <ArrowRight size={17} />
              </NavButton>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-10 flex gap-1">
            {items.map((item, i) => (
              <button
                key={item.author}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className="group/dot flex size-11 items-center justify-center"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-8 bg-accent"
                      : "w-3 bg-border-strong group-hover/dot:bg-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom company ticker */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden opacity-[0.06]">
        <motion.div
          className="flex whitespace-nowrap font-display text-5xl font-bold tracking-tight"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((dup) => (
            <span key={dup} className="flex">
              {items.map((t) => (
                <span key={`${dup}-${t.author}`} className="mx-6">
                  {t.company} •
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function NavButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="group relative grid size-12 place-items-center overflow-hidden rounded-full border border-border-strong"
    >
      <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-300 ease-out group-hover:translate-y-0" />
      <span className="relative z-10 text-foreground transition-colors duration-300 group-hover:text-accent-foreground">
        {children}
      </span>
    </motion.button>
  );
}
