import { categories } from "@/lib/types";
import type { JobSignal } from "@/lib/types";

export function ExecutiveSummary({ signals }: { signals: JobSignal[] }) {
  const high = signals.filter((signal) => signal.signalStrength === "High").length;
  const locations = topValues(signals.flatMap((signal) => signal.likelyJobLocations));
  const roles = topValues(signals.flatMap((signal) => signal.likelySoftwareRoles));

  return (
    <section className="surface grid overflow-hidden md:grid-cols-4 md:divide-x md:divide-border">
      <SummaryCell label="Tracked signals" value={signals.length} detail={`${high} high strength`} />
      <SummaryCell label="Best location" value={locations[0]?.label ?? "None"} detail={`${locations[0]?.count ?? 0} matching signals`} />
      <SummaryCell label="Best role" value={roles[0]?.label ?? "None"} detail={`${roles[0]?.count ?? 0} matching signals`} />
      <SummaryCell label="Category mix" value={categories.length} detail="4 forced-change views" />
    </section>
  );
}

export function DistributionStrip({ signals }: { signals: JobSignal[] }) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr_1fr]">
      <div className="surface p-5">
        <h2 className="text-sm font-bold text-slate-950">Top 3 strongest signals</h2>
        <ol className="mt-3 divide-y divide-border">
          {signals.slice(0, 3).map((signal) => (
            <li key={signal.id} className="py-3 text-sm first:pt-0 last:pb-0">
              <div className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                <div>
                  <div className="font-semibold leading-5 text-slate-950">{signal.companyEvent}</div>
                  <div className="mt-1 text-xs text-slate-500">{signal.eventType}</div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <MetricList title="Category distribution" rows={topValues(signals.map((signal) => signal.category))} />
      <MetricList title="Signal strength distribution" rows={topValues(signals.map((signal) => signal.signalStrength))} />
    </section>
  );
}

function SummaryCell({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <div className="px-5 py-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-2 truncate text-2xl font-bold tracking-tight text-slate-950">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{detail}</div>
    </div>
  );
}

function MetricList({ title, rows }: { title: string; rows: Array<{ label: string; count: number }> }) {
  return (
    <div className="surface p-5">
      <h2 className="text-sm font-bold text-slate-950">{title}</h2>
      <div className="mt-3 divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 py-2 text-sm first:pt-0 last:pb-0">
            <span className="truncate text-slate-600">{row.label}</span>
            <span className="font-bold text-slate-950">{row.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function topValues(values: string[]) {
  const counts = values.reduce<Record<string, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}
