import type { MetadataRoute } from "next";

const BASE = "https://www.pceenergies.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                        lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/charging-network`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/pce-app`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/investors`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/about`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
