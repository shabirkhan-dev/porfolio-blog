"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { DeferredHeroCanvas } from "@/components/deferred-hero-canvas";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProofItem = { value: string; label: string };

type HeroSectionProps = {
  lead: string;
  location: string;
  proof: ProofItem[];
};

function useLocalTime(timeZone = "Asia/Karachi") {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };
    format();
    const id = window.setInterval(format, 60_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.12 },
  },
};

const lineVariants: Variants = {
  hidden: { y: "108%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.88, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.55,
    },
  },
};

function HeroLine({
  children,
  className,
  reducedMotion,
}: {
  children: React.ReactNode;
  className?: string;
  reducedMotion: boolean;
}) {
  if (reducedMotion) {
    return <span className={cn("block", className)}>{children}</span>;
  }

  return (
    <span className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <m.span variants={lineVariants} className="block">
        {children}
      </m.span>
    </span>
  );
}

export function HeroSection({ lead, location, proof }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const localTime = useLocalTime();

  const HeadlineTag = reducedMotion ? "h1" : m.h1;

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <DeferredHeroCanvas className="absolute inset-0 -z-10 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_45%,transparent,var(--background)_85%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-background" />

      {/* Top meta */}
      <div className="shell flex items-center justify-between pt-[clamp(2rem,1rem+4vw,4rem)]">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Available — {location}
          </span>
        </div>
        <span className="hidden font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint sm:inline">
          {localTime ? `${localTime} · GMT+5` : "Islamabad · GMT+5"}
        </span>
      </div>

      {/* Headline + CTAs */}
      <div className="shell relative flex flex-1 flex-col justify-center py-20">
        <HeadlineTag
          {...(!reducedMotion && {
            variants: containerVariants,
            initial: "hidden",
            animate: "visible",
          })}
          className="t-display max-w-[16ch]"
        >
          <HeroLine reducedMotion={!!reducedMotion}>I engineer</HeroLine>
          <HeroLine reducedMotion={!!reducedMotion}>products that feel</HeroLine>
          <HeroLine reducedMotion={!!reducedMotion}>
            <span className="relative inline-block font-serif font-normal italic text-accent">
              inevitable.
              {!reducedMotion ? (
                <m.span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.72,
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full bg-accent/70"
                />
              )}
              {!reducedMotion ? (
                <m.span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-4 -inset-y-2 -z-10 rounded-full bg-accent/[0.08] blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                />
              ) : null}
            </span>
          </HeroLine>
        </HeadlineTag>

        {reducedMotion ? (
          <p className="t-lead mt-10 max-w-lg">{lead}</p>
        ) : (
          <m.p
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            className="t-lead mt-10 max-w-lg"
          >
            {lead}
          </m.p>
        )}

        {reducedMotion ? (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LinkButton href="#work" size="lg">
              View selected work
              <ArrowDownRight aria-hidden="true" size={18} />
            </LinkButton>
            <LinkButton href="/blog" variant="secondary" size="lg">
              Read the journal
            </LinkButton>
          </div>
        ) : (
          <m.div
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <LinkButton href="#work" size="lg">
              View selected work
              <ArrowDownRight
                aria-hidden="true"
                size={18}
                className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5"
              />
            </LinkButton>
            <LinkButton href="/blog" variant="secondary" size="lg">
              Read the journal
            </LinkButton>
          </m.div>
        )}
      </div>

      {/* Inline proof strip */}
      <div className="shell relative pb-14">
        {reducedMotion ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-6 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted-foreground">
            {proof.map((item, index) => (
              <span key={item.label} className="inline-flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-faint">
                    ·
                  </span>
                ) : null}
                <span>
                  <span className="text-foreground">{item.value}</span>{" "}
                  {item.label}
                </span>
              </span>
            ))}
          </div>
        ) : (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-6 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted-foreground"
          >
            {proof.map((item, index) => (
              <span key={item.label} className="inline-flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-faint">
                    ·
                  </span>
                ) : null}
                <span>
                  <span className="text-foreground">{item.value}</span>{" "}
                  {item.label}
                </span>
              </span>
            ))}
          </m.div>
        )}
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        {reducedMotion ? (
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-faint">
            Scroll
          </span>
        ) : (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-faint">
              Scroll
            </span>
            <m.span
              aria-hidden="true"
              className="block h-8 w-px origin-top bg-accent/50"
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </m.div>
        )}
      </div>
    </section>
  );
}
