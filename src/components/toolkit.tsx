"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  iconName: StackIconName;
  items: string[];
};

export function Toolkit({ groups }: { groups: StackGroup[] }) {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const current = groups[active];
  const ActiveIcon = iconRegistry[current.iconName];

  return (
    <div className="mt-16">
      {/* ---------------- Desktop: list + detail panel ---------------- */}
      <div className="hidden overflow-hidden rounded-2xl border border-border lg:grid lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: interactive index */}
        <div className="border-r border-border">
          {groups.map((group, index) => {
            const isActive = index === active;
            return (
              <button
                key={group.title}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                className={cn(
                  "group/row relative flex w-full items-center gap-5 px-7 py-5 text-left transition-colors duration-300 active:scale-[0.99]",
                  index !== 0 && "border-t border-border",
                  isActive ? "bg-background-2" : "hover:bg-background-2/60",
                )}
              >
                {/* active accent rail */}
                <span
                  className={cn(
                    "absolute left-0 top-0 h-full w-[2px] origin-top bg-accent transition-transform duration-300",
                    isActive ? "scale-y-100" : "scale-y-0",
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums transition-colors duration-300",
                    isActive ? "text-accent" : "text-faint",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-display text-2xl font-semibold tracking-tight transition-all duration-300",
                    isActive
                      ? "translate-x-1 text-foreground"
                      : "text-muted-foreground group-hover/row:translate-x-1 group-hover/row:text-foreground",
                  )}
                >
                  {group.title}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={18}
                  className={cn(
                    "ml-auto transition-all duration-300",
                    isActive
                      ? "translate-x-0 text-accent opacity-100"
                      : "-translate-x-2 text-faint opacity-0 group-hover/row:translate-x-0 group-hover/row:opacity-100",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Right: animated detail panel */}
        <div className="relative min-h-[24rem] overflow-hidden bg-background-2/40">
          <div className="pointer-events-none absolute inset-0 hairline-grid opacity-50 [mask-image:radial-gradient(120%_100%_at_100%_0%,black,transparent_75%)]" />
          {/* giant ghost numeral */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-10 select-none font-display text-[12rem] font-semibold leading-none text-foreground/[0.035]"
          >
            {String(active + 1).padStart(2, "0")}
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full flex-col p-9"
            >
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl border border-accent/30 bg-accent/[0.08] text-accent">
                  <ActiveIcon aria-hidden="true" size={22} />
                </span>
                <div className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint">
                  Capability
                  <br />
                  <span className="text-muted-foreground">
                    {String(active + 1).padStart(2, "0")} / {String(groups.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <h3 className="mt-7 font-display text-[clamp(2rem,1.5rem+1.5vw,2.75rem)] font-semibold tracking-tight">
                {current.title}
              </h3>
              <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
                {current.description}
              </p>

              <div className="mt-auto pt-8">
                <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                  {current.items.length} tools in rotation
                </p>
                <div className="flex flex-wrap gap-2">
                  {current.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.08] px-3.5 py-1.5 font-mono text-[0.72rem] text-accent transition-colors duration-300 hover:border-accent/50 hover:bg-accent/[0.14]"
                    >
                      <span className="size-1 rounded-full bg-accent" />
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ---------------- Mobile: accordion ---------------- */}
      <div className="overflow-hidden rounded-2xl border border-border lg:hidden">
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
                className="flex w-full items-center gap-4 px-5 py-5 text-left transition-transform active:scale-[0.99]"
              >
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums",
                    isOpen ? "text-accent" : "text-faint",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border text-accent">
                  <Icon aria-hidden="true" size={17} />
                </span>
                <span className="font-display text-xl font-semibold tracking-tight">
                  {group.title}
                </span>
                <Plus
                  aria-hidden="true"
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
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6">
                      <p className="text-sm leading-7 text-muted-foreground">
                        {group.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.08] px-3 py-1 font-mono text-[0.7rem] text-accent"
                          >
                            <span className="size-1 rounded-full bg-accent" />
                            {item}
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
