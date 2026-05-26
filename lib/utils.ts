import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { JobSignal, SignalFilters } from "./types";
import { strengthWeight } from "./scoring";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rankSignals(signals: JobSignal[]) {
  return [...signals]
    .sort((a, b) => {
      const strengthDelta = strengthWeight(b.signalStrength) - strengthWeight(a.signalStrength);
      if (strengthDelta !== 0) return strengthDelta;
      return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
    })
    .map((signal, index) => ({ ...signal, rank: index + 1 }));
}

export function filterSignals(signals: JobSignal[], filters: SignalFilters) {
  const query = filters.query.trim().toLowerCase();
  const location = filters.location.trim().toLowerCase();
  const role = filters.role.trim().toLowerCase();
  const exactDate = filters.exactDate.trim();

  const rangeStart = getRangeStart(filters.dateRange);

  const filtered = signals.filter((signal) => {
    const blob = [
      signal.companyEvent,
      signal.eventType,
      signal.sourceName,
      signal.sector,
      ...(signal.companiesMentioned ?? []).flatMap((company) => [
        company.name,
        company.description,
        company.sector
      ]),
      signal.whyThisMayCreateContractSoftwareJobs,
      signal.actionPlan,
      signal.rawNotes ?? ""
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!query || blob.includes(query)) &&
      (filters.category === "All" || signal.category === filters.category) &&
      (filters.strength === "All" || signal.signalStrength === filters.strength) &&
      (filters.workMode === "All" || signal.workMode === filters.workMode) &&
      (!location || getUsJobLocations(signal).some((item) => item.toLowerCase().includes(location))) &&
      (!role || signal.likelySoftwareRoles.some((item) => item.toLowerCase().includes(role))) &&
      (!exactDate || signal.eventDate === exactDate) &&
      (exactDate || !rangeStart || signalDate(signal.eventDate).getTime() >= rangeStart.getTime())
    );
  });

  return filtered.sort((a, b) => {
    if (filters.sortBy === "Date") return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
    if (filters.sortBy === "Strength") return strengthWeight(b.signalStrength) - strengthWeight(a.signalStrength);
    return (a.rank ?? 99) - (b.rank ?? 99);
  });
}

function getRangeStart(range: SignalFilters["dateRange"]) {
  if (range === "All") return null;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const daysBack: Record<Exclude<SignalFilters["dateRange"], "Today" | "All">, number> = {
    "24h": 1,
    "48h": 2,
    "7d": 7,
    "30d": 30,
    "60d": 60,
    "90d": 90,
    "6mo": 180
  };
  if (range !== "Today") start.setDate(start.getDate() - daysBack[range]);
  return start;
}

function signalDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

export function uniqueValues(values: string[][]) {
  return Array.from(new Set(values.flat())).sort();
}

const nonUsLocationMarkers = [
  "abu dhabi",
  "canada",
  "china",
  "johor",
  "kuala lumpur",
  "london",
  "malaysia",
  "ontario",
  "ottawa",
  "singapore",
  "taipei",
  "taiwan",
  "uae",
  "uk"
];

export function getUsJobLocations(signal: JobSignal) {
  const filtered = signal.likelyJobLocations.filter((location) => {
    const normalized = location.toLowerCase();
    return !nonUsLocationMarkers.some((marker) => normalized.includes(marker));
  });
  return filtered.length > 0 ? filtered : ["Remote / Hybrid USA delivery"];
}
