"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value?: string;
  numericValue?: number;
  suffix?: string;
  label: string;
  description?: string;
  className?: string;
  dark?: boolean;
}

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

export function StatCard({
  value, numericValue, suffix = "", label, description, className, dark = false,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(numericValue ?? 0, inView && !!numericValue);

  if (dark) {
    return (
      <div ref={ref} className={cn("surface-blue rounded-2xl p-6 md:p-8", className)}>
        <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          {numericValue !== undefined ? `${count}${suffix}` : value}
        </div>
        <div className="text-blue-100 font-medium mb-1">{label}</div>
        {description && <div className="text-blue-200 text-sm leading-relaxed">{description}</div>}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "surface surface-hover rounded-2xl p-6 md:p-8 group cursor-default",
        className
      )}
    >
      <div
        className="text-4xl md:text-5xl font-bold mb-2 tracking-tight"
        style={{ color: "#0058B3" }}
      >
        {numericValue !== undefined ? `${count}${suffix}` : value}
      </div>
      <div className="text-pce-dark font-semibold mb-1">{label}</div>
      {description && <div className="text-pce-gray text-sm leading-relaxed">{description}</div>}
    </div>
  );
}
