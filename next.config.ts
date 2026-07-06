import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
  },
  experimental: {},
};

export default nextConfig;
