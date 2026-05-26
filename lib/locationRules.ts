import type { SignalCategory } from "./types";

const categoryLocations: Record<SignalCategory, string[]> = {
  "Banking / Payments / Fintech": [
    "New York, NY",
    "Jersey City, NJ",
    "Wilmington, DE",
    "Charlotte, NC",
    "Columbus, OH",
    "Plano/Dallas, TX",
    "Phoenix, AZ",
    "Chicago, IL",
    "Atlanta, GA"
  ],
  "M&A / Divestiture / Carve-out": [
    "Seller HQ",
    "Buyer HQ",
    "Divested unit HQ",
    "Shared services centers",
    "Consulting hubs",
    "Remote vendor delivery"
  ],
  "Cyber / Compliance / Regulatory": [
    "Company HQ",
    "Affected operations centers",
    "NYC/NJ",
    "Charlotte",
    "Dallas",
    "Atlanta",
    "DC/Northern Virginia",
    "Remote cyber vendor delivery"
  ],
  "AI / Cloud / Enterprise Platforms": [
    "Bay Area",
    "Seattle",
    "Austin",
    "New York",
    "Boston",
    "Raleigh/Durham",
    "Denver",
    "Remote/hybrid"
  ]
};

export function locationsForCategory(category: SignalCategory, text = "") {
  const lower = text.toLowerCase();
  if (/federal|dod|government|public sector/.test(lower)) {
    return [
      "Washington DC",
      "Northern Virginia",
      "Maryland",
      "Huntsville, AL",
      "San Antonio, TX",
      "Colorado Springs, CO",
      "Tampa, FL",
      "St. Louis, MO"
    ];
  }
  if (/healthcare|hospital|ehr|fhir|claims/.test(lower)) {
    return [
      "Nashville",
      "Boston",
      "Atlanta",
      "Dallas",
      "Chicago",
      "Minneapolis",
      "Philadelphia",
      "Remote healthcare IT"
    ];
  }
  if (/insurance|guidewire|duck creek/.test(lower)) {
    return [
      "Hartford",
      "NYC/NJ",
      "Chicago",
      "Dallas",
      "Atlanta",
      "Phoenix",
      "Des Moines",
      "Boston"
    ];
  }
  if (/apple card|issuer transition|co-?branded card/.test(lower)) {
    return [
      "New York, NY",
      "Jersey City, NJ",
      "Wilmington, DE",
      "Columbus, OH",
      "Plano/Dallas, TX",
      "Charlotte, NC",
      "Phoenix, AZ",
      "Bay Area, CA",
      "Remote vendor delivery"
    ];
  }
  return categoryLocations[category];
}
