"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Home", icon: "📊" },
  { href: "/dashboard/routine", label: "Routine", icon: "🌿" },
  { href: "/dashboard/daily-record", label: "Record", icon: "📝" },
  { href: "/dashboard/insights", label: "Insights", icon: "📈" },
  { href: "/dashboard/history", label: "History", icon: "📅" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-[var(--card-border)] bg-[var(--card)]/95 backdrop-blur-sm flex items-center justify-around px-2 z-20">
      {items.map((item) => {
        const isActive =
          pathname === item.href || pathname?.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg min-w-[64px] transition-colors ${
              isActive
                ? "text-[var(--primary)] bg-[var(--primary-muted)]"
                : "text-[var(--muted)]"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
