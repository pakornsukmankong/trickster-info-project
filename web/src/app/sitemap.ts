import type { MetadataRoute } from "next";
import { readyEpisodes } from "@/data/episodes";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const episodePages = readyEpisodes.flatMap((ep) => [
    {
      url: `${siteUrl}/${ep.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...ep.chapters.map((c) => ({
      url: `${siteUrl}/${ep.slug}/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]);

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...episodePages,
    {
      url: `${siteUrl}/monsters`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/items`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
