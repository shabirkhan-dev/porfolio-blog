import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoDots } from "@/components/logo-dots";
import { navItems, profile, socials } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background-2">
      <div className="shell pb-12 pt-[clamp(4rem,3rem+4vw,6rem)]">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <span className="eyebrow">Open for work · {profile.location}</span>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-7 block max-w-xl"
            >
              <span className="block font-display text-[clamp(2.5rem,1.5rem+5vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-foreground transition-colors group-hover:text-accent">
                Let&apos;s build
              </span>
              <span className="block font-serif text-[clamp(2.5rem,1.5rem+5vw,5.5rem)] font-normal italic leading-[0.95] text-faint transition-colors group-hover:text-accent">
                something sharp.
              </span>
            </a>
            <p className="link-line mt-8 inline-block font-mono text-sm text-muted-foreground">
              {profile.email}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:justify-items-end">
            <nav aria-label="Footer navigation" className="grid content-start gap-3 text-sm">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint">
                Sitemap
              </p>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-line w-fit text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="grid content-start gap-3 text-sm">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint">
                Elsewhere
              </p>
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group inline-flex w-fit items-center gap-1 text-muted-foreground transition-colors hover:text-accent"
                >
                  {item.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    size={13}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="select-none overflow-hidden px-[var(--gutter)] [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
        aria-hidden="true"
      >
        <LogoDots
          text="shabir"
          className="h-[clamp(7rem,22vw,17rem)] w-full"
        />
      </div>

      <div className="shell flex flex-col gap-2 border-t border-border py-6 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Shabir Khan</p>
        <p>Next.js · TypeScript · Tailwind · Bun</p>
      </div>
    </footer>
  );
}
