"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/banking", label: "Banking" },
  { href: "/ma", label: "M&A" },
  { href: "/cyber", label: "Cyber" },
  { href: "/ai-platforms", label: "AI / Cloud" }
];

export function CategoryTabs() {
  const pathname = usePathname();
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50",
            pathname === tab.href && "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
