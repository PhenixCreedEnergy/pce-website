import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StatCard } from "@/components/ui/StatCard";
import { CTASection } from "@/components/sections/CTASection";
import { Zap, Clock, Shield, Wifi, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Charging Network",
  description: "Africa's largest EV charging network — 2,500+ stations across 18 countries with 350kW ultra-fast charging.",
};

const tiers = [
  {
    name: "PCE Standard",
    speed: "22 kW",
    type: "AC Level 2",
    time: "~4 hours",
    ideal: "Hotels & offices",
    style: { background: "#F5F7FA", border: "0.5px solid #E5E7EB" },
    badge: null,
  },
  {
    name: "PCE Fast",
    speed: "150 kW",
    type: "DC Fast Charge",
    time: "~30 min",
    ideal: "Shopping centres",
    style: { background: "#EEF5FF", border: "0.5px solid rgba(0,88,179,0.2)" },
    badge: "Popular",
  },
  {
    name: "PCE SuperCharge",
    speed: "350 kW",
    type: "DC Ultra-Fast",
    time: "~10 min",
    ideal: "Highways & airports",
    style: { background: "#0058B3", border: "none" },
    badge: "Fastest",
    dark: true,
  },
];

const features = [
  { icon: Zap, title: "350kW Peak Power", desc: "Add 100 km of range in under 5 minutes" },
  { icon: Clock, title: "24/7 Operations", desc: "Round-the-clock support and live monitoring" },
  { icon: Shield, title: "ISO Certified", desc: "Meets international EV charging safety standards" },
  { icon: Wifi, title: "Always Connected", desc: "Real-time diagnostics and OTA firmware updates" },
];

export default function ChargingNetworkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(0,88,179,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,88,179,0.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(48,231,237,0.08) 0%, transparent 70%)" }}
        />
        <div className="relative section-padding max-w-[1440px] mx-auto">
          <AnimatedSection>
            <div className="chip mb-5">Charging Network</div>
            <h1 className="text-5xl md:text-7xl font-bold text-pce-dark mb-6 max-w-2xl leading-tight">
              Charge anywhere.<br />Charge fast.
            </h1>
            <p className="text-pce-gray text-lg md:text-xl max-w-xl leading-relaxed mb-8">
              2,500+ stations spanning 18 African countries — strategically placed
              where you need them most.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-deep-blue text-white font-semibold text-sm hover:bg-deep-blue/90 transition-all hover:shadow-blue-sm"
            >
              Partner with us <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding max-w-[1440px] mx-auto py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { numericValue: 2500, suffix: "+", label: "Stations" },
            { numericValue: 18, suffix: "", label: "Countries" },
            { numericValue: 350, suffix: "kW", label: "Peak Power" },
            { numericValue: 99, suffix: "%", label: "Uptime SLA" },
          ].map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.08}>
              <StatCard {...s} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-pce-gray-light py-20 md:py-28">
        <div className="section-padding max-w-[1440px] mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-pce-dark mb-4">Choose your speed</h2>
            <p className="text-pce-gray text-lg max-w-xl mx-auto">
              Every PCE station type is designed for a specific use case — from overnight hotel parking to highway pit stops.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tiers.map((tier, i) => (
              <AnimatedSection key={tier.name} delay={i * 0.1}>
                <div
                  className="relative rounded-2xl p-8 h-full"
                  style={tier.style}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                >
                  {tier.badge && (
                    <span
                      className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-bold"
                      style={
                        tier.dark
                          ? { background: "rgba(48,231,237,0.2)", color: "#30E7ED" }
                          : { background: "rgba(0,88,179,0.10)", color: "#0058B3" }
                      }
                    >
                      {tier.badge}
                    </span>
                  )}
                  <div
                    className="text-5xl font-bold mb-1"
                    style={{ color: tier.dark ? "#30E7ED" : "#0058B3" }}
                  >
                    {tier.speed}
                  </div>
                  <div className={`text-sm mb-4 ${tier.dark ? "text-blue-200" : "text-pce-gray"}`}>{tier.type}</div>
                  <div className={`text-xl font-semibold mb-1 ${tier.dark ? "text-white" : "text-pce-dark"}`}>{tier.name}</div>
                  <div className={`text-sm mb-1 ${tier.dark ? "text-blue-100" : "text-pce-gray"}`}>Full charge in {tier.time}</div>
                  <div className={`text-xs ${tier.dark ? "text-blue-200" : "text-pce-gray"}`}>Ideal for: {tier.ideal}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding max-w-[1440px] mx-auto py-20 md:py-28">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-pce-dark mb-4">Built to last</h2>
          <p className="text-pce-gray text-lg max-w-xl mx-auto">Infrastructure you can depend on.</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.08}>
              <div className="surface surface-hover rounded-2xl p-6 h-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(0,88,179,0.08)" }}
                >
                  <f.icon size={20} style={{ color: "#0058B3" }} />
                </div>
                <h3 className="font-semibold text-pce-dark mb-2">{f.title}</h3>
                <p className="text-pce-gray text-sm leading-relaxed">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
