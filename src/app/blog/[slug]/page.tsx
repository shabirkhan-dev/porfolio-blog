import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";
import { ArticleBody } from "@/components/blog/article-body";
import { ListenButton } from "@/components/blog/listen-button";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getReadableText,
  getReadingTime,
  getTableOfContents,
  type BlogPost,
} from "@/data/posts";
import {
  getAdjacentPosts,
  getPostBySlug,
  getPublishedSlugs,
  getRelatedPosts,
} from "@/data/posts.server";
import { profile } from "@/data/site";
import { formatDate } from "@/lib/format";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

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
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.category);
  const toc = getTableOfContents(post);
  const readingTime = getReadingTime(post);
  const { previous, next } = await getAdjacentPosts(post.slug);

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        {/* Compact left-aligned header — no grid wash */}
        <header
          id="top"
          className="border-b border-border scroll-mt-24"
        >
          <div className="shell grid gap-0 py-5 sm:py-6 lg:grid-cols-[minmax(0,44rem)_1fr] lg:gap-12 xl:justify-center">
            <div className="min-w-0 max-w-[44rem]">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint transition-colors hover:text-accent"
              >
                <ArrowLeft
                  aria-hidden="true"
                  size={13}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
                Writing
              </Link>

              <p className="mt-4 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
                <span className="text-accent">{post.category}</span>
                <span className="mx-2 text-border-strong">·</span>
                {formatDate(post.publishedAt)}
                <span className="mx-2 text-border-strong">·</span>
                {readingTime}
              </p>

              <h1 className="mt-3 font-display text-[clamp(1.65rem,1.25rem+1.6vw,2.55rem)] font-semibold leading-[1.08] tracking-tight text-balance">
                {post.title}
              </h1>

              {(post.standfirst || post.summary) && (
                <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-muted-foreground">
                  {post.standfirst || post.summary}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-sm bg-accent font-display text-[0.65rem] font-bold text-accent-foreground">
                    {profile.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-none tracking-tight">
                      {profile.name}
                    </p>
                    <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-faint">
                      {profile.title}
                    </p>
                  </div>
                </div>
                <div className="w-full sm:ml-auto sm:w-auto">
                  <ListenButton text={getReadableText(post)} />
                </div>
              </div>
            </div>
            <div className="hidden lg:block" aria-hidden />
          </div>
        </header>

        <div className="shell grid gap-10 py-7 sm:py-8 lg:grid-cols-[minmax(0,44rem)_1fr] lg:gap-12 xl:justify-center">
          <article className="min-w-0 max-w-[44rem]">
            {post.takeaways && post.takeaways.length > 0 ? (
              <div className="mb-7 border border-border bg-background-2 px-4 py-4 sm:px-5">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-accent">
                  Takeaways
                </p>
                <ul className="mt-3 space-y-2">
                  {post.takeaways.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-6 text-foreground/85"
                    >
                      <span className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <ArticleBody markdown={post.body} />

            <nav
              aria-label="More essays"
              className="mt-10 grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="group border border-border p-4 transition-colors hover:border-border-strong hover:bg-background-2"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
                    <ArrowLeft
                      aria-hidden="true"
                      size={12}
                      className="text-accent"
                    />
                    Previous
                  </span>
                  <p className="mt-2 font-display text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                    {previous.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group border border-border p-4 text-right transition-colors hover:border-border-strong hover:bg-background-2"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
                    Next
                    <ArrowRight
                      aria-hidden="true"
                      size={12}
                      className="text-accent"
                    />
                  </span>
                  <p className="mt-2 font-display text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                    {next.title}
                  </p>
                </Link>
              ) : null}
            </nav>

            <div className="mt-8 flex justify-start">
              <a
                href="#top"
                className="group inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint transition-colors hover:text-accent"
              >
                <ArrowUp aria-hidden="true" size={13} className="text-accent" />
                Back to top
              </a>
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-7">
              <TableOfContents items={toc} />

              <div className="border-t border-border pt-5">
                <p className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
                  Share
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-1 text-muted-foreground transition-colors hover:text-accent"
                  >
                    Post on X
                    <ArrowUpRight aria-hidden="true" size={13} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profile.linkedin)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-1 text-muted-foreground transition-colors hover:text-accent"
                  >
                    Share on LinkedIn
                    <ArrowUpRight aria-hidden="true" size={13} />
                  </a>
                </div>
              </div>

              <Link
                href="/#contact"
                className="block border border-border bg-background-2 p-4 transition-colors hover:border-accent/40"
              >
                <p className="font-display text-sm font-semibold tracking-tight">
                  Building something serious?
                </p>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  Senior product builds — a small number at a time.
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent">
                  Start a conversation
                  <ArrowRight aria-hidden="true" size={12} />
                </span>
              </Link>
            </div>
          </aside>
        </div>

        <section className="border-t border-border bg-background-2">
          <div className="shell py-10 sm:py-12">
            <SectionHeading eyebrow="Related writing" title="Continue reading" />
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <RelatedCard key={related.slug} post={related} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col border border-border bg-background p-5 transition-colors hover:border-border-strong hover:bg-card">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent">
          {post.category}
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
          {post.excerpt}
        </p>
        <p className="mt-4 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-faint">
          {formatDate(post.publishedAt)} · {getReadingTime(post)}
        </p>
      </article>
    </Link>
  );
}
