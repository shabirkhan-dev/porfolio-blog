"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Cloud,
  Code2,
  Database,
  PenLine,
  Plus,
  Smartphone,
  TerminalSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Corners } from "@/components/corners";
import type { StackIconName } from "@/data/site";
import { cn } from "@/lib/utils";

const iconRegistry: Record<StackIconName, LucideIcon> = {
  frontend: Code2,
  backend: TerminalSquare,
  mobile: Smartphone,
  database: Database,
  devops: Cloud,
  ai: Bot,
  design: PenLine,
};

type StackGroup = {
  title: string;
  description: string;
  focus: string;
  iconName: StackIconName;
  items: string[];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Toolkit({ groups }: { groups: StackGroup[] }) {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const current = groups[active];
  const ActiveIcon = iconRegistry[current.iconName];
  const totalTools = groups.reduce((sum, g) => sum + g.items.length, 0);
  const progress = groups.length > 1 ? active / (groups.length - 1) : 0;

  const select = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!listRef.current?.contains(document.activeElement)) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((i) => Math.min(i + 1, groups.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (event.key === "Home") {
        event.preventDefault();
        setActive(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        setActive(groups.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [groups.length]);

  return (
    <div className="mt-10">
      {/* Meta strip */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint">
          {groups.length} capability areas · {totalTools} tools in rotation
        </p>
        <p className="hidden font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint sm:block">
          Hover or use ↑ ↓ to explore
        </p>
      </div>

      {/* Desktop console */}
      <div className="relative hidden lg:block">
        <Corners />
        <div
          ref={listRef}
          className="grid overflow-hidden rounded-lg border border-border-strong bg-background lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
        >
        {/* Left index — stretch rows to match detail panel height */}
        <div className="relative flex h-full min-h-[28rem] flex-col border-r border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-6 left-[1.65rem] top-6 w-px bg-border"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[1.65rem] top-6 w-px origin-top bg-accent"
            animate={{ scaleY: progress }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease }}
            style={{ height: "calc(100% - 3rem)" }}
          />

          {groups.map((group, index) => {
            const isActive = index === active;
            return (
              <button
                key={group.title}
                type="button"
                onMouseEnter={() => select(index)}
                onFocus={() => select(index)}
                onClick={() => select(index)}
                aria-pressed={isActive}
                className={cn(
                  "group/row relative flex w-full min-h-0 flex-1 items-center gap-5 px-7 py-4 text-left transition-colors duration-300",
                  index !== 0 && "border-t border-border",
                  isActive ? "bg-background-2" : "hover:bg-background-2/50",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 grid size-7 place-items-center rounded-sm border font-mono text-[0.62rem] tabular-nums transition-all duration-300",
                    isActive
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-background text-faint group-hover/row:border-border-strong",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-display text-2xl font-semibold tracking-tight transition-all duration-300",
                    isActive
                      ? "translate-x-0.5 text-foreground"
                      : "text-muted-foreground group-hover/row:text-foreground",
                  )}
                >
                  {group.title}
                </span>
                <ArrowUpRight
                  aria-hidden
                  size={17}
                  className={cn(
                    "ml-auto transition-all duration-300",
                    isActive
                      ? "translate-x-0 text-accent opacity-100"
                      : "-translate-x-1 text-faint opacity-0 group-hover/row:translate-x-0 group-hover/row:opacity-60",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="relative flex h-full min-h-[28rem] flex-col overflow-hidden bg-background-2/50">
          <div className="pointer-events-none absolute inset-0 hairline-grid opacity-40 [mask-image:radial-gradient(120%_100%_at_100%_0%,black,transparent_80%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_100%_0%,rgb(var(--accent-rgb)/0.12),transparent_65%)]" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
              transition={{ duration: 0.38, ease }}
              className="relative flex h-full flex-col p-8 sm:p-9"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -left-2 bottom-4 select-none font-display text-[9rem] font-semibold leading-none text-foreground/[0.03]"
              >
                {String(active + 1).padStart(2, "0")}
              </span>

              <div className="relative w-fit">
                <span className="absolute -inset-2 animate-[spin_14s_linear_infinite] rounded-lg border border-dashed border-accent/30" />
                <span className="relative grid size-14 place-items-center rounded-md border border-accent/30 bg-accent/[0.08] text-accent">
                  <ActiveIcon aria-hidden size={24} />
                </span>
              </div>

              <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent">
                Capability focus
              </p>
              <h3 className="mt-3 font-display text-[clamp(2rem,1.4rem+1.8vw,2.85rem)] font-semibold leading-[1.02] tracking-tight">
                {current.title}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
                {current.focus}
              </p>
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
                {current.description}
              </p>

              <div className="mt-auto pt-10">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                    Tools in rotation
                  </p>
                  <span className="font-mono text-[0.62rem] text-muted-foreground">
                    {current.items.length} selected
                  </span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {current.items.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.32,
                        delay: 0.08 + i * 0.05,
                        ease,
                      }}
                      className="group/pill flex items-center justify-between rounded-md border border-border bg-background/60 px-4 py-3 transition-colors duration-300 hover:border-accent/35 hover:bg-card"
                    >
                      <span className="font-mono text-[0.72rem] text-foreground">
                        {item}
                      </span>
                      <span className="size-1.5 rounded-full bg-accent opacity-40 transition-opacity group-hover/pill:opacity-100" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="overflow-hidden rounded-lg border border-border lg:hidden">
        {groups.map((group, index) => {
          const Icon = iconRegistry[group.iconName];
          const isOpen = openMobile === index;
          return (
            <div
              key={group.title}
              className={cn(index !== 0 && "border-t border-border")}
            >
              <button
                type="button"
                onClick={() => setOpenMobile(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-5 py-5 text-left"
              >
                <span
                  className={cn(
                    "grid size-7 place-items-center rounded-sm border font-mono text-[0.62rem]",
                    isOpen
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border text-faint",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border text-accent">
                  <Icon aria-hidden size={17} />
                </span>
                <span className="font-display text-xl font-semibold tracking-tight">
                  {group.title}
                </span>
                <Plus
                  aria-hidden
                  size={18}
                  className={cn(
                    "ml-auto text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-45 text-accent",
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 px-5 pb-6">
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {group.focus}
                      </p>
                      <p className="text-sm leading-7 text-muted-foreground">
                        {group.description}
                      </p>
                      <div className="grid gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="flex items-center justify-between rounded-md border border-border bg-background-2 px-4 py-3 font-mono text-[0.72rem]"
                          >
                            {item}
                            <span className="size-1.5 rounded-full bg-accent" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
