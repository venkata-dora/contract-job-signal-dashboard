import { CategoryBadge, StrengthBadge } from "./Badges";
import type { JobSignal } from "@/lib/types";

export function SignalCard({ signal }: { signal: JobSignal }) {
  return (
    <article className="border-y border-border bg-white px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <StrengthBadge strength={signal.signalStrength} />
        <CategoryBadge category={signal.category} />
      </div>
      <h3 className="mt-3 text-base font-semibold">{signal.companyEvent}</h3>
      <p className="mt-1 text-sm text-slate-500">{signal.eventType}</p>
    </article>
  );
}
