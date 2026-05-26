"use client";

import { categories, dateRanges, workModes, type DateRange, type SignalCategory, type SignalFilters, type SignalStrength, type WorkMode } from "@/lib/types";

const SearchIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
  </svg>
);

export function FilterBar({
  filters,
  onChange,
  lockCategory
}: {
  filters: SignalFilters;
  onChange: (f: SignalFilters) => void;
  lockCategory?: boolean;
}) {
  const upd = <K extends keyof SignalFilters>(k: K, v: SignalFilters[K]) => onChange({ ...filters, [k]: v });

  return (
    <div className="filter-bar">
      <div className="filter-row">
        <div className="search-wrap">
          <SearchIcon />
          <input
            placeholder="Search company, event, sector, notes…"
            value={filters.query}
            onChange={e => upd("query", e.target.value)}
          />
        </div>
        {!lockCategory && (
          <select value={filters.category} onChange={e => upd("category", e.target.value as "All" | SignalCategory)}>
            <option value="All">All categories</option>
            {categories.map(c => <option key={c} value={c}>{c.split(" / ")[0]}</option>)}
          </select>
        )}
        <select value={filters.strength} onChange={e => upd("strength", e.target.value as "All" | SignalStrength)}>
          <option value="All">All strengths</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select value={filters.workMode} onChange={e => upd("workMode", e.target.value as "All" | WorkMode)}>
          <option value="All">All work modes</option>
          {workModes.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <input placeholder="Location filter…" value={filters.location} onChange={e => upd("location", e.target.value)} />
        <input placeholder="Role filter…" value={filters.role} onChange={e => upd("role", e.target.value)} />
        <select value={filters.dateRange} onChange={e => upd("dateRange", e.target.value as DateRange)}>
          {dateRanges.map((range) => (
            <option key={range} value={range}>
              {range === "Today" ? "Today only" :
                range === "48h" ? "Last 48 hours" :
                range === "7d" ? "Last 7 days" :
                range === "30d" ? "Last 30 days" :
                range === "60d" ? "Last 60 days" :
                range === "90d" ? "Last 90 days" :
                range === "6mo" ? "Last 6 months" : "All dates"}
            </option>
          ))}
        </select>
        <div className="sort-wrap">
          <span className="sort-label">Sort</span>
          <select value={filters.sortBy} onChange={e => upd("sortBy", e.target.value as SignalFilters["sortBy"])}>
            <option value="Rank">Priority</option>
            <option value="Date">Most recent</option>
            <option value="Strength">Strength</option>
          </select>
        </div>
      </div>
    </div>
  );
}
