import type { JobSignal } from "@/lib/types";

export function NewsCalendar({ signals, open, onToggle }: { signals: JobSignal[]; open: boolean; onToggle: () => void }) {
  const byDate = new Map<string, { count: number; high: number; level: number }>();
  signals.forEach((signal) => {
    const day = byDate.get(signal.eventDate) ?? { count: 0, high: 0, level: 0 };
    day.count++;
    if (signal.signalStrength === "High") day.high++;
    day.level = Math.max(day.level, signal.signalStrength === "High" ? 3 : signal.signalStrength === "Medium" ? 2 : 1);
    byDate.set(signal.eventDate, day);
  });
  const dates = Array.from(byDate.keys()).sort();
  if (!dates.length) return null;
  const start = new Date(`${dates[0].slice(0, 7)}-01T00:00:00Z`);
  const end = new Date(`${dates[dates.length - 1].slice(0, 7)}-01T00:00:00Z`);
  const months: string[] = [];
  for (const date = new Date(start); date <= end; date.setUTCMonth(date.getUTCMonth() + 1)) months.push(date.toISOString().slice(0, 7));

  return <aside className="news-calendar" aria-label="News priority calendar">
    <button type="button" className="calendar-toggle" onClick={onToggle} aria-expanded={open} aria-controls="news-calendar-content" title={open ? "Collapse news activity" : "Expand news activity"}>
      <span aria-hidden="true">{open ? "‹" : "›"}</span>{open && "News activity"}
    </button>
    <div id="news-calendar-content" hidden={!open}>
    <p>Choose a day to jump to its news.</p>
    <div className="calendar-legend"><span>Lower</span>{[0, 1, 2, 3].map((level) => <i key={level} className={`calendar-cell level-${level}`} />)}<span>High</span></div>
    <div className="calendar-months">
      {months.reverse().map((month) => {
        const first = new Date(`${month}-01T00:00:00Z`);
        const days = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
        return <section key={month} className="calendar-month">
          <h3>{first.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })}</h3>
          <div className="calendar-grid">
            {["S", "M", "T", "W", "T", "F", "S"].map((label, index) => <span key={index} className="calendar-weekday" aria-hidden="true">{label}</span>)}
            {Array.from({ length: first.getUTCDay() }, (_, index) => <span key={`blank-${index}`} />)}
            {Array.from({ length: days }, (_, index) => {
              const date = `${month}-${String(index + 1).padStart(2, "0")}`;
              const info = byDate.get(date);
              const label = `${date}: ${info?.count ?? 0} stories, ${info?.high ?? 0} high priority`;
              return info ? <a key={date} href={`#date-${date}`} className={`calendar-cell level-${info.level}`} aria-label={label} title={label}><span>{index + 1}</span></a> : <span key={date} className="calendar-cell level-0" title={label} aria-label={label} />;
            })}
          </div>
        </section>;
      })}
    </div>
    </div>
  </aside>;
}
