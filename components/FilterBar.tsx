"use client";

import { useState } from "react";
import { categories, dateRanges, workModes, type DateRange, type SignalCategory, type SignalFilters, type SignalStrength, type WorkMode } from "@/lib/types";

const SearchIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
  </svg>
);

const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

const ExpandChevron = ({ open }: { open: boolean }) => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s", display: "inline-block" }}>
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const FilterIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M7 12h10M10 18h4"/>
  </svg>
);

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function clampToToday(value: string) {
  const today = todayISO();
  if (!value) return "";
  return value > today ? today : value;
}

function shiftDate(value: string, days: number) {
  const date = value ? new Date(`${value}T00:00:00`) : new Date();
  date.setDate(date.getDate() + days);
  return clampToToday(date.toISOString().slice(0, 10));
}

function formatVisibleDate(value: string) {
  if (!value) return "Optional exact date";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function countActiveFilters(filters: SignalFilters) {
  let count = 0;
  if (filters.query) count++;
  if (filters.category !== "All") count++;
  if (filters.strength !== "All") count++;
  if (filters.workMode !== "All") count++;
  if (filters.location) count++;
  if (filters.role) count++;
  if (filters.dateRange !== "48h") count++;
  if (filters.exactDate) count++;
  return count;
}

function dateRangeLabel(range: SignalFilters["dateRange"]) {
  return range === "24h" ? "Past 24h" :
    range === "48h" ? "Last 48h" :
    range === "week1" ? "Past week" :
    range === "week2" ? "2nd week" :
    range === "week3" ? "3rd week" :
    range === "week4" ? "4th week" : "All dates";
}

export function FilterBar({
  filters,
  onChange,
  lockCategory
}: {
  filters: SignalFilters;
  onChange: (f: SignalFilters) => void;
  lockCategory?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const upd = <K extends keyof SignalFilters>(k: K, v: SignalFilters[K]) => onChange({ ...filters, [k]: v });
  const today = todayISO();
  const isAtToday = filters.exactDate ? filters.exactDate >= today : true;
  const exactDateActive = Boolean(filters.exactDate);
  const setExactDate = (value: string) => onChange({ ...filters, exactDate: clampToToday(value), dateRange: "All" });
  const moveExactDate = (days: number) => setExactDate(shiftDate(filters.exactDate || todayISO(), days));
  const setDateRange = (value: DateRange) => onChange({ ...filters, dateRange: value, exactDate: "" });
  const activeCount = countActiveFilters(filters);

  const clearAll = () => onChange({ ...filters, query: "", category: "All", strength: "All", workMode: "All", location: "", role: "", dateRange: "48h", exactDate: "" });

  return (
    <div className="filter-bar">
      {/* Mobile-only toggle row */}
      <div className="filter-toggle-row mobile-only">
        <button className="filter-toggle-btn" type="button" onClick={() => setMobileOpen(!mobileOpen)}>
          <FilterIcon />
          Filters
          {activeCount > 0 && <span className="filter-active-badge">{activeCount}</span>}
          <ExpandChevron open={mobileOpen} />
        </button>
        {!mobileOpen && (
          <div className="filter-summary">
            <span className="filter-summary-chip">{dateRangeLabel(filters.dateRange)}</span>
            {filters.query && <span className="filter-summary-chip">"{filters.query}"</span>}
            {filters.category !== "All" && <span className="filter-summary-chip">{filters.category.split(" / ")[0]}</span>}
            {filters.strength !== "All" && <span className="filter-summary-chip">{filters.strength}</span>}
            {filters.exactDate && <span className="filter-summary-chip exact">{formatVisibleDate(filters.exactDate)}</span>}
            {activeCount > 0 && <button className="filter-clear-all" type="button" onClick={clearAll}>Clear all</button>}
          </div>
        )}
      </div>

      {/* Desktop: always visible. Mobile: visible when toggled open */}
      <div className={`filter-panel ${mobileOpen ? "mobile-open" : ""}`}>
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
          </div>
          <div className="filter-row">
            <select value={filters.dateRange} onChange={e => setDateRange(e.target.value as DateRange)}>
              {dateRanges.map((range) => (
                <option key={range} value={range}>
                  {range === "24h" ? "Past 24 hours" :
                    range === "48h" ? "Last 48 hours" :
                    range === "week1" ? "Past week" :
                    range === "week2" ? "2nd week back" :
                    range === "week3" ? "3rd week back" :
                    range === "week4" ? "4th week back" : "All dates"}
                </option>
              ))}
            </select>
            <div className={`date-pick-wrap ${exactDateActive ? "exact-active" : ""}`}>
              <span className="date-label">{exactDateActive ? "Exact date active" : "Exact date optional"}</span>
              <button type="button" className="date-step" aria-label="Previous day" onClick={() => moveExactDate(-1)}>
                <ChevronIcon direction="left" />
              </button>
              <label className="date-input-shell">
                <span>{formatVisibleDate(filters.exactDate)}</span>
                <input
                  type="date"
                  aria-label="Filter by exact event date"
                  value={filters.exactDate}
                  max={today}
                  onChange={e => setExactDate(e.target.value)}
                />
              </label>
              <button type="button" className="date-step" aria-label="Next day" onClick={() => moveExactDate(1)} disabled={isAtToday}>
                <ChevronIcon direction="right" />
              </button>
              {filters.exactDate && (
                <button type="button" className="date-clear" onClick={() => setExactDate("")}>
                  Clear exact date
                </button>
              )}
            </div>
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
    </div>
  );
}
