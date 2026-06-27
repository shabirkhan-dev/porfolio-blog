"use client";

import { Moon, Sun } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useSyncExternalStore, type MouseEvent } from "react";
import { ActionSwapIcon } from "@/components/motion/action-swap";
import { cn } from "@/lib/utils";

export type ThemeVariant = "rectangle" | "circle" | "circle-blur";

export type RectStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "bottom-up";

type Theme = "light" | "dark";

const VT_STYLE_ID = "beui-theme-toggle-vt";

// Duration/easing is component-specific: the View Transition API uses CSS, not
// motion springs. Timings mirror native OS mode-switch feel.
const VT_CSS = `
html[data-beui-vt="rect"]::view-transition-old(root) {
  animation: none;
  mix-blend-mode: normal;
}
html[data-beui-vt="rect"]::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: beui-rect-reveal 400ms ease-out;
}
html[data-beui-vt="circle"]::view-transition-old(root),
html[data-beui-vt="circle-blur"]::view-transition-old(root) {
  animation: none;
  mix-blend-mode: normal;
}
html[data-beui-vt="circle"]::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: beui-circle-reveal 700ms cubic-bezier(0.4, 0, 0.2, 1);
}
html[data-beui-vt="circle-blur"]::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: beui-circle-blur-reveal 700ms cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes beui-rect-reveal {
  from { clip-path: var(--beui-vt-from, inset(100% 0 0 0)); }
  to   { clip-path: inset(0 0 0 0); }
}
@keyframes beui-circle-reveal {
  from { clip-path: circle(0% at var(--beui-vt-origin, 50% 100%)); }
  to   { clip-path: circle(150% at var(--beui-vt-origin, 50% 100%)); }
}
@keyframes beui-circle-blur-reveal {
  from { clip-path: circle(0% at var(--beui-vt-origin, 50% 100%)); filter: blur(8px); }
  to   { clip-path: circle(150% at var(--beui-vt-origin, 50% 100%)); filter: blur(0px); }
}
`;

const RECT_FROM: Record<RectStart, string> = {
  "top-left": "inset(0 100% 100% 0)",
  "top-right": "inset(0 0 100% 100%)",
  "bottom-left": "inset(100% 100% 0 0)",
  "bottom-right": "inset(100% 0 0 100%)",
  center: "inset(50% 50% 50% 50%)",
  "bottom-up": "inset(100% 0 0 0)",
};

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  try {
    window.localStorage.setItem("theme", theme);
  } catch {}
}

type ToggleOptions = { variant?: ThemeVariant; start?: RectStart };

function subscribeToTheme(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getIsDark() {
  return !document.documentElement.classList.contains("light");
}

export function useThemeToggle({
  variant = "circle-blur",
  start = "bottom-up",
}: ToggleOptions = {}) {
  const reduce = useReducedMotion() ?? false;
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getIsDark,
    () => true,
  );

  useEffect(() => {
    if (document.getElementById(VT_STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = VT_STYLE_ID;
    el.textContent = VT_CSS;
    document.head.appendChild(el);
  }, []);

  const toggle = (event?: MouseEvent) => {
    const next: Theme = isDark ? "light" : "dark";

    const supportsVT =
      typeof document !== "undefined" && "startViewTransition" in document;

    if (reduce || !supportsVT) {
      const root = document.documentElement;
      root.classList.add("theme-transition");
      applyTheme(next);
      window.setTimeout(() => root.classList.remove("theme-transition"), 500);
      return;
    }

    const root = document.documentElement;

    if (variant === "rectangle") {
      root.style.setProperty("--beui-vt-from", RECT_FROM[start]);
      root.dataset.beuiVt = "rect";
    } else {
      // Emanate from the pointer when available, otherwise the default origin.
      if (event) {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;
        root.style.setProperty("--beui-vt-origin", `${x}% ${y}%`);
      }
      root.dataset.beuiVt = variant;
    }

    const vt = (
      document as Document & {
        startViewTransition(cb: () => void): { finished: Promise<void> };
      }
    ).startViewTransition(() => applyTheme(next));

    vt.finished.finally(() => {
      delete root.dataset.beuiVt;
    });
  };

  return { isDark: mounted && isDark, mounted, toggle };
}

export function ThemeToggle({
  variant = "circle-blur",
  start = "bottom-up",
  className,
  iconClassName = "size-[17px]",
}: {
  variant?: ThemeVariant;
  start?: RectStart;
  className?: string;
  iconClassName?: string;
}) {
  const { isDark, mounted, toggle } = useThemeToggle({ variant, start });

  return (
    <button
      type="button"
      aria-label={
        !mounted
          ? "Toggle theme"
          : isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
      }
      onClick={toggle}
      className={cn(
        "group relative grid min-h-11 min-w-11 place-items-center overflow-hidden rounded-full border border-border-strong text-foreground transition-colors hover:border-accent hover:text-accent",
        className,
      )}
    >
      {mounted ? (
        <ActionSwapIcon value={isDark ? "dark" : "light"} animation="blur">
          {isDark ? (
            <Sun aria-hidden="true" className={iconClassName} />
          ) : (
            <Moon aria-hidden="true" className={iconClassName} />
          )}
        </ActionSwapIcon>
      ) : (
        <Sun aria-hidden="true" className={iconClassName} />
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
