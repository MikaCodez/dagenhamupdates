import type { MetadataRoute } from "next";
// Category routes are structural (see the note in the category page), so
// the static list is fine here too — only post URLs need to be CMS-aware.
import { categories } from "@/lib/content/categories";
import { getLatestPosts } from "@/sanity/queries";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/latest-updates",
    "/about",
    "/contact",
    "/subscribe",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${siteConfig.url}/category/${c.slug}`,
    lastModified: new Date(),
  }));

  const posts = await getLatestPosts();
  const articleRoutes = posts.map((p) => ({
    url: `${siteConfig.url}/articles/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
