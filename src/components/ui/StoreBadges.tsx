"use client";

interface StoreBadgesProps {
  height?: number;
  gap?: number;
  className?: string;
}

// Google's official badge PNG includes ~26% transparent padding (top+bottom combined),
// so its visible content is shorter than the specified height. Scaling it up by 1/0.74
// makes the visible artwork match the Apple badge height exactly.
const GOOGLE_SCALE = 1 / 0.74; // ≈ 1.351

export function StoreBadges({ height = 52, gap = 24, className = "" }: StoreBadgesProps) {
  const badges = [
    {
      label: "Download on the App Store",
      src: "/app-store-badge-official.svg",
      href: "#",
      imgHeight: height,
    },
    {
      label: "Get it on Google Play",
      src: "/google-play-badge-official.png",
      href: "#",
      imgHeight: Math.round(height * GOOGLE_SCALE),
    },
  ];

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", gap, flexWrap: "wrap" }}
    >
      {badges.map(({ label, src, href, imgHeight }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          style={{
            display: "inline-block",
            lineHeight: 0,
            transition: "transform 250ms ease",
            cursor: "pointer",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.03)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={label} style={{ height: imgHeight, width: "auto", display: "block" }} />
        </a>
      ))}
    </div>
  );
}
