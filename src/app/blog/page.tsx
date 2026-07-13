import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/blog/article-card";
import { Reveal } from "@/components/motion";
import { Marquee } from "@/components/marquee";
import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { categories } from "@/data/posts";
import { getFeaturedPost, getPostsByCategory } from "@/data/posts.server";
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
  const featuredPost = await getFeaturedPost();
  const allInCategory = await getPostsByCategory(activeCategory);
  const showFeatured = Boolean(featuredPost) && activeCategory === "All";
  const filteredPosts = showFeatured
    ? allInCategory.filter((post) => post.slug !== featuredPost!.slug)
    : allInCategory;

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hairline-grid [mask-image:radial-gradient(120%_80%_at_50%_0%,black,transparent_75%)]" />
          <div className="shell relative pb-8 pt-[clamp(2rem,1.25rem+4vw,4rem)]">
            <Reveal>
              <span className="eyebrow">Writing</span>
            </Reveal>

            <h1 className="t-display mt-5">
              <span className="block">Notes on</span>
              <span className="block">
                building <span className="text-accent">with taste.</span>
              </span>
            </h1>

            <Reveal delay={0.12} className="mt-6 max-w-lg border-t border-border pt-5">
              <p className="t-lead">
                Notes on engineering judgment, system design, and the quieter
                parts of shipping real software.
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

        <section className="border-b border-border bg-background">
          <div className="shell py-4">
            <div className="flex gap-2 overflow-x-auto">
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
                      "shrink-0 rounded-md px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-300",
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
          </div>
        </section>

        {showFeatured && featuredPost ? (
          <section className="shell pt-[clamp(2rem,1.25rem+3vw,3.5rem)]">
            <Reveal>
              <ArticleCard post={featuredPost} featured />
            </Reveal>
          </section>
        ) : null}

        <section className="shell pb-[clamp(2rem,1.25rem+2.5vw,3.5rem)] pt-[clamp(1.5rem,1rem+2vw,2.75rem)]">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-4">
            <h2 className="font-display text-lg font-semibold tracking-tight">
              {activeCategory === "All" ? "All essays" : activeCategory}
            </h2>
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "essay" : "essays"}
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.04}>
                  <ArticleCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-14 text-center">
              <p className="font-display text-xl font-semibold tracking-tight">
                Nothing here yet
              </p>
              <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                No essays in this category for now. Browse all writing instead.
              </p>
              <Link
                href="/blog"
                className="link-line mt-2 font-mono text-xs uppercase tracking-[0.14em] text-accent"
              >
                View all writing
              </Link>
            </div>
          )}
        </section>

        <section className="shell pb-[clamp(2.5rem,2rem+3vw,4.5rem)]">
          <Reveal>
            <PageCta
              label="Hire me"
              title={
                <>
                  Building something that needs a{" "}
                  <span className="text-accent">senior engineer?</span>
                </>
              }
              href="/#contact"
              button="Start a conversation"
              variant="primary"
            />
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
