"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const members = [
  {
    name: "Onyeka Obiugo",
    role: "Founder & CEO",
    line: "Building Africa's electric mobility infrastructure.",
    initials: "OO",
  },
  {
    name: "Valentine Agodi",
    role: "Chief Technology Officer",
    line: "Leading technology, software, and platform development.",
    initials: "VA",
  },
  {
    name: "Mr John",
    role: "Chief Operating Officer",
    line: "Driving operations, execution, and strategic growth.",
    initials: "MJ",
  },
  {
    name: "Engr Steven",
    role: "Lead Engineer",
    line: "Overseeing engineering systems and deployment.",
    initials: "ES",
  },
];

function MemberCard({ member, index }: { member: typeof members[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "32px 28px 36px",
          border: hovered ? "1px solid rgba(48,231,237,0.45)" : "1px solid #EAECF0",
          boxShadow: hovered
            ? "0 0 0 1px rgba(48,231,237,0.12) inset, 0 20px 48px rgba(0,88,179,0.09)"
            : "0 2px 12px rgba(0,0,0,0.04)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.32s cubic-bezier(0.16,1,0.3,1), border-color 0.32s ease, box-shadow 0.32s ease",
          cursor: "default",
        }}
      >
        {/* Photo placeholder */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: hovered
            ? "linear-gradient(135deg, #e8f1ff 0%, #d4f5f6 100%)"
            : "linear-gradient(135deg, #F0F4FF 0%, #E8F5F6 100%)",
          border: hovered ? "2px solid rgba(48,231,237,0.4)" : "2px solid #E8EDF5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          transition: "border-color 0.32s ease, background 0.32s ease",
          flexShrink: 0,
        }}>
          {/* Silhouette SVG */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="13" r="7" fill={hovered ? "#30E7ED" : "#BDD0EE"} style={{ transition: "fill 0.32s ease" }} />
            <path d="M4 34c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke={hovered ? "#30E7ED" : "#BDD0EE"} strokeWidth="2" strokeLinecap="round" style={{ transition: "stroke 0.32s ease" }} />
          </svg>
        </div>

        {/* Name & role */}
        <div style={{ marginBottom: 14 }}>
          <p style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#0d1421",
            marginBottom: 4,
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}>
            {member.name}
          </p>
          <p style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: hovered ? "#0058B3" : "rgba(0,0,0,0.38)",
            transition: "color 0.32s ease",
          }}>
            {member.role}
          </p>
        </div>

        {/* One-liner */}
        <p style={{
          fontSize: "0.875rem",
          color: "rgba(0,0,0,0.46)",
          lineHeight: 1.65,
          margin: 0,
        }}>
          &ldquo;{member.line}&rdquo;
        </p>
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
      className="scroll-mt-24"
      style={{ background: "#F8FAFD", padding: "112px 0 128px" }}
    >
      <div className="section-padding max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 72 }}
        >
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.30)",
            marginBottom: 18,
          }}>
            Leadership
          </p>
          <h2 style={{
            fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)",
            fontWeight: 700,
            color: "#0d1421",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            maxWidth: 620,
            margin: "0 0 0 0",
          }}>
            A team focused on building the infrastructure powering Africa&apos;s transition to electric mobility.
          </h2>
        </motion.div>

        {/* Grid — 1 col mobile / 2 col tablet / 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
