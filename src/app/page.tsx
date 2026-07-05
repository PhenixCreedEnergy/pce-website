import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { AppPreviewSection } from "@/components/sections/AppPreviewSection";
import { InvestorTeaser } from "@/components/sections/InvestorTeaser";
import { CTASection } from "@/components/sections/CTASection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { createPageMetadata, siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Powering Africa's Electric Future",
  description:
    "Phoenix Creed Energy is building EV charging infrastructure, intelligent mobility software, fleet solutions, battery storage, and professional EV servicing across Africa.",
  path: "/",
});

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/pce-logo.png`,
  description:
    "Phoenix Creed Energy builds electric mobility infrastructure, EV charging networks, battery storage, fleet solutions, software, and professional EV servicing for African markets.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "info@phoenixcreedenergy.com",
    areaServed: "Africa",
    availableLanguage: "en",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HeroSection />
      <StatsSection />
      <WhatWeBuild />
      <AppPreviewSection />
      <InvestorTeaser />
      <CTASection />
      <FinalCTASection />
    </>
  );
}
