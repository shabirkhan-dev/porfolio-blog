import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Corners } from "@/components/corners";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NewsletterIssueItem = {
  category: string;
  title: string;
  readingTime: string;
  href?: string;
};

export type NewsletterBlockProps = {
  cover?: {
    title: string;
    href: string;
    label?: string;
  };
  items?: NewsletterIssueItem[];
  issueNumber?: string;
  issueWhen?: string;
  readerCount?: string;
  className?: string;
};

const DEFAULT_COVER = {
  title: "The invisible work behind a fast interface",
  href: "/blog/interfaces-that-feel-inevitable",
  label: "Latest note",
};

const DEFAULT_ITEMS: NewsletterIssueItem[] = [
  {
    category: "Motion",
    title: "Why the best transitions disappear into the task",
    readingTime: "6 min",
    href: "/blog",
  },
  {
    category: "Systems",
    title: "A field guide to interface rhythm",
    readingTime: "4 min",
    href: "/blog",
  },
  {
    category: "Process",
    title: "Shipping the boring parts that keep software alive",
    readingTime: "8 min",
    href: "/blog",
  },
];

/**
 * Newsletter CTA using the site drafting-board system
 * (brass accent, mono metadata, border rails — not the old red Sunday edition).
 */
export function NewsletterBlock({
  cover = DEFAULT_COVER,
  items = DEFAULT_ITEMS,
  readerCount = "readers who care about the craft",
  className,
}: NewsletterBlockProps) {
  const list = items.slice(0, 3);

  return (
    <section
      className={cn(
        "relative overflow-hidden border border-border bg-background-2",
        className,
      )}
    >
      <Corners />
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_0%_0%,rgb(var(--accent-rgb)/0.1),transparent_65%)]" />

      <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
        {/* Pitch + form */}
        <div className="flex flex-col justify-between border-b border-border px-5 py-8 sm:px-7 sm:py-10 lg:border-b-0 lg:border-r lg:px-8 lg:py-11">
          <div className="max-w-xl">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">
              Field notes
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.35rem)] font-semibold leading-[1.08] tracking-tight text-balance">
              Occasional notes on interfaces, systems, and shipping.
            </h2>
            <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
              No growth hacks — short writing on the decisions that make product
              software feel finished.
            </p>
          </div>

          <div className="mt-10 max-w-xl">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
              Subscribe · {readerCount}
            </p>
            <form
              action="#"
              className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:items-stretch"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@studio.com"
                className="h-11 min-w-0 flex-1 border border-border bg-background px-4 font-sans text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-accent/50"
              />
              <Button type="submit" variant="primary" size="md" className="h-11 shrink-0">
                Subscribe
                <ArrowUpRight aria-hidden size={14} />
              </Button>
            </form>
          </div>
        </div>

        {/* Reading list */}
        <div className="flex flex-col px-5 py-8 sm:px-7 sm:py-10 lg:px-8 lg:py-11">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
              From the archive
            </p>
            <Link
              href="/blog"
              className="link-line inline-flex items-center gap-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-foreground"
            >
              All writing
              <ArrowUpRight aria-hidden size={12} className="text-accent" />
            </Link>
          </div>

          <Link
            href={cover.href}
            className="mt-5 block border-t border-border pt-5 transition-colors hover:text-accent"
          >
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent">
              {cover.label ?? "Latest note"}
            </p>
            <p className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight sm:text-xl">
              {cover.title}
            </p>
          </Link>

          <ul className="mt-2 flex flex-1 flex-col">
            {list.map((item, index) => {
              const row = (
                <>
                  <div className="min-w-0">
                    <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-faint">
                      {String(index + 1).padStart(2, "0")} · {item.category}
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-foreground transition-colors group-hover:text-accent">
                      {item.title}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-faint">
                    {item.readingTime}
                  </span>
                </>
              );

              return (
                <li
                  key={`${item.category}-${item.title}`}
                  className="border-t border-border"
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="group flex items-start justify-between gap-4 py-4"
                    >
                      {row}
                    </Link>
                  ) : (
                    <div className="flex items-start justify-between gap-4 py-4">
                      {row}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
