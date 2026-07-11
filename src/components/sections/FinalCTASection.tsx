"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export function FinalCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #060d1f 0%, #0a1628 55%, #050b1a 100%)" }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Electric glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,88,179,0.14) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(48,231,237,0.07) 0%, transparent 70%)", filter: "blur(48px)" }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(48,231,237,0.45) 30%, rgba(0,88,179,0.6) 70%, transparent 100%)" }} />

      <div className="relative section-padding max-w-[1100px] mx-auto py-24 md:py-40 text-center">

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.12, ease }}
          className="font-bold text-white leading-tight tracking-tight mb-6"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.4rem)", letterSpacing: "-0.025em" }}
        >
          Help Build Africa's<br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #ffffff 0%, #30E7ED 50%, #0058B3 100%)" }}
          >
            Electric Future.
          </span>
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease }}
          className="text-base md:text-lg leading-relaxed mx-auto mb-10"
          style={{ color: "rgba(255,255,255,0.58)", maxWidth: 580 }}
        >
          Partner with Phoenix Creed Energy as we develop the infrastructure
          powering the next generation of mobility across Africa.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.32, ease }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            href="/investors"
            className="inline-flex items-center justify-center gap-2.5 rounded-full font-semibold text-white transition-all duration-200"
            style={{
              padding: "16px 40px", fontSize: 15,
              background: "#0058B3",
              boxShadow: "0 4px 32px rgba(0,88,179,0.50), 0 1px 0 rgba(255,255,255,0.12) inset",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 8px 40px rgba(0,88,179,0.68), 0 0 20px rgba(48,231,237,0.15), 0 1px 0 rgba(255,255,255,0.12) inset";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 4px 32px rgba(0,88,179,0.50), 0 1px 0 rgba(255,255,255,0.12) inset";
              el.style.transform = "translateY(0)";
            }}
          >
            Investor Relations <ArrowRight size={16} />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full font-medium text-white transition-all duration-200"
            style={{
              padding: "16px 40px", fontSize: 15,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.13)";
              el.style.borderColor = "rgba(48,231,237,0.40)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.07)";
              el.style.borderColor = "rgba(255,255,255,0.18)";
              el.style.transform = "translateY(0)";
            }}
          >
            Contact Us
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
