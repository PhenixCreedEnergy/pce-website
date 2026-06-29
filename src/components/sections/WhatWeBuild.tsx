"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, BatteryCharging, LayoutGrid, Wrench } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    icon: Zap,
    title: "Charging Infrastructure",
    desc: "Reliable fast-charging networks across Africa.",
    href: "/charging-network",
  },
  {
    icon: BatteryCharging,
    title: "Energy Storage",
    desc: "Battery systems supporting clean energy deployment.",
    href: "/contact",
  },
  {
    icon: LayoutGrid,
    title: "Intelligent Software",
    desc: "Digital tools connecting drivers, operators, and energy assets.",
    href: "/pce-app",
  },
  {
    icon: Wrench,
    title: "EV Service & Maintenance",
    desc: "Diagnostics, repairs & scheduled EV servicing.",
    href: "/products/ev-service",
  },
];

function GlassCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    // height:100% on all wrappers so CSS Grid can equalize row height
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: "100%" }}
    >
      <Link href={card.href} style={{ textDecoration: "none", display: "flex", height: "100%" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: "100%",
            borderRadius: 24,
            padding: "36px 28px 40px",
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: hovered
              ? "1px solid rgba(48,231,237,0.55)"
              : "1px solid rgba(0,88,179,0.10)",
            boxShadow: hovered
              ? "0 0 0 1px rgba(48,231,237,0.18) inset, 0 24px 64px rgba(0,88,179,0.11), 0 0 32px rgba(48,231,237,0.08)"
              : "0 8px 32px rgba(0,88,179,0.05)",
            transform: hovered ? "translateY(-7px)" : "translateY(0)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, box-shadow 0.35s ease",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top edge glow on hover */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: hovered
              ? "linear-gradient(90deg, transparent 5%, rgba(48,231,237,0.7) 40%, rgba(48,231,237,0.7) 60%, transparent 95%)"
              : "transparent",
            transition: "background 0.4s ease",
          }} />

          {/* Icon */}
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: hovered
              ? "linear-gradient(135deg, rgba(0,88,179,0.12) 0%, rgba(48,231,237,0.12) 100%)"
              : "rgba(0,88,179,0.07)",
            border: hovered ? "1px solid rgba(48,231,237,0.30)" : "1px solid rgba(0,88,179,0.10)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 24, flexShrink: 0,
            transition: "background 0.35s ease, border-color 0.35s ease",
          }}>
            <card.icon size={22} style={{ color: hovered ? "#30E7ED" : "#0058B3", transition: "color 0.35s ease" }} />
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: "1.1rem", fontWeight: 700, color: "#0d1421",
            marginBottom: 10, lineHeight: 1.3, letterSpacing: "-0.01em",
          }}>
            {card.title}
          </h3>

          {/* Description */}
          <p style={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.48)", lineHeight: 1.7, margin: 0 }}>
            {card.desc}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export function WhatWeBuild() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-8%" });

  return (
    <section style={{ background: "linear-gradient(180deg, #ffffff 0%, #F5FAFF 100%)", padding: "80px 0 96px" }}>
      <div className="section-padding max-w-[1300px] mx-auto">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.32)", marginBottom: 18 }}>
            What We Build
          </p>
          <h2 style={{
            fontSize: "clamp(1.9rem, 3.8vw, 3rem)", fontWeight: 700, color: "#0d1421",
            lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 18,
            maxWidth: 680, marginLeft: "auto", marginRight: "auto",
          }}>
            Building the infrastructure layer for Africa&apos;s electric future.
          </h2>
          <p style={{
            fontSize: "1.05rem", color: "rgba(0,0,0,0.48)", lineHeight: 1.75,
            maxWidth: 540, marginLeft: "auto", marginRight: "auto",
          }}>
            Phoenix Creed Energy develops EV charging infrastructure, energy storage systems,
            and intelligent mobility software designed for Africa&apos;s evolving energy landscape.
          </p>
        </motion.div>

        {/* Cards — 4 col desktop, 2 col tablet, 1 col mobile. items-stretch ensures equal height. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {cards.map((card, i) => (
            <GlassCard key={card.title} card={card} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
