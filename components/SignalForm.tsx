"use client";

import { useState } from "react";
import { classifySignalText } from "@/lib/classification";
import { generateSearchStrings } from "@/lib/keywordRules";
import type { JobSignal, SignalCategory, SignalStrength, WorkMode } from "@/lib/types";
import { categories, strengths, workModes } from "@/lib/types";

const SparkIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M5.5 18.5l2.1-2.1M16.4 7.6l2.1-2.1"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const PlusIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const TrashIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"/>
    <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/>
  </svg>
);

const emptySignal = (): JobSignal => {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    companyEvent: "", eventType: "", category: "AI / Cloud / Enterprise Platforms",
    signalStrength: "Medium", eventDate: new Date().toISOString().slice(0, 10),
    resourceLink: "", sourceName: "", sector: "",
    likelyJobLocations: [], workMode: "Remote / Hybrid",
    whyTheseLocations: "", whyThisMayCreateContractSoftwareJobs: "",
    likelySoftwareRoles: [], bestSearchKeywords: [],
    actionPlan: "", confidenceNote: "", watchFor: [], rawNotes: "",
    createdAt: now, updatedAt: now
  };
};

export function SignalForm({
  initialSignal,
  onSubmit,
  onCancel,
  onDelete
}: {
  initialSignal?: JobSignal;
  onSubmit: (signal: JobSignal) => void;
  onCancel?: () => void;
  onDelete?: (id: string) => void;
}) {
  const [signal, setSignal] = useState<JobSignal>(initialSignal ?? emptySignal());

  function update<K extends keyof JobSignal>(key: K, value: JobSignal[K]) {
    setSignal(cur => ({ ...cur, [key]: value, updatedAt: new Date().toISOString() }));
  }
  function updArr(key: keyof JobSignal, val: string) {
    update(key, val.split("\n").map(x => x.trim()).filter(Boolean) as JobSignal[typeof key]);
  }

  function autoClassify() {
    const text = [signal.companyEvent, signal.eventType, signal.sector, signal.rawNotes].join(" ");
    const classified = classifySignalText(text);
    const next = {
      ...signal,
      category: classified.category,
      secondaryCategories: classified.secondaryCategories,
      eventType: signal.eventType || classified.eventType,
      signalStrength: classified.signalStrength,
      likelyJobLocations: signal.likelyJobLocations.length ? signal.likelyJobLocations : classified.likelyJobLocations,
      workMode: signal.workMode || classified.workMode,
      whyTheseLocations: signal.whyTheseLocations || classified.whyTheseLocations,
      whyThisMayCreateContractSoftwareJobs: signal.whyThisMayCreateContractSoftwareJobs || classified.whyThisMayCreateContractSoftwareJobs,
      likelySoftwareRoles: signal.likelySoftwareRoles.length ? signal.likelySoftwareRoles : classified.likelySoftwareRoles,
      confidenceNote: signal.confidenceNote || `Local rules matched ${classified.category}; score ${classified.score}.`,
      updatedAt: new Date().toISOString()
    };
    next.bestSearchKeywords = signal.bestSearchKeywords.length ? signal.bestSearchKeywords : generateSearchStrings(next);
    setSignal(next);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      ...signal,
      sourceName: signal.sourceName || "Manual source",
      resourceLink: signal.resourceLink || "#",
      bestSearchKeywords: signal.bestSearchKeywords.length ? signal.bestSearchKeywords : generateSearchStrings(signal)
    });
  }

  const isEditing = Boolean(initialSignal);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="kicker">{isEditing ? "Edit signal" : "Manual signal entry"}</div>
          <h1 className="page-title">{isEditing ? signal.companyEvent || "Edit signal" : "Add signal"}</h1>
          <p className="page-sub">Paste the event once, then run local auto-classify to fill category, roles, locations, and search strings.</p>
        </div>
        <div className="page-actions">
          <button className="btn primary" type="button" onClick={autoClassify}><SparkIcon /> Auto-classify locally</button>
          {onCancel && <button className="btn ghost" type="button" onClick={onCancel}>Cancel</button>}
          {isEditing && onDelete && (
            <button
              className="btn ghost danger"
              type="button"
              onClick={() => { if (window.confirm("Delete this signal?")) onDelete(signal.id); }}
            >
              <TrashIcon /> Delete
            </button>
          )}
        </div>
      </div>

      <form onSubmit={submit} className="form-grid">
        <fieldset className="form-card">
          <legend>Signal basics</legend>
          <div className="ff-grid">
            <label>
              Company / Event
              <input value={signal.companyEvent} onChange={e => update("companyEvent", e.target.value)} placeholder="e.g. Regional bank merger announcement" required />
            </label>
            <label>
              Event type
              <input value={signal.eventType} onChange={e => update("eventType", e.target.value)} placeholder="e.g. Core Banking Conversion" />
            </label>
            <label>
              Category
              <select value={signal.category} onChange={e => update("category", e.target.value as SignalCategory)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label>
              Signal strength
              <select value={signal.signalStrength} onChange={e => update("signalStrength", e.target.value as SignalStrength)}>
                {strengths.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label>
              Event date
              <input type="date" value={signal.eventDate} onChange={e => update("eventDate", e.target.value)} />
            </label>
            <label>
              Sector
              <input value={signal.sector} onChange={e => update("sector", e.target.value)} placeholder="e.g. Regional Banking" />
            </label>
            <label>
              Source name
              <input value={signal.sourceName} onChange={e => update("sourceName", e.target.value)} placeholder="e.g. WSJ" />
            </label>
            <label>
              Resource link / source URL
              <input value={signal.resourceLink} onChange={e => update("resourceLink", e.target.value)} placeholder="https://…" />
            </label>
            <label className="full">
              News summary <span className="hint">2–3 sentence executive summary</span>
              <textarea rows={3} value={signal.summary ?? ""} onChange={e => update("summary", e.target.value)} placeholder="What the article says, in plain language." />
            </label>
            <label>
              Work mode
              <select value={signal.workMode} onChange={e => update("workMode", e.target.value as WorkMode)}>
                {workModes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </label>
            <label className="full">
              Likely job locations <span className="hint">one per line</span>
              <textarea rows={3} value={signal.likelyJobLocations.join("\n")} onChange={e => updArr("likelyJobLocations", e.target.value)} placeholder={"New York, NY\nCharlotte, NC\nRemote vendor delivery"} />
            </label>
            <label className="full">
              Likely software roles <span className="hint">one per line</span>
              <textarea rows={3} value={signal.likelySoftwareRoles.join("\n")} onChange={e => updArr("likelySoftwareRoles", e.target.value)} placeholder={"Java Developer\nPayments Engineer\nQA Automation/SDET"} />
            </label>
            <label className="full">
              What to watch for next <span className="hint">one indicator per line</span>
              <textarea rows={4} value={(signal.watchFor ?? []).join("\n")} onChange={e => updArr("watchFor", e.target.value)} placeholder={"SOW announcements from named SIs 60–90 days post-disclosure\nHiring spikes on the receiving company's careers site"} />
            </label>
          </div>
        </fieldset>

        <fieldset className="form-card">
          <legend>Reasoning and notes</legend>
          <div className="ff-grid">
            <label className="full">
              Why these locations
              <textarea rows={3} value={signal.whyTheseLocations} onChange={e => update("whyTheseLocations", e.target.value)} placeholder="Where the work clusters and why." />
            </label>
            <label className="full">
              Why this may create contract software jobs
              <textarea rows={3} value={signal.whyThisMayCreateContractSoftwareJobs} onChange={e => update("whyThisMayCreateContractSoftwareJobs", e.target.value)} placeholder="What software work the event forces." />
            </label>
            <label className="full">
              Action plan
              <textarea rows={3} value={signal.actionPlan} onChange={e => update("actionPlan", e.target.value)} placeholder="Where to apply and through which partners." />
            </label>
            <label className="full">
              Confidence note
              <textarea rows={2} value={signal.confidenceNote} onChange={e => update("confidenceNote", e.target.value)} placeholder="Why this signal is reliable or not." />
            </label>
            <label className="full">
              Raw notes / article text
              <textarea rows={6} value={signal.rawNotes ?? ""} onChange={e => update("rawNotes", e.target.value)} placeholder="Paste article text or your raw notes here. Auto-classify reads this." />
            </label>
          </div>
        </fieldset>

        <div className="form-submit">
          <button type="submit" className="btn primary"><PlusIcon /> {isEditing ? "Save changes" : "Save signal"}</button>
          {onCancel && <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}
