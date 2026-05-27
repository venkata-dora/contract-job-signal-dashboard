"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { loadSignals } from "@/lib/storage";
import type { SignalCategory } from "@/lib/types";

const CAT_ROUTES: Array<{ href: string; label: string; cat: SignalCategory | null; icon: React.ReactNode }> = [
  {
    href: "/banking",
    label: "Banking / Payments",
    cat: "Banking / Payments / Fintech",
    icon: (
      <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10l9-6 9 6"/><path d="M5 10v9M9 10v9M15 10v9M19 10v9"/><path d="M3 21h18"/>
      </svg>
    )
  },
  {
    href: "/ma",
    label: "M&A / Carve-out",
    cat: "M&A / Divestiture / Carve-out",
    icon: (
      <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3v6a6 6 0 0 0 6 6v6"/><path d="M18 3v6a6 6 0 0 1-6 6"/>
      </svg>
    )
  },
  {
    href: "/cyber",
    label: "Cyber / Regulatory",
    cat: "Cyber / Compliance / Regulatory",
    icon: (
      <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/>
      </svg>
    )
  },
  {
    href: "/ai-platforms",
    label: "AI / Cloud / Platforms",
    cat: "AI / Cloud / Enterprise Platforms",
    icon: (
      <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/>
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>
      </svg>
    )
  }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    function refreshCounts() {
      const signals = loadSignals();
      const c: Record<string, number> = { total: signals.length };
      CAT_ROUTES.forEach(({ href, cat }) => {
        if (cat) c[href] = signals.filter(s => s.category === cat).length;
      });
      c["/weekly"] = Math.min(10, signals.length);
      setCounts(c);
    }
    refreshCounts();
    window.addEventListener("signals-updated", refreshCounts);
    window.addEventListener("focus", refreshCounts);
    return () => {
      window.removeEventListener("signals-updated", refreshCounts);
      window.removeEventListener("focus", refreshCounts);
    };
  }, []);

  const today = new Date();
  const briefId = "CSB-" + today.getFullYear() + String(today.getMonth() + 1).padStart(2, "0") + String(today.getDate()).padStart(2, "0");

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">CS</div>
          <div className="brand-text">
            <div className="brand-kicker">Local Workspace</div>
            <div className="brand-name">Contract Signals</div>
          </div>
        </div>

        <div className="nav-section-label">Saved briefing</div>
        <nav className="nav">
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            <span className="nav-ic">
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/>
                <rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
              </svg>
            </span>
            <span>Dashboard</span>
            <span className="count">{counts.total ?? 0}</span>
          </Link>
          <Link href="/add-signal" className={pathname === "/add-signal" ? "active" : ""}>
            <span className="nav-ic">
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </span>
            <span>Add signal</span>
          </Link>
        </nav>

        <div className="nav-sep" />
        <div className="nav-section-label">Saved categories</div>
        <nav className="nav">
          {CAT_ROUTES.map(({ href, label, icon }) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""}>
              <span className="nav-ic">{icon}</span>
              <span>{label}</span>
              <span className="count">{counts[href] ?? 0}</span>
            </Link>
          ))}
        </nav>

        <div className="nav-sep" />
        <div className="nav-section-label">Action view</div>
        <nav className="nav">
          <Link href="/weekly" className={pathname === "/weekly" ? "active" : ""}>
            <span className="nav-ic">
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l2.7 5.6 6 .9-4.4 4.2 1.1 6L12 17l-5.4 2.8 1.1-6L3.3 9.5l6-.9L12 3z"/>
              </svg>
            </span>
            <span>Weekly priority</span>
            <span className="count">{counts["/weekly"] ?? 0}</span>
          </Link>
        </nav>

        <div className="sb-footer">
          <strong>No external feeds</strong>
          Manual inputs, seed data, browser storage, and deterministic local rules. Nothing leaves this machine.
        </div>
      </aside>

      <main className="main">
        <div className="topstripe">
          <div className="left">
            <span><span className="dot" /> LOCAL / OFFLINE</span>
            <span>BRIEFING {briefId}</span>
          </div>
          <div className="right">
            <span>{today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>
            <span>{counts.total ?? 0} SAVED SIGNALS</span>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
