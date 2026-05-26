"use client";

import { exportCsv, exportJson, exportMd } from "@/lib/export";
import type { JobSignal } from "@/lib/types";

const DownloadIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v13"/><path d="M7 11l5 5 5-5"/><path d="M5 21h14"/>
  </svg>
);

export function ExportButtons({ signals }: { signals: JobSignal[] }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <button className="btn ghost" onClick={() => exportCsv(signals)}><DownloadIcon /> CSV</button>
      <button className="btn ghost" onClick={() => exportMd(signals)}><DownloadIcon /> Markdown</button>
      <button className="btn ghost" onClick={() => exportJson(signals)}><DownloadIcon /> JSON</button>
    </div>
  );
}
