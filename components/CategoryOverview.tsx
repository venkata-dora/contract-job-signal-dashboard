import Link from "next/link";
import { categoryStyles } from "@/lib/categoryStyles";
import { categories, type JobSignal } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryHref = {
  "Banking / Payments / Fintech": "/banking",
  "M&A / Divestiture / Carve-out": "/ma",
  "Cyber / Compliance / Regulatory": "/cyber",
  "AI / Cloud / Enterprise Platforms": "/ai-platforms"
};

export function CategoryOverview({ signals }: { signals: JobSignal[] }) {
  return (
    <section className="grid gap-5 xl:grid-cols-4">
      {categories.map((category) => {
        const categorySignals = signals.filter((signal) => signal.category === category);
        const highCount = categorySignals.filter((signal) => signal.signalStrength === "High").length;
        const topSignal = categorySignals[0];
        const styles = categoryStyles[category];

        return (
          <Link
            key={category}
            href={categoryHref[category]}
            className={cn(
              "group block overflow-hidden rounded-2xl border bg-white shadow-sm shadow-slate-200/70 outline-none transition hover:-translate-y-0.5 hover:shadow-lg focus:ring-4 focus:ring-blue-500/15",
              styles.border
            )}
          >
            <div className={cn("h-2 bg-gradient-to-r", styles.header)} />
            <div className={cn("p-5", styles.panel)}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={cn("h-2.5 w-2.5 rounded-full", styles.dot)} />
                  <h2 className={cn("text-sm font-bold group-hover:underline", styles.accent)}>{shortCategory(category)}</h2>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-600">{category}</p>
              </div>
              <div className="rounded-lg bg-white/80 px-2.5 py-1 text-xs font-bold text-slate-700 ring-1 ring-white/70">
                {categorySignals.length}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Metric label="High" value={highCount} />
              <Metric label="Latest" value={topSignal?.eventDate ? formatShortDate(topSignal.eventDate) : "-"} />
            </div>

            <div className="mt-4 border-t border-white/80 pt-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Top news</div>
              <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-slate-950">
                {topSignal?.companyEvent ?? "No signals yet"}
              </p>
              {topSignal && <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">{topSignal.whyThisMayCreateContractSoftwareJobs}</p>}
            </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-white/75 px-3 py-2 ring-1 ring-white/70">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-bold text-slate-950">{value}</div>
    </div>
  );
}

function shortCategory(category: string) {
  if (category.startsWith("Banking")) return "Banking";
  if (category.startsWith("M&A")) return "M&A";
  if (category.startsWith("Cyber")) return "Cyber";
  return "AI / Cloud";
}

function formatShortDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}
