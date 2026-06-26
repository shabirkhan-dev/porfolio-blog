"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { MobileNavLinks } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, profile, socials } from "@/data/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 md:hidden">
      <ThemeToggle className="size-9" />
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 place-items-center rounded-full border border-border-strong text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        {open ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-3 top-[72px] z-50 rounded-2xl border border-border-strong glass p-3 shadow-2xl shadow-black/40"
          >
            <MobileNavLinks items={navItems} onNavigate={() => setOpen(false)} />
            <a
              href={`mailto:${profile.email}`}
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-medium text-accent-foreground"
            >
              Start a project
            </a>
            <div className="mt-3 flex items-center gap-2 px-1 pt-1">
              {socials.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    onClick={() => setOpen(false)}
                    className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon aria-hidden="true" size={17} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
