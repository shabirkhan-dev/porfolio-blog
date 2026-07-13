import "server-only";

import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  estimateReadingTimeFromMarkdown,
  type BlogCategory,
  type BlogPost,
  type PostStatus,
} from "@/data/posts";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

type PostFrontmatter = {
  title?: string;
  slug?: string;
  category?: BlogCategory;
  excerpt?: string;
  summary?: string;
  standfirst?: string;
  takeaways?: string[];
  featured?: boolean;
  status?: PostStatus;
  draft?: boolean;
  publishedAt?: string | Date;
  date?: string | Date;
};

function toIsoDate(value: string | Date | undefined, fallback: string) {
  if (!value) return fallback;
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed.toISOString();
}

function fileToPost(filename: string, raw: string): BlogPost | null {
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  const body = content.trim();
  const slug =
    frontmatter.slug?.trim() || filename.replace(/\.md$/i, "");

  if (!frontmatter.title?.trim() || !body) {
    console.warn(`Skipping invalid post: ${filename}`);
    return null;
  }

  const status: PostStatus =
    frontmatter.draft === true
      ? "draft"
      : (frontmatter.status ?? "published");

  if (status !== "published") return null;

  const publishedAt = toIsoDate(
    frontmatter.publishedAt ?? frontmatter.date,
    new Date(0).toISOString(),
  );

  return {
    id: slug,
    title: frontmatter.title.trim(),
    slug,
    category: frontmatter.category ?? "Engineering",
    publishedAt,
    readingTime: estimateReadingTimeFromMarkdown(body),
    featured: Boolean(frontmatter.featured),
    excerpt: frontmatter.excerpt?.trim() || frontmatter.summary?.trim() || "",
    summary: frontmatter.summary?.trim() || frontmatter.excerpt?.trim() || "",
    standfirst: frontmatter.standfirst?.trim() || undefined,
    takeaways: frontmatter.takeaways?.length ? frontmatter.takeaways : undefined,
    body,
    status,
  };
}

function sortByPublishedDesc(a: BlogPost, b: BlogPost) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

const loadPublishedPosts = cache(async (): Promise<BlogPost[]> => {
  let entries: string[];

  try {
    entries = await fs.readdir(CONTENT_DIR);
  } catch {
    return [];
  }

  const posts: BlogPost[] = [];

  for (const entry of entries) {
    if (!entry.endsWith(".md")) continue;

    const raw = await fs.readFile(path.join(CONTENT_DIR, entry), "utf8");
    const post = fileToPost(entry, raw);
    if (post) posts.push(post);
  }

  return posts.sort(sortByPublishedDesc);
});

export async function getPublishedPosts(): Promise<BlogPost[]> {
  return loadPublishedPosts();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await loadPublishedPosts();
  return posts.find((post) => post.slug === slug) ?? null;
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
