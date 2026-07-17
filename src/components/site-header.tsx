import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FrameNodes } from "@/components/boxed-section";
import { HeaderScrollShell } from "@/components/header-scroll-shell";
import { DesktopNav, MobileBottomNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { LinkButton } from "@/components/ui/button";
import { navItems, profile } from "@/data/site";

/**
 * Frame Index header — thin rail aligned to the page frame.
 * Scroll glass is a tiny client island; nav/theme stay client for pathname.
 */
export function SiteHeader() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <HeaderScrollShell>
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
                  className="hidden px-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground sm:block lg:hidden"
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
      </HeaderScrollShell>

      <MobileBottomNav />
    </>
  );
}
