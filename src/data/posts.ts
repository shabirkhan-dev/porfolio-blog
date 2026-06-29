import { isSupabaseConfigured } from "@/lib/supabase/config";
import { slugifyHeading } from "@/data/site";

export { isSupabaseConfigured };

export type BlogCategory =
  | "Engineering"
  | "Frontend"
  | "Backend"
  | "AI"
  | "Product"
  | "Design"
  | "Personal";

export type PostStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  excerpt: string;
  summary: string;
  standfirst?: string;
  takeaways?: string[];
  body: string;
  status: PostStatus;
};

export const categories: BlogCategory[] = [
  "Engineering",
  "Frontend",
  "Backend",
  "AI",
  "Product",
  "Design",
  "Personal",
];

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/^#{1,6}\s+/gm, " ")
    .replace(/^>\s?(\[!.*?\]\s*)?/gm, " ")
    .replace(/[*_~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateReadingTimeFromMarkdown(markdown: string) {
  const words = stripMarkdown(markdown).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function getReadingTime(post: Pick<BlogPost, "body">) {
  return estimateReadingTimeFromMarkdown(post.body);
}

export function getTableOfContents(post: Pick<BlogPost, "body">) {
  const headings = [...post.body.matchAll(/^##\s+(.+)$/gm)];

  return headings.map((match) => {
    const label = match[1].trim();
    return {
      id: slugifyHeading(label),
      label,
    };
  });
}

export function getReadableText(
  post: Pick<BlogPost, "title" | "standfirst" | "body">,
) {
  const parts = [post.title];
  if (post.standfirst) parts.push(post.standfirst);
  parts.push(stripMarkdown(post.body));
  return parts.join(". ").replace(/\s+/g, " ").trim();
}
