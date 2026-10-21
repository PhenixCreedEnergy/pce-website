"use client";

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
              textShadow: "0 2px 16px rgba(0,0,0,0.55)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease }}
          >
            Building Africa&apos;s next-generation EV charging network.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
