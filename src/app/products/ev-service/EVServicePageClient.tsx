"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Battery, Zap, Cpu, Wrench, Wind, ShieldCheck,
  Truck, Activity, ArrowRight, CheckCircle2,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */
const services = [
  {
    icon: Battery,
    title: "Battery Diagnostics",
    desc: "Full state-of-health assessment of your EV battery pack. We measure capacity, cell balance, thermal performance, and degradation rate using certified diagnostic equipment.",
    bullets: ["SOH & SOC analysis", "Cell-level fault detection", "Range prediction report"],
    color: "#30E7ED",
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    desc: "When your battery reaches end-of-life, our engineers source and install compatible replacement packs with full warranty and post-installation calibration.",
    bullets: ["OEM-compatible packs", "Full calibration & testing", "12-month warranty"],
    color: "#7ab8ff",
  },
  {
    icon: Zap,
    title: "Electric Motor Service",
    desc: "Inspection, cleaning, and repair of AC and DC electric drive motors. We test torque output, thermal management, and motor controller integration.",
    bullets: ["Motor winding inspection", "Torque & efficiency testing", "Controller diagnostics"],
    color: "#30E7ED",
  },
  {
    icon: Activity,
    title: "Charging System Repair",
    desc: "Onboard charger (OBC) repair, DC fast-charge port replacement, and charging cable diagnostics. We also service home and commercial EVSE units.",
    bullets: ["OBC repair & replacement", "DC fast-charge port service", "EVSE commissioning"],
    color: "#7ab8ff",
  },
  {
    icon: Cpu,
    title: "Software & Firmware Updates",
    desc: "Keep your EV's control systems current. We apply manufacturer-approved firmware updates across BMS, motor controllers, infotainment, and ADAS modules.",
    bullets: ["BMS firmware updates", "OTA-compatible vehicles", "Post-update diagnostics"],
    color: "#30E7ED",
  },
  {
    icon: Wrench,
    title: "Brake & Suspension",
    desc: "Full inspection of regenerative braking systems, traditional hydraulic brakes, and EV-specific suspension setups — including air suspension calibration.",
    bullets: ["Regen brake testing", "Hydraulic system service", "Suspension alignment"],
    color: "#7ab8ff",
  },
  {
    icon: Wind,
    title: "Air Conditioning & Thermal Management",
    desc: "EV-specific HVAC and thermal management system service, including battery cooling loop inspection, refrigerant recharge, and heat pump diagnostics.",
    bullets: ["Battery thermal loop service", "Heat pump diagnostics", "Cabin HVAC regas"],
    color: "#30E7ED",
  },
  {
    icon: ShieldCheck,
    title: "Annual EV Health Inspection",
    desc: "Comprehensive annual check covering all EV systems — battery, drivetrain, charging, software, safety, and chassis. Includes a full written report.",
    bullets: ["40-point inspection", "Written health report", "Priority booking"],
    color: "#7ab8ff",
  },
  {
    icon: Truck,
    title: "Fleet Maintenance",
    desc: "Dedicated maintenance programmes for commercial EV fleets. Scheduled servicing, preventative maintenance plans, and on-site support contracts across Africa.",
    bullets: ["Scheduled service plans", "On-site fleet support", "Fleet analytics dashboard"],
    color: "#30E7ED",
  },
];

const stats = [
  { value: "500+", label: "EVs Serviced" },
  { value: "98%", label: "First-Fix Rate" },
  { value: "24h", label: "Turnaround" },
  { value: "12mo", label: "Warranty" },
];

