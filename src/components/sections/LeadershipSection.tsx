"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// objectPosition tuned per photo so the face is centered in the circular crop.
// "center 18%" pulls the frame up toward the forehead on typical portrait shots.
const members = [
  {
    name: "Onyeka Obiugo",
    role: "Founder & CEO",
    line: "Building Africa's electric mobility infrastructure.",
    photo: "/team-onyeka2.jpg",
    facePos: "center 18%",
    initials: "OO",
    color: "#30E7ED",
  },
  {
    name: "Shekwolo Myke",
    role: "Chief Technology Officer",
    line: "Leading technology, software, AI, and platform innovation across Phoenix Creed Energy.",
    photo: "/team-myke.png",
    facePos: "center 18%",
    initials: "SM",
    color: "#7ab8ff",
  },
  {
    name: "Anyebe John",
    role: "Chief Operating Officer",
    line: "Driving operations, execution, partnerships, and nationwide deployment.",
    photo: "/team-john.png",
    facePos: "center 18%",
    initials: "AJ",
    color: "#a78bfa",
  },
  {
    name: "Dirisu Favour",
    role: "Chief Financial Officer",
    line: "Managing finance, investment strategy, budgeting, and sustainable company growth.",
    photo: "/team-favour.jpg",
    facePos: "center 18%",
    initials: "DF",
    color: "#f472b6",
  },
  {
    name: "Mr Issac",
    role: "Lead Engineer",
    line: "Leading engineering, infrastructure deployment, maintenance, and technical excellence.",
    photo: null,
    facePos: "center 18%",
    initials: "MI",
    color: "#34d399",
  },
];

// Fixed card dimensions — every card is identical so the grid looks balanced.
const CARD_AVATAR = 96;   // px — large enough to show full face
const CARD_PAD_X = 36;   // px
const CARD_PAD_Y_TOP = 44;
const CARD_PAD_Y_BTM = 48;

function MemberCard({ member, index }: { member: typeof members[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: "100%" }}
    >
      {/* Gradient border wrapper */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: "100%",
          position: "relative",
          borderRadius: 28,
          padding: "2px",
          background: hovered
            ? `linear-gradient(145deg, ${member.color}60 0%, rgba(255,255,255,0.10) 100%)`
            : "linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
          boxShadow: hovered
            ? `0 0 48px ${member.color}20, 0 28px 72px rgba(0,0,0,0.45)`
            : "0 4px 28px rgba(0,0,0,0.32)",
          transform: hovered ? "translateY(-10px)" : "translateY(0)",
          transition: "transform 0.38s cubic-bezier(0.16,1,0.3,1), box-shadow 0.38s ease, background 0.38s ease",
          cursor: "default",
        }}
      >
        {/* Glass inner card */}
        <div
          style={{
            height: "100%",
            borderRadius: 26,
            padding: `${CARD_PAD_Y_TOP}px ${CARD_PAD_X}px ${CARD_PAD_Y_BTM}px`,
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Avatar — centered horizontally */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <div style={{
              width: CARD_AVATAR,
              height: CARD_AVATAR,
              borderRadius: "50%",
              overflow: "hidden",
              border: hovered ? `2.5px solid ${member.color}80` : "2.5px solid rgba(255,255,255,0.13)",
              transition: "border-color 0.38s ease, box-shadow 0.38s ease",
              boxShadow: hovered ? `0 0 20px ${member.color}30` : "none",
              position: "relative",
              flexShrink: 0,
              background: hovered
                ? `linear-gradient(135deg, ${member.color}30 0%, ${member.color}10 100%)`
                : "rgba(255,255,255,0.06)",
            }}>
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: member.facePos }}
                  sizes={`${CARD_AVATAR}px`}
                />
              ) : (
                <div style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <span style={{
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    color: hovered ? member.color : "rgba(255,255,255,0.4)",
                    transition: "color 0.38s ease",
                  }}>
                    {member.initials}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <p style={{
            fontSize: "1.08rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 7,
            letterSpacing: "-0.015em",
            lineHeight: 1.28,
            whiteSpace: "nowrap",
          }}>
            {member.name}
          </p>

          {/* Role */}
          <p style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: hovered ? member.color : "rgba(255,255,255,0.38)",
            transition: "color 0.38s ease",
            marginBottom: 22,
            lineHeight: 1.5,
          }}>
            {member.role}
          </p>

          {/* Divider */}
          <div style={{
            width: "100%",
            height: 1,
            background: hovered
              ? `linear-gradient(90deg, ${member.color}45, transparent)`
              : "rgba(255,255,255,0.08)",
            marginBottom: 22,
            transition: "background 0.38s ease",
          }} />

          {/* Description */}
          <p style={{
            fontSize: "0.845rem",
            color: "rgba(255,255,255,0.40)",
            lineHeight: 1.75,
            margin: 0,
            fontStyle: "italic",
            flexGrow: 1,
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
      style={{
        background: "linear-gradient(180deg, #060d1f 0%, #091528 60%, #060d1f 100%)",
        padding: "120px 0 140px",
      }}
    >
      {/* Ambient glow orbs */}
      <div style={{
        position: "absolute", top: "10%", left: "5%", width: 560, height: 560,
        background: "radial-gradient(circle, rgba(48,231,237,0.05) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "5%", width: 440, height: 440,
        background: "radial-gradient(circle, rgba(0,88,179,0.07) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      {/* Max-width widened to 1400px so 5 cards have room to breathe */}
      <div className="section-padding max-w-[1400px] mx-auto relative z-10">

        {/* Section header */}
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

        {/*
          Grid layout:
          mobile  → 1 col
          sm      → 2 col
          lg      → 3 col (CEO + CTO + COO top; CFO + Engineer bottom centered via justify)
          xl      → 5 col (all in one row)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-7">
          {members.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
