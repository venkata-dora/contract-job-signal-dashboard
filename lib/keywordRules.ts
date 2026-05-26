import type { JobSignal } from "./types";

export function generateSearchStrings(signal: Pick<JobSignal, "companyEvent" | "eventType" | "category" | "likelySoftwareRoles" | "likelyJobLocations">) {
  const company = signal.companyEvent.split(/ from | to | \+ | merger | acquisition | transition/i)[0].trim();
  const role = signal.likelySoftwareRoles[0] ?? "software engineer";
  const location = signal.likelyJobLocations[0] ?? "Remote";

  if (signal.category === "Banking / Payments / Fintech") {
    return [
      `${signal.companyEvent} integration developer contract`,
      `${company} card migration contractor`,
      "credit card portfolio migration contractor",
      "co-brand card platform developer",
      `${company} payments Java contractor`,
      "payments QA automation contractor",
      `${location} card services data engineer contract`
    ];
  }

  if (signal.category === "M&A / Divestiture / Carve-out") {
    return [
      `${signal.companyEvent} integration developer contract`,
      "post merger data migration contractor",
      "ERP consolidation developer contract",
      "TSA exit software engineer",
      "system separation data engineer",
      `${role} carve-out contract`
    ];
  }

  if (signal.category === "Cyber / Compliance / Regulatory") {
    return [
      `${company} breach remediation engineer contract`,
      "AppSec remediation contractor",
      "IAM hardening engineer contract",
      "data privacy remediation developer",
      "ServiceNow GRC developer contract",
      `${company} regulatory remediation contractor`
    ];
  }

  return [
    "enterprise AI integration Python contractor",
    "RAG developer contract",
    "MLOps engineer contract",
    "ServiceNow AI workflow developer",
    "SAP BTP AI integration contractor",
    `${company} platform modernization contractor`,
    `${role} ${location} contract`
  ];
}

export function searchRowsForSignals(signals: JobSignal[]) {
  return signals.flatMap((signal) =>
    signal.bestSearchKeywords.slice(0, 3).map((query, index) => ({
      id: `${signal.id}-${index}`,
      query,
      bestFor: `${signal.companyEvent} - ${signal.likelySoftwareRoles.slice(0, 2).join(", ")}`,
      location: signal.likelyJobLocations.slice(0, 2).join(" / ")
    }))
  );
}
