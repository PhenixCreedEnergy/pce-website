"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Sun, Battery, Zap } from "lucide-react";

/* ─── Count-up hook ─────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out cubic
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

/* ─── Glass stat card ───────────────────────────────────────── */
interface GlassStatProps {
  numericValue?: number;
  value?: string;
  suffix?: string;
  label: string;
  description: string;
  active: boolean;
  delay: number;
}

function GlassStatCard({ numericValue, value, suffix = "", label, description, active, delay }: GlassStatProps) {
  const count = useCountUp(numericValue ?? 0, active && !!numericValue);
  const display = numericValue !== undefined ? `${count}${suffix}` : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative cursor-default"
      style={{
        borderRadius: 24,
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(48,231,237,0.30)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        padding: "28px 28px 24px",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 40px rgba(0,88,179,0.14), 0 0 0 1px rgba(48,231,237,0.5), 0 0 20px rgba(48,231,237,0.12)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(48,231,237,0.55)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(48,231,237,0.30)";
      }}
    >
      {/* Electric accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(48,231,237,0.5), transparent)" }}
      />

      <div
        className="text-4xl md:text-5xl font-bold tracking-tight mb-1"
        style={{ color: "#0058B3" }}
      >
        {display}
      </div>
      <div className="font-semibold text-pce-dark mb-1">{label}</div>
      <div className="text-pce-gray text-sm leading-relaxed">{description}</div>
    </motion.div>
  );
}

/* ─── Main section ──────────────────────────────────────────── */
const stats: GlassStatProps[] = [
  { numericValue: 2500, suffix: "+", label: "Charging Stations",  description: "Deployed across 18 African countries", active: false, delay: 0.1 },
  { numericValue: 18,   suffix: "",  label: "Countries Served",   description: "Pan-African coverage expanding monthly", active: false, delay: 0.2 },
  { numericValue: 98,   suffix: "%", label: "Network Uptime",     description: "Industry-leading reliability SLA", active: false, delay: 0.3 },
  { numericValue: 1,    suffix: "M+",label: "Charging Sessions",  description: "Growing at 40% month-over-month", active: false, delay: 0.4 },
];

const floatingFeatures = [
  { icon: Sun,     label: "Solar Powered",    color: "#F59E0B" },
  { icon: Battery, label: "Battery Storage",  color: "#0058B3" },
  { icon: Zap,     label: "24/7 Clean Energy",color: "#30E7ED" },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F5F7FA 0%, #ffffff 100%)" }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,88,179,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,88,179,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative section-padding max-w-[1440px] mx-auto py-32 md:py-44 lg:py-56">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Badge + Heading + 2×2 stat grid ── */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="chip mb-5 self-start"
            >
              By the numbers
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-bold text-pce-dark mb-4 leading-tight"
            >
              Scale that speaks<br /> for itself.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-pce-gray leading-relaxed mb-10 max-w-sm"
            >
              From zero to the continent's largest EV charging network in four years.
            </motion.p>

            {/* 2×2 Glass stat grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <GlassStatCard key={s.label} {...s} active={inView} />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Image + floating card ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Glow halo */}
            <div
              className="absolute -inset-6 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,88,179,0.08) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Image frame */}
            <motion.div
              whileHover={{ scale: 1.015, transition: { duration: 0.4 } }}
              className="relative overflow-hidden"
              style={{
                borderRadius: 24,
                boxShadow: "0 8px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,88,179,0.08)",
                aspectRatio: "4/3",
              }}
            >
              <Image
                src="/solar-hub.png"
                alt="PCE Solar Energy Hub — renewable infrastructure powering Africa's EV network"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle inner glow rim */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(48,231,237,0.15)", borderRadius: 24 }}
              />
            </motion.div>

            {/* Floating glass info card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-5 -left-4 md:-left-8"
              style={{
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(48,231,237,0.30)",
                borderRadius: 20,
                boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                padding: "16px 20px",
                minWidth: 200,
              }}
            >
              <p
                className="text-[10px] font-bold tracking-[0.15em] uppercase mb-3"
                style={{ color: "#0058B3" }}
              >
                Infrastructure
              </p>
              <div className="flex flex-col gap-2.5">
                {floatingFeatures.map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${color}18` }}
                    >
                      <Icon size={13} style={{ color }} />
                    </div>
                    <span className="text-sm font-medium text-pce-dark">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
