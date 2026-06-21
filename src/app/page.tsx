import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { NetworkMapSection } from "@/components/sections/NetworkMapSection";
import { AppPreviewSection } from "@/components/sections/AppPreviewSection";
import { InvestorTeaser } from "@/components/sections/InvestorTeaser";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <NetworkMapSection />
      <AppPreviewSection />
      <InvestorTeaser />
      <CTASection />
    </>
  );
}
