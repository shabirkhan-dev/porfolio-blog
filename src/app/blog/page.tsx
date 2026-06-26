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
  description: "Writing, notes, and project essays.",
};

export default function BlogPage() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <SectionHeading
          eyebrow="Blog"
          title="Writing on design, shipping, and the web"
          description="Use this index for essays, project retrospectives, and shorter notes."
        />

        <div className="mt-10 divide-y divide-[var(--line)] rounded-lg border border-[var(--line)] bg-white">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="grid gap-4 p-5 transition hover:bg-[var(--background)] md:grid-cols-[180px_1fr_auto] md:items-center"
            >
              <p className="text-sm text-[var(--muted)]">
                {formatDate(post.publishedAt)}
              </p>
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                  {post.excerpt}
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--accent)]">
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
