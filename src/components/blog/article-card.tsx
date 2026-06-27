"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import { useActiveOnScroll } from "@/lib/use-active-on-scroll";

type ArticleCardProps = {
  post: {
    title: string;
    slug: string;
    category: string;
    publishedAt: string;
    readingTime: string;
    excerpt: string;
  };
  featured?: boolean;
};

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const { ref, active } = useActiveOnScroll<HTMLAnchorElement>();

  if (featured) {
    return (
      <Link
        ref={ref}
        data-active={active}
        href={`/blog/${post.slug}`}
        className="group block"
      >
        <article className="relative grid overflow-hidden rounded-xl border border-border bg-background transition-colors duration-300 hover:border-border-strong hover:bg-card group-data-[active=true]:border-border-strong group-data-[active=true]:bg-card lg:grid-cols-[1.4fr_1fr]">
          <div className="pointer-events-none absolute inset-0 hairline-grid opacity-0 transition-opacity duration-500 group-hover:opacity-40 group-data-[active=true]:opacity-40" />
          <div className="relative p-8 sm:p-10">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-accent/25 bg-accent/[0.08] px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent">
                {post.category}
              </span>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
                Latest
              </span>
            </div>
            <h2 className="mt-8 max-w-2xl font-display text-[clamp(1.75rem,1.3rem+1.8vw,2.8rem)] font-semibold leading-[1.04] tracking-tight transition-colors group-hover:text-accent group-data-[active=true]:text-accent">
              {post.title}
            </h2>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-7 text-muted-foreground">
              {post.excerpt}
            </p>
            <p className="mt-8 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
              {formatDate(post.publishedAt)} · {post.readingTime}
            </p>
          </div>
          <div className="relative hidden items-center justify-center border-l border-border bg-background-2 p-10 lg:flex">
            <span className="font-display text-[7rem] font-semibold leading-none tracking-tighter text-foreground/[0.06]">
              01
            </span>
            <span className="absolute bottom-8 right-8 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-foreground">
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
      <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-card hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)] group-data-[active=true]:-translate-y-1 group-data-[active=true]:border-border-strong group-data-[active=true]:bg-card group-data-[active=true]:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)]">
        {/* animated accent top-rule */}
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

        <h2 className="mt-10 font-display text-xl font-semibold leading-[1.12] tracking-tight transition-colors group-hover:text-accent group-data-[active=true]:text-accent">
          {post.title}
        </h2>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-10 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="h-px flex-1 bg-border transition-colors duration-300 group-hover:bg-accent/30 group-data-[active=true]:bg-accent/30" />
          <span>{post.readingTime}</span>
        </div>
      </article>
    </Link>
  );
}
