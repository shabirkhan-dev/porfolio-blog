"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/components/theme-script";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the theme still switches for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch colour theme"
      className="-m-2 grid size-10 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors hover-capable:hover:text-foreground"
    >
      <Moon className="hidden size-6 dark:block" strokeWidth={1.5} />
      <Sun className="size-6 dark:hidden" strokeWidth={1.5} />
    </button>
  );
}
