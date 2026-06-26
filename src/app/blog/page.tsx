import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { posts } from "@/content/site";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering notes from Shabir Khan.",
};

export default function BlogPage() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <SectionHeading
          eyebrow="Blog"
          title="Engineering notes from the build process"
          description="Short, practical essays on architecture, performance, CI/CD, security, and production-grade TypeScript."
        />

        <div className="mt-10 divide-y divide-border rounded-lg border border-border bg-card">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="grid gap-4 p-5 transition hover:bg-muted/45 md:grid-cols-[180px_1fr_auto] md:items-center"
            >
              <p className="text-sm text-muted-foreground">
                {formatDate(post.publishedAt)}
              </p>
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary">
                Read
                <ArrowUpRight aria-hidden="true" size={16} />
              </span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
