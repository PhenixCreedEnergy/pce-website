import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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

      </section>

      <NetworkCoverage />
      <ChargingSpeeds />
      <BuiltToLast />
      <ChargingCTA />
    </>
  );
}
