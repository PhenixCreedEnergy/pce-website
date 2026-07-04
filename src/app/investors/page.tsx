import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import InvestorsPageClient from "./InvestorsPageClient";

export const metadata: Metadata = createPageMetadata({
  title: "Investor Relations",
  description:
    "Review Phoenix Creed Energy's investor story, Africa EV market opportunity, expansion roadmap, early-stage metrics, and infrastructure strategy.",
  path: "/investors",
});

export default function InvestorsPage() {
  return <InvestorsPageClient />;
}
