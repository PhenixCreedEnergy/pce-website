"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const members = [
  {
    name: "Onyeka Obiugo",
    role: "Founder & CEO",
    line: "Building Africa's electric mobility infrastructure.",
    initials: "OO",
    color: "#30E7ED",
  },
  {
    name: "Valentine Agodi",
    role: "Chief Technology Officer",
    line: "Leading technology, software, and platform development.",
    initials: "VA",
    color: "#7ab8ff",
  },
  {
    name: "Mr John",
    role: "Chief Operating Officer",
    line: "Driving operations, execution, and strategic growth.",
    initials: "MJ",
    color: "#a78bfa",
  },
  {
    name: "Engr Steven",
    role: "Lead Engineer",
    line: "Overseeing engineering systems and deployment.",
    initials: "ES",
    color: "#34d399",
  },
];

function MemberCard({ member, index }: { member: typeof members[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          borderRadius: 24,
          padding: "2px",
          background: hovered
            ? `linear-gradient(135deg, ${member.color}55 0%, rgba(255,255,255,0.08) 100%)`
            : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
          boxShadow: hovered
            ? `0 0 40px ${member.color}22, 0 24px 64px rgba(0,0,0,0.4)`
            : "0 4px 24px rgba(0,0,0,0.3)",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, background 0.35s ease",
          cursor: "default",
        }}
      >
        {/* Inner glassmorphism card */}
        <div
          style={{
            borderRadius: 22,
            padding: "36px 28px 40px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Avatar */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: hovered
              ? `linear-gradient(135deg, ${member.color}30 0%, ${member.color}10 100%)`
              : "rgba(255,255,255,0.06)",
            border: hovered ? `2px solid ${member.color}70` : "2px solid rgba(255,255,255,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
            transition: "border-color 0.35s ease, background 0.35s ease",
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: hovered ? member.color : "rgba(255,255,255,0.4)",
              transition: "color 0.35s ease",
            }}>
              {member.initials}
            </span>
          </div>

          {/* Name & role */}
          <div style={{ marginBottom: 16 }}>
            <p style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: 6,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}>
              {member.name}
            </p>
            <p style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: hovered ? member.color : "rgba(255,255,255,0.35)",
              transition: "color 0.35s ease",
            }}>
              {member.role}
            </p>
          </div>

          {/* Divider */}
          <div style={{
            height: 1,
            background: hovered
              ? `linear-gradient(90deg, ${member.color}40, transparent)`
              : "rgba(255,255,255,0.07)",
            marginBottom: 20,
            transition: "background 0.35s ease",
          }} />

          {/* One-liner */}
          <p style={{
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.7,
            margin: 0,
            fontStyle: "italic",
          }}>
            &ldquo;{member.line}&rdquo;
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function LeadershipSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-6%" });

  return (
    <section
      id="leadership-team"
      className="scroll-mt-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060d1f 0%, #091528 60%, #060d1f 100%)", padding: "120px 0 140px" }}
    >
      {/* Background glow orbs */}
      <div style={{
        position: "absolute", top: "10%", left: "5%", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(48,231,237,0.05) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(0,88,179,0.07) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div className="section-padding max-w-[1200px] mx-auto relative z-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 80 }}
        >
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#30E7ED",
            marginBottom: 18,
            opacity: 0.7,
          }}>
            Leadership
          </p>
          <h2 style={{
            fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            maxWidth: 640,
            margin: "0 0 20px 0",
          }}>
            A team focused on building the infrastructure powering Africa&apos;s transition to electric mobility.
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.42)", maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
            Experienced operators and technologists united around a single mission.
          </p>
        </motion.div>

        {/* Grid — 1 col mobile / 2 col tablet / 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {members.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
