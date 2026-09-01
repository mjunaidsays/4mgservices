import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/content/insights";
import { industries } from "@/lib/content/industries";
import { services } from "@/lib/content/services";
import { absoluteUrl } from "@/lib/utils";

/**
 * Served at /sitemap.xml. Priorities reflect commercial intent: the quote page
 * and the service pages earn more than the legal pages.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ([
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/quote"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/industries"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/solutions"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/solutions/cognita"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/solutions/mindora"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/solutions/4m-interiors"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/insights"), changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ] satisfies MetadataRoute.Sitemap).map((route) => ({ ...route, lastModified: now }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: absoluteUrl(`/industries/${industry.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const posts = await getPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/insights/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...postRoutes];
}
