"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";
import { DesktopNav } from "@/components/site-nav";
import { Magnetic } from "@/components/magnetic";
import { ThemeToggle } from "@/components/theme-toggle";
import { LinkButton } from "@/components/ui/button";
import { navItems, profile } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 16);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-500",
        scrolled ? "border-b border-transparent" : "glass border-b border-border/60",
      )}
    >
      <div
        className="mx-auto w-full transition-[max-width] duration-500 ease-out"
        style={{
          maxWidth: scrolled ? "58rem" : "var(--maxw)",
          paddingInline: "var(--gutter)",
        }}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-500 ease-out",
            scrolled
              ? "mt-3 min-h-[3.25rem] rounded-full border border-border-strong glass-strong pl-3 pr-2 [box-shadow:var(--header-shadow)]"
              : "min-h-16",
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Shabir Khan home"
          >
            <span
              className={cn(
                "grid place-items-center rounded-md bg-accent font-display font-bold text-accent-foreground transition-all duration-500 group-hover:rotate-90",
                scrolled ? "size-7 text-[0.7rem]" : "size-8 text-xs",
              )}
            >
              {profile.initials}
            </span>
            <span
              className={cn(
                "font-display font-semibold tracking-tight transition-all duration-500",
                scrolled
                  ? "hidden text-[0.8rem] md:block"
                  : "hidden text-sm sm:block",
              )}
            >
              {profile.name}
            </span>
          </Link>

          <DesktopNav items={navItems} />

          <div className="flex items-center gap-2">
            <ThemeToggle
              className={cn(
                "hidden transition-all duration-500 sm:grid",
                scrolled ? "size-8" : "size-9",
              )}
            />
            <Magnetic className="hidden sm:block">
              <LinkButton
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.name}`}
                variant="primary"
                size="sm"
              >
                Let&apos;s talk
                <ArrowUpRight aria-hidden="true" size={14} />
              </LinkButton>
            </Magnetic>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
