import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nasforbeginners.com";
  const guides = [
    "proxmox-vs-unraid-vs-truenas", "jellyfin-vs-plex", "n100-mini-pc-guide",
    "expose-server-safely", "raid-vs-backup", "immich-setup-guide",
    "docker-for-beginners", "first-server-checklist", "used-hardware-guide",
    "why-multiple-mini-pcs", "self-hosting-a-website", "low-power-silent-server",
  ];
  const tools = [
    "build-recommender", "power-calculator", "app-picker",
    "storage-planner", "hardware-identifier", "noise-estimator",
  ];
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: "monthly", priority: 0.3 },
    ...tools.map(t => ({ url: `${base}/tools/${t}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...guides.map(g => ({ url: `${base}/guides/${g}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
