"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Zap, Battery, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroCarousel } from "@/components/ui/HeroCarousel";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Minimal map screen shown inside the hero phone ─────────── */
function HeroPhoneScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#0f172a" }}>
      {/* Status bar */}
      <div className="flex justify-between items-center px-4 pt-2 pb-1">
        <span className="text-white text-[10px] font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-px items-end">
            {[6, 9, 12, 12, 12].map((h, i) => (
              <div key={i} className="w-0.5 rounded-sm bg-white" style={{ height: h }} />
            ))}
          </div>
          <div className="rounded-sm overflow-hidden ml-1" style={{ width: 18, height: 9, border: "1px solid rgba(255,255,255,0.4)" }}>
            <div className="h-full bg-white" style={{ width: "78%" }} />
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="mx-3 mb-2 px-3 py-2 rounded-xl flex items-center gap-2" style={{ background: "rgba(255,255,255,0.08)" }}>
        <MapPin size={11} style={{ color: "#30E7ED" }} />
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>Find chargers near you…</span>
      </div>

      {/* Map area */}
      <div className="flex-1 relative mx-3 rounded-2xl overflow-hidden" style={{ background: "#1e293b" }}>
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {[20, 40, 60, 80].map(y => <line key={`h${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#30E7ED" strokeWidth="0.5" />)}
          {[20, 40, 60, 80].map(x => <line key={`v${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#30E7ED" strokeWidth="0.5" />)}
        </svg>
        {/* Roads */}
        <svg className="absolute inset-0 w-full h-full">
          <path d="M 30 80 Q 120 50 200 75 T 300 65" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="5" />
          <path d="M 10 140 L 300 130" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
          <path d="M 150 10 L 148 200" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
        </svg>
        {/* Station pins */}
        {[
          { x: "35%", y: "42%", active: true },
          { x: "62%", y: "38%", active: true },
          { x: "22%", y: "62%", active: false },
          { x: "75%", y: "55%", active: true },
        ].map((pin, i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pin.x, top: pin.y }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{
              background: pin.active ? "#30E7ED" : "rgba(255,255,255,0.22)",
              boxShadow: pin.active ? "0 0 8px rgba(48,231,237,0.7)" : "none",
            }}>
              <Zap size={9} style={{ color: pin.active ? "#0a1628" : "rgba(255,255,255,0.45)" }} />
            </div>
            {pin.active && <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(48,231,237,0.28)" }} />}
          </div>
        ))}
        {/* User dot */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "50%" }}>
          <div className="w-4 h-4 rounded-full border-2 border-white" style={{ background: "#0058B3", boxShadow: "0 0 12px rgba(0,88,179,0.8)" }} />
          <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(0,88,179,0.22)" }} />
        </div>
        {/* Info chip */}
        <div className="absolute top-2 right-2 px-2 py-1 rounded-lg" style={{ background: "rgba(6,13,31,0.90)", backdropFilter: "blur(8px)", border: "1px solid rgba(48,231,237,0.28)" }}>
          <p className="text-[9px] font-bold" style={{ color: "#30E7ED" }}>350kW · 0.8km</p>
          <p className="text-[8px]" style={{ color: "rgba(255,255,255,0.55)" }}>4 bays free</p>
        </div>
      </div>

      {/* Station card */}
      <div className="mx-3 mt-2 mb-2 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(48,231,237,0.14)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-[11px]">PCE Lagos Island</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={8} fill="#F59E0B" style={{ color: "#F59E0B" }} />
              <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.45)" }}>4.9 · 0.8 km · Open</span>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-full text-[9px] font-bold" style={{ background: "rgba(48,231,237,0.14)", color: "#30E7ED" }}>
            Navigate
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Phone mockup with entrance + float animation ───────────── */
function HeroPhone({ reduced }: { reduced: boolean }) {
  const entranceVariants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : 160,
      scale: reduced ? 1 : 0.95,
      rotateX: reduced ? 0 : 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: reduced ? 0.01 : 1.35,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.45,
      },
    },
  };

  const floatTransition = reduced
    ? {}
    : {
        y: {
          duration: 5.5,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut",
          delay: 1.9,
        },
      };

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: 1000 }}>
      {/* Pulsing electric-blue glow */}
      {!reduced && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            inset: "-60px -48px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse 80% 70% at 50% 55%, rgba(0,88,179,0.32) 0%, rgba(48,231,237,0.10) 45%, transparent 70%)",
            filter: "blur(28px)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.9 }}
        />
      )}

      {/* Entrance + float wrapper */}
      <motion.div
        variants={entranceVariants}
        initial="hidden"
        animate="visible"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, -8, 0] }}
          transition={floatTransition}
        >
          {/* Drop shadow beneath phone */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: -28,
              left: "50%",
              transform: "translateX(-50%)",
              width: "70%",
              height: 28,
              borderRadius: "50%",
              background: "rgba(0,88,179,0.22)",
              filter: "blur(18px)",
            }}
          />

          {/* iPhone shell */}
          <div
            style={{
              width: 240,
              height: 496,
              borderRadius: 40,
              background: "linear-gradient(145deg, #3d3d3d 0%, #1c1c1e 40%, #2c2c2e 100%)",
              boxShadow: [
                "0 0 0 1px rgba(255,255,255,0.12)",
                "0 0 0 2px rgba(0,0,0,0.85)",
                "0 32px 72px rgba(0,0,0,0.80)",
                "0 0 48px rgba(0,88,179,0.20)",
                "inset 0 1px 0 rgba(255,255,255,0.14)",
              ].join(", "),
              position: "relative",
              overflow: "visible",
            }}
          >
            {/* Side buttons */}
            {[
              { side: "left",  top: 90,  h: 26 },
              { side: "left",  top: 126, h: 45 },
              { side: "left",  top: 181, h: 45 },
              { side: "right", top: 120, h: 68 },
            ].map((b, i) => (
              <div key={i} style={{
                position: "absolute",
                [b.side]: -3,
                top: b.top,
                width: 3,
                height: b.h,
                borderRadius: b.side === "left" ? "3px 0 0 3px" : "0 3px 3px 0",
                background: "linear-gradient(180deg,#404040,#2a2a2a)",
                boxShadow: b.side === "left" ? "-1px 0 2px rgba(0,0,0,0.6)" : "1px 0 2px rgba(0,0,0,0.6)",
              }} />
            ))}

            {/* Screen */}
            <div style={{ position: "absolute", inset: 3, borderRadius: 37, overflow: "hidden", background: "#000" }}>
              {/* Dynamic Island */}
              <div style={{
                position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
                width: 82, height: 24, borderRadius: 16, background: "#000", zIndex: 30,
                boxShadow: "0 0 0 1.5px rgba(255,255,255,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }} />
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#1c1c1c" }} />
              </div>

              {/* App content */}
              <div style={{ position: "absolute", inset: 0, paddingTop: 38 }}>
                <HeroPhoneScreen />
              </div>

              {/* Home indicator */}
              <div style={{
                position: "absolute", bottom: 5, left: "50%",
                transform: "translateX(-50%)",
                width: 72, height: 3, borderRadius: 2,
                background: "rgba(255,255,255,0.28)", zIndex: 25,
              }} />
            </div>
          </div>

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: 60,
              right: -28,
              background: "rgba(6,13,31,0.88)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(48,231,237,0.30)",
              borderRadius: 14,
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 7,
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#30E7ED", boxShadow: "0 0 6px #30E7ED", display: "inline-block", flexShrink: 0 }}
              className="animate-pulse" />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#30E7ED" }}>2,487 Online</span>
          </motion.div>

          {/* Charging badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: 80,
              left: -36,
              background: "rgba(6,13,31,0.88)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(0,88,179,0.35)",
              borderRadius: 14,
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 7,
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            <Battery size={12} style={{ color: "#0058B3", flexShrink: 0 }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>350kW Fast Charge</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Hero section ───────────────────────────────────────────── */
export function HeroSection() {
  const reduced = useReducedMotion() ?? false;

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
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0"
          style={{ paddingTop: "clamp(60px, 10vmax, max(80px, 14vh))" }}>

          {/* ── Left: text ── */}
          <div style={{ maxWidth: 600 }} className="w-full lg:w-auto">
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

          {/* ── Right: phone (hidden on small screens, shows below text on md, right on lg) ── */}
          <div className="hidden md:flex lg:flex-shrink-0 items-center justify-center"
            style={{ paddingRight: "clamp(0px, 4vw, 60px)" }}>
            <HeroPhone reduced={reduced} />
          </div>
        </div>

        {/* Mobile phone — below text */}
        <div className="md:hidden absolute bottom-8 right-0 left-0 flex justify-center pointer-events-none"
          style={{ transform: "scale(0.72)", transformOrigin: "bottom center" }}>
          <HeroPhone reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
