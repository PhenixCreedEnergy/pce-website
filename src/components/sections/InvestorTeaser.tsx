"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { ArrowRight, TrendingUp, Globe2, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: TrendingUp,
    title: "$4.2B market opportunity",
    desc: "Africa's EV market projected to grow 42% CAGR through 2035",
  },
  {
    icon: Globe2,
    title: "First-mover advantage",
    desc: "Operating in 18 countries with exclusive government concessions",
  },
  {
    icon: ShieldCheck,
    title: "ESG-aligned returns",
    desc: "Carbon credit revenue streams layered on top of charging margins",
  },
];

export function InvestorTeaser() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0058B3 0%, #003d80 100%)",
      }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(48,231,237,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative section-padding max-w-[1440px] mx-auto py-20 md:py-40 lg:py-52">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Text */}
          <AnimatedSection className="lg:w-2/5" direction="left">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              The infrastructure play<br />of the decade.
            </h2>
            <p className="text-blue-100 text-base md:text-lg leading-relaxed mb-8">
              Phoenix Creed Energy sits at the intersection of electrification,
              digital payments, and climate tech — three of the fastest-growing
              sectors on the continent.
            </p>
            <Link
              href="/investors"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-deep-blue font-semibold text-base hover:bg-blue-50 transition-all duration-200"
            >
              Investor Materials <ArrowRight size={16} />
            </Link>
          </AnimatedSection>

          {/* Pillars */}
          <div className="lg:w-3/5 flex flex-col gap-4">
            {pillars.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.15} direction="right">
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-start gap-5 p-6 rounded-2xl cursor-default transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "0.5px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(48,231,237,0.15)", border: "0.5px solid rgba(48,231,237,0.3)" }}
                  >
                    <p.icon size={22} style={{ color: "#30E7ED" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{p.title}</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
