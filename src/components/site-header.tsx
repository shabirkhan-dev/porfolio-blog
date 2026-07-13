"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FrameNodes } from "@/components/boxed-section";
import { DesktopNav, MobileBottomNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { LinkButton } from "@/components/ui/button";
import { navItems, profile } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Frame Index header — thin rail aligned to the page frame.
 * Mobile uses a fixed bottom bar instead of a hamburger sheet.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 12);
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
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-400",
          scrolled
            ? "glass border-b border-border"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell relative">
          <div className="relative border-x border-border">
            <FrameNodes top className="hidden sm:block" />

            <div className="relative flex min-h-14 items-center justify-between gap-3 px-[clamp(0.85rem,0.5rem+1.5vw,1.25rem)] sm:min-h-16">
              <Link
                href="/"
                className="group inline-flex min-h-11 shrink-0 items-center gap-2.5"
              >
                <span className="grid size-7 place-items-center bg-accent font-mono text-[0.66rem] font-bold text-accent-foreground transition-transform duration-500 group-hover:rotate-90 sm:size-8 sm:text-xs">
                  {profile.initials}
                </span>
                <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground xl:inline">
                  {profile.name}
                </span>
              </Link>

              <DesktopNav items={navItems} />

              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <Link
                  href="/resume"
                  className="px-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground lg:hidden"
                >
                  Résumé
                </Link>
                <ThemeToggle />
                <LinkButton
                  href={`mailto:${profile.email}`}
                  aria-label={`Email ${profile.name}`}
                  variant="primary"
                  size="sm"
                  className="hidden rounded-sm lg:inline-flex"
                >
                  Let&apos;s talk
                  <ArrowUpRight aria-hidden="true" size={14} />
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileBottomNav />
    </>
  );
}
