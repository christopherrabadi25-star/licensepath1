import type { MetadataRoute } from "next";
import { GLOSSARY } from "@/lib/glossary";

const BASE = "https://licensepath.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/exam`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/courses`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/glossary`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const glossaryRoutes: MetadataRoute.Sitemap = GLOSSARY.map((e) => ({
    url: `${BASE}/glossary/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...glossaryRoutes];
}
