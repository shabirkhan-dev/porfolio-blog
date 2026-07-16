"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Corners } from "@/components/corners";
import { getReadingTime, type BlogPost } from "@/data/posts";
import { useActiveOnScroll } from "@/lib/use-active-on-scroll";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type ArticleCardProps = {
  post: Pick<
    BlogPost,
    "title" | "slug" | "category" | "publishedAt" | "excerpt" | "body"
  >;
  featured?: boolean;
};

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const { ref, active } = useActiveOnScroll<HTMLAnchorElement>();
  const readingTime = getReadingTime(post);

  if (featured) {
    return (
      <Link
        ref={ref}
        data-active={active}
        href={`/blog/${post.slug}`}
        className="group block"
      >
        <article className="relative grid overflow-hidden rounded-lg border border-border bg-background transition-colors duration-300 hover:border-border-strong hover:bg-card group-data-[active=true]:border-border-strong group-data-[active=true]:bg-card lg:grid-cols-[1.4fr_1fr]">
          <div className="pointer-events-none absolute inset-0 hairline-grid opacity-0 transition-opacity duration-500 group-hover:opacity-40 group-data-[active=true]:opacity-40" />
          <div className="relative p-8 sm:p-10">
            <span className="rounded-sm border border-accent/25 bg-accent/[0.08] px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent">
              {post.category}
            </span>
            <h2 className="mt-8 max-w-2xl font-display text-[clamp(1.45rem,1.15rem+1.1vw,2.1rem)] font-semibold leading-[1.08] tracking-tight transition-colors group-hover:text-accent group-data-[active=true]:text-accent">
              {post.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
            <p className="mt-8 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint lg:hidden">
              {formatDate(post.publishedAt)} · {readingTime}
            </p>
          </div>

          {/* Metadata rail — the essay's "file header" */}
          <div className="relative hidden flex-col border-l border-border bg-background-2 p-8 lg:flex">
            <Corners />
            <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />

            <p className="relative font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
              Featured essay
            </p>

            <dl className="relative mt-8 space-y-5 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                <dt className="text-faint">Published</dt>
                <dd className="text-foreground">{formatDate(post.publishedAt)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                <dt className="text-faint">Length</dt>
                <dd className="text-foreground">{readingTime}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                <dt className="text-faint">Topic</dt>
                <dd className="text-accent">{post.category}</dd>
              </div>
            </dl>

            <span className="relative mt-auto inline-flex items-center gap-2 self-end pt-8 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-foreground">
              Read essay
              <ArrowUpRight
                aria-hidden="true"
                size={15}
                className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-data-[active=true]:-translate-y-0.5 group-data-[active=true]:translate-x-0.5"
              />
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link
      ref={ref}
      data-active={active}
      href={`/blog/${post.slug}`}
      className="group block h-full"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-card hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)] group-data-[active=true]:-translate-y-1 group-data-[active=true]:border-border-strong group-data-[active=true]:bg-card group-data-[active=true]:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)]">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 group-data-[active=true]:scale-x-100" />

        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent">
            {post.category}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            size={17}
            className="text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-data-[active=true]:-translate-y-0.5 group-data-[active=true]:translate-x-0.5 group-data-[active=true]:text-accent"
          />
        </div>

        <h2 className="mt-8 font-display text-xl font-semibold leading-[1.12] tracking-tight transition-colors group-hover:text-accent group-data-[active=true]:text-accent">
          {post.title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {post.excerpt}
        </p>

        <p className="mt-auto pt-8 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
          {formatDate(post.publishedAt)} · {readingTime}
        </p>
      </article>
    </Link>
  );
}
