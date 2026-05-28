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

    // Patch companyEvent titles to add conference clarification
    const titleFixes: Record<string, string> = {
      "news-2026-05-27-sap-sapphire-autonomous-enterprise": "SAP at Sapphire 2026 (annual SAP conference): Business AI Platform + Autonomous Enterprise Suite + agent-led ERP migration (35% effort reduction)",
      "news-2026-05-27-servicenow-knowledge-2026-ai-control-tower": "ServiceNow at Knowledge 2026 (annual ServiceNow conference): AI Control Tower + Autonomous Security & Risk with Armis and Veza integrations",
    };
    if (signal.id in titleFixes && signal.companyEvent !== titleFixes[signal.id]) {
      return { ...signal, companyEvent: titleFixes[signal.id] };
    }

    // Patch resourceLinks that were guessed and turned out to be 404
    const linkFixes: Record<string, { resourceLink: string; sourceName: string }> = {
      "news-2026-05-27-capital-one-discover-card-migration": { resourceLink: "https://www.doctorofcredit.com/discover-cards-will-transition-to-capital-one-website-app-on-july-27-2026/", sourceName: "Doctor of Credit" },
      "news-2026-05-27-sap-sapphire-autonomous-enterprise": { resourceLink: "https://news.sap.com/2026/05/sap-sapphire-keynote-business-ai-platform-power-autonomous-enterprise/", sourceName: "SAP News Center" },
      "news-2026-05-27-servicenow-knowledge-2026-ai-control-tower": { resourceLink: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-expands-AI-Control-Tower-to-discover-observe-govern-secure-and-measure-AI-deployed-across-any-system-in-the-enterprise/default.aspx", sourceName: "ServiceNow Newsroom" },
      "news-2026-05-27-occ-consent-order-community-federal-savings-bank": { resourceLink: "https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-40.html", sourceName: "OCC May 2026 Enforcement Actions" },
      "news-2026-05-27-cfpb-synapse-financial-baas-enforcement": { resourceLink: "https://www.consumerfinance.gov/enforcement/actions/synapse-financial-technologies-inc/", sourceName: "CFPB Enforcement Actions" },
      "news-2026-05-27-bank-first-psb-holdings-merger": { resourceLink: "https://www.prnewswire.com/news-releases/bank-first-corporation-signs-agreement-to-acquire-psb-holdings-inc-302776812.html", sourceName: "PR Newswire" },
    };
    if (signal.id in linkFixes) {
      const fix = linkFixes[signal.id];
      if (signal.resourceLink !== fix.resourceLink) {
        return { ...signal, resourceLink: fix.resourceLink, sourceName: fix.sourceName };
      }
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
