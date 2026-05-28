"use client";

import { useState } from "react";
import { categoryConfig } from "@/lib/categoryStyles";
import { getCompaniesLikeCompany, getCompaniesMentioned } from "@/lib/companyIntel";
import { getUsJobLocations } from "@/lib/utils";
import type { JobSignal } from "@/lib/types";

function fmtDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function daysAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(`${iso}T00:00:00`).getTime()) / 86400000);
  if (days < 0) return "Upcoming";
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  if (days > 1 && days < 30) return `${days} days ago`;
  if (days < 60) return "1 month ago";
  return `${Math.floor(days / 30)} months ago`;
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildHighlightTerms(companyNames: string[]): string[] {
  const terms = new Set<string>();
  for (const name of companyNames) {
    if (!name) continue;
    terms.add(name);
    // Also match first word if it's a meaningful standalone name (5+ chars)
    const firstWord = name.split(/[\s/]/)[0];
    if (firstWord.length >= 5 && firstWord !== name) {
      terms.add(firstWord);
    }
  }
  return Array.from(terms);
}

function highlightCompanies(text: string, companyNames: string[]) {
  const names = companyNames.filter(Boolean);
  if (names.length === 0) return text;

  const terms = buildHighlightTerms(names);
  const pattern = new RegExp(`(${terms.map(t => `\\b${escapeRegex(t)}\\b`).join("|")})`, "gi");
  return text.split(pattern).map((part, index) => {
    const isCompany = terms.some((name) => name.toLowerCase() === part.toLowerCase());
    return isCompany ? <mark key={`${part}-${index}`} className="company-highlight">{part}</mark> : part;
  });
}

function companyGroupLabel(sector: string) {
  const lower = sector.toLowerCase();
  if (/identity|iam|governance/.test(lower)) return "Identity / governance";
  if (/incident|endpoint|security|zero trust|siem|grc|privacy/.test(lower)) return "Security platforms";
  if (/cloud|ai|data|workflow|platform/.test(lower)) return "Cloud / data platforms";
  if (/bank|card|payment|fintech|crypto/.test(lower)) return "Banking / payments";
  if (/consulting|services|integration|engineering/.test(lower)) return "Services / integrators";
  return "Comparable companies";
}

function groupSimilarCompanies(companies: Array<{ name: string; sector: string }>) {
  return companies.reduce<Array<{ label: string; companies: Array<{ name: string; sector: string }> }>>((groups, company) => {
    const label = companyGroupLabel(company.sector);
    const existing = groups.find((group) => group.label === label);
    if (existing) {
      existing.companies.push(company);
    } else {
      groups.push({ label, companies: [company] });
    }
    return groups;
  }, []);
}

const PinIcon = () => (
  <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>
  </svg>
);

const ExtIcon = () => (
  <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform .15s" }}
  >
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const EditIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h4l10-10-4-4L4 16v4z"/><path d="M14 6l4 4"/>
  </svg>
);

const TrashIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"/>
    <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/>
  </svg>
);

