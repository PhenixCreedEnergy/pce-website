import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import EVServicePageClient from "./EVServicePageClient";

export const metadata: Metadata = createPageMetadata({
  title: "Professional EV Service and Maintenance",
  description:
    "Book Phoenix Creed Energy EV service for battery diagnostics, battery replacement, motor service, charging system repair, software updates, annual inspections, and fleet maintenance.",
  path: "/products/ev-service",
  image: "/ev-service-hero.jpg",
});

export default function EVServicePage() {
  return <EVServicePageClient />;
}
