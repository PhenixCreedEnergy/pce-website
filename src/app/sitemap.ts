import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/charging-network", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pce-app", changeFrequency: "monthly", priority: 0.8 },
  { path: "/investors", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/products/ev-service", changeFrequency: "monthly", priority: 0.8 },
] satisfies Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: route.path === "/" ? siteUrl : `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
