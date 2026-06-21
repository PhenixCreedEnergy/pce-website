"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/ui/HeroCarousel";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#040814]"
      style={{ minHeight: "100vh", paddingBottom: 140 }}
    >
      <HeroCarousel />

      {/* ── Content overlay ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-center section-padding"
        style={{ maxWidth: 1440, margin: "0 auto", left: 0, right: 0, paddingTop: 88 }}
      >
        <div style={{ maxWidth: 600 }}>

          <motion.h1
            className="font-bold leading-[1.02] tracking-tight text-white"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.4rem)", marginBottom: 28 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            Powering{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #7ab8ff 100%)" }}
            >
              Africa's
            </span>
            <br />
            Electric Future.
          </motion.h1>

          <motion.p
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
              color: "rgba(255,255,255,0.65)",
              maxWidth: 440,
              lineHeight: 1.7,
              marginBottom: 48,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease }}
          >
            Building Africa's next-generation EV charging network.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease }}
          >
            <Link
              href="/charging-network"
              className="inline-flex items-center gap-2.5 rounded-full font-semibold text-white transition-all duration-200"
              style={{ padding: "14px 32px", fontSize: 15, background: "#0058B3", boxShadow: "0 4px 28px rgba(0,88,179,0.55)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 8px 36px rgba(0,88,179,0.70)"; el.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 4px 28px rgba(0,88,179,0.55)"; el.style.transform = "translateY(0)"; }}
            >
              Explore Network <ArrowRight size={17} />
            </Link>
            <Link
              href="/investors"
              className="inline-flex items-center gap-2 rounded-full font-medium text-white transition-all duration-200"
              style={{ padding: "14px 32px", fontSize: 15, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
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
