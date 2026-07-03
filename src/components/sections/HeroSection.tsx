"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/ui/HeroCarousel";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Hero section ───────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#040814] min-h-[75vh] md:min-h-screen">
      <HeroCarousel />

      {/* Extra overlay for text legibility on mobile */}
      <div
        className="absolute inset-0 z-10 pointer-events-none md:hidden"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 100%)" }}
      />

      {/* ── Content overlay ── */}
      <div
        className="absolute inset-0 z-20 flex items-center section-padding"
        style={{ maxWidth: 1440, margin: "0 auto", left: 0, right: 0 }}
      >
        <div style={{ maxWidth: 600 }}>
          <motion.h1
            className="font-bold tracking-tight text-white"
            style={{ fontSize: "clamp(2.1rem, 5.5vw, 5.4rem)", lineHeight: 1.06, marginBottom: "clamp(14px, 3vw, 22px)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            <span className="block sm:inline">Powering</span>
            <span className="block sm:inline sm:before:content-['_']">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #7ab8ff 100%)" }}
              >
                Africa&apos;s
              </span>
            </span>
            <br className="hidden sm:block" />
            <span className="block sm:inline"> Electric Future.</span>
          </motion.h1>

          <motion.p
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
              color: "rgba(255,255,255,0.65)",
              maxWidth: 440,
              lineHeight: 1.7,
              marginBottom: "clamp(20px, 4vw, 36px)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease }}
          >
            Building Africa&apos;s next-generation EV charging network.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease }}
          >
            <Link
              href="/charging-network"
              className="inline-flex items-center justify-center gap-2.5 rounded-full font-semibold text-white transition-all duration-200"
              style={{ padding: "15px 32px", fontSize: 15, background: "#0058B3", boxShadow: "0 4px 28px rgba(0,88,179,0.55)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 8px 36px rgba(0,88,179,0.70)"; el.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 4px 28px rgba(0,88,179,0.55)"; el.style.transform = "translateY(0)"; }}
            >
              Explore Network <ArrowRight size={17} />
            </Link>
            <Link
              href="/investors"
              className="inline-flex items-center justify-center gap-2 rounded-full font-medium text-white transition-all duration-200"
              style={{ padding: "15px 32px", fontSize: 15, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.14)"; el.style.borderColor = "rgba(255,255,255,0.35)"; el.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.08)"; el.style.borderColor = "rgba(255,255,255,0.22)"; el.style.transform = "translateY(0)"; }}
            >
              Investor Overview
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
