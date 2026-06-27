import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.pceenergies.com/sitemap.xml",
    host: "https://www.pceenergies.com",
  };
}
