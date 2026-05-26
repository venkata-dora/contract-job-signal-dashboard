import Link from "next/link";
import { categoryConfig } from "@/lib/categoryStyles";
import type { JobSignal, SignalCategory } from "@/lib/types";

const CAT_HREFS: Record<SignalCategory, string> = {
  "Banking / Payments / Fintech": "/banking",
  "M&A / Divestiture / Carve-out": "/ma",
  "Cyber / Compliance / Regulatory": "/cyber",
  "AI / Cloud / Enterprise Platforms": "/ai-platforms"
};

function fmtDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const ArrowIcon = () => (
  <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

export function CategoryCards({ signals }: { signals: JobSignal[] }) {
  const categories = Object.keys(categoryConfig) as SignalCategory[];

  return (
    <section className="cat-row">
      {categories.map((cat) => {
        const c = categoryConfig[cat];
        const items = signals.filter(s => s.category === cat);
        const highCount = items.filter(s => s.signalStrength === "High").length;
        const latest = items.length
          ? items.reduce((a, b) => new Date(a.eventDate) > new Date(b.eventDate) ? a : b)
          : null;
        const top = items.length
          ? items.reduce((a, b) => (b.rank ?? 99) < (a.rank ?? 99) ? b : a)
          : null;
        const href = CAT_HREFS[cat];

        return (
          <Link key={cat} href={href} className="cat-card" style={{ borderTopColor: c.accent }}>
            <div className="cc-head">
              <div className="cc-title">
                <span className="cc-dot" style={{ background: c.accent }} />
                {c.short}
              </div>
              <div className="cc-count">{items.length}</div>
            </div>
            <div className="cc-metrics">
              <div>
                <span className="m-label">HIGH</span>
                <span className="m-val">{highCount}</span>
              </div>
              <div>
                <span className="m-label">LATEST</span>
                <span className="m-val">{latest ? fmtDateShort(latest.eventDate) : "—"}</span>
              </div>
            </div>
            <div className="cc-top">
              <div className="m-label">Top item</div>
              <div className="cc-topname">{top ? top.companyEvent : "No signals"}</div>
            </div>
            <div className="cc-cta">View briefing <ArrowIcon /></div>
          </Link>
        );
      })}
    </section>
  );
}
