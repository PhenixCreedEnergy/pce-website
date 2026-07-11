"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/ui/HeroCarousel";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Hero section ───────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#040814] min-h-[72vh] md:min-h-screen">
      <HeroCarousel />

      {/* Extra overlay for text legibility on smaller viewports */}
      <div
        className="absolute inset-0 z-10 pointer-events-none lg:hidden"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.24) 100%)" }}
      />

      <div
        className="absolute inset-0 z-20 flex items-end section-padding pt-24"
        style={{ paddingBottom: "clamp(42px, 7vh, 72px)" }}
      >
        <div style={{ maxWidth: 620 }}>
          <motion.h1
            className="hero-heading font-sans font-bold tracking-normal text-white"
            style={{
              fontSize: "clamp(2.05rem, 3.05vw, 3.65rem)",
              lineHeight: 1.08,
              marginBottom: "clamp(14px, 1.6vw, 20px)",
              textShadow: "0 3px 24px rgba(0,0,0,0.58)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            <span className="block">
              Powering{" "}
              <span
                className="bg-clip-text text-transparent italic"
                style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #7ab8ff 100%)" }}
              >
                Africa&apos;s
              </span>
            </span>
            <span className="block">
              Electric Future.
            </span>
          </motion.h1>

          <motion.p
            style={{
              fontSize: "clamp(0.95rem, 0.95vw, 1.05rem)",
              color: "rgba(255,255,255,0.82)",
              maxWidth: 540,
              lineHeight: 1.65,
              marginBottom: "clamp(22px, 2.2vw, 28px)",
              textShadow: "0 2px 16px rgba(0,0,0,0.55)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease }}
          >
            Building Africa&apos;s next-generation EV charging network.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease }}
          >
            <Link
              href="/charging-network"
              className="hero-cta inline-flex items-center justify-center gap-2.5 rounded-full font-semibold text-white transition-all duration-200"
              style={{ padding: "15px 30px", fontSize: 15, background: "#0058B3", boxShadow: "0 4px 28px rgba(0,88,179,0.45)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 8px 36px rgba(0,88,179,0.70)"; el.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 4px 28px rgba(0,88,179,0.45)"; el.style.transform = "translateY(0)"; }}
            >
              Explore Network <ArrowRight size={17} />
            </Link>
            <Link
              href="/investors"
              className="hero-cta inline-flex items-center justify-center gap-2 rounded-full font-medium text-white transition-all duration-200"
              style={{
                padding: "15px 30px",
                fontSize: 15,
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.24)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.16)";
                el.style.borderColor = "rgba(255,255,255,0.38)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.10)";
                el.style.borderColor = "rgba(255,255,255,0.24)";
                el.style.transform = "translateY(0)";
              }}
            >
              Investor Overview <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
