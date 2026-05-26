"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "./AppShell";
import { BriefingRow } from "./BriefingRow";
import { CategoryCards } from "./CategoryCards";
import { DistributionPanels } from "./DistributionPanels";
import { FilterBar } from "./FilterBar";
import { KpiStrip } from "./KpiStrip";
import { useSignals } from "./useSignals";
import { filterSignals } from "@/lib/utils";
import { categoryConfig, deriveTier } from "@/lib/categoryStyles";
import type { JobSignal, SignalCategory, SignalFilters } from "@/lib/types";
import { exportCsv, exportJson, exportMd } from "@/lib/export";

const defaultFilters = (category?: SignalCategory, weekly = false): SignalFilters => ({
  query: "",
  category: category ?? "All",
  strength: "All",
  workMode: "All",
  location: "",
  role: "",
  dateRange: category && !weekly ? "Today" : "All",
  sortBy: "Date"
});

const PlusIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v13"/><path d="M7 11l5 5 5-5"/><path d="M5 21h14"/>
  </svg>
);
const ResetIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>
  </svg>
);

export function DashboardPage({ category, weekly = false }: { category?: SignalCategory; weekly?: boolean }) {
  const { signals, isReady, deleteSignal, updateSignal, reset } = useSignals();
  const [filters, setFilters] = useState(defaultFilters(category, weekly));

  const scoped = useMemo(() => {
    const base = category ? signals.filter(s => s.category === category) : signals;
    if (!weekly) return base;
    const seen = new Set<string>();
    return base
      .filter(s => {
        const k = s.companyEvent.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, 10);
  }, [signals, category, weekly]);

  const list = useMemo(() => filterSignals(scoped, filters), [scoped, filters]);

  // KPI computations should mirror the visible filtered feed, not the whole stored category.
  const visibleHigh = list.filter(s => s.signalStrength === "High").length;
  const visibleCritical = list.filter(s => deriveTier(s.signalStrength, s.eventDate) === "CRITICAL").length;

  const locFreq: Record<string, number> = {};
  list.forEach(s => s.likelyJobLocations.forEach(l => { locFreq[l] = (locFreq[l] ?? 0) + 1; }));
  const topLoc = Object.entries(locFreq).sort((a, b) => b[1] - a[1])[0] ?? ["—", 0];

  const roleFreq: Record<string, number> = {};
  list.forEach(s => s.likelySoftwareRoles.forEach(r => { roleFreq[r] = (roleFreq[r] ?? 0) + 1; }));
  const topRole = Object.entries(roleFreq).sort((a, b) => b[1] - a[1])[0] ?? ["—", 0];

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  // Page meta
  let kicker = "Contract intelligence briefing";
  let title = "Signal intelligence report";
  let subtitle = `${today} · All fetched and saved important news. Use the date filter for today's view.`;

  if (category) {
    const c = categoryConfig[category];
    kicker = c.short;
    title = category;
    subtitle = c.blurb;
  } else if (weekly) {
    kicker = "Merged priority view";
    title = "Weekly priority — top 10 targets";
    subtitle = "Deduplicated and ranked across all four categories. This is the shortlist to action this week.";
  }

  const weeklyKpis = weekly ? [
    { label: "News shown", value: list.length, sub: `${scoped.length} total weekly targets` },
    { label: "Immediate targets", value: visibleCritical, sub: "act this week" },
    { label: "Strong targets", value: list.filter(s => deriveTier(s.signalStrength, s.eventDate) === "STRONG").length, sub: "apply this week" },
    { label: "Watchlist", value: list.filter(s => ["WATCH","LOW"].includes(deriveTier(s.signalStrength, s.eventDate))).length, sub: "track for movement" }
  ] : null;

  const catKpis = category ? [
    { label: "News shown", value: list.length, sub: `${scoped.length} total in this category` },
    { label: "High-confidence news", value: visibleHigh, sub: "strong job signal" },
    { label: "Immediate targets", value: visibleCritical, sub: "act this week" },
    { label: "Likely hiring markets", value: new Set(list.flatMap(s => s.likelyJobLocations)).size, sub: "visible locations" }
  ] : null;

  const mainKpis = [
    { label: "News shown", value: list.length, sub: `${scoped.length} total stored signals` },
    { label: "Immediate targets", value: visibleCritical, sub: "act this week" },
    { label: "Top location", value: topLoc[0] as string, sub: `${topLoc[1]} matching signals` },
    { label: "Top software role", value: topRole[0] as string, sub: `${topRole[1]} matching signals` }
  ];

  return (
    <AppShell>
      <div className="page">
        <div className="page-head">
          <div>
            <div className="kicker">{kicker}</div>
            <h1 className="page-title">{title}</h1>
            <p className="page-sub">{subtitle}</p>
          </div>
          <div className="page-actions">
            <Link href="/add-signal" className="btn primary"><PlusIcon /> Add signal</Link>
            <div className="btn-group">
              <button className="btn ghost" onClick={() => exportCsv(list)}><DownloadIcon /> CSV</button>
              <button className="btn ghost" onClick={() => exportMd(list)}><DownloadIcon /> Markdown</button>
              <button className="btn ghost" onClick={() => exportJson(list)}><DownloadIcon /> JSON</button>
              <button className="btn ghost danger" onClick={() => { if (window.confirm("Reset to seed data? Local edits will be lost.")) reset(); }}><ResetIcon /> Reset</button>
            </div>
          </div>
        </div>

        {!isReady ? (
          <div className="empty"><div className="empty-mark">⋯</div><h3>Loading…</h3></div>
        ) : (
          <>
            {category && <div className="cat-accent-bar" style={{ background: categoryConfig[category].accent }} />}

            <KpiStrip items={weeklyKpis ?? catKpis ?? mainKpis} />

            {!category && !weekly && <CategoryCards signals={scoped} />}

            {!category && !weekly && <DistributionPanels signals={scoped} />}

            <section className="feed-section">
              {!category && !weekly && (
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Daily news signals</h2>
                    <p className="section-sub">Executive view of major events, source links, likely job markets, and why the event creates software work.</p>
                  </div>
                  <div className="section-meta">{list.length} of {scoped.length} signals</div>
                </div>
              )}

              <FilterBar filters={filters} onChange={setFilters} lockCategory={Boolean(category)} />

              {list.length === 0 ? (
                <div className="empty">
                  <div className="empty-mark">∅</div>
                  <h3>No matching signals</h3>
                  <p>Adjust filters or add a new signal to begin tracking.</p>
                  <Link href="/add-signal" className="btn primary"><PlusIcon /> Add signal</Link>
                </div>
              ) : (
                <div className={`brief-list${weekly ? " weekly" : ""}`}>
                  {list.map((s, i) => (
                    <BriefingRow
                      key={s.id}
                      signal={s}
                      rank={i + 1}
                      onRemove={deleteSignal}
                      defaultOpen={weekly && i < 2}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </AppShell>
  );
}
