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
    const merged = reconcileSeedCorrections(mergeNewSeedSignals(parsed));
    if (JSON.stringify(merged) !== JSON.stringify(parsed)) saveSignals(merged);
    return merged;
  } catch {
    saveSignals(seedSignals);
    return seedSignals;
  }
}

export function saveSignals(signals: JobSignal[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(signals));
  window.dispatchEvent(new Event("signals-updated"));
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

function reconcileSeedCorrections(stored: JobSignal[]) {
  const proofpointSeed = seedSignals.find((signal) => signal.id === "news-2026-05-27-proofpoint-active-exploits-protection");
  const trustlogixSeed = seedSignals.find((signal) => signal.id === "news-2026-05-27-trustlogix-trustai-agent-governance");

  return stored.map((signal) => {
    if (signal.id === proofpointSeed?.id) {
      if (!signal.companiesMentioned?.some((company) => company.name === "Cognizant")) return signal;
      return {
        ...signal,
        companiesMentioned: proofpointSeed.companiesMentioned,
        actionPlan: proofpointSeed.actionPlan,
        watchFor: proofpointSeed.watchFor,
        updatedAt: proofpointSeed.updatedAt
      };
    }

    if (signal.id === trustlogixSeed?.id) {
      const hasCommonPlatform = signal.companiesMentioned?.some(
        (c) => c.name === "Snowflake" || c.name === "Databricks"
      );
      if (!hasCommonPlatform) return signal;
      return {
        ...signal,
        companiesMentioned: trustlogixSeed.companiesMentioned
      };
    }

    // Patch eventDate for the 5 new May-27 signals that were initially saved with wrong event dates
    const eventDateFixes: Record<string, string> = {
      "news-2026-05-27-sap-sapphire-autonomous-enterprise": "2026-05-27",
      "news-2026-05-27-servicenow-knowledge-2026-ai-control-tower": "2026-05-27",
      "news-2026-05-27-occ-consent-order-community-federal-savings-bank": "2026-05-27",
      "news-2026-05-27-cfpb-synapse-financial-baas-enforcement": "2026-05-27",
      "news-2026-05-27-bank-first-psb-holdings-merger": "2026-05-27",
    };
    if (signal.id in eventDateFixes && signal.eventDate !== eventDateFixes[signal.id]) {
      return { ...signal, eventDate: eventDateFixes[signal.id] };
    }

    return signal;
  });
}
