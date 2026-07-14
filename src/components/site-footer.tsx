import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BoxedSection, BoxedStrip } from "@/components/boxed-section";
import { FooterLogoDots } from "@/components/footer-logo-dots";
import { navItems, profile, socials } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-background-2">
      <BoxedSection dividerTop tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <span className="eyebrow">Open for work · {profile.location}</span>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-5 block max-w-xl"
            >
              <span className="block font-display text-[clamp(2.5rem,1.5rem+5vw,5.5rem)] font-medium leading-[0.95] tracking-tight text-foreground transition-colors group-hover:text-accent">
                Let&apos;s build
              </span>
              <span className="text-stroke block font-display text-[clamp(2.5rem,1.5rem+5vw,5.5rem)] font-medium leading-[0.95] tracking-tight">
                something sharp.
              </span>
            </a>
            <p className="link-line mt-6 inline-block font-mono text-sm text-muted-foreground">
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
      </BoxedSection>

      <BoxedStrip dividerTop={false}>
        <div
          className="select-none overflow-hidden py-2 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
          aria-hidden="true"
        >
          <FooterLogoDots
            text="shabir"
            className="h-[clamp(5rem,16vw,12rem)] w-full"
          />
        </div>
      </BoxedStrip>

      <BoxedStrip dividerTop>
        <div className="py-7">
          <dl className="grid gap-x-8 gap-y-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-faint">Stack</dt>
              <dd className="mt-1.5 text-muted-foreground">
                Next.js · React 19 · Tailwind v4 · Bun
              </dd>
            </div>
            <div>
              <dt className="text-faint">Type</dt>
              <dd className="mt-1.5 text-muted-foreground">
                Space Grotesk · Inter · JetBrains Mono
              </dd>
            </div>
            <div>
              <dt className="text-faint">Performance</dt>
              <dd className="mt-1.5 text-muted-foreground">
                Static-first · deferred canvas · reduced-motion aware
              </dd>
            </div>
            <div>
              <dt className="text-faint">Built by</dt>
              <dd className="mt-1.5 text-muted-foreground">
                Designed and engineered by me
              </dd>
            </div>
          </dl>
        </div>
      </BoxedStrip>

      <BoxedStrip dividerTop closed>
        <div className="flex flex-col gap-4 py-6 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Shabir Khan</p>
          <span
            aria-hidden="true"
            className="barcode hidden h-5 w-44 text-foreground/25 sm:block"
          />
          <p>{profile.location} · Remote worldwide</p>
        </div>
      </BoxedStrip>
    </footer>
  );
}
