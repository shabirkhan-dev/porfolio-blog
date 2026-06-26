"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/blog") return pathname.startsWith("/blog");
  if (href.startsWith("/#")) return false;
  return pathname === href;
}

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden items-center gap-1 md:flex"
    >
      {items.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative px-3.5 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-200",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
            <span
              className={cn(
                "pointer-events-none absolute inset-x-3.5 bottom-1 h-px origin-left bg-accent transition-transform duration-300",
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNavLinks({
  items,
  onNavigate,
}: {
  items: NavItem[];
  onNavigate: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Mobile navigation" className="grid gap-1">
      {items.map((item, index) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "flex items-baseline justify-between rounded-xl px-4 py-3 font-display text-2xl tracking-tight transition-colors",
              active
                ? "text-accent"
                : "text-foreground hover:text-accent",
            )}
          >
            {item.label}
            <span className="font-mono text-xs text-muted-foreground">
              0{index + 1}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
