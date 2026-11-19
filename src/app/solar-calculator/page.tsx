import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import SolarCalculatorClient from "./SolarCalculatorClient";

export const metadata: Metadata = createPageMetadata({
  title: "Solar Calculator",
  description:
    "Estimate the solar panels, inverter and battery storage your home or business needs. List your appliances, pick your city and get an instant system size from Phoenix Creed Energy.",
  path: "/solar-calculator",
  image: "/solar-hub.png",
});

export default function SolarCalculatorPage() {
  return <SolarCalculatorClient />;
}
