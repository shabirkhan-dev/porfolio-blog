import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { navItems, profile } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="grid size-9 place-items-center rounded-md bg-foreground text-sm text-background">
            {profile.initials}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block">{profile.name}</span>
            <span className="block text-xs font-medium text-muted-foreground">
              {profile.role}
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={`mailto:${profile.email}`}
          aria-label={`Email ${profile.name}`}
          className="inline-flex items-center gap-2 rounded-md bg-foreground px-3 py-2 text-sm font-semibold text-background transition hover:bg-primary hover:text-primary-foreground"
        >
          <Mail aria-hidden="true" size={16} />
          <span className="hidden sm:inline">Contact</span>
          <ArrowUpRight aria-hidden="true" className="hidden sm:block" size={16} />
        </a>
      </div>
    </header>
  );
}
