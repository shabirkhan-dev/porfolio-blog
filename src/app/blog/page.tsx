import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleCard } from "@/components/blog/article-card";
import { NewsletterBlock } from "@/components/blog/newsletter-block";
import { Reveal, WordReveal } from "@/components/motion";
import { Marquee } from "@/components/marquee";
import { Badge } from "@/components/ui/badge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { categories, getFeaturedPost, getPostsByCategory } from "@/data/site";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Editorial notes on engineering, frontend systems, backend architecture, AI, product, design, and personal craft.",
};

type BlogPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const activeCategory = category ?? "All";
  const featuredPost = getFeaturedPost();
  const filteredPosts = getPostsByCategory(activeCategory).filter(
    (post) => post.slug !== featuredPost.slug || activeCategory !== "All",
  );

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hairline-grid [mask-image:radial-gradient(120%_80%_at_50%_0%,black,transparent_75%)]" />
          <div className="shell relative pb-14 pt-[clamp(3rem,2rem+6vw,6rem)]">
            <Reveal>
              <span className="eyebrow">Editorial journal</span>
            </Reveal>

            <h1 className="t-display mt-8">
              <WordReveal as="span" text="Notes on" className="block" />
              <span className="block">
                building{" "}
                <span className="font-serif font-normal italic text-accent">
                  with taste.
                </span>
              </span>
            </h1>

            <Reveal delay={0.12} className="mt-10 max-w-xl border-t border-border pt-8">
              <p className="t-lead">
                Calm writing on engineering judgment, frontend systems, backend
                design, AI product work, interface craft, and the quieter parts
                of shipping real software.
              </p>
            </Reveal>
          </div>

          <div className="border-y border-border py-6">
            <Marquee
              items={[
                "Engineering",
                "Frontend",
                "Backend",
                "AI",
                "Product",
                "Design",
                "Personal",
              ]}
            />
          </div>
        </section>

        {/* Featured essay */}
        <section className="shell pt-[clamp(3rem,2rem+4vw,5rem)]">
          <Reveal>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-background transition-colors duration-500 hover:border-border-strong"
            >
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-[clamp(1.75rem,1.25rem+3vw,3.5rem)]">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="accent">{featuredPost.category}</Badge>
                    <Badge tone="muted">Featured essay</Badge>
                  </div>
                  <h2 className="t-h1 mt-10 max-w-2xl transition-colors group-hover:text-accent">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
                    {featuredPost.summary}
                  </p>
                  <p className="mt-10 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
                    {formatDate(featuredPost.publishedAt)} ·{" "}
                    {featuredPost.readingTime}
                  </p>
                </div>

                <div className="relative flex min-h-72 flex-col justify-between border-t border-border bg-background-2 p-8 lg:border-l lg:border-t-0">
                  <div className="pointer-events-none absolute inset-0 hairline-grid opacity-60" />
                  <p className="relative font-mono text-xs uppercase tracking-[0.16em] text-faint">
                    From the journal
                  </p>
                  <p className="relative font-display text-[8rem] font-semibold leading-none tracking-tighter text-accent/15">
                    01
                  </p>
                  <span className="relative inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground">
                    Read featured essay
                    <ArrowUpRight
                      aria-hidden="true"
                      size={16}
                      className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>

        {/* Category filter */}
        <section className="shell sticky top-16 z-30 py-6">
          <div className="glass -mx-2 flex gap-2 overflow-x-auto rounded-full border border-border px-2 py-2">
            {["All", ...categories].map((item) => {
              const href =
                item === "All"
                  ? "/blog"
                  : `/blog?category=${encodeURIComponent(item)}`;
              const active = activeCategory === item;

              return (
                <Link
                  key={item}
                  href={href}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Article grid */}
        <section className="shell pb-[clamp(3rem,2rem+3vw,5rem)] pt-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.04}>
                <ArticleCard post={post} />
              </Reveal>
            ))}
          </div>
          {filteredPosts.length === 0 ? (
            <div className="rounded-xl border border-border p-12 text-center text-muted-foreground">
              No essays found for this category yet.
            </div>
          ) : null}
        </section>

        <section className="shell pb-[clamp(4rem,3rem+5vw,7rem)]">
          <Reveal>
            <NewsletterBlock />
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
