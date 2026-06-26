"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.classList.toggle("light", theme === "light");
  window.localStorage.setItem("theme", theme);
  window.setTimeout(() => root.classList.remove("theme-transition"), 500);
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={`group relative grid size-10 place-items-center overflow-hidden rounded-full border border-border-strong text-foreground transition-colors hover:border-accent hover:text-accent ${className ?? ""}`}
    >
      {/* keep markup stable until mounted to avoid hydration mismatch */}
      <span className="sr-only">Toggle theme</span>
      {mounted ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ y: 14, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid place-items-center"
          >
            {theme === "light" ? (
              <Moon aria-hidden="true" size={17} />
            ) : (
              <Sun aria-hidden="true" size={17} />
            )}
          </motion.span>
        </AnimatePresence>
      ) : (
        <Sun aria-hidden="true" size={17} />
      )}
    </button>
  );
}

/**
 * Blocking script injected before paint to set the theme class and prevent a
 * flash of the wrong theme. Reads saved preference, falls back to system.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}if(t==='light'){document.documentElement.classList.add('light');}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
