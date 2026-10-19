import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import EnergyStoragePageClient from "./EnergyStoragePageClient";

export const metadata: Metadata = createPageMetadata({
  title: "Grid-Scale Energy Storage Systems",
  description:
    "Phoenix Creed Energy battery energy storage systems for homes, businesses and grid operators — solar firming, backup power, peak shaving and EV charging support across Africa.",
  path: "/products/energy-storage",
  image: "/energy-source.png",
});

export default function EnergyStoragePage() {
  return <EnergyStoragePageClient />;
}
