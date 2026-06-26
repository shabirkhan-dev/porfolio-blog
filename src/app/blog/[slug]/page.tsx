import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPostBySlug, posts } from "@/content/site";
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

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to blog
        </Link>

        <article className="mt-10 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
          <p className="text-sm text-muted-foreground">
            {formatDate(post.publishedAt)} - {post.readingTime}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-10 space-y-9">
            {post.body.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-8 text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
