"use client";

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
  if (!value) return "Choose date";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
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
  const upd = <K extends keyof SignalFilters>(k: K, v: SignalFilters[K]) => onChange({ ...filters, [k]: v });
  const today = todayISO();
  const isAtToday = filters.exactDate ? filters.exactDate >= today : true;
  const setExactDate = (value: string) => onChange({ ...filters, exactDate: clampToToday(value) });
  const moveExactDate = (days: number) => setExactDate(shiftDate(filters.exactDate || todayISO(), days));
  const setDateRange = (value: DateRange) => onChange({ ...filters, dateRange: value, exactDate: "" });

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
        <div className="date-pick-wrap">
          <span className="date-label">Exact date</span>
          <button
            type="button"
            className="date-step"
            aria-label="Previous day"
            onClick={() => moveExactDate(-1)}
          >
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
          <button
            type="button"
            className="date-step"
            aria-label="Next day"
            onClick={() => moveExactDate(1)}
            disabled={isAtToday}
            title={isAtToday ? "Today is the latest available date" : "Next day"}
          >
            <ChevronIcon direction="right" />
          </button>
          {filters.exactDate && (
            <button
              type="button"
              className="date-clear"
              aria-label="Clear exact date filter"
              title="Clear exact date and use the range filter"
              onClick={() => setExactDate("")}
            >
              Clear
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
  );
}
