import { seedSignals } from "./seedData";
import type { JobSignal } from "./types";

const STORAGE_KEY = "contract-job-signal-dashboard.signals.v1";

export function loadSignals(): JobSignal[] {
  if (typeof window === "undefined") return seedSignals;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    saveSignals(seedSignals);
    return seedSignals;
  }
  try {
    const parsed = JSON.parse(stored) as JobSignal[];
    const merged = mergeNewSeedSignals(parsed);
    if (merged.length !== parsed.length) saveSignals(merged);
    return merged;
  } catch {
    saveSignals(seedSignals);
    return seedSignals;
  }
}

export function saveSignals(signals: JobSignal[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(signals));
}

export function resetSignals() {
  saveSignals(seedSignals);
  return seedSignals;
}

function mergeNewSeedSignals(stored: JobSignal[]) {
  const storedIds = new Set(stored.map((signal) => signal.id));
  const newSeeds = seedSignals.filter((signal) => !storedIds.has(signal.id));
  return newSeeds.length ? [...newSeeds, ...stored] : stored;
}
