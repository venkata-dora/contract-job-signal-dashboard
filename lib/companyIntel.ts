import type { JobSignal } from "./types";

type CompanyIntel = NonNullable<JobSignal["companiesMentioned"]>[number];

export type SimilarCompany = {
  name: string;
  sector: string;
};

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
  { name: "Dynaciate", sector: "AI data-center delivery", description: "Malaysia-based infrastructure and construction group involved in modular and AI data-center delivery" },
  { name: "Expert.ai", sector: "Enterprise AI", description: "AI software company focused on language, document intelligence, and decision automation" },
  { name: "Fincons", sector: "Systems integration", description: "IT consulting and systems-integration firm for enterprise applications" },
  { name: "Fifth Third", sector: "Banking", description: "U.S. regional bank with retail, commercial, payments, and digital banking operations" },
  { name: "Goldman Sachs", sector: "Investment banking / consumer banking", description: "global investment and consumer bank; Marcus consumer banking and card-issuing operations" },
  { name: "JPMorgan", sector: "Banking", description: "large U.S. bank with payments, cards, markets, and enterprise technology teams" },
  { name: "JotPsych", sector: "Healthcare IT", description: "behavioral-health software company for clinical documentation and telehealth workflows" },
  { name: "Kong", sector: "API platform", description: "API gateway, service connectivity, and API governance platform company" },
  { name: "Maple", sector: "Institutional DeFi credit", description: "San Francisco digital-asset lending and institutional credit platform" },
  { name: "Microsoft", sector: "Cloud / productivity", description: "cloud, AI, productivity, identity, and enterprise platform provider" },
  { name: "MoonPay", sector: "Crypto payments", description: "crypto payments and stablecoin infrastructure provider for consumers and enterprises" },
  { name: "Mphasis", sector: "IT services / enterprise AI", description: "AI-led technology services and platform engineering company serving enterprise clients" },
  { name: "NVIDIA", sector: "AI computing", description: "GPU, AI infrastructure, and accelerated computing platform company" },
  { name: "Palantir", sector: "Data / AI platform", description: "data integration, analytics, and enterprise AI platform company" },
  { name: "PipeChain", sector: "Supply-chain software", description: "cloud supply-chain and manufacturing workflow software company" },
  { name: "Persistent Systems", sector: "Digital engineering", description: "technology services firm delivering cloud, data, API, and AI engineering programs" },
  { name: "PROMISE Technology", sector: "Enterprise storage", description: "storage and data infrastructure vendor for AI, surveillance, media, and enterprise workloads" },
  { name: "Proofpoint", sector: "Email security / AppSec", description: "U.S. cybersecurity company focused on email threat protection, phishing defense, compliance, and AppSec vulnerability management" },
  { name: "Quyntess", sector: "Supply-chain software", description: "supply-chain collaboration software company acquired by PipeChain" },
  { name: "Reallusion", sector: "Creative AI software", description: "3D character, animation, and AI-assisted creative production software company" },
  { name: "SAP", sector: "ERP / enterprise platform", description: "enterprise ERP, data, cloud, and business applications platform provider" },
  { name: "ServiceNow", sector: "Workflow platform", description: "enterprise workflow, ITSM, GRC, security, and AI automation platform" },
  { name: "Streamax", sector: "Fleet AIoT", description: "fleet video telematics, AIoT, safety, and operational-efficiency platform vendor" },
  { name: "TECO", sector: "Industrial technology", description: "industrial and infrastructure technology company expanding AI data-center delivery" },
  { name: "Theory and Practice", sector: "Decision intelligence", description: "decisioning intelligence platform acquired by Mphasis and referenced in the Tria platform stack" },
  { name: "TrustLogix", sector: "AI data security", description: "AI data governance and security platform company for agent access controls" },
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

  const eventLower = signal.companyEvent.toLowerCase();
  const matches = knownCompanies
    .filter((company) => text.includes(company.name.toLowerCase()))
    .sort((a, b) => {
      const aInEvent = eventLower.includes(a.name.toLowerCase());
      const bInEvent = eventLower.includes(b.name.toLowerCase());
      if (aInEvent && !bInEvent) return -1;
      if (!aInEvent && bInEvent) return 1;
      return text.indexOf(a.name.toLowerCase()) - text.indexOf(b.name.toLowerCase());
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

export function getCompaniesLikeThis(signal: JobSignal): SimilarCompany[] {
  const text = [
    signal.category,
    signal.eventType,
    signal.sector,
    signal.companyEvent,
    signal.summary ?? "",
    signal.rawNotes ?? ""
  ].join(" ").toLowerCase();

  if (signal.category === "Banking / Payments / Fintech" || /payment|card|bank|crypto|stablecoin|trading|oms/.test(text)) {
    return [
      { name: "JPMorgan Chase", sector: "Banking / cards / payments" },
      { name: "Capital One", sector: "Cards / consumer banking" },
      { name: "Visa", sector: "Payment network" },
      { name: "Mastercard", sector: "Payment network" },
      { name: "Fiserv", sector: "Banking and payments platform" },
      { name: "FIS", sector: "Core banking / payments" },
      { name: "Stripe", sector: "Payments infrastructure" },
      { name: "PayPal", sector: "Digital payments" },
      { name: "Coinbase", sector: "Crypto platform" },
      { name: "Chainalysis", sector: "Crypto compliance" }
    ];
  }

  if (signal.category === "M&A / Divestiture / Carve-out" || /acquisition|merger|carve|divest|tsa|spin/.test(text)) {
    return [
      { name: "Accenture", sector: "M&A systems integration" },
      { name: "Deloitte", sector: "Transformation consulting" },
      { name: "Cognizant", sector: "IT services" },
      { name: "IBM Consulting", sector: "Enterprise integration" },
      { name: "Capgemini", sector: "Systems integration" },
      { name: "TCS", sector: "IT services" },
      { name: "Infosys", sector: "IT services" },
      { name: "EPAM", sector: "Digital engineering" },
      { name: "Kyndryl", sector: "Infrastructure separation" },
      { name: "Wipro", sector: "IT services" }
    ];
  }

  if (signal.category === "Cyber / Compliance / Regulatory" || /breach|cyber|iam|dlp|grc|compliance|ransomware|security/.test(text)) {
    return [
      { name: "CrowdStrike", sector: "Endpoint / incident response" },
      { name: "Palo Alto Networks", sector: "Cloud and network security" },
      { name: "Okta", sector: "Identity / IAM" },
      { name: "Microsoft Security", sector: "Identity / cloud security" },
      { name: "ServiceNow", sector: "GRC / security workflows" },
      { name: "Splunk", sector: "Security data / SIEM" },
      { name: "Zscaler", sector: "Zero trust security" },
      { name: "Mandiant", sector: "Incident response" },
      { name: "SailPoint", sector: "Identity governance" },
      { name: "OneTrust", sector: "Privacy / governance" }
    ];
  }

  return [
    { name: "Microsoft", sector: "Cloud / AI platform" },
    { name: "Amazon Web Services", sector: "Cloud platform" },
    { name: "Google Cloud", sector: "Cloud / AI platform" },
    { name: "ServiceNow", sector: "Workflow automation" },
    { name: "Salesforce", sector: "CRM / enterprise apps" },
    { name: "SAP", sector: "ERP / enterprise platform" },
    { name: "Oracle", sector: "ERP / cloud platform" },
    { name: "Databricks", sector: "Data / AI platform" },
    { name: "Snowflake", sector: "Data platform" },
    { name: "Palantir", sector: "Data / AI platform" }
  ];
}

export function getCompaniesLikeCompany(company: CompanyIntel, signal: JobSignal): SimilarCompany[] {
  const exclude = (list: SimilarCompany[]) =>
    list.filter((item) => item.name.toLowerCase() !== company.name.toLowerCase());

  const c = [company.name, company.sector, company.description ?? ""].join(" ").toLowerCase();
  // cCore = name + sector only; used for brand-name checks that would false-match descriptions
  const cCore = [company.name, company.sector].join(" ").toLowerCase();

  // ── Consumer tech ──────────────────────────────────────────────
  if (/consumer tech|consumer hardware|consumer electronics|consumer software|consumer device|consumer wallet/.test(c) || /\bapple\b|\bsamsung\b/.test(cCore)) {
    return exclude([
      { name: "Google", sector: "Consumer tech / AI platform" },
      { name: "Samsung", sector: "Consumer hardware / mobile" },
      { name: "Microsoft", sector: "Consumer / enterprise software" },
      { name: "Meta", sector: "Consumer tech / social" },
      { name: "Amazon", sector: "Consumer tech / e-commerce" },
      { name: "PayPal", sector: "Consumer payments" }
    ]);
  }

  // ── IT services / consulting / systems integration ─────────────
  if (/it services|managed security|consulting|systems integr|digital engineering|technology services/.test(c)) {
    return exclude([
      { name: "Accenture", sector: "IT services / managed security" },
      { name: "Deloitte", sector: "Cyber and technology consulting" },
      { name: "TCS", sector: "IT services / security operations" },
      { name: "Infosys", sector: "Enterprise technology services" },
      { name: "Wipro", sector: "IT services / cloud security" },
      { name: "Capgemini", sector: "Systems integration" }
    ]);
  }

  // ── AI governance / data security / agent access control ───────
  if (/ai.*govern|agent.*govern|data.*govern|data.*security|data.*access|ai.*security|dlp|access control|kill.switch|mcp gateway/.test(c)) {
    return exclude([
      { name: "SailPoint", sector: "Identity governance" },
      { name: "CyberArk", sector: "Privileged access management" },
      { name: "Varonis", sector: "Data security / access governance" },
      { name: "Okta", sector: "Identity / IAM" },
      { name: "BigID", sector: "Data privacy and governance" },
      { name: "Microsoft Purview", sector: "Data governance and compliance" }
    ]);
  }

  // ── AppSec / vulnerability management ──────────────────────────
  if (/appsec|vuln|exploit|remediation|patch|sast|dast|pen test|application security/.test(c)) {
    return exclude([
      { name: "Tenable", sector: "Vulnerability management" },
      { name: "Qualys", sector: "Vulnerability management / cloud security" },
      { name: "Rapid7", sector: "Vulnerability management / threat detection" },
      { name: "Wiz", sector: "Cloud security / vulnerability" },
      { name: "Snyk", sector: "AppSec / developer security" },
      { name: "Veracode", sector: "Application security testing" }
    ]);
  }

  // ── Secrets / key management / cryptography ────────────────────
  if (/secret|key management|cryptograph|quantum.safe|hsm|vault|pki|certificate/.test(c)) {
    return exclude([
      { name: "HashiCorp Vault", sector: "Secrets management" },
      { name: "Thales", sector: "Hardware security modules / key management" },
      { name: "Venafi", sector: "Machine identity / certificate management" },
      { name: "Entrust", sector: "Digital security / PKI" },
      { name: "IBM Security", sector: "Enterprise cryptography / security" },
      { name: "AWS KMS", sector: "Cloud key management" }
    ]);
  }

  // ── Endpoint / incident response ───────────────────────────────
  if (/endpoint|incident response|edr|xdr|threat.*intel|soc|siem|soar/.test(c)) {
    return exclude([
      { name: "CrowdStrike", sector: "Endpoint / incident response" },
      { name: "SentinelOne", sector: "Endpoint security / XDR" },
      { name: "Mandiant", sector: "Incident response / threat intel" },
      { name: "Splunk", sector: "SIEM / security analytics" },
      { name: "Palo Alto Networks", sector: "Cloud and network security" },
      { name: "IBM QRadar", sector: "SIEM / security operations" }
    ]);
  }

  // ── Network / zero trust / email security ──────────────────────
  if (/zero trust|network security|email security|phishing|cloud security|compliance platform/.test(c)) {
    return exclude([
      { name: "Zscaler", sector: "Zero trust / cloud security" },
      { name: "Palo Alto Networks", sector: "Network / cloud security" },
      { name: "Mimecast", sector: "Email security / threat protection" },
      { name: "Abnormal Security", sector: "AI email security" },
      { name: "Netskope", sector: "Cloud security / SASE" },
      { name: "Fortinet", sector: "Network security" }
    ]);
  }

  // ── Identity / IAM ─────────────────────────────────────────────
  if (/identity|iam|access management|single sign|sso|mfa|privileged/.test(c)) {
    return exclude([
      { name: "Okta", sector: "Identity / IAM" },
      { name: "SailPoint", sector: "Identity governance" },
      { name: "CyberArk", sector: "Privileged access management" },
      { name: "Ping Identity", sector: "Identity / federation" },
      { name: "Microsoft Entra", sector: "Cloud identity" },
      { name: "ForgeRock", sector: "Identity platform" }
    ]);
  }

  // ── DeFi / institutional crypto credit ────────────────────────
  if (/defi|onchain|institutional.*credit|digital.asset.*lend|crypto.*lend|borrower/.test(c)) {
    return exclude([
      { name: "Fireblocks", sector: "Digital asset infrastructure" },
      { name: "Anchorage Digital", sector: "Institutional crypto custody" },
      { name: "Coinbase Institutional", sector: "Institutional crypto services" },
      { name: "Clearpool", sector: "DeFi institutional credit" },
      { name: "Credix", sector: "Institutional DeFi lending" },
      { name: "TrueFi", sector: "Onchain credit protocol" }
    ]);
  }

  // ── Crypto payments / on-off ramp ─────────────────────────────
  if (/crypto.*payment|stablecoin|payment.*crypto|digital.*money|on.ramp|off.ramp|blockchain.*payment/.test(c)) {
    return exclude([
      { name: "Circle", sector: "Stablecoin / USDC infrastructure" },
      { name: "Fireblocks", sector: "Digital asset infrastructure" },
      { name: "Transak", sector: "Crypto on/off ramp" },
      { name: "Alchemy Pay", sector: "Crypto payment gateway" },
      { name: "Coinbase Pay", sector: "Crypto payments" },
      { name: "Ripple", sector: "Blockchain payments / settlement" }
    ]);
  }

  // ── Crypto compliance / blockchain analytics ───────────────────
  if (/crypto.*compliance|blockchain.*analytic|transaction.*monitoring|aml.*crypto|chainalysis/.test(c)) {
    return exclude([
      { name: "Chainalysis", sector: "Blockchain analytics / compliance" },
      { name: "Elliptic", sector: "Crypto compliance / risk" },
      { name: "TRM Labs", sector: "Blockchain intelligence" },
      { name: "Merkle Science", sector: "Crypto risk and compliance" },
      { name: "CipherTrace", sector: "Crypto AML analytics" },
      { name: "Solidus Labs", sector: "Crypto market surveillance" }
    ]);
  }

  // ── Regional / community banks ────────────────────────────────
  if (/regional bank|community bank|savings bank|credit union|bancshares|bancorp|bancorporation/.test(c)) {
    return exclude([
      { name: "Truist Financial", sector: "Regional banking" },
      { name: "Regions Bank", sector: "Regional banking" },
      { name: "Citizens Financial", sector: "Regional banking" },
      { name: "Fifth Third Bank", sector: "Regional banking" },
      { name: "KeyBanc", sector: "Regional banking" },
      { name: "Synovus", sector: "Regional banking" }
    ]);
  }

  // ── Banking / cards / payments (traditional) ──────────────────
  if (/card.*issu|payment.*network|consumer bank|retail bank|issuer|fiserv|card.*portfolio/.test(c)) {
    return exclude([
      { name: "JPMorgan Chase", sector: "Banking / cards / payments" },
      { name: "Capital One", sector: "Cards / consumer banking" },
      { name: "Visa", sector: "Payment network" },
      { name: "Mastercard", sector: "Payment network" },
      { name: "Fiserv", sector: "Banking and payments platform" },
      { name: "Stripe", sector: "Payments infrastructure" }
    ]);
  }

  // ── Supply chain software ──────────────────────────────────────
  if (/supply.chain|supply chain|manufacturing.*software|procurement|logistics.*software|wms|tms/.test(c)) {
    return exclude([
      { name: "Blue Yonder", sector: "Supply chain platform" },
      { name: "Manhattan Associates", sector: "Supply chain / WMS" },
      { name: "Kinaxis", sector: "Supply chain planning" },
      { name: "o9 Solutions", sector: "Supply chain AI planning" },
      { name: "E2open", sector: "Multi-enterprise supply chain" },
      { name: "Infor Nexus", sector: "Supply chain collaboration" }
    ]);
  }

  // ── Industrial tech / data-center infrastructure ───────────────
  if (/industrial|infrastructure.*tech|data.center.*infra|power.*tech|modular.*data.center|construction.*tech/.test(c)) {
    return exclude([
      { name: "Siemens", sector: "Industrial technology / automation" },
      { name: "ABB", sector: "Industrial automation / electrification" },
      { name: "Vertiv", sector: "Data center infrastructure" },
      { name: "Eaton", sector: "Power management / data center" },
      { name: "Honeywell", sector: "Industrial automation / building tech" },
      { name: "Schneider Electric", sector: "Energy / data center infrastructure" }
    ]);
  }

  // ── AI hardware / infrastructure ───────────────────────────────
  if (/ai.*infra|ai.*hardware|gpu|server.*ai|storage.*ai|hpc|accelerat/.test(c)) {
    return exclude([
      { name: "Dell Technologies", sector: "AI servers / enterprise hardware" },
      { name: "HPE", sector: "Servers / AI infrastructure" },
      { name: "Supermicro", sector: "AI server hardware" },
      { name: "Lenovo ISG", sector: "AI infrastructure / servers" },
      { name: "Pure Storage", sector: "Enterprise storage / AI data" },
      { name: "NetApp", sector: "Intelligent data infrastructure" }
    ]);
  }

  // ── Creative AI / media / animation software ───────────────────
  if (/creative.*ai|media.*software|animation|3d.*character|generative.*media|video.*ai|creative.*production/.test(c)) {
    return exclude([
      { name: "Adobe", sector: "Creative software / AI media" },
      { name: "Unity", sector: "Real-time 3D / game engine" },
      { name: "Autodesk", sector: "3D design / media software" },
      { name: "Epic Games", sector: "3D engine / real-time media" },
      { name: "Runway", sector: "Generative AI video" },
      { name: "ElevenLabs", sector: "AI audio / voice generation" }
    ]);
  }

  // ── Healthcare IT ──────────────────────────────────────────────
  if (/healthcare|health.*it|behavioral.*health|telehealth|ehr|fhir|clinical|revenue.*cycle|credentialing/.test(c)) {
    return exclude([
      { name: "Epic Systems", sector: "EHR / clinical software" },
      { name: "Oracle Health", sector: "EHR / clinical platform" },
      { name: "Veeva Systems", sector: "Life sciences / healthcare cloud" },
      { name: "Allscripts", sector: "Healthcare IT / clinical workflow" },
      { name: "Availity", sector: "Healthcare data exchange" },
      { name: "Athenahealth", sector: "Ambulatory EHR / RCM" }
    ]);
  }

  // ── Fleet / AIoT / logistics tech ─────────────────────────────
  if (/fleet|aiot|telematics|logistics.*tech|transportation.*tech|vehicle.*tech|safety.*platform/.test(c)) {
    return exclude([
      { name: "Samsara", sector: "Fleet telematics / IoT" },
      { name: "Lytx", sector: "Fleet safety / video telematics" },
      { name: "Motive", sector: "Fleet management / ELD" },
      { name: "Geotab", sector: "Fleet data / telematics" },
      { name: "Verizon Connect", sector: "Fleet management platform" },
      { name: "Omnitracs", sector: "Fleet intelligence platform" }
    ]);
  }

  // ── Employee experience / intranet / enterprise search ─────────
  if (/employee.*experience|intranet|enterprise.*search|employee.*platform|workforce.*platform/.test(c)) {
    return exclude([
      { name: "Microsoft Viva", sector: "Employee experience platform" },
      { name: "Simpplr", sector: "AI intranet / employee experience" },
      { name: "Unily", sector: "Employee experience platform" },
      { name: "Staffbase", sector: "Internal communications platform" },
      { name: "Coveo", sector: "Enterprise AI search" },
      { name: "Glean", sector: "Workplace AI search" }
    ]);
  }

  // ── Decision intelligence / AI platform / enterprise AI ────────
  if (/decision.*intel|enterprise.*ai|ai.*platform|agentic|knowledge.*graph|llm.*enterprise|enterprise.*ai.*platform/.test(c)) {
    return exclude([
      { name: "Palantir", sector: "Data / AI platform" },
      { name: "C3.ai", sector: "Enterprise AI applications" },
      { name: "DataRobot", sector: "AI / ML platform" },
      { name: "Pegasystems", sector: "Decision AI / workflow automation" },
      { name: "Veritone", sector: "Enterprise AI platform" },
      { name: "H2O.ai", sector: "AI / ML platform" }
    ]);
  }

  // ── Fallback: signal context ───────────────────────────────────
  return exclude(getCompaniesLikeThis(signal).slice(0, 6));
}
