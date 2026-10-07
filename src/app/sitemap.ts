import type { MetadataRoute } from "next";
import { site, work } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-07");
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...work.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${site.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
