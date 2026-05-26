import type { SignalCategory } from "./types";

const roleMap: Record<SignalCategory, string[]> = {
  "Banking / Payments / Fintech": [
    "Java Developer",
    "Python Developer",
    "Backend Engineer",
    "Data Engineer",
    "Payments Engineer",
    "Card Platform Developer",
    "API Integration Developer",
    "QA Automation/SDET",
    "Fraud/Risk Systems Developer",
    "Business Systems Analyst",
    "Technical BA"
  ],
  "M&A / Divestiture / Carve-out": [
    "Data Engineer",
    "ETL Developer",
    "ERP Integration Developer",
    "Cloud Engineer",
    "DevOps/SRE",
    "QA Automation/SDET",
    "API Integration Developer",
    "Business Systems Analyst",
    "Technical BA"
  ],
  "Cyber / Compliance / Regulatory": [
    "AppSec Engineer",
    "DevSecOps Engineer",
    "IAM Engineer",
    "Cloud Security Engineer",
    "Python Developer",
    "Data Engineer",
    "ServiceNow Security Developer",
    "GRC Automation Analyst",
    "QA Automation/SDET"
  ],
  "AI / Cloud / Enterprise Platforms": [
    "AI Engineer",
    "Python Developer",
    "MLOps Engineer",
    "Data Engineer",
    "Cloud Software Engineer",
    "Platform Engineer",
    "Backend Engineer",
    "Full-stack Developer",
    "SAP Developer",
    "ServiceNow Developer",
    "Salesforce Developer",
    "QA Automation/SDET"
  ]
};

export function rolesForCategory(category: SignalCategory) {
  return roleMap[category];
}
