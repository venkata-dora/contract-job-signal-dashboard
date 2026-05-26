import type { JobSignal } from "./types";

function download(filename: string, content: string, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 200);
}

function csvEscape(value: string | number) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const headers = [
  "Rank", "Company/Event", "Event Type", "Signal Strength", "Event Date",
  "Resource Link", "Source", "Sector", "Likely Job Locations", "Work Mode",
  "Why These Locations", "Why This May Create Contract Software Jobs",
  "Likely Software Roles", "Best Search Keywords", "Action Plan", "Confidence Note"
];

export function exportCsv(signals: JobSignal[]) {
  const rows = [
    headers.join(","),
    ...signals.map(s =>
      [
        s.rank ?? "", s.companyEvent, s.eventType, s.signalStrength, s.eventDate,
        s.resourceLink, s.sourceName, s.sector,
        s.likelyJobLocations.join("; "), s.workMode,
        s.whyTheseLocations, s.whyThisMayCreateContractSoftwareJobs,
        s.likelySoftwareRoles.join("; "), s.bestSearchKeywords.join("; "),
        s.actionPlan, s.confidenceNote
      ].map(csvEscape).join(",")
    )
  ].join("\n");
  download("contract-signals.csv", rows, "text/csv");
}

export function exportMd(signals: JobSignal[]) {
  let md = `# Contract Signal Briefing\n\n_Generated ${new Date().toLocaleString()}_\n\n`;
  signals.forEach((s, i) => {
    md += `## ${i + 1}. ${s.companyEvent}\n\n`;
    md += `**Event type:** ${s.eventType}  \n**Category:** ${s.category}  \n**Strength:** ${s.signalStrength}  \n**Event date:** ${s.eventDate}  \n**Sector:** ${s.sector}  \n**Source:** ${s.sourceName || ""} ${s.resourceLink || ""}  \n\n`;
    if (s.summary ?? s.rawNotes) md += `### Summary\n${s.summary ?? s.rawNotes}\n\n`;
    md += `### Where jobs are likely (${s.workMode})\n${s.likelyJobLocations.map(l => `- ${l}`).join("\n")}\n\n`;
    md += `### Why jobs may appear\n${s.whyThisMayCreateContractSoftwareJobs}\n\n`;
    md += `### Likely software roles\n${s.likelySoftwareRoles.map(r => `- ${r}`).join("\n")}\n\n`;
    md += `### Action plan\n${s.actionPlan}\n\n### Confidence\n${s.confidenceNote}\n\n`;
    if (s.watchFor?.length) md += `### What to watch for next\n${s.watchFor.map(w => `- ${w}`).join("\n")}\n\n`;
    md += `---\n\n`;
  });
  download("contract-signals.md", md, "text/markdown");
}

export function exportJson(signals: JobSignal[]) {
  download("contract-signals.json", JSON.stringify(signals, null, 2), "application/json");
}

export function exportMarkdown(signals: JobSignal[]) {
  exportMd(signals);
}

export function downloadText(filename: string, text: string, type: string) {
  download(filename, text, type);
}
