export type SignalCategory =
  | "Banking / Payments / Fintech"
  | "M&A / Divestiture / Carve-out"
  | "Cyber / Compliance / Regulatory"
  | "AI / Cloud / Enterprise Platforms";

export type SignalStrength = "High" | "Medium" | "Low";

export type WorkMode =
  | "Remote"
  | "Hybrid"
  | "On-site"
  | "Remote / Hybrid"
  | "Hybrid / On-site";

export type JobSignal = {
  id: string;
  rank?: number;
  companyEvent: string;
  companiesMentioned?: {
    name: string;
    description: string;
    sector: string;
    relationship?: "Primary target" | "Partner / vendor" | "Source / award issuer" | "Customer / buyer" | "Acquirer" | "Acquired company";
  }[];
  eventType: string;
  category: SignalCategory;
  secondaryCategories?: SignalCategory[];
  signalStrength: SignalStrength;
  eventDate: string;
  resourceLink: string;
  sourceName: string;
  sector: string;
  summary?: string;
  likelyJobLocations: string[];
  workMode: WorkMode;
  whyTheseLocations: string;
  whyThisMayCreateContractSoftwareJobs: string;
  likelySoftwareRoles: string[];
  bestSearchKeywords: string[];
  actionPlan: string;
  confidenceNote: string;
  watchFor?: string[];
  rawNotes?: string;
  createdAt: string;
  updatedAt: string;
};

export type DateRange = "24h" | "48h" | "week1" | "week2" | "week3" | "week4" | "All";

export type SignalFilters = {
  query: string;
  category: "All" | SignalCategory;
  strength: "All" | SignalStrength;
  workMode: "All" | WorkMode;
  location: string;
  role: string;
  dateRange: DateRange;
  exactDate: string;
  sortBy: "Rank" | "Date" | "Strength";
};

export const categories: SignalCategory[] = [
  "Banking / Payments / Fintech",
  "M&A / Divestiture / Carve-out",
  "Cyber / Compliance / Regulatory",
  "AI / Cloud / Enterprise Platforms"
];

export const strengths: SignalStrength[] = ["High", "Medium", "Low"];

export const workModes: WorkMode[] = [
  "Remote",
  "Hybrid",
  "On-site",
  "Remote / Hybrid",
  "Hybrid / On-site"
];

export const dateRanges: DateRange[] = ["24h", "48h", "week1", "week2", "week3", "week4", "All"];
