import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ArticleBody } from "@/components/blog/article-body";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  estimateReadingTime,
  getAdjacentPosts,
  getPostBySlug,
  getRelatedPosts,
  getTableOfContents,
  posts,
  profile,
} from "@/data/site";
import { formatDate } from "@/lib/format";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category);
  const toc = getTableOfContents(post);
  const readingTime = estimateReadingTime(post);
  const { previous, next } = getAdjacentPosts(post.slug);

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        {/* ---------------------------------------------------------- */}
        {/* ARTICLE HERO                                               */}
        {/* ---------------------------------------------------------- */}
        <header className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 hairline-grid [mask-image:radial-gradient(120%_90%_at_50%_0%,black,transparent_80%)]" />
          <div className="mx-auto w-full max-w-3xl px-[var(--gutter)] pb-14 pt-[clamp(2.5rem,1.5rem+4vw,4.5rem)]">
            <Reveal>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-faint transition-colors hover:text-accent"
              >
                <ArrowLeft
                  aria-hidden="true"
                  size={15}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to writing
              </Link>

              <div className="mt-10 flex flex-wrap items-center gap-2">
                <Badge tone="accent">{post.category}</Badge>
                <Badge tone="muted">{formatDate(post.publishedAt)}</Badge>
                <Badge tone="muted">{readingTime}</Badge>
              </div>

              <h1 className="t-h1 mt-8 !text-[clamp(2.4rem,1.6rem+3.4vw,4.2rem)]">
                {post.title}
              </h1>

              {post.standfirst ? (
                <p className="mt-8 font-serif text-[clamp(1.4rem,1.1rem+1.1vw,2rem)] italic leading-relaxed text-muted-foreground">
                  {post.standfirst}
                </p>
              ) : (
                <p className="mt-8 text-lg leading-8 text-muted-foreground">
                  {post.summary}
                </p>
              )}

              <div className="mt-10 flex items-center gap-4 border-t border-border pt-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent font-display text-xs font-bold text-accent-foreground">
                  {profile.initials}
                </span>
                <div>
                  <p className="font-display text-sm font-semibold tracking-tight">
                    {profile.name}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
                    {profile.title}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </header>

        {/* ---------------------------------------------------------- */}
        {/* BODY + SIDEBAR                                             */}
        {/* ---------------------------------------------------------- */}
        <div className="shell grid gap-12 py-[clamp(2.5rem,2rem+3vw,4.5rem)] lg:grid-cols-[minmax(0,44rem)_1fr] lg:gap-16 xl:justify-center">
          <article className="min-w-0 max-w-[44rem]">
            {post.takeaways && post.takeaways.length > 0 ? (
              <Reveal className="mb-12 rounded-xl border border-border bg-background-2 p-6 sm:p-7">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-accent">
                  What you&apos;ll take away
                </p>
                <ul className="mt-5 space-y-3">
                  {post.takeaways.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-7 text-foreground/85"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            <Reveal delay={0.05}>
              <ArticleBody blocks={post.body} />
            </Reveal>

            {/* Prev / next */}
            <nav
              aria-label="More essays"
              className="mt-16 grid gap-4 border-t border-border pt-10 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="group rounded-xl border border-border p-5 transition-colors hover:border-border-strong hover:bg-card"
                >
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
                    ← Previous
                  </span>
                  <p className="mt-3 font-display text-lg font-semibold leading-tight tracking-tight transition-colors group-hover:text-accent">
                    {previous.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group rounded-xl border border-border p-5 text-right transition-colors hover:border-border-strong hover:bg-card"
                >
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
                    Next →
                  </span>
                  <p className="mt-3 font-display text-lg font-semibold leading-tight tracking-tight transition-colors group-hover:text-accent">
                    {next.title}
                  </p>
                </Link>
              ) : null}
            </nav>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-8">
              <TableOfContents items={toc} />

              <div className="border-t border-border pt-6">
                <p className="mb-3 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint">
                  Share
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex w-fit items-center gap-1 text-muted-foreground transition-colors hover:text-accent"
                  >
                    Post on X
                    <ArrowUpRight aria-hidden="true" size={13} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profile.linkedin)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex w-fit items-center gap-1 text-muted-foreground transition-colors hover:text-accent"
                  >
                    Share on LinkedIn
                    <ArrowUpRight aria-hidden="true" size={13} />
                  </a>
                </div>
              </div>

              <Link
                href="/#contact"
                className="group rounded-xl border border-border bg-background-2 p-5 transition-colors hover:border-accent/40"
              >
                <p className="font-display text-base font-semibold tracking-tight">
                  Building something serious?
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  I take on a small number of senior product builds.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent">
                  Start a conversation
                  <ArrowRight aria-hidden="true" size={13} />
                </span>
              </Link>
            </div>
          </aside>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* RELATED                                                    */}
        {/* ---------------------------------------------------------- */}
        <section className="border-t border-border bg-background-2">
          <div className="shell section-y">
            <Reveal>
              <span className="eyebrow">Related writing</span>
              <h2 className="t-h2 mt-6">Continue reading</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {relatedPosts.map((related, index) => (
                <Reveal key={related.slug} delay={index * 0.05}>
                  <RelatedCard post={related} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function RelatedCard({
  post,
}: {
  post: ReturnType<typeof getRelatedPosts>[number];
}) {
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
        <h3 className="mt-10 font-display text-xl font-semibold leading-[1.12] tracking-tight">
          {post.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {post.excerpt}
        </p>
        <p className="mt-auto pt-10 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
          {formatDate(post.publishedAt)} · {estimateReadingTime(post)}
        </p>
      </article>
    </Link>
  );
}
