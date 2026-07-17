import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { getLabSlugs } from "@/data/lab";
import { getPublishedPosts } from "@/data/posts.server";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shabirkhan.dev";

/** Stable stamp for routes without their own content date. */
const SITE_REVISED = new Date("2026-07-17");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const latestPost = posts[0]
    ? new Date(posts[0].publishedAt)
    : SITE_REVISED;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: SITE_REVISED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: SITE_REVISED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/lab`,
      lastModified: SITE_REVISED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: SITE_REVISED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.slug}`,
    lastModified: SITE_REVISED,
    changeFrequency: "yearly",
    priority: 0.75,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const labRoutes: MetadataRoute.Sitemap = getLabSlugs().map((slug) => ({
    url: `${SITE_URL}/lab/${slug}`,
    lastModified: SITE_REVISED,
    changeFrequency: "monthly",
    priority: 0.55,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...postRoutes, ...labRoutes];
}
