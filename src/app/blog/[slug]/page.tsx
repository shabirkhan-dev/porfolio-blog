import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";
import { ArticleBody } from "@/components/blog/article-body";
import { ListenButton } from "@/components/blog/listen-button";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Corners } from "@/components/corners";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section";
import { Badge } from "@/components/ui/badge";
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
        <header id="top" className="relative overflow-hidden border-b border-border scroll-mt-24">
          <div className="pointer-events-none absolute inset-0 hairline-grid [mask-image:radial-gradient(120%_90%_at_50%_0%,black,transparent_80%)]" />
          <div className="mx-auto w-full max-w-3xl px-[var(--gutter)] pb-8 pt-[clamp(1.75rem,1rem+3vw,3.25rem)]">
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

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Badge tone="accent">{post.category}</Badge>
                <Badge tone="muted">{formatDate(post.publishedAt)}</Badge>
                <Badge tone="muted">{readingTime}</Badge>
              </div>

              <h1 className="t-h1 mt-5 !text-[clamp(2.4rem,1.6rem+3.4vw,4.2rem)]">
                {post.title}
              </h1>

              {post.standfirst ? (
                <p className="mt-5 font-display text-[clamp(1.3rem,1.05rem+1vw,1.8rem)] font-normal leading-normal tracking-tight text-muted-foreground">
                  {post.standfirst}
                </p>
              ) : (
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  {post.summary}
                </p>
              )}

              <div className="mt-7 flex items-center gap-4 border-t border-border pt-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-accent font-display text-xs font-bold text-accent-foreground">
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

              <ListenButton text={getReadableText(post)} />
            </Reveal>
          </div>
        </header>

        <div className="shell grid gap-10 py-[clamp(1.75rem,1.25rem+2vw,3rem)] lg:grid-cols-[minmax(0,44rem)_1fr] lg:gap-12 xl:justify-center">
          <article className="min-w-0 max-w-[44rem]">
            {post.takeaways && post.takeaways.length > 0 ? (
              <Reveal className="mb-8 rounded-lg border border-border bg-background-2 p-5 sm:p-6">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-accent">
                  What you&apos;ll take away
                </p>
                <ul className="mt-4 space-y-2.5">
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
              <ArticleBody markdown={post.body} />
            </Reveal>

            <nav
              aria-label="More essays"
              className="mt-10 grid gap-4 border-t border-border pt-7 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="group rounded-lg border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-card"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
                    <ArrowLeft
                      aria-hidden="true"
                      size={13}
                      className="text-accent transition-transform duration-300 group-hover:-translate-x-1"
                    />
                    Previous
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
                  className="group rounded-lg border border-border p-5 text-right transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-card"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
                    Next
                    <ArrowRight
                      aria-hidden="true"
                      size={13}
                      className="text-accent transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                  <p className="mt-3 font-display text-lg font-semibold leading-tight tracking-tight transition-colors group-hover:text-accent">
                    {next.title}
                  </p>
                </Link>
              ) : null}
            </nav>

            <div className="mt-10 flex justify-center">
              <a
                href="#top"
                className="group inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint transition-colors hover:text-accent"
              >
                <ArrowUp
                  aria-hidden="true"
                  size={14}
                  className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                Back to top
              </a>
            </div>
          </article>

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
                className="group relative block rounded-lg border border-border bg-background-2 p-5 transition-colors duration-300 hover:border-accent/40"
              >
                <Corners />
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

        <section className="border-t border-border bg-background-2">
          <div className="shell section-y">
            <SectionHeading eyebrow="Related writing" title="Continue reading" />
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

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-card hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)]">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
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
        <h3 className="mt-10 font-display text-xl font-semibold leading-[1.12] tracking-tight transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-10 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="h-px flex-1 bg-border transition-colors duration-300 group-hover:bg-accent/30" />
          <span>{getReadingTime(post)}</span>
        </div>
      </article>
    </Link>
  );
}
