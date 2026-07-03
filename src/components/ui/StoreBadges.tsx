"use client";

// Both SVGs share the same viewBox (119.66 × 40) with zero internal padding,
// so setting the same height on both produces identical visual sizes.
const BADGE_H = 52;

const BADGES = [
  {
    label: "Download on the App Store",
    src: "/app-store-badge-official.svg",
    href: "#",
  },
  {
    label: "Get it on Google Play",
    src: "/google-play-badge-official.svg",
    href: "#",
  },
];

interface StoreBadgesProps {
  gap?: number;
  className?: string;
}

export function StoreBadges({ gap = 24, className = "" }: StoreBadgesProps) {
  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", gap, flexWrap: "wrap" }}
    >
      {BADGES.map(({ label, src, href }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          style={{
            display: "inline-block",
            lineHeight: 0,
            transition: "transform 250ms ease",
            cursor: "pointer",
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.03)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={label}
            style={{ height: BADGE_H, width: "auto", display: "block" }}
          />
        </a>
      ))}
    </div>
  );
}
