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
    accent: "#3F6F50",
    soft: "#F3FAF5",
    border: "#DCE9DE"
  },
  "M&A / Divestiture / Carve-out": {
    id: "mna",
    short: "M&A",
    blurb: "Acquisitions, divestitures, carve-outs, spin-offs, TSA exits, NewCo setup, ERP separation, identity / tenant migration.",
    accent: "#4C6656",
    soft: "#F6F8F4",
    border: "#E1E7DE"
  },
  "Cyber / Compliance / Regulatory": {
    id: "cyber",
    short: "Cyber",
    blurb: "Material cyber incidents, 8-K disclosures, ransomware, consent orders, MRAs/MRIAs, AML/KYC and AI governance remediation.",
    accent: "#5F5F5F",
    soft: "#F7F7F4",
    border: "#E3E3DE"
  },
  "AI / Cloud / Enterprise Platforms": {
    id: "ai",
    short: "AI / Cloud",
    blurb: "Enterprise AI rollouts, RAG/LLM/agent programs, cloud migrations, SAP/Oracle/Workday/Salesforce/ServiceNow/Snowflake/Databricks modernization.",
    accent: "#1A7F37",
    soft: "#F3FAF5",
    border: "#DCE9DE"
  }
};

export const strengthConfig = {
  High:   { label: "High",   fg: "#111111", bg: "#F7F7F4", border: "#DADADA", dot: "#1A7F37" },
  Medium: { label: "Medium", fg: "#444444", bg: "#F7F7F4", border: "#DADADA", dot: "#8A8A8A" },
  Low:    { label: "Low",    fg: "#666666", bg: "#F7F7F4", border: "#E3E3E3", dot: "#A0A0A0" }
};

export const tierConfig = {
  CRITICAL: { label: "Critical Target",  fg: "#111111", bg: "#F7F7F4", border: "#DADADA" },
  STRONG:   { label: "Strong Target",    fg: "#111111", bg: "#F7F7F4", border: "#DADADA" },
  WATCH:    { label: "Watchlist Target", fg: "#555555", bg: "#F7F7F4", border: "#E3E3E3" },
  LOW:      { label: "Low Priority",     fg: "#666666", bg: "#F7F7F4", border: "#E3E3E3" }
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
