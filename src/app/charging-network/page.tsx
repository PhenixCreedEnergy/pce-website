import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CTASection } from "@/components/sections/CTASection";
import { NetworkMapSection } from "@/components/sections/NetworkMapSection";
import { Zap, Clock, Shield, Wifi, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "EV Charging Network",
  description:
    "Explore Phoenix Creed Energy's planned EV charging network with standard, fast, and 350kW ultra-fast charging across strategic African highways, airports, malls, and urban hubs.",
  path: "/charging-network",
  image: "/charging-hub.png",
});

const tiers = [
  {
    name: "PCE Standard",
    speed: "22 kW",
    type: "AC Level 2",
    time: "~4 hours",
    ideal: "Hotels & offices",
    style: { background: "#F5F7FA", border: "0.5px solid #E5E7EB" },
    badge: null,
    dark: false,
  },
  {
    name: "PCE Fast",
    speed: "150 kW",
    type: "DC Fast Charge",
    time: "~30 min",
    ideal: "Shopping centres",
    style: { background: "#EEF5FF", border: "0.5px solid rgba(0,88,179,0.2)" },
    badge: "Popular",
    dark: false,
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
  { icon: Zap,    title: "350kW Peak Power",   desc: "Add 100 km of range in under 5 minutes" },
  { icon: Clock,  title: "24/7 Operations",     desc: "Round-the-clock support and live monitoring" },
  { icon: Shield, title: "ISO Certified",       desc: "Meets international EV charging safety standards" },
  { icon: Wifi,   title: "Always Connected",    desc: "Real-time diagnostics and OTA firmware updates" },
];

const liveStats = [
  { value: "2,487", label: "Stations Online", shortLabel: "Online", dot: "#30E7ED" },
  { value: "1,204", label: "Active Sessions",  shortLabel: "Active", dot: "#22d3ee" },
  { value: "98.7%", label: "Network Uptime",   shortLabel: "Uptime", dot: "#30E7ED" },
];

export default function ChargingNetworkPage() {
  return (
    <>
      {/* ── Full-width cinematic hero ── */}
      <section className="relative overflow-hidden" style={{ height: "100vh", minHeight: 680 }}>
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/charging-hub.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />

        {/* Layered overlays */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(4,8,20,0.82) 0%, rgba(4,8,20,0.42) 56%, rgba(4,8,20,0.18) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,8,20,0.88) 0%, rgba(4,8,20,0.30) 50%, transparent 78%)" }} />

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        {/* Live network status ticker */}
        <div className="absolute left-0 right-0 z-10 section-padding hidden md:block" style={{ bottom: "clamp(42px, 7vh, 72px)" }}>
          <div className="flex justify-start md:justify-end">
            <div className="flex items-center justify-start md:justify-end gap-2 md:gap-3 py-1.5 flex-nowrap opacity-90 overflow-x-auto hide-scrollbar max-w-full">
              {liveStats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-1 md:gap-2.5 whitespace-nowrap px-2.5 py-1 md:px-4 md:py-2 rounded-2xl md:rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(48,231,237,0.15)", backdropFilter: "blur(12px)" }}
                >
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: s.dot }} />
                  <span className="text-white font-semibold text-[11px] md:text-sm">{s.value}</span>
                  <span className="text-gray-400 text-[11px] md:hidden">{s.shortLabel}</span>
                  <span className="text-gray-400 text-xs hidden md:inline">{s.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-1 whitespace-nowrap text-[11px] md:text-xs" style={{ color: "#30E7ED" }}>
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#30E7ED] animate-pulse flex-shrink-0" />
                LIVE
              </div>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex items-end section-padding" style={{ paddingBottom: "clamp(42px, 7vh, 72px)" }}>
          <div style={{ maxWidth: 620 }}>
            <h1 className="font-bold text-white leading-[1.08] tracking-normal mb-4"
              style={{ fontSize: "clamp(2.05rem, 3.05vw, 3.65rem)", textShadow: "0 3px 24px rgba(0,0,0,0.58)" }}>
              Charge anywhere.<br />
              <span className="bg-clip-text text-transparent italic"
                style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #7ab8ff 100%)" }}>
                Charge fast.
              </span>
            </h1>

            <p className="leading-relaxed mb-7"
              style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(0.95rem, 0.95vw, 1.05rem)", maxWidth: 540, textShadow: "0 2px 16px rgba(0,0,0,0.55)" }}>
              2,500+ ultra-fast stations spanning 18 African countries — strategically
              placed at highways, airports, malls, and urban hubs.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-5">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200"
                style={{ padding: "15px 30px", fontSize: 15, background: "#0058B3", color: "white", boxShadow: "0 4px 28px rgba(0,88,179,0.45)" }}>
                Partner with us <ArrowRight size={15} />
              </Link>
              <Link href="/pce-app"
                className="inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200"
                style={{ padding: "15px 30px", fontSize: 15, background: "rgba(255,255,255,0.10)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.24)", color: "rgba(255,255,255,0.90)" }}>
                Find a Charger
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>Explore</span>
          <ChevronDown size={16} style={{ color: "rgba(48,231,237,0.6)" }} className="animate-bounce" />
        </div>
      </section>

      {/* ── Mission Control Map (dark dashboard) ── */}
      <NetworkMapSection />

      {/* ── Charger tiers ── */}
      <section className="bg-pce-gray-light py-14 md:py-28">
        <div className="section-padding max-w-[1440px] mx-auto">
          <AnimatedSection className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-5xl font-bold text-pce-dark mb-3 md:mb-4">Choose your speed</h2>
            <p className="text-pce-gray text-base md:text-lg max-w-xl mx-auto">
              From overnight hotel parking to highway pit stops — every PCE station is purpose-built.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tiers.map((tier, i) => (
              <AnimatedSection key={tier.name} delay={i * 0.1}>
                <div className="relative rounded-xl md:rounded-2xl p-6 md:p-8 h-full" style={tier.style}>
                  {tier.badge && (
                    <span className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-bold"
                      style={tier.dark
                        ? { background: "rgba(48,231,237,0.2)", color: "#30E7ED" }
                        : { background: "rgba(0,88,179,0.10)", color: "#0058B3" }}>
                      {tier.badge}
                    </span>
                  )}
                  <div className="text-4xl md:text-5xl font-bold mb-1" style={{ color: tier.dark ? "#30E7ED" : "#0058B3" }}>
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

      {/* ── Features ── */}
      <section className="section-padding max-w-[1440px] mx-auto py-14 md:py-28">
        <AnimatedSection className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-bold text-pce-dark mb-3 md:mb-4">Built to last</h2>
          <p className="text-pce-gray text-base md:text-lg max-w-xl mx-auto">Infrastructure you can depend on.</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.08}>
              <div className="surface surface-hover rounded-xl md:rounded-2xl p-5 md:p-6 h-full">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(0,88,179,0.08)" }}>
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
