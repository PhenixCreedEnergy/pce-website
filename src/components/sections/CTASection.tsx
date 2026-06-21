"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Globe2, Activity, Users } from "lucide-react";

/* ─── Animated counter ──────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 2200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

/* ─── Floating particle ─────────────────────────────────────── */
function Particle({ x, y, size, delay, duration, opacity }: { x: number; y: number; size: number; delay: number; duration: number; opacity: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(48,231,237,${opacity}) 0%, transparent 70%)`,
        filter: "blur(1px)",
      }}
      animate={{
        y: [0, -28, 0],
        opacity: [0, 0.7, 0],
        scale: [0.6, 1.2, 0.6],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Stat counter card ─────────────────────────────────────── */
interface StatProps {
  icon: React.ElementType;
  numericValue?: number;
  value?: string;
  suffix?: string;
  label: string;
  active: boolean;
  delay: number;
}

function StatItem({ icon: Icon, numericValue, value, suffix = "", label, active, delay }: StatProps) {
  const count = useCountUp(numericValue ?? 0, active && !!numericValue);
  const display = numericValue !== undefined ? `${count.toLocaleString()}${suffix}` : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon size={12} style={{ color: "#30E7ED", opacity: 0.8 }} />
        <span className="text-2xl md:text-3xl font-bold text-white tracking-tight" style={{ textShadow: "0 0 20px rgba(48,231,237,0.3)" }}>
          {display}
        </span>
      </div>
      <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Main CTA section ──────────────────────────────────────── */
export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  // Particle positions — all values deterministic (no Math.random), safe for SSR
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      x: (i * 37 + 11) % 100,
      y: (i * 53 + 7) % 100,
      size: 3 + (i % 4),
      delay: i * 0.35,
      duration: 4 + (i % 5) * 0.8,
      opacity: 0.4 + (i % 3) * 0.1,   // 0.4 / 0.5 / 0.6 cycling — no randomness
    }))
  );

  const stats: StatProps[] = [
    { icon: Zap,      numericValue: 2500, suffix: "+", label: "Charging Stations", active: inView, delay: 0.55 },
    { icon: Globe2,   numericValue: 18,   suffix: "",  label: "Countries",         active: inView, delay: 0.65 },
    { icon: Activity, numericValue: 98,   suffix: "%", label: "Network Uptime",    active: inView, delay: 0.75 },
    { icon: Users,    value: "1M+",                    label: "Sessions Served",   active: inView, delay: 0.85 },
  ];

  return (
    <section ref={ref} className="section-padding max-w-[1440px] mx-auto py-32 md:py-44">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl overflow-hidden"
        style={{ minHeight: 650 }}
      >

        {/* ── Cinematic background image with Ken Burns zoom ── */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={inView ? { scale: 1.06 } : { scale: 1 }}
          transition={{ duration: 18, ease: "linear" }}
          style={{
            backgroundImage: "url('/energy-hub.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
          }}
        />

        {/* ── Layered dark overlays ── */}
        {/* Bottom fade — strongest, keeps content readable */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,8,20,0.96) 0%, rgba(4,8,20,0.78) 45%, rgba(4,8,20,0.45) 100%)" }} />
        {/* Center vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 85% 70% at 50% 100%, rgba(4,8,20,0.6) 0%, transparent 70%)" }} />
        {/* Top left deep dark zone */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(4,8,20,0.5) 0%, transparent 60%)" }} />

        {/* ── Floating particles ── */}
        {particles.current.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        {/* ── Electric glow orbs ── */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,88,179,0.14) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(48,231,237,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />

        {/* ── Top accent line ── */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(48,231,237,0.6) 30%, rgba(0,88,179,0.8) 70%, transparent 100%)" }} />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-16 py-28 md:py-36" style={{ minHeight: 750 }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(48,231,237,0.10)", border: "1px solid rgba(48,231,237,0.28)", color: "#30E7ED" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#30E7ED] animate-pulse" />
            Join the Movement
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-white leading-[1.0] tracking-tight mb-6"
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", maxWidth: 820 }}
          >
            Ready to charge<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #ffffff 0%, #30E7ED 55%, #0058B3 100%)" }}>
              Africa's future?
            </span>
          </motion.h2>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.65)", maxWidth: 520 }}
          >
            Whether you're a fleet operator, property developer, or individual
            driver — PCE has a solution engineered for you.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.38 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            {/* Primary */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-base transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #0058B3 0%, #003d7a 100%)",
                color: "white",
                boxShadow: "0 0 0 1px rgba(0,88,179,0.5), 0 8px 32px rgba(0,88,179,0.35)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(48,231,237,0.5), 0 12px 40px rgba(0,88,179,0.5), 0 0 24px rgba(48,231,237,0.2)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(0,88,179,0.5), 0 8px 32px rgba(0,88,179,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Get in Touch
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary — glassmorphism */}
            <Link
              href="/charging-network"
              className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-medium text-base transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.88)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(48,231,237,0.45)";
                (e.currentTarget as HTMLElement).style.color = "white";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.88)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Find a Charger
            </Link>
          </motion.div>

          {/* Credibility statement */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.48 }}
            className="text-xs tracking-widest uppercase font-medium mb-14"
            style={{ color: "rgba(255,255,255,0.30)" }}
          >
            Trusted by fleet operators · Backed by institutional investors · ISO-certified infrastructure
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-lg h-px mb-12"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
          />

          {/* Animated stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14 w-full max-w-2xl">
            {stats.map((s) => (
              <StatItem key={s.label} {...s} />
            ))}
          </div>

        </div>

        {/* ── Bottom edge fade to page background ── */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(4,8,20,0.2))" }} />
      </motion.div>
    </section>
  );
}
