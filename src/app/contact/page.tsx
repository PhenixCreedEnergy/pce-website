import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Phoenix Creed Energy",
  description:
    "Contact Phoenix Creed Energy for EV charging partnerships, fleet solutions, investor relations, EV service appointments, support, and press inquiries across Africa.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
