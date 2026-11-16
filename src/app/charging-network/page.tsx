import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import { BuiltToLast, ChargingCTA, ChargingSpeeds, NetworkCoverage } from "./ChargingNetworkSections";

export const metadata: Metadata = createPageMetadata({
  title: "EV Charging Network",
  description:
    "Explore Phoenix Creed Energy's planned EV charging network with standard, fast, and 350kW ultra-fast charging across strategic African highways, airports, malls, and urban hubs.",
  path: "/charging-network",
  image: "/charging-hub.png",
});

const liveStats = [
  { value: "22 kW",  label: "Standard",    shortLabel: "Standard", dot: "#30E7ED" },
  { value: "150 kW", label: "Fast",        shortLabel: "Fast",     dot: "#22d3ee" },
  { value: "350 kW", label: "SuperCharge", shortLabel: "Super",    dot: "#30E7ED" },
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

        {/* Charging tiers */}
        <div className="absolute left-0 right-0 z-10 section-padding hidden md:block" style={{ bottom: "clamp(42px, 7vh, 72px)" }}>
          <div className="flex justify-start md:justify-end">
            <div className="flex items-center justify-start md:justify-end gap-2 md:gap-3 py-1.5 flex-nowrap opacity-90 overflow-x-auto hide-scrollbar max-w-full">
              {liveStats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-1 md:gap-2.5 whitespace-nowrap px-2.5 py-1 md:px-4 md:py-2 rounded-2xl md:rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(48,231,237,0.15)", backdropFilter: "blur(12px)" }}
                >
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                  <span className="text-white font-semibold text-[11px] md:text-sm">{s.value}</span>
                  <span className="text-gray-400 text-[11px] md:hidden">{s.shortLabel}</span>
                  <span className="text-gray-400 text-xs hidden md:inline">{s.label}</span>
                </div>
              ))}
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

            <p className="leading-relaxed m-0"
              style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(0.95rem, 0.95vw, 1.05rem)", maxWidth: 540, textShadow: "0 2px 16px rgba(0,0,0,0.55)" }}>
              Ultra-fast charging hubs planned for highways, airports, malls,
              and urban centres across Africa.
            </p>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>Explore</span>
          <ChevronDown size={16} style={{ color: "rgba(48,231,237,0.6)" }} className="animate-bounce" />
        </div>
      </section>

      <NetworkCoverage />
      <ChargingSpeeds />
      <BuiltToLast />
      <ChargingCTA />
    </>
  );
}
