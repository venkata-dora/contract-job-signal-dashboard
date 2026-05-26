import { categoryConfig, deriveTier, strengthConfig, tierConfig } from "@/lib/categoryStyles";
import type { SignalCategory, SignalStrength } from "@/lib/types";

export function StrengthBadge({ strength, size = "sm" }: { strength: SignalStrength; size?: "sm" | "md" }) {
  const s = strengthConfig[strength] ?? strengthConfig.Low;
  const pad = size === "sm" ? "2px 7px" : "3px 9px";
  const font = size === "sm" ? "10.5px" : "11.5px";
  return (
    <span
      className="badge"
      style={{ color: s.fg, background: s.bg, borderColor: s.border, padding: pad, fontSize: font, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}
    >
      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: s.dot, marginRight: 6, verticalAlign: "middle" }} />
      {s.label}
    </span>
  );
}

export function TierBadge({ strength, eventDate }: { strength: SignalStrength; eventDate: string }) {
  const tier = deriveTier(strength, eventDate);
  const t = tierConfig[tier];
  return (
    <span
      className="badge"
      style={{ color: t.fg, background: t.bg, borderColor: t.border, padding: "3px 9px", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}
    >
      {t.label}
    </span>
  );
}

export function CategoryChip({ category, size = "sm" }: { category: SignalCategory; size?: "sm" | "md" }) {
  const c = categoryConfig[category];
  if (!c) return null;
  const pad = size === "sm" ? "2px 8px" : "3px 10px";
  const font = size === "sm" ? "10.5px" : "11.5px";
  return (
    <span
      className="badge"
      style={{ color: c.accent, background: c.soft, borderColor: c.border, padding: pad, fontSize: font, fontWeight: 600, letterSpacing: "0.04em" }}
    >
      <span style={{ display: "inline-block", width: 6, height: 6, background: c.accent, marginRight: 6, verticalAlign: "middle" }} />
      {c.short}
    </span>
  );
}

// Keep old export names for compatibility
export function CategoryBadge({ category }: { category: SignalCategory }) {
  return <CategoryChip category={category} />;
}
