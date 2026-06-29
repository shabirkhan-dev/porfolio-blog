import "server-only";

import type { Database } from "@/lib/supabase/database.types";
import { createStaticClient } from "@/lib/supabase/static";
import {
  estimateReadingTimeFromMarkdown,
  isSupabaseConfigured,
  type BlogCategory,
  type BlogPost,
} from "@/data/posts";

type PostRow = Database["public"]["Tables"]["posts"]["Row"];

function rowToPost(row: PostRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category as BlogCategory,
    publishedAt: row.published_at ?? row.created_at,
    readingTime: estimateReadingTimeFromMarkdown(row.body),
    featured: row.featured,
    excerpt: row.excerpt,
    summary: row.summary,
    standfirst: row.standfirst ?? undefined,
    takeaways: row.takeaways?.length ? row.takeaways : undefined,
    body: row.body,
    status: row.status,
  };
}

function sortByPublishedDesc(a: BlogPost, b: BlogPost) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getPublishedPosts:", error.message);
    return [];
  }

  return (data ?? []).map(rowToPost).sort(sortByPublishedDesc);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("getPostBySlug:", error.message);
    return null;
  }

  return data ? rowToPost(data) : null;
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.featured) ?? posts[0] ?? null;
}

export async function getPostsByCategory(category?: string) {
  const posts = await getPublishedPosts();

  if (!category || category === "All") {
    return posts;
  }

  return posts.filter((post) => post.category === category);
}

export async function getRelatedPosts(slug: string, category: BlogCategory) {
  const posts = await getPublishedPosts();

  return posts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      if (a.category === category && b.category !== category) return -1;
      if (a.category !== category && b.category === category) return 1;
      return sortByPublishedDesc(a, b);
    })
    .slice(0, 3);
}

export async function getAdjacentPosts(slug: string) {
  const ordered = await getPublishedPosts();
  const index = ordered.findIndex((post) => post.slug === slug);

  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next:
      index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}

export async function getPublishedSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return posts.map((post) => post.slug);
}
