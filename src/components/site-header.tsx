import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navItems, profile } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--line)] bg-[rgba(248,250,252,0.88)] backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="grid size-9 place-items-center rounded-md bg-[var(--foreground)] text-sm text-white">
            SK
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-white hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={`mailto:${profile.email}`}
          className="hidden items-center gap-2 rounded-md bg-[var(--foreground)] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent)] sm:flex"
        >
          Contact
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </div>
    </header>
  );
}
