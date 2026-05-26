"use client";

import Link from "next/link";
import { categoryConfig, strengthConfig } from "@/lib/categoryStyles";
import type { JobSignal, SignalCategory, SignalStrength } from "@/lib/types";
import { CategoryChip, StrengthBadge } from "./Badges";

function fmtDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const ArrowIcon = () => (
  <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

export function DistributionPanels({
  signals,
  onEdit
}: {
  signals: JobSignal[];
  onEdit?: (s: JobSignal) => void;
}) {
  const top3 = signals.slice(0, 3);
  const categories = Object.keys(categoryConfig) as SignalCategory[];
  const catMax = Math.max(...categories.map(c => signals.filter(s => s.category === c).length), 1);

  const strengths: SignalStrength[] = ["High", "Medium", "Low"];
  const strMax = signals.length || 1;

  return (
    <section className="split-row">
      {/* Top 3 */}
      <div className="panel">
        <div className="panel-head">
          <h3>Top 3 strongest signals</h3>
          <Link href="/weekly" className="link-btn">Open weekly priority <ArrowIcon /></Link>
        </div>
        <ol className="top-list">
          {top3.map((s, i) => (
            <li key={s.id} onClick={() => onEdit?.(s)}>
              <div className="top-rank">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="top-title">{s.companyEvent}</div>
                <div className="top-meta">
                  <CategoryChip category={s.category} />
                  <StrengthBadge strength={s.signalStrength} />
                  <span className="muted">{s.eventType}</span>
                </div>
              </div>
              <div className="top-date">{fmtDateShort(s.eventDate)}</div>
            </li>
          ))}
        </ol>
      </div>

      {/* Category distribution */}
      <div className="panel">
        <div className="panel-head"><h3>Category distribution</h3></div>
        <div className="bars">
          {categories.map(cat => {
            const c = categoryConfig[cat];
            const n = signals.filter(s => s.category === cat).length;
            return (
              <div key={cat} className="bar-row">
                <div className="bar-label">
                  <span className="cc-dot" style={{ background: c.accent }} />
                  {c.short}
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(n / catMax) * 100}%`, background: c.accent }} />
                </div>
                <div className="bar-count">{n}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strength distribution */}
      <div className="panel">
        <div className="panel-head"><h3>Signal strength</h3></div>
        <div className="bars">
          {strengths.map(str => {
            const s = strengthConfig[str];
            const n = signals.filter(sig => sig.signalStrength === str).length;
            return (
              <div key={str} className="bar-row">
                <div className="bar-label"><StrengthBadge strength={str} /></div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(n / strMax) * 100}%`, background: s.dot }} />
                </div>
                <div className="bar-count">{n}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
