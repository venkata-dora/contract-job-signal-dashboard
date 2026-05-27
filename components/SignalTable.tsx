"use client";

import { BriefcaseBusiness, ChevronDown, Copy, ExternalLink, MapPin, Pencil, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { CategoryBadge, StrengthBadge } from "./Badges";
import { categoryConfig } from "@/lib/categoryStyles";
import { categories, type JobSignal, type SignalCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SignalTable({
  signals,
  onDelete,
  onEdit
}: {
  signals: JobSignal[];
  onDelete?: (id: string) => void;
  onEdit?: (signal: JobSignal) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const grouped = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          signals: signals.filter((signal) => signal.category === category)
        }))
        .filter((group) => group.signals.length > 0),
    [signals]
  );

  return (
    <section className="space-y-8">
      <div className="surface flex flex-wrap items-center justify-between gap-5 p-6">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Daily news signals</h2>
          <p className="mt-1.5 text-sm leading-6 text-slate-600">
            Executive view of major news, source links, likely job markets, and why the event creates software work.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700">{signals.length} signals</span>
      </div>

      {signals.length === 0 && <div className="surface px-5 py-10 text-center text-sm text-slate-500">No signals match the current filters.</div>}

      {grouped.map((group) => (
        <CategorySection
          key={group.category}
          category={group.category}
          signals={group.signals}
          expanded={expanded}
          setExpanded={setExpanded}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
}

function CategorySection({
  category,
  signals,
  expanded,
  setExpanded,
  onDelete,
  onEdit
}: {
  category: SignalCategory;
  signals: JobSignal[];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  onDelete?: (id: string) => void;
  onEdit?: (signal: JobSignal) => void;
}) {
  const accent = categoryConfig[category].accent;
  const highCount = signals.filter((signal) => signal.signalStrength === "High").length;

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm shadow-slate-200/70">
      <div className="px-6 py-5 text-white" style={{ background: accent }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-lg font-bold">{category}</h3>
              <p className="mt-1 text-sm font-medium text-white/80">
                {signals.length} signal{signals.length === 1 ? "" : "s"} · {highCount} high priority
              </p>
            </div>
          </div>
          <div className="rounded-full bg-white/16 px-3 py-1.5 text-xs font-bold ring-1 ring-white/25">
            {shortCategory(category)}
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        {signals.map((signal) => {
          const open = expanded === signal.id;
          return (
            <article
              key={signal.id}
              className="rounded-2xl border border-slate-200 border-l-4 bg-white p-6 shadow-sm shadow-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderLeftColor: accent }}
            >
              <div className="grid gap-7 xl:grid-cols-[minmax(300px,1.1fr)_190px_minmax(270px,0.9fr)_minmax(300px,1fr)_minmax(260px,0.95fr)]">
                <div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg px-2.5 py-1 text-xs font-bold tabular-nums ring-1" style={{ color: accent, borderColor: accent, background: `${accent}18` }}>#{signal.rank}</div>
                    <button onClick={() => setExpanded(open ? null : signal.id)} className="group min-w-0 text-left">
                      <div className="flex items-start gap-2">
                        <ChevronDown className={cn("mt-1 h-4 w-4 shrink-0 text-slate-400 transition", open && "rotate-180")} />
                        <h4 className="text-base font-bold leading-6 text-slate-950 group-hover:text-blue-700">{signal.companyEvent}</h4>
                      </div>
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 pl-12">
                    <StrengthBadge strength={signal.signalStrength} />
                    <CategoryBadge category={signal.category} />
                  </div>
                  <p className="mt-4 pl-12 text-sm font-medium leading-6 text-slate-600">{signal.eventType}</p>
                </div>

                <div>
                  <Label>Date / Source</Label>
                  <div className="mt-1 font-semibold tabular-nums text-slate-950">{formatEventDate(signal.eventDate)}</div>
                  <div className="text-xs text-slate-500">{dateAge(signal.eventDate)}</div>
                  <a className="mt-3 inline-flex max-w-full items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 hover:underline" href={signal.resourceLink} target="_blank" rel="noreferrer">
                    {signal.sourceName}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </div>

                <div>
                  <Label>Where jobs are likely</Label>
                  <LocationList locations={signal.likelyJobLocations} />
                  <div className="mt-3 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{signal.workMode}</div>
                </div>

                <div>
                  <Label>Why jobs may appear</Label>
                  <p className="mt-1 line-clamp-4 text-sm leading-6 text-slate-700">{signal.whyThisMayCreateContractSoftwareJobs}</p>
                </div>

                <div>
                  <Label>Likely roles</Label>
                  <RoleList roles={signal.likelySoftwareRoles} />
                  <div className="mt-4 flex gap-1">
                    {onEdit && (
                      <button aria-label="Edit signal" onClick={() => onEdit(signal)} className="icon-button">
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button aria-label="Delete signal" onClick={() => onDelete(signal.id)} className="icon-button hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {open && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="grid gap-x-10 gap-y-6 md:grid-cols-3">
                    <Detail title="Sector" text={signal.sector} />
                    <Detail title="Why these locations" text={signal.whyTheseLocations} />
                    <Detail title="Action plan" text={signal.actionPlan} />
                    <Detail title="Confidence note" text={signal.confidenceNote} />
                    <Detail title="All locations" text={signal.likelyJobLocations.join(", ")} />
                    <Detail title="All roles" text={signal.likelySoftwareRoles.join(", ")} />
                  </div>
                  <div className="mt-6 border-t border-border pt-5">
                    <Label>Search keywords</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {signal.bestSearchKeywords.map((keyword) => (
                        <button
                          key={keyword}
                          onClick={() => navigator.clipboard.writeText(keyword)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-left text-xs font-semibold text-slate-700 ring-1 ring-border transition hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Copy className="h-3 w-3 shrink-0" />
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{children}</div>;
}

function shortCategory(category: SignalCategory) {
  if (category.startsWith("Banking")) return "Banking";
  if (category.startsWith("M&A")) return "M&A";
  if (category.startsWith("Cyber")) return "Cyber";
  return "AI / Cloud";
}

function Detail({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <Label>{title}</Label>
      <p className="mt-1.5 text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}

function LocationList({ locations }: { locations: string[] }) {
  const visible = locations.slice(0, 6);
  const remaining = locations.length - visible.length;

  return (
    <ul className="mt-2 space-y-2">
      {visible.map((location) => (
        <li key={location} className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium leading-5 text-slate-700 ring-1 ring-slate-200">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
          <span>{location}</span>
        </li>
      ))}
      {remaining > 0 && (
        <li className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
          +{remaining} more locations in details
        </li>
      )}
    </ul>
  );
}

function RoleList({ roles }: { roles: string[] }) {
  const visible = roles.slice(0, 7);
  const remaining = roles.length - visible.length;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {visible.map((role) => (
        <span key={role} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
          <BriefcaseBusiness className="h-3.5 w-3.5 text-slate-500" />
          {role}
        </span>
      ))}
      {remaining > 0 && <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-500">+{remaining} more</span>}
    </div>
  );
}

function formatEventDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function dateAge(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const days = Math.round((todayStart.getTime() - dateStart.getTime()) / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days > 1 && days < 31) return `${days} days ago`;
  if (days >= 31 && days < 365) return `${Math.round(days / 30)} mo ago`;
  if (days >= 365) return `${Math.round(days / 365)} yr ago`;
  return "Upcoming";
}
