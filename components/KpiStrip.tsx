export function KpiStrip({ items }: { items: Array<{ label: string; value: string | number; sub: string }> }) {
  return (
    <div className="kpi-strip">
      {items.map((k, i) => (
        <div key={i} className="kpi-cell">
          <div className="kpi-label">{k.label}</div>
          <div className="kpi-value">{k.value}</div>
          <div className="kpi-sub">{k.sub}</div>
        </div>
      ))}
    </div>
  );
}
