"use client";

import { useState } from "react";
import Link from "next/link";
import { categoryConfig } from "@/lib/categoryStyles";
import { getCompaniesLikeThis, getCompaniesMentioned } from "@/lib/companyIntel";
import { getUsJobLocations } from "@/lib/utils";
import type { JobSignal } from "@/lib/types";
import { CategoryChip, StrengthBadge, TierBadge } from "./Badges";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function daysAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  if (days < 60) return "1 month ago";
  return `${Math.floor(days / 30)} months ago`;
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

const DocIcon = () => (
  <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 3h8l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/>
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
  const [open, setOpen] = useState(defaultOpen);
  const cat = categoryConfig[signal.category];
  const hasSource = signal.resourceLink && signal.resourceLink !== "#";
  const companies = getCompaniesMentioned(signal);
  const companiesLikeThis = getCompaniesLikeThis(signal);
  const locations = getUsJobLocations(signal);

  return (
    <article className="brief" style={{ borderLeftColor: cat?.accent ?? "#1B2A4E" }}>
      {/* HEAD */}
      <div className="brief-head">
        <div className="brief-rank">
          <div className="rank-num">{String(rank).padStart(2, "0")}</div>
          <div className="rank-meta">
            <StrengthBadge strength={signal.signalStrength} />
          </div>
        </div>

        <div className="brief-body">
          <div className="brief-titleline">
            <h3 className="brief-title">{signal.companyEvent}</h3>
            <button className="brief-toggle" onClick={() => setOpen(!open)} aria-label="Expand">
              <ChevronIcon open={open} />
            </button>
          </div>
          <div className="brief-subline">
            <span className="evt-type">{signal.eventType}</span>
            <span className="dot-sep">·</span>
            <span>{signal.sector}</span>
            <span className="dot-sep">·</span>
            <span>{fmtDate(signal.eventDate)}</span>
            <span className="agoref">({daysAgo(signal.eventDate)})</span>
          </div>
          <div className="brief-chips">
            <TierBadge strength={signal.signalStrength} eventDate={signal.eventDate} />
            <CategoryChip category={signal.category} />
            <span className="workmode">
              <PinIcon /> {signal.workMode}
            </span>
          </div>

          {companies.length > 0 && (
            <div className="company-strip" aria-label="Companies mentioned">
              <div className="company-strip-label">Companies</div>
              <div className="company-pills">
                {companies.map((company) => (
                  <span key={`${signal.id}-${company.name}`} className="company-pill">
                    <span className="company-pill-main">
                      <strong>{company.name}</strong>
                      <span>{company.sector}</span>
                    </span>
                    {company.relationship && (
                      <span className={`company-rel ${company.relationship === "Primary target" ? "primary-rel" : ""}`}>
                        {company.relationship}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(signal.summary || signal.rawNotes) && (
            <p className="brief-summary">
              {signal.summary ?? signal.rawNotes}
              {hasSource && (
                <a href={signal.resourceLink} target="_blank" rel="noopener noreferrer" className="inline-src">
                  Read full article <ExtIcon />
                </a>
              )}
            </p>
          )}
        </div>

        <div className="brief-actions">
          <div className="src-block">
            <div className="src-label">Original source</div>
            {hasSource ? (
              <a href={signal.resourceLink} target="_blank" rel="noopener noreferrer" className="src-link">
                <span className="src-name">{signal.sourceName || "View source"}</span>
                <ExtIcon />
              </a>
            ) : (
              <span className="src-link src-placeholder">
                <span className="src-name">{signal.sourceName || "Local source"}</span>
                <DocIcon />
              </span>
            )}
          </div>
          <div className="row-icons">
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
        </div>
      </div>

      {/* THREE COLUMN GRID — Where / Why / Roles */}
      <div className="brief-grid">
        <section className="b-col">
          <div className="col-label">Where jobs are likely</div>
          <ul className="loc-list">
            {locations.map((l, i) => (
              <li key={i}>
                <PinIcon />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="b-col">
          <div className="col-label">Why jobs may appear</div>
          <p className="why-text">{signal.whyThisMayCreateContractSoftwareJobs}</p>
        </section>

        <section className="b-col">
          <div className="col-label">Likely software roles</div>
          <div className="role-chips">
            {signal.likelySoftwareRoles.map((r, i) => (
              <span key={i} className="role-chip">{r}</span>
            ))}
          </div>
        </section>
      </div>

      <section className="similar-companies">
        <div className="col-label">Companies like this</div>
        <div className="similar-company-grid">
          {companiesLikeThis.map((company) => (
            <span key={`${signal.id}-like-${company.name}`} className="similar-company-pill">
              <strong>{company.name}</strong>
              <span>{company.sector}</span>
            </span>
          ))}
        </div>
      </section>

      {/* EXPANDED DETAIL */}
      {open && (
        <div className="brief-detail">
          <div className="detail-grid">
            <div>
              <div className="col-label">Companies mentioned</div>
              <div className="company-detail-list">
                {companies.map((company) => (
                  <div key={`${signal.id}-detail-${company.name}`} className="company-detail">
                    <div className="company-detail-name">{company.name}</div>
                    <div className="company-detail-sector">
                      {company.relationship ? `${company.relationship} · ` : ""}{company.sector}
                    </div>
                    <p>{company.description}</p>
                  </div>
                ))}
              </div>
            </div>
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
