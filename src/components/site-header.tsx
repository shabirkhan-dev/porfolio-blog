import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";
import { DesktopNav } from "@/components/site-nav";
import { Magnetic } from "@/components/magnetic";
import { LinkButton } from "@/components/ui/button";
import { navItems, profile } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass">
      <div className="shell flex min-h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Shabir Khan home"
        >
          <span className="grid size-8 place-items-center rounded-md bg-accent font-display text-xs font-bold text-accent-foreground transition-transform duration-500 group-hover:rotate-90">
            {profile.initials}
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
            {profile.name}
          </span>
        </Link>

        <DesktopNav items={navItems} />

        <div className="flex items-center gap-2">
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
    </header>
  );
}
