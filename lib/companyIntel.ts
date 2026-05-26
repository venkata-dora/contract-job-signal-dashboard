import type { JobSignal } from "./types";

type CompanyIntel = NonNullable<JobSignal["companiesMentioned"]>[number];

const knownCompanies: CompanyIntel[] = [
  { name: "Accenture", sector: "IT consulting", description: "global systems integrator for enterprise, cloud, data, and AI delivery" },
  { name: "AIC", sector: "AI infrastructure", description: "server and storage infrastructure provider for AI and data-center workloads" },
  { name: "Apple", sector: "Consumer technology", description: "consumer hardware, software, wallet, and card-program ecosystem company" },
  { name: "Barclays", sector: "Banking", description: "global bank with payments, cards, markets, and treasury technology operations" },
  { name: "Binance", sector: "Crypto exchange", description: "digital-asset exchange and institutional trading infrastructure provider" },
  { name: "ByteDance", sector: "AI / media technology", description: "technology company behind large-scale content, AI, and media platforms" },
  { name: "Capline", sector: "Healthcare operations", description: "healthcare revenue-cycle and credentialing workflow services provider" },
  { name: "Chainalysis", sector: "Crypto compliance", description: "blockchain analytics, transaction monitoring, and crypto compliance platform" },
  { name: "Chase", sector: "Banking / cards", description: "JPMorgan Chase consumer bank and card-services business" },
  { name: "Cognizant", sector: "IT services", description: "large U.S.-listed technology services and consulting company" },
  { name: "Crypto4A", sector: "Cybersecurity", description: "quantum-safe cryptography, key management, and secrets protection vendor" },
  { name: "Databricks", sector: "Data platform", description: "lakehouse, analytics, and AI data-platform company" },
  { name: "Dynaciate", sector: "AI data-center delivery", description: "Malaysia-based infrastructure and construction group involved in modular and AI data-center delivery" },
  { name: "Expert.ai", sector: "Enterprise AI", description: "AI software company focused on language, document intelligence, and decision automation" },
  { name: "Fincons", sector: "Systems integration", description: "IT consulting and systems-integration firm for enterprise applications" },
  { name: "Fifth Third", sector: "Banking", description: "U.S. regional bank with retail, commercial, payments, and digital banking operations" },
  { name: "Goldman Sachs", sector: "Banking / cards", description: "global bank and outgoing Apple Card issuer in the sample transition signal" },
  { name: "JPMorgan", sector: "Banking", description: "large U.S. bank with payments, cards, markets, and enterprise technology teams" },
  { name: "JotPsych", sector: "Healthcare IT", description: "behavioral-health software company for clinical documentation and telehealth workflows" },
  { name: "Kong", sector: "API platform", description: "API gateway, service connectivity, and API governance platform company" },
  { name: "Microsoft", sector: "Cloud / productivity", description: "cloud, AI, productivity, identity, and enterprise platform provider" },
  { name: "MoonPay", sector: "Crypto payments", description: "crypto payments and stablecoin infrastructure provider for consumers and enterprises" },
  { name: "NVIDIA", sector: "AI computing", description: "GPU, AI infrastructure, and accelerated computing platform company" },
  { name: "Palantir", sector: "Data / AI platform", description: "data integration, analytics, and enterprise AI platform company" },
  { name: "Persistent Systems", sector: "Digital engineering", description: "technology services firm delivering cloud, data, API, and AI engineering programs" },
  { name: "PROMISE Technology", sector: "Enterprise storage", description: "storage and data infrastructure vendor for AI, surveillance, media, and enterprise workloads" },
  { name: "Reallusion", sector: "Creative AI software", description: "3D character, animation, and AI-assisted creative production software company" },
  { name: "SAP", sector: "ERP / enterprise platform", description: "enterprise ERP, data, cloud, and business applications platform provider" },
  { name: "ServiceNow", sector: "Workflow platform", description: "enterprise workflow, ITSM, GRC, security, and AI automation platform" },
  { name: "Streamax", sector: "Fleet AIoT", description: "fleet video telematics, AIoT, safety, and operational-efficiency platform vendor" },
  { name: "TECO", sector: "Industrial technology", description: "industrial and infrastructure technology company expanding AI data-center delivery" },
  { name: "Ubyx", sector: "Digital money infrastructure", description: "digital-money connectivity platform for regulated payments and settlement networks" },
  { name: "VAST Data", sector: "AI data platform", description: "enterprise data storage and AI data-platform company" }
];

export function getCompaniesMentioned(signal: JobSignal): CompanyIntel[] {
  if (signal.companiesMentioned?.length) return signal.companiesMentioned;

  const text = [
    signal.companyEvent,
    signal.summary ?? "",
    signal.rawNotes ?? "",
    signal.sourceName,
    signal.sector
  ].join(" ").toLowerCase();

  const matches = knownCompanies
    .filter((company) => text.includes(company.name.toLowerCase()))
    .sort((a, b) => {
      const aIndex = text.indexOf(a.name.toLowerCase());
      const bIndex = text.indexOf(b.name.toLowerCase());
      return aIndex - bIndex;
    })
    .map((company, index) => ({
      ...company,
      relationship: index === 0 ? "Primary target" as const : "Partner / vendor" as const
    }));
  if (matches.length > 0) return matches;

  const fallbackName = signal.companyEvent
    .split(/\s+(announces|launches|acquires|acquiring|recognized|reports|unveils|signs|partnership|for|with)\s+/i)[0]
    .replace(/\s+\+\s+$/, "")
    .trim();

  return [{
    name: fallbackName || signal.companyEvent,
    sector: signal.sector,
    description: `company or event source in ${signal.sector}`
  }];
}
