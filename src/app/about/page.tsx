import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Phoenix Creed Energy",
  description:
    "Learn how Phoenix Creed Energy is building Africa's electric mobility ecosystem through EV charging infrastructure, battery storage, fleet solutions, software, and EV servicing.",
  path: "/about",
  image: "/about-us.png",
});

export default function AboutPage() {
  return (
    <>
      {/* ── Section 1: Hero ──────────────────────────────────── */}
      <section className="bg-white min-h-[44vh] md:min-h-[62vh] flex items-end pt-24 md:pt-28">
        <div className="section-padding w-full" style={{ paddingBottom: "clamp(42px, 7vh, 72px)" }}>
          <h1
            className="font-bold text-pce-dark tracking-normal leading-[1.08] mb-4"
            style={{ fontSize: "clamp(2.05rem, 3.05vw, 3.65rem)", maxWidth: 620 }}
          >
            Building Africa&apos;s<br />
            electric future.
          </h1>
          <p
            className="text-pce-gray leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 0.95vw, 1.05rem)", maxWidth: 540 }}
          >
            Phoenix Creed Energy is building Africa&apos;s electric mobility ecosystem through EV charging infrastructure, battery energy storage, fleet solutions, intelligent software, and professional EV servicing.
          </p>
        </div>
      </section>

      {/* ── Section 2: Cinematic full-width image ────────────── */}
      <section className="w-full overflow-hidden" style={{ height: "clamp(280px, 55vw, 780px)" }}>
        <div className="relative w-full h-full">
          <Image
            src="/about-us.png"
            alt="Phoenix Creed Energy — Africa's electric future"
            fill
            className="object-cover"
            style={{ objectPosition: "center 45%" }}
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* ── Section 3: What we build ─────────────────────────── */}
      <WhatWeBuild />

      {/* ── Section 4: Leadership ────────────────────────────── */}
      <LeadershipSection />

      {/* ── Section 5: Vision ────────────────────────────────── */}
      <section className="bg-white py-20 md:py-48">
        <div className="section-padding max-w-[860px] mx-auto text-center">
          <p
            className="text-[11px] font-bold tracking-[0.18em] uppercase mb-10"
            style={{ color: "rgba(0,0,0,0.32)" }}
          >
            Our Vision
          </p>
          <p
            className="font-bold text-pce-dark leading-tight tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.4rem)" }}
          >
            To become Africa&apos;s leading electric
            mobility infrastructure company.
          </p>
        </div>
      </section>

      {/* ── Section 6: CTA ───────────────────────────────────── */}
      <section
        className="relative py-20 md:py-40"
        style={{ background: "linear-gradient(135deg, #060d1f 0%, #0a1628 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative section-padding max-w-[1100px] mx-auto text-center">
          <h2
            className="font-bold text-white leading-tight tracking-tight mb-12"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
          >
            Help build Africa&apos;s electric future.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/investors"
              className="inline-flex items-center gap-2.5 rounded-full font-semibold text-white"
              style={{ padding: "14px 36px", fontSize: 15, background: "#0058B3", boxShadow: "0 4px 28px rgba(0,88,179,0.50)" }}
            >
              Investor Relations <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full font-medium text-white"
              style={{ padding: "14px 36px", fontSize: 15, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
