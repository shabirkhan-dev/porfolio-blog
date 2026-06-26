import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/format";

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
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col rounded-xl border border-border bg-background p-7 transition-colors duration-300 hover:border-border-strong hover:bg-card">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent">
            {post.category}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            size={17}
            className="text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>

        <h2
          className={
            featured
              ? "mt-10 max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl"
              : "mt-10 font-display text-xl font-semibold leading-[1.12] tracking-tight"
          }
        >
          {post.title}
        </h2>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {post.excerpt}
        </p>

        <p className="mt-auto pt-10 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
          {formatDate(post.publishedAt)} · {post.readingTime}
        </p>
      </article>
    </Link>
  );
}
