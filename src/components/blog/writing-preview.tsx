import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getReadingTime, type BlogPost } from "@/data/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type WritingPreviewProps = {
  posts: BlogPost[];
};

/** Home writing block — lead essay + compact index, not a card dump. */
export function WritingPreview({ posts }: WritingPreviewProps) {
  const [lead, ...rest] = posts;
  if (!lead) return null;

  const leadHref = `/blog/${lead.slug}`;
  const leadTime = getReadingTime(lead);

  return (
    <div className="border-y border-border">
      <Link
        href={leadHref}
        className="group grid gap-6 py-8 transition-colors sm:py-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-12"
      >
        <div className="min-w-0">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-accent">
            Latest · {lead.category}
          </p>
          <h3 className="mt-3 font-display text-[clamp(1.55rem,1.2rem+1.4vw,2.35rem)] font-semibold leading-[1.05] tracking-tight transition-colors group-hover:text-accent">
            {lead.title}
          </h3>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-muted-foreground">
            {lead.standfirst || lead.excerpt}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-6 lg:items-end lg:text-right">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
            {formatDate(lead.publishedAt)} · {leadTime}
          </p>
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-foreground lg:ml-auto">
            Read essay
            <ArrowUpRight
              aria-hidden
              size={13}
              className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>

      {rest.length > 0 ? (
        <ul className="border-t border-border">
          {rest.map((post, index) => (
            <li
              key={post.slug}
              className="border-b border-border last:border-b-0"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-2 py-5 transition-colors sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-5"
              >
                <span className="font-mono text-[0.58rem] tabular-nums text-faint">
                  {String(index + 2).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent sm:text-xl">
                    {post.title}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground sm:line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
                <span className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-faint sm:text-right">
                  {post.category}
                  <span className="mx-1.5 text-border-strong">·</span>
                  {getReadingTime(post).replace(" read", "")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
