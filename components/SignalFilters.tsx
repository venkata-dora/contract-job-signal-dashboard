"use client";

import { Search } from "lucide-react";
import type { SignalFilters as SignalFiltersType } from "@/lib/types";
import { categories, strengths, workModes } from "@/lib/types";

export function SignalFilters({
  filters,
  onChange,
  lockCategory
}: {
  filters: SignalFiltersType;
  onChange: (filters: SignalFiltersType) => void;
  lockCategory?: boolean;
}) {
  return (
    <section className="surface p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-950">Filters</h2>
          <p className="mt-0.5 text-xs text-slate-500">Narrow by category, strength, work mode, location, or role.</p>
        </div>
        <label className="flex shrink-0 items-center gap-2 text-xs font-medium text-slate-500">
          Sort
          <select
            value={filters.sortBy}
            onChange={(event) => onChange({ ...filters, sortBy: event.target.value as SignalFiltersType["sortBy"] })}
            className="soft-input h-9"
          >
            <option>Rank</option>
            <option>Date</option>
            <option>Strength</option>
          </select>
        </label>
      </div>
      <div className="grid gap-3 md:grid-cols-[minmax(220px,1.5fr)_repeat(5,minmax(116px,1fr))]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={filters.query}
            onChange={(event) => onChange({ ...filters, query: event.target.value })}
            className="soft-input h-10 w-full pl-9"
            placeholder="Search events, sources, notes"
          />
        </label>
        <select
          value={filters.category}
          disabled={lockCategory}
          onChange={(event) => onChange({ ...filters, category: event.target.value as SignalFiltersType["category"] })}
          className="soft-input h-10 disabled:opacity-60"
        >
          <option>All</option>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <select
          value={filters.strength}
          onChange={(event) => onChange({ ...filters, strength: event.target.value as SignalFiltersType["strength"] })}
          className="soft-input h-10"
        >
          <option>All</option>
          {strengths.map((strength) => (
            <option key={strength}>{strength}</option>
          ))}
        </select>
        <select
          value={filters.workMode}
          onChange={(event) => onChange({ ...filters, workMode: event.target.value as SignalFiltersType["workMode"] })}
          className="soft-input h-10"
        >
          <option>All</option>
          {workModes.map((mode) => (
            <option key={mode}>{mode}</option>
          ))}
        </select>
        <input
          value={filters.location}
          onChange={(event) => onChange({ ...filters, location: event.target.value })}
          className="soft-input h-10"
          placeholder="Location"
        />
        <input
          value={filters.role}
          onChange={(event) => onChange({ ...filters, role: event.target.value })}
          className="soft-input h-10"
          placeholder="Role"
        />
      </div>
    </section>
  );
}
