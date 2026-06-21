import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "electric-blue": "#30E7ED",
        "deep-blue": "#0058B3",
        "pce-dark": "#111111",
        "pce-dark-2": "#1a1a2e",
        "pce-dark-3": "#111927",
        "pce-gray": "#6B7280",
        "pce-gray-light": "#F5F7FA",
        "pce-border": "#E5E7EB",
        "pce-light": "#F0F4F8",
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
        "blue-glow": "0 0 32px rgba(48,231,237,0.25), 0 4px 16px rgba(0,88,179,0.12)",
        "blue-sm": "0 0 16px rgba(48,231,237,0.18)",
        "nav": "0 1px 0 rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "grid-light": "linear-gradient(rgba(0,88,179,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,88,179,0.04) 1px, transparent 1px)",
        "hero-radial": "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(48,231,237,0.08) 0%, transparent 70%)",
        "blue-radial": "radial-gradient(ellipse at center, rgba(0,88,179,0.06) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
