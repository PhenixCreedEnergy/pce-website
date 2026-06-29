import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { AppPreviewSection } from "@/components/sections/AppPreviewSection";
import { InvestorTeaser } from "@/components/sections/InvestorTeaser";
import { CTASection } from "@/components/sections/CTASection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function HomePage() {
  return (
    <>
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
