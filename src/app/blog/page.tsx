import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/blog/article-card";
import { NewsletterBlock } from "@/components/blog/newsletter-block";
import { BoxedPage, BoxedSection, BoxedStrip } from "@/components/boxed-section";
import { Reveal } from "@/components/motion";
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
      <BoxedPage>
        <main>
          <BoxedSection dividerTop pad={false} className="overflow-hidden">
            <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:py-8">
              <div className="max-w-2xl">
                <span className="eyebrow">Writing</span>
                <h1 className="t-h2 mt-3 text-balance">
                  Notes on building{" "}
                  <span className="text-accent">with taste.</span>
                </h1>
                <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
                  Engineering judgment, system design, and the quieter parts of
                  shipping real software.
                </p>
              </div>
              <p className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint sm:pb-1">
                {allInCategory.length}{" "}
                {allInCategory.length === 1 ? "essay" : "essays"}
                {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
              </p>
            </div>
          </BoxedSection>

          <BoxedStrip>
            <div className="py-3.5">
              <div className="flex gap-1.5 overflow-x-auto">
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
                        "shrink-0 px-3.5 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] transition-colors duration-300",
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
          </BoxedStrip>

          {showFeatured && featuredPost ? (
            <BoxedSection pad="compact">
              <Reveal>
                <ArticleCard post={featuredPost} featured />
              </Reveal>
            </BoxedSection>
          ) : null}

          <BoxedSection pad="compact">
            <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <h2 className="font-display text-base font-semibold tracking-tight sm:text-lg">
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
              <div className="flex flex-col items-center gap-3 border border-dashed border-border py-12 text-center">
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
          </BoxedSection>

          <BoxedSection pad="compact">
            <Reveal>
              <NewsletterBlock />
            </Reveal>
          </BoxedSection>

          <BoxedSection pad="compact" closed>
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
          </BoxedSection>
        </main>
      </BoxedPage>
      <SiteFooter />
    </div>
  );
}
