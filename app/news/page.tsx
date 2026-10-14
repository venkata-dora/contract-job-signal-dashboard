"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { BriefingRow } from "@/components/BriefingRow";
import { NewsCalendar } from "@/components/NewsCalendar";
import { useSignals } from "@/components/useSignals";

export default function NewsArchivePage() {
  const { signals, isReady } = useSignals();
  const [calendarOpen, setCalendarOpen] = useState(true);
  const dates = Array.from(new Set(signals.map((signal) => signal.eventDate))).sort((a, b) => b.localeCompare(a));

  return (
    <AppShell>
      <div className="page news-archive">
        <div className="page-head">
          <div>
            <div className="kicker">Complete history</div>
            <h1 className="page-title">All news</h1>
            <p className="page-sub">Every saved story, grouped by event date. Newest dates first.</p>
          </div>
        </div>
        {!isReady ? <p role="status">Loading news…</p> : signals.length === 0 ? <p>No saved news yet.</p> : <>
          <p className="section-sub">{signals.length} stories across {dates.length} dates · No date filter or result limit</p>
          <div className={`archive-layout${calendarOpen ? "" : " calendar-collapsed"}`}>
          <NewsCalendar signals={signals} open={calendarOpen} onToggle={() => setCalendarOpen(!calendarOpen)} />
          <div className="archive-stories">
          {dates.map((date) => {
            const stories = signals.filter((signal) => signal.eventDate === date).sort((a, b) => ({ High: 3, Medium: 2, Low: 1 }[b.signalStrength] - { High: 3, Medium: 2, Low: 1 }[a.signalStrength]));
            const formatted = new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
            return <section key={date} id={`date-${date}`} className="archive-day" aria-labelledby={`heading-${date}`}>
              <header className="archive-date">
                <h2 id={`heading-${date}`}><time dateTime={date}>{formatted}</time></h2>
                <span>{stories.length} {stories.length === 1 ? "story" : "stories"}</span>
              </header>
              <div className="brief-list">
                {stories.map((signal, index) => <div key={signal.id} className={signal.signalStrength === "High" ? "archive-high" : undefined}>
                  {signal.signalStrength === "High" && <div className="archive-high-label">High priority</div>}
                  <BriefingRow signal={signal} rank={index + 1} />
                </div>)}
              </div>
            </section>;
          })}
          </div>
          </div>
        </>}
      </div>
    </AppShell>
  );
}
