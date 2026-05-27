import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nasforbeginners.com";
  const guides = [
    "proxmox-vs-unraid-vs-truenas",
    "jellyfin-vs-plex",
    "n100-mini-pc-guide",
    "expose-server-safely",
    "raid-vs-backup",
    "immich-setup-guide",
    "docker-for-beginners",
    "first-server-checklist",
  ];
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/tools/build-recommender`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/power-calculator`, changeFrequency: "monthly", priority: 0.8 },
    ...guides.map(slug => ({
      url: `${base}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
