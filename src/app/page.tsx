import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AppPreviewSection } from "@/components/sections/AppPreviewSection";
import { InvestorTeaser } from "@/components/sections/InvestorTeaser";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AppPreviewSection />
      <InvestorTeaser />
      <CTASection />
    </>
  );
}
