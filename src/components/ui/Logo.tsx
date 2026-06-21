import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Rendered height in px — width scales proportionally from the 1254×1254 source */
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * Official Phoenix Creed Energy logo.
 * Source: public/pce-logo.png (1254×1254 px)
 * Never substitute with an SVG approximation.
 */
export function Logo({ height = 48, className, priority = false }: LogoProps) {
  return (
    <Image
      src="/pce-logo.png"
      alt="Phoenix Creed Energy"
      width={height}   // square source — width === height
      height={height}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ height, width: "auto" }}
    />
  );
}
