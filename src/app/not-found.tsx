import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import { LinkButton } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn't exist or has moved.",
};

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Selected work" },
  { href: "/blog", label: "Journal" },
];

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-screen flex-col">
      <SiteHeader />
      <main className="relative flex flex-1 items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hairline-grid opacity-40 [mask-image:radial-gradient(100%_70%_at_50%_40%,black,transparent_80%)]" />
        {/* Ambient accent glow */}
        <div className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 size-80 rounded-full bg-accent/[0.06] blur-3xl" />

        <div className="shell relative w-full py-[clamp(4rem,3rem+6vw,8rem)]">
          <Reveal>
            <span className="eyebrow">Error 404</span>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 font-display text-[clamp(5rem,3rem+18vw,16rem)] font-semibold leading-[0.85] tracking-tight text-foreground/10">
              404
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="t-h1 -mt-4 max-w-3xl">
              This page took a{" "}
              <span className="font-serif font-normal italic text-accent">
                wrong turn.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
              The link may be broken or the page may have moved. Let&apos;s get
              you back to something that exists.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LinkButton href="/" size="lg">
              <ArrowLeft aria-hidden="true" size={18} />
              Back home
            </LinkButton>
            <LinkButton href="/blog" variant="secondary" size="lg">
              Read the journal
            </LinkButton>
          </Reveal>

          <Reveal delay={0.25} className="mt-14 border-t border-border pt-7">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint">
              Quick links
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-line inline-flex items-center gap-1.5 font-mono text-sm text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      size={14}
                      className="text-accent"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
