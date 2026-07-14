"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  FileText,
  FlaskConical,
  Home,
  Mail,
  PencilLine,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
};

function useHash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const read = () => setHash(window.location.hash);
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  return hash;
}

function isActive(pathname: string, href: string, hash: string) {
  if (href === "/") return pathname === "/" && !hash;
  if (href === "/blog") return pathname.startsWith("/blog");
  if (href.startsWith("/#")) {
    return pathname === "/" && hash === href.slice(1);
  }
  return pathname === href;
}

function indexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

/** Desktop frame-index links — numbered mono strip. */
export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const hash = useHash();

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden items-center gap-0.5 lg:flex"
    >
      {items.map((item, index) => {
        const active = isActive(pathname, item.href, hash);
        const n = indexLabel(index);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative inline-flex min-h-10 items-center gap-1.5 px-2.5 py-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] transition-colors duration-200 xl:px-3",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "tabular-nums transition-colors duration-200",
                active
                  ? "text-accent"
                  : "text-faint group-hover:text-muted-foreground",
              )}
            >
              {n}
            </span>
            <span>{item.label}</span>
            <span
              className={cn(
                "pointer-events-none absolute inset-x-2.5 bottom-1 h-px origin-left bg-accent transition-transform duration-300 xl:inset-x-3",
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}

const bottomIcons: Record<string, LucideIcon> = {
  "/": Home,
  "/projects": Briefcase,
  "/blog": PencilLine,
  "/lab": FlaskConical,
  "/resume": FileText,
  "/#contact": Mail,
};

/** Primary destinations shown in the mobile bottom bar (fits one thumb row). */
export const mobileBottomItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/lab", label: "Lab" },
  { href: "/#contact", label: "Contact" },
];

/** Fixed bottom index bar for mobile / tablet. */
export function MobileBottomNav() {
  const pathname = usePathname();
  const hash = useHash();
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(
      ([entry]) => setContactInView(Boolean(entry?.isIntersecting)),
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border glass lg:hidden"
      style={{ paddingBottom: "max(0.35rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-between gap-0.5 px-2 pt-1.5">
        {mobileBottomItems.map((item) => {
          const active =
            item.href === "/#contact"
              ? pathname === "/" && contactInView
              : item.href === "/"
                ? pathname === "/" && !contactInView
                : isActive(pathname, item.href, hash);
          const Icon = bottomIcons[item.href] ?? Home;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-1 px-1 py-1.5 transition-colors",
                active
                  ? "text-accent"
                  : "text-muted-foreground active:text-foreground",
              )}
            >
              <Icon aria-hidden="true" size={18} strokeWidth={active ? 2.2 : 1.7} />
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em]">
                {item.label}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 top-0 h-px bg-accent transition-opacity",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
