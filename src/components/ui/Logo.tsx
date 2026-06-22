import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Rendered height in px — width scales automatically from the 796×254 source */
  height?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({ height = 44, className, priority = false }: LogoProps) {
  // Source is 796×254 — aspect ratio 3.134:1
  const intrinsicWidth = 796;
  const intrinsicHeight = 254;
  const displayWidth = Math.round((height / intrinsicHeight) * intrinsicWidth);

  return (
    <Image
      src="/pce-logo-new.png"
      alt="Phoenix Creed Energy"
      width={intrinsicWidth}
      height={intrinsicHeight}
      quality={100}
      sizes={`${displayWidth * 2}px`}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ height, width: "auto" }}
    />
  );
}