/* ─── Components ─────────────────────────────────────────────── */
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: "100%",
          borderRadius: 24,
          padding: "2px",
          background: hovered
            ? `linear-gradient(135deg, ${service.color}44 0%, rgba(255,255,255,0.06) 100%)`
            : "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          boxShadow: hovered
            ? `0 0 36px ${service.color}18, 0 20px 60px rgba(0,0,0,0.35)`
            : "0 4px 20px rgba(0,0,0,0.25)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.32s cubic-bezier(0.16,1,0.3,1), box-shadow 0.32s ease, background 0.32s ease",
          cursor: "default",
        }}
      >
        <div style={{
          borderRadius: 22,
          padding: "32px 28px 36px",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Icon */}
          <div style={{
            width: 52, height: 52, borderRadius: 14, marginBottom: 24, flexShrink: 0,
            background: hovered ? `${service.color}18` : "rgba(255,255,255,0.06)",
            border: hovered ? `1px solid ${service.color}50` : "1px solid rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.32s ease, border-color 0.32s ease",
          }}>
            <service.icon size={22} style={{ color: hovered ? service.color : "rgba(255,255,255,0.55)", transition: "color 0.32s ease" }} />
          </div>

          {/* Title */}
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", marginBottom: 10, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
            {service.title}
          </h3>

          {/* Divider */}
          <div style={{
            height: 1,
            background: hovered ? `linear-gradient(90deg, ${service.color}40, transparent)` : "rgba(255,255,255,0.06)",
            marginBottom: 16,
            transition: "background 0.32s ease",
          }} />

          {/* Desc */}
          <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20 }}>
            {service.desc}
          </p>

          {/* Bullets */}
          <ul style={{ listStyle: "none", margin: 0, padding: 0, marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            {service.bullets.map(b => (
              <li key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle2 size={13} style={{ color: service.color, flexShrink: 0 }} />
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function EVServicePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-8%" });

  return (
    <>
      {/* ── Hero — cinematic full-width image ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "82vh", display: "flex", alignItems: "flex-end" }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/ev-service-hero.jpg"
            alt="PCE EV Service & Maintenance — professional technician servicing an electric vehicle"
            fill
            className="object-cover"
            style={{ objectPosition: "center 45%" }}
            priority
            sizes="100vw"
          />
        </div>

        {/* Layered dark overlays for text legibility */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(4,8,20,0.82) 0%, rgba(4,8,20,0.44) 55%, rgba(4,8,20,0.18) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,8,20,0.88) 0%, rgba(4,8,20,0.30) 52%, transparent 78%)" }} />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        {/* Content */}
        <div className="section-padding relative z-10 w-full" ref={heroRef} style={{ paddingTop: "clamp(104px, 14vh, 140px)", paddingBottom: "clamp(42px, 7vh, 72px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-bold text-white leading-[1.08] mb-4"
              style={{ fontSize: "clamp(2.05rem, 3.05vw, 3.65rem)", maxWidth: 620, textShadow: "0 3px 24px rgba(0,0,0,0.58)" }}
            >
              Professional EV Service<br />
              <span className="bg-clip-text text-transparent italic" style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #7ab8ff 100%)" }}>
                &amp; Maintenance
              </span>
            </h1>

            <p style={{ fontSize: "clamp(0.95rem, 0.95vw, 1.05rem)", color: "rgba(255,255,255,0.82)", maxWidth: 540, lineHeight: 1.65, marginBottom: 28, textShadow: "0 2px 16px rgba(0,0,0,0.55)" }}>
              Comprehensive diagnostics, battery health checks, preventive maintenance, repairs, software updates, and certified servicing for electric vehicles.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white"
                style={{ padding: "15px 30px", fontSize: 15, background: "#0058B3", boxShadow: "0 4px 28px rgba(0,88,179,0.45)", textDecoration: "none" }}
              >
                Book a Service <ArrowRight size={15} />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full font-medium"
                style={{ padding: "15px 30px", fontSize: 15, background: "rgba(255,255,255,0.10)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.24)", color: "rgba(255,255,255,0.90)", textDecoration: "none" }}
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div ref={statsRef} style={{ background: "rgba(6,13,31,0.98)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-padding max-w-[1440px] mx-auto py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#30E7ED", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.40)", marginTop: 6, fontWeight: 500, letterSpacing: "0.04em" }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services grid ── */}
      <section
        id="services"
        className="scroll-mt-24"
        style={{ background: "linear-gradient(180deg, #060d1f 0%, #091528 60%, #060d1f 100%)", padding: "100px 0 120px" }}
      >
        {/* Ambient glows */}
        <div style={{ position: "absolute", top: "20%", left: "3%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(48,231,237,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "3%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,88,179,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="section-padding max-w-[1440px] mx-auto relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 64 }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#30E7ED", opacity: 0.7, marginBottom: 16 }}>
              Our Services
            </p>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.12, letterSpacing: "-0.02em", maxWidth: 560, margin: "0 0 16px 0" }}>
              Everything your EV needs, in one place.
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.42)", maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
              From routine care to specialist repairs — our certified EV technicians handle it all.
            </p>
          </motion.div>

          {/* 3-column card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#060d1f", padding: "80px 0 100px" }}>
        <div className="section-padding max-w-[1440px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#30E7ED", opacity: 0.7, marginBottom: 16 }}>
              Ready to Book?
            </p>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: 16 }}>
              Keep your EV at peak performance.
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: 440, margin: "0 auto 40px", lineHeight: 1.7 }}>
              Book a service appointment today or speak with our fleet maintenance team about a custom servicing plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white text-sm"
                style={{ padding: "15px 36px", background: "linear-gradient(135deg, #0058B3, #0070e0)", boxShadow: "0 8px 32px rgba(0,88,179,0.50)", textDecoration: "none" }}
              >
                Book a Service <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm"
                style={{ padding: "15px 36px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.85)", textDecoration: "none" }}
              >
                Fleet Enquiry
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
