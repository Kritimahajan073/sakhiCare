"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/routine", label: "Daily routine", icon: "🌿" },
  { href: "/dashboard/daily-record", label: "Daily record", icon: "📝" },
  { href: "/dashboard/insights", label: "Insights", icon: "📈" },
  { href: "/dashboard/history", label: "History", icon: "📅" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      {/* Sidebar */}
      <aside
        className="hidden sm:flex flex-col w-56 border-r border-[var(--card-border)] bg-[var(--card)]/80 backdrop-blur-sm shrink-0 sticky top-0 h-screen"
        style={{ animation: "fade-in 0.3s var(--ease-out)" }}
      >
        <div className="p-5 border-b border-[var(--card-border)]">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <span className="text-xl font-bold text-[var(--primary)]">
              SakhiCare
            </span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item, i) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--primary-muted)] text-[var(--primary)]"
                    : "text-[var(--muted)] hover:bg-[var(--primary-muted)]/50 hover:text-[var(--foreground)]"
                }`}
                style={{
                  animation: "slide-in-right 0.35s var(--ease-out) forwards",
                  animationDelay: `${i * 0.03}s`,
                  opacity: 0,
                }}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-[var(--card-border)] text-xs text-[var(--muted)]">
          Your wellness, tracked with care
        </div>
      </aside>

      {/* Mobile header */}
      <header className="sm:hidden flex items-center justify-between h-14 px-4 border-b border-[var(--card-border)] bg-[var(--card)]/90 backdrop-blur-sm sticky top-0 z-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🌸</span>
          <span className="font-bold text-[var(--primary)]">SakhiCare</span>
        </Link>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-[var(--primary)]"
        >
          Menu
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
