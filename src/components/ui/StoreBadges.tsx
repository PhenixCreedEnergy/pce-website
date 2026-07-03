"use client";

interface StoreBadgesProps {
  height?: number;
  gap?: number;
  className?: string;
}

export function StoreBadges({ height = 52, gap = 24, className = "" }: StoreBadgesProps) {
  const badges = [
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

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "flex-end", gap, flexWrap: "wrap" }}
    >
      {badges.map(({ label, src, href }) => (
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
          <img src={src} alt={label} style={{ height, width: "auto", display: "block" }} />
        </a>
      ))}
    </div>
  );
}
