"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroCarousel } from "@/components/ui/HeroCarousel";

export function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100vh", minHeight: 600 }}
    >
      {/* Full-bleed carousel */}
      <HeroCarousel />

      {/* Text overlay — z-20 sits above carousel's z-10 gradients */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-center section-padding"
        style={{ maxWidth: 1440, margin: "0 auto", left: 0, right: 0, paddingTop: 80 }}
      >
        <div style={{ maxWidth: 680 }}>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(48,231,237,0.15)",
              border: "1px solid rgba(48,231,237,0.35)",
              color: "#30E7ED",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#30E7ED", boxShadow: "0 0 8px #30E7ED" }}
            />
            Africa's Premier EV Infrastructure
          </div>

          {/* Headline */}
          <h1
            className="font-bold leading-[1.02] tracking-tight mb-6 text-white"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.2rem)" }}
          >
            Powering{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #7ab8ff 100%)",
              }}
            >
              Africa's
            </span>
            <br />
            Electric Future.
          </h1>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.78)", maxWidth: 480 }}
          >
            Building the continent's most advanced EV charging network — from
            Lagos to Nairobi, from Accra to Johannesburg.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14">
            <Link
              href="/charging-network"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base tracking-wide text-white transition-all duration-200"
              style={{
                background: "#0058B3",
                boxShadow: "0 4px 24px rgba(0,88,179,0.50)",
              }}
            >
              Explore Network
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/investors"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-base text-white transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.30)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              Investor Overview
            </Link>
          </div>

          {/* Trust metrics */}
          <div
            className="flex flex-wrap items-center gap-8 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
          >
            {[
              { n: "2,500+", label: "Stations live" },
              { n: "18", label: "Countries" },
              { n: "98%", label: "Uptime SLA" },
              { n: "1M+", label: "Sessions" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl font-bold" style={{ color: "#30E7ED" }}>{s.n}</span>
                <span className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.50)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-14 right-8 md:right-16 z-20 flex flex-col items-center gap-2"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        <span className="text-[9px] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