export function BriefingRow({
  signal,
  rank,
  onEdit,
  onRemove,
  defaultOpen = false
}: {
  signal: JobSignal;
  rank: number;
  onEdit?: (s: JobSignal) => void;
  onRemove?: (id: string) => void;
  defaultOpen?: boolean;
}) {
  const [detailOpen, setDetailOpen] = useState(defaultOpen);
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const cat = categoryConfig[signal.category];
  const hasSource = signal.resourceLink && signal.resourceLink !== "#";
  const companies = getCompaniesMentioned(signal);
  const primaryCompanies = companies.filter((company) => company.relationship !== "Partner / vendor");
  const digestCompanies = primaryCompanies.length > 0 ? primaryCompanies : companies.slice(0, 1);
  const storyCompanies = companies.length > 0 ? companies : digestCompanies;
  const visibleStoryCompanies = companiesOpen ? storyCompanies : storyCompanies.slice(0, 2);
  const hiddenCompanyCount = Math.max(0, storyCompanies.length - visibleStoryCompanies.length);
  const highlightedCompanyNames = storyCompanies.map((company) => company.name);
  const similarLimit = storyCompanies.length > 1 ? 3 : 5;
  const allSimilarSections = storyCompanies
    .filter((company) => company.relationship !== "Acquired company")
    .map((company) => ({
      company,
      groups: groupSimilarCompanies(getCompaniesLikeCompany(company, signal).slice(0, similarLimit))
    }))
    .filter(({ groups }) => groups.length > 0);
  const locations = getUsJobLocations(signal);

  return (
    <article className="brief" style={{ borderLeftColor: cat?.accent ?? "#1A7F37" }}>
      <header className="brief-head">
        <div className="brief-meta">
          <span>{String(rank).padStart(2, "0")}</span>
          <span>{fmtDate(signal.eventDate)}</span>
          <span>{daysAgo(signal.eventDate)}</span>
          {hasSource ? (
            <a href={signal.resourceLink} target="_blank" rel="noopener noreferrer">
              {signal.sourceName || "Source"} <ExtIcon />
            </a>
          ) : (
            <span>{signal.sourceName || "Local source"}</span>
          )}
        </div>

        <div className="brief-tools">
          <button title={detailOpen ? "Collapse details" : "Expand details"} onClick={() => setDetailOpen(!detailOpen)} aria-label={detailOpen ? "Collapse details" : "Expand details"}>
            <ChevronIcon open={detailOpen} />
          </button>
          {onEdit && (
            <button title="Edit" onClick={() => onEdit(signal)}>
              <EditIcon />
            </button>
          )}
          {onRemove && (
            <button
              title="Delete"
              onClick={() => {
                if (window.confirm("Remove this signal?")) onRemove(signal.id);
              }}
            >
              <TrashIcon />
            </button>
          )}
        </div>

        <h3 className="brief-title">{highlightCompanies(signal.companyEvent, highlightedCompanyNames)}</h3>

        <div className="brief-subline">
          <span>{signal.eventType}</span>
          <span>{signal.sector}</span>
          <span><PinIcon /> {signal.workMode}</span>
        </div>

        {(signal.summary || signal.rawNotes) && (
          <p className="brief-summary">{highlightCompanies(signal.summary ?? signal.rawNotes ?? "", highlightedCompanyNames)}</p>
        )}

        <aside className="brief-side" aria-label="Signal details">
          <div>
            <span>Signal</span>
            <strong>{signal.signalStrength}</strong>
          </div>
          <div>
            <span>Type</span>
            <strong>{cat?.short ?? signal.category}</strong>
          </div>
          <div>
            <span>Companies</span>
            <strong>{storyCompanies.length}</strong>
          </div>
        </aside>
      </header>

      {(storyCompanies.length > 0 || allSimilarSections.length > 0) && (
        <aside className="similar-sidebox" aria-label="Company context">
          {storyCompanies.length > 0 && (
            <div className="news-companies">
              <h4>Companies in this news</h4>
              <div className="news-company-list">
                {visibleStoryCompanies.map((company) => (
                  <div key={`${signal.id}-news-company-${company.name}`} className="news-company-item">
                    <strong>{company.name}</strong>
                    <span>{company.sector}</span>
                    <small>{company.relationship}</small>
                    {company.description && <p>{company.description}</p>}
                  </div>
                ))}
              </div>
              {storyCompanies.length > 2 && (
                <button className="company-expand" type="button" onClick={() => setCompaniesOpen(!companiesOpen)}>
                  {companiesOpen ? "Show fewer companies" : `Show ${hiddenCompanyCount} more`}
                </button>
              )}
            </div>
          )}

          {allSimilarSections.map(({ company, groups }) => (
            <div key={`${signal.id}-similar-${company.name}`} className="similar-companies">
              <h4>Companies like <span>{company.name}</span></h4>
              {groups.map((group) => (
                <div key={`${signal.id}-${company.name}-${group.label}`} className="similar-group">
                  <div className="similar-group-label">{group.label}</div>
                  <div className="similar-group-list">
                    {group.companies.map((peer) => (
                      <span key={`${signal.id}-${company.name}-similar-${peer.name}`}>
                        <strong>{peer.name}</strong>
                        <small>{peer.sector}</small>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </aside>
      )}

      <section className="digest-section digest-body" aria-label="Digest notes">
        <div className="digest-note">
          <h4>Why this matters for contract work</h4>
          <p>{highlightCompanies(signal.whyThisMayCreateContractSoftwareJobs, highlightedCompanyNames)}</p>
        </div>

        <div className="digest-note-grid">
          <div className="digest-note">
            <h4>Likely locations</h4>
            <div className="location-chips">
              {locations.map((location, i) => (
                <span key={`${signal.id}-location-${i}`} className="location-chip">
                  <PinIcon />
                  {location}
                </span>
              ))}
            </div>
          </div>

          <div className="digest-note">
            <h4>Likely roles</h4>
            <div className="role-chips">
              {signal.likelySoftwareRoles.map((r, i) => (
                <span key={i} className="role-chip">{r}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <button
        className="detail-toggle"
        type="button"
        onClick={() => setDetailOpen(!detailOpen)}
        aria-expanded={detailOpen}
      >
        <ChevronIcon open={detailOpen} />
        {detailOpen ? "Hide details" : "Show details"}
      </button>

      {/* EXPANDED DETAIL */}
      {detailOpen && (
        <div className="brief-detail">
          <div className="detail-grid">
            <div>
              <div className="col-label">Why these locations</div>
              <p className="why-text">{signal.whyTheseLocations}</p>
            </div>
            <div>
              <div className="col-label">Action plan</div>
              <p className="why-text">{signal.actionPlan}</p>
            </div>
          </div>
          <div className="detail-grid compact">
            <div>
              <div className="col-label">Confidence note</div>
              <p className="why-text">{signal.confidenceNote}</p>
            </div>
          </div>

          <div>
            <div className="col-label kw-label">What to watch for next</div>
            <ul className="watch-list">
              {(signal.watchFor ?? []).map((w, i) => (
                <li key={i}>
                  <span className="watch-marker">{String(i + 1).padStart(2, "0")}</span>
                  <span className="watch-text">{w}</span>
                </li>
              ))}
              {(!signal.watchFor || signal.watchFor.length === 0) && (
                <li className="watch-empty">No specific watch indicators recorded yet.</li>
              )}
            </ul>
          </div>

          {signal.rawNotes && !signal.summary && (
            <div className="notes-block">
              <div className="col-label">Raw notes</div>
              <p className="why-text">{signal.rawNotes}</p>
            </div>
          )}

          {signal.bestSearchKeywords.length > 0 && (
            <div className="notes-block">
              <div className="col-label">Search keywords</div>
              <div className="role-chips" style={{ marginTop: 8 }}>
                {signal.bestSearchKeywords.map((k, i) => (
                  <span key={i} className="role-chip" style={{ fontFamily: "var(--mono)", fontSize: "11px" }}>{k}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
