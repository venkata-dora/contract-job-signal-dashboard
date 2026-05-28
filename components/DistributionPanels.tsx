import { categoryConfig, strengthConfig } from "@/lib/categoryStyles";
import type { JobSignal, SignalCategory, SignalStrength } from "@/lib/types";
import { StrengthBadge } from "./Badges";

export function DistributionPanels({
  signals
}: {
  signals: JobSignal[];
}) {
  const categories = Object.keys(categoryConfig) as SignalCategory[];
  const catMax = Math.max(...categories.map(c => signals.filter(s => s.category === c).length), 1);

  const strengths: SignalStrength[] = ["High", "Medium", "Low"];
  const strMax = signals.length || 1;

  return (
    <section className="split-row">
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
