"use client";

// Both badges render inside an identical fixed container (W × H).
// object-fit: contain scales each badge's artwork to fill the box without
// distortion, so both appear at exactly the same visual width and height.
const BADGE_W = 160;
const BADGE_H = 52;

const BADGES = [
  {
    label: "Download on the App Store",
    src: "/app-store-badge-official.svg",
    href: "#",
  },
  {
    label: "Get it on Google Play",
    src: "/google-play-badge-official.png",
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
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: BADGE_W,
            height: BADGE_H,
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
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
            }}
          />
        </a>
      ))}
    </div>
  );
}
