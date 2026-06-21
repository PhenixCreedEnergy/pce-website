"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/fuel-station.png",
    alt: "PCE charging station — ultra-fast EV charging bays with electric-blue canopy lighting",
    objectPosition: "center 55%",
  },
  {
    src: "/energy-source.png",
    alt: "PCE Energy Storage System — 20MWh grid-scale battery with wind and solar infrastructure",
    objectPosition: "center 60%",
  },
];

const DURATION = 13000;
const FADE_DURATION = 1.5; // seconds
const ZOOM = 1.07;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  // Track whether we've moved past the first slide (skip initial fade for slide 0)
  const [hasCycled, setHasCycled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    setHasCycled(true);
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(advance, DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, advance]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Slide stack */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          // First render: appear immediately. Subsequent: fade in
          initial={{ opacity: hasCycled ? 0 : 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
        >
          {/* Ken Burns zoom layer */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: ZOOM }}
            transition={{
              duration: DURATION / 1000 + FADE_DURATION,
              ease: "linear",
            }}
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              className="object-cover"
              style={{ objectPosition: slides[current].objectPosition }}
              priority={current === 0}
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Cinematic overlay — dual gradient for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
        }}
      />

      {/* Pagination dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setHasCycled(true); setCurrent(i); }}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 7,
              height: 7,
              borderRadius: 99,
              background: i === current ? "#30E7ED" : "rgba(255,255,255,0.38)",
              boxShadow: i === current ? "0 0 12px rgba(48,231,237,0.75)" : "none",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-20">
        <motion.div
          key={`prog-${current}`}
          className="h-full origin-left"
          style={{ background: "linear-gradient(90deg, #0058B3, #30E7ED)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: DURATION / 1000, ease: "linear" }}
        />
      </div>
    </div>
  );
}
