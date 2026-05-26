import type { SignalCategory } from "./types";

export const categoryConfig: Record<
  SignalCategory,
  {
    id: string;
    short: string;
    blurb: string;
    accent: string;
    soft: string;
    border: string;
  }
> = {
  "Banking / Payments / Fintech": {
    id: "banking",
    short: "Banking",
    blurb: "Bank mergers, card issuer transitions, processor changes, core banking conversions, RTP/FedNow modernization, AML/KYC and fraud platforms.",
    accent: "#1B4F8C",
    soft: "#EDF2F9",
    border: "#C8D4E6"
  },
  "M&A / Divestiture / Carve-out": {
    id: "mna",
    short: "M&A",
    blurb: "Acquisitions, divestitures, carve-outs, spin-offs, TSA exits, NewCo setup, ERP separation, identity / tenant migration.",
    accent: "#4B3F72",
    soft: "#F1EEF6",
    border: "#D6CFE3"
  },
  "Cyber / Compliance / Regulatory": {
    id: "cyber",
    short: "Cyber",
    blurb: "Material cyber incidents, 8-K disclosures, ransomware, consent orders, MRAs/MRIAs, AML/KYC and AI governance remediation.",
    accent: "#8C2A2E",
    soft: "#F7EDED",
    border: "#E6C9CA"
  },
  "AI / Cloud / Enterprise Platforms": {
    id: "ai",
    short: "AI / Cloud",
    blurb: "Enterprise AI rollouts, RAG/LLM/agent programs, cloud migrations, SAP/Oracle/Workday/Salesforce/ServiceNow/Snowflake/Databricks modernization.",
    accent: "#2D6A4F",
    soft: "#ECF3EE",
    border: "#C6DACE"
  }
};

export const strengthConfig = {
  High:   { label: "High",   fg: "#7A1D1F", bg: "#F4DADB", border: "#E0B4B6", dot: "#B5232A" },
  Medium: { label: "Medium", fg: "#7A4A0A", bg: "#FAEBCF", border: "#E8C988", dot: "#C58515" },
  Low:    { label: "Low",    fg: "#34495A", bg: "#E8ECF1", border: "#C9D2DC", dot: "#6B7A8C" }
};

export const tierConfig = {
  CRITICAL: { label: "Critical Target",  fg: "#FFFFFF", bg: "#7A1D1F", border: "#591214" },
  STRONG:   { label: "Strong Target",    fg: "#FFFFFF", bg: "#1B4F8C", border: "#143A66" },
  WATCH:    { label: "Watchlist Target", fg: "#34495A", bg: "#E5EBF2", border: "#C7D2DF" },
  LOW:      { label: "Low Priority",     fg: "#5B6477", bg: "#F1F2F4", border: "#DCDFE4" }
};

export function deriveTier(strength: string, eventDateISO: string): keyof typeof tierConfig {
  const days = Math.max(0, Math.floor((Date.now() - new Date(eventDateISO).getTime()) / 86400000));
  if (strength === "High" && days <= 45) return "CRITICAL";
  if (strength === "High") return "STRONG";
  if (strength === "Medium" && days <= 60) return "STRONG";
  if (strength === "Medium") return "WATCH";
  return "LOW";
}

// Keep old export for compatibility
export const categoryStyles = Object.fromEntries(
  Object.entries(categoryConfig).map(([k, v]) => [k, {
    accent: v.accent,
    badge: "",
    panel: "",
    border: v.border,
    dot: v.accent,
    rail: "",
    header: ""
  }])
) as Record<SignalCategory, { accent: string; badge: string; panel: string; border: string; dot: string; rail: string; header: string }>;
