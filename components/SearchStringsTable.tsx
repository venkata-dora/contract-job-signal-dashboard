"use client";

import { Copy } from "lucide-react";
import { searchRowsForSignals } from "@/lib/keywordRules";
import type { JobSignal } from "@/lib/types";

export function SearchStringsTable({ signals }: { signals: JobSignal[] }) {
  const rows = searchRowsForSignals(signals).slice(0, 18);
  return (
    <section className="surface overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-slate-950">Today&apos;s ready-to-copy search strings</h2>
          <p className="mt-0.5 text-xs text-slate-500">Generated locally from events, roles, and likely locations.</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="w-14 px-4 py-3">#</th>
              <th className="px-4 py-3">Search Query</th>
              <th className="px-4 py-3">Best For</th>
              <th className="px-4 py-3">Suggested Location Filter</th>
              <th className="w-16 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                <td className="px-4 py-3 font-semibold text-slate-950">{row.query}</td>
                <td className="px-4 py-3 text-slate-600">{row.bestFor}</td>
                <td className="px-4 py-3 text-slate-700">{row.location}</td>
                <td className="px-4 py-3">
                  <button
                    aria-label="Copy search query"
                    onClick={() => navigator.clipboard.writeText(row.query)}
                    className="icon-button"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
