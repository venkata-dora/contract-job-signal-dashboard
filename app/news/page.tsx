"use client";

import { AppShell } from "@/components/AppShell";
import { BriefingRow } from "@/components/BriefingRow";
import { useSignals } from "@/components/useSignals";

export default function NewsArchivePage() {
  const { signals, isReady } = useSignals();
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
          <nav className="archive-jumps" aria-label="Jump to news date">
            {dates.map((date) => <a key={date} href={`#date-${date}`}>{date}</a>)}
          </nav>
          {dates.map((date) => {
            const stories = signals.filter((signal) => signal.eventDate === date);
            const formatted = new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
            return <section key={date} id={`date-${date}`} className="archive-day" aria-labelledby={`heading-${date}`}>
              <header className="archive-date">
                <h2 id={`heading-${date}`}><time dateTime={date}>{formatted}</time></h2>
                <span>{stories.length} {stories.length === 1 ? "story" : "stories"}</span>
              </header>
              <div className="brief-list">
                {stories.map((signal, index) => <BriefingRow key={signal.id} signal={signal} rank={index + 1} />)}
              </div>
            </section>;
          })}
        </>}
      </div>
    </AppShell>
  );
}
