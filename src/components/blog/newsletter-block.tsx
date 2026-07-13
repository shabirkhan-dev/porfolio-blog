import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
  label: "Cover story",
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
    category: "Source",
    title: "The block we shipped this week",
    readingTime: "8 min",
    href: "/blog",
  },
];

/**
 * Self-contained dark editorial newsletter block.
 * Matches the Sunday-edition reference: charcoal field, red accents, serif heads.
 */
export function NewsletterBlock({
  cover = DEFAULT_COVER,
  items = DEFAULT_ITEMS,
  issueNumber = "024",
  issueWhen = "Sunday, 08:00",
  readerCount = "12,840",
  className,
}: NewsletterBlockProps) {
  const list = items.slice(0, 3);

  return (
    <section
      className={cn("newsletter-edition relative overflow-hidden", className)}
      style={{
        background: "#0d0d0d",
        color: "#f3f1ee",
      }}
    >
      {/* Soft red wash + diagonal hatching behind the issue card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[52%]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              -32deg,
              transparent 0,
              transparent 11px,
              rgba(158, 42, 42, 0.11) 11px,
              rgba(158, 42, 42, 0.11) 12px
            )
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 70% at 12% 30%, rgba(158,42,42,0.10), transparent 60%)",
        }}
      />

      <div className="relative grid lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
        {/* LEFT — pitch + subscribe */}
        <div className="flex flex-col justify-between px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 xl:px-14">
          <div className="max-w-xl">
            <p
              className="font-serif text-[0.78rem] uppercase tracking-[0.22em]"
              style={{ color: "#b03a3a" }}
            >
              The Sunday Edition
            </p>

            <h2
              className="mt-7 font-serif text-[clamp(2.1rem,1.4rem+2.8vw,3.45rem)] font-normal leading-[1.08] tracking-[-0.02em] text-balance"
              style={{ color: "#f7f4f0" }}
            >
              One considered idea for people who build interfaces.
            </h2>

            <p
              className="mt-6 max-w-[34rem] text-[0.98rem] leading-7"
              style={{ color: "#9a9690" }}
            >
              A weekly dispatch on motion, composition, and the decisions that
              make software feel finished.
            </p>
          </div>

          <div className="mt-12 max-w-xl lg:mt-16">
            <p
              className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em]"
              style={{ color: "#7a7670" }}
            >
              Join {readerCount} readers
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
                className="h-12 min-w-0 flex-1 border bg-transparent px-4 font-sans text-[0.92rem] outline-none transition-colors placeholder:text-[#5c5854] focus:border-[#b03a3a]"
                style={{
                  borderColor: "#2e2e2e",
                  color: "#f3f1ee",
                }}
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 px-5 font-sans text-[0.82rem] font-medium tracking-[-0.01em] text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
                style={{ background: "#b03a3a" }}
              >
                Read the next issue
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} />
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT — issue card */}
        <div className="relative px-5 pb-8 pt-2 sm:px-7 sm:pb-10 lg:px-8 lg:py-10 xl:pr-12">
          <article
            className="flex h-full flex-col border shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            style={{
              background: "#161616",
              borderColor: "#2a2a2a",
            }}
          >
            {/* Card header */}
            <header
              className="flex items-start justify-between gap-6 px-5 py-5 sm:px-6"
              style={{ borderBottom: "1px solid #2a2a2a" }}
            >
              <h3
                className="font-serif text-[1.35rem] leading-none tracking-[-0.02em] sm:text-[1.55rem]"
                style={{ color: "#f7f4f0" }}
              >
                Field / Notes
              </h3>
              <div className="text-right font-sans text-[0.62rem] uppercase leading-relaxed tracking-[0.14em]"
                style={{ color: "#8a8680" }}
              >
                <div>Issue {issueNumber}</div>
                <div>{issueWhen}</div>
              </div>
            </header>

            {/* Cover story */}
            <div
              className="grid gap-5 px-5 py-6 sm:grid-cols-[1.25fr_0.85fr] sm:gap-6 sm:px-6"
              style={{ borderBottom: "1px solid #2a2a2a" }}
            >
              <div>
                <p
                  className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.18em]"
                  style={{ color: "#b03a3a" }}
                >
                  {cover.label ?? "Cover story"}
                </p>
                <Link
                  href={cover.href}
                  className="mt-3 block font-serif text-[clamp(1.25rem,1.05rem+0.7vw,1.65rem)] leading-[1.2] tracking-[-0.015em] transition-colors hover:text-[#d45a5a]"
                  style={{ color: "#f7f4f0" }}
                >
                  {cover.title}
                </Link>
              </div>

              <div
                aria-hidden="true"
                className="min-h-[7.5rem] sm:min-h-full"
                style={{
                  backgroundColor: "#1a1212",
                  backgroundImage: `
                    repeating-linear-gradient(
                      -42deg,
                      transparent 0,
                      transparent 7px,
                      rgba(176, 58, 58, 0.55) 7px,
                      rgba(176, 58, 58, 0.55) 8px
                    )
                  `,
                }}
              />
            </div>

            {/* Issue list */}
            <ol className="flex flex-1 flex-col">
              {list.map((item, index) => {
                const body = (
                  <>
                    <div className="min-w-0">
                      <p
                        className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.16em]"
                        style={{ color: "#b03a3a" }}
                      >
                        {String(index + 1).padStart(2, "0")} {item.category}
                      </p>
                      <p
                        className="mt-2 font-serif text-[1.02rem] leading-snug tracking-[-0.01em] transition-colors group-hover:text-[#d45a5a] sm:text-[1.08rem]"
                        style={{ color: "#f0eeea" }}
                      >
                        {item.title}
                      </p>
                    </div>
                    <span
                      className="mt-1 inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-sans text-[0.68rem] tracking-[-0.01em]"
                      style={{ color: "#8a8680" }}
                    >
                      <span aria-hidden="true" style={{ color: "#b03a3a" }}>
                        ✓
                      </span>
                      {item.readingTime.replace(/\s*read$/i, "")}
                    </span>
                  </>
                );

                const rowClass =
                  "group flex items-start justify-between gap-5 px-5 py-5 sm:px-6";

                return (
                  <li
                    key={`${item.category}-${item.title}`}
                    style={{
                      borderBottom:
                        index === list.length - 1 ? "none" : "1px solid #2a2a2a",
                    }}
                  >
                    {item.href ? (
                      <Link href={item.href} className={rowClass}>
                        {body}
                      </Link>
                    ) : (
                      <div className={rowClass}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          </article>
        </div>
      </div>
    </section>
  );
}
