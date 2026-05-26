import { locationsForCategory } from "./locationRules";
import { rolesForCategory } from "./roleRules";
import { scoreText, strengthFromScore } from "./scoring";
import type { SignalCategory, WorkMode } from "./types";

type CategoryRule = {
  category: SignalCategory;
  eventType: string;
  terms: string[];
};

const rules: CategoryRule[] = [
  {
    category: "Banking / Payments / Fintech",
    eventType: "Issuer Transition / Card Portfolio Migration",
    terms: [
      "issuer transition",
      "card portfolio",
      "co-branded card",
      "apple card",
      "mastercard",
      "visa",
      "fis",
      "fiserv",
      "jack henry",
      "tsys",
      "core banking",
      "baas",
      "sponsor bank",
      "fednow",
      "ach",
      "payment modernization"
    ]
  },
  {
    category: "M&A / Divestiture / Carve-out",
    eventType: "M&A Integration / System Separation",
    terms: [
      "acquisition",
      "merger",
      "divestiture",
      "carve-out",
      "spin-off",
      "tsa",
      "newco",
      "remainco",
      "post-merger integration",
      "asset sale",
      "system separation"
    ]
  },
  {
    category: "Cyber / Compliance / Regulatory",
    eventType: "Cyber / Compliance Remediation",
    terms: [
      "breach",
      "ransomware",
      "cyber incident",
      "consent order",
      "mra",
      "mria",
      "aml",
      "kyc",
      "fraud remediation",
      "sec disclosure",
      "8-k",
      "dlp",
      "iam",
      "appsec",
      "ai governance"
    ]
  },
  {
    category: "AI / Cloud / Enterprise Platforms",
    eventType: "Enterprise Platform Modernization",
    terms: [
      "ai",
      "llm",
      "rag",
      "mlops",
      "sap",
      "servicenow",
      "salesforce",
      "oracle",
      "workday",
      "snowflake",
      "databricks",
      "microsoft fabric",
      "cloud migration",
      "erp modernization"
    ]
  }
];

export function classifySignalText(text: string) {
  const lower = text.toLowerCase();
  const matches = rules
    .map((rule) => ({
      ...rule,
      hits: rule.terms.filter((term) => lower.includes(term.toLowerCase())).length
    }))
    .filter((rule) => rule.hits > 0)
    .sort((a, b) => b.hits - a.hits);

  const primary = matches[0] ?? rules[3];
  const score = scoreText(text);
  const category = primary.category;
  const eventType = refineEventType(primary.eventType, text);

  return {
    category,
    secondaryCategories: matches.slice(1).map((match) => match.category),
    eventType,
    signalStrength: strengthFromScore(score),
    score,
    likelySoftwareRoles: rolesForCategory(category),
    likelyJobLocations: locationsForCategory(category, text),
    workMode: inferWorkMode(text),
    whyTheseLocations: locationReason(category, text),
    whyThisMayCreateContractSoftwareJobs: contractReason(category, eventType)
  };
}

function refineEventType(fallback: string, text: string) {
  const lower = text.toLowerCase();
  if (/issuer transition|apple card|card portfolio/.test(lower)) return "Issuer Transition / Card Portfolio Migration";
  if (/bank merger|merger/.test(lower)) return "Bank Merger / System Integration";
  if (/divestiture|carve-out|tsa exit/.test(lower)) return "Divestiture / TSA Exit";
  if (/ransomware|breach|cyber incident/.test(lower)) return "Cyber Incident / Remediation";
  if (/consent order|mra|mria|aml|kyc/.test(lower)) return "Regulatory Remediation";
  if (/servicenow|workflow/.test(lower)) return "Enterprise AI Workflow Modernization";
  if (/sap|oracle|erp/.test(lower)) return "ERP Modernization / Strategic Partnership";
  if (/fhir|ehr|healthcare/.test(lower)) return "Healthcare Data Interoperability";
  if (/guidewire|insurance/.test(lower)) return "Insurance Claims Platform Modernization";
  return fallback;
}

function inferWorkMode(text: string): WorkMode {
  const lower = text.toLowerCase();
  if (/on-site|onsite/.test(lower)) return "On-site";
  if (/hybrid/.test(lower)) return "Hybrid";
  if (/remote/.test(lower)) return "Remote";
  return "Remote / Hybrid";
}

function locationReason(category: SignalCategory, text: string) {
  if (/apple card|issuer transition/i.test(text)) {
    return "Issuer, bank operations, card services, partner, and payment-network hubs are likely delivery centers.";
  }
  if (category === "M&A / Divestiture / Carve-out") {
    return "Work clusters around buyer/seller headquarters, shared-service teams, tenant owners, and consulting delivery hubs.";
  }
  if (category === "Cyber / Compliance / Regulatory") {
    return "Remediation usually lands near security, risk, legal, operations, and cyber vendor teams.";
  }
  if (category === "AI / Cloud / Enterprise Platforms") {
    return "Platform modernization usually concentrates near enterprise tech hubs and remote/hybrid vendor teams.";
  }
  return "Likely locations follow sector hubs and vendor delivery centers.";
}

function contractReason(category: SignalCategory, eventType: string) {
  const base = `${eventType} creates forced-change software work`;
  if (category === "Banking / Payments / Fintech") {
    return `${base}: account migration, API integration, QA, fraud/risk systems, card platform changes, and data reconciliation.`;
  }
  if (category === "M&A / Divestiture / Carve-out") {
    return `${base}: system separation, Day-1/Day-100 integration, identity migration, data migration, and ERP rationalization.`;
  }
  if (category === "Cyber / Compliance / Regulatory") {
    return `${base}: AppSec fixes, IAM hardening, regulatory reporting, audit trails, GRC workflows, and remediation automation.`;
  }
  return `${base}: cloud/platform migration, data engineering, AI governance, workflow automation, integration, testing, and rollout work.`;
}
