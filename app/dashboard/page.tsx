"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { useDailyRecord } from "@/hooks/useDailyRecord";

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DashboardPage() {
  const { record, loading } = useDailyRecord(todayString());

  return (
    <PageContainer>
      <h1
        className="text-2xl font-bold text-[var(--foreground)]"
        style={{ animation: "fade-in 0.4s var(--ease-out)" }}
      >
        Dashboard
      </h1>
      <p className="mt-1 text-[var(--muted)]">
        Quick overview and today’s record
      </p>

      <section className="mt-8">
        <Link
          href="/dashboard/daily-record"
          className="block p-6 rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--card)] shadow-[var(--shadow)] hover:shadow-[var(--shadow-lg)] hover:border-[var(--primary)]/30 transition-all duration-200"
          style={{
            animation: "fade-in-up 0.4s var(--ease-out) 0.1s forwards",
            opacity: 0,
          }}
        >
          <h2 className="text-lg font-semibold text-[var(--primary)]">
            Today’s PCOD journey record
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {loading
              ? "Loading…"
              : record
                ? `${record.right.length} right, ${record.wrong.length} wrong`
                : "Not logged yet — tap to add today’s record"}
          </p>
        </Link>
      </section>

      <div
        className="mt-8 grid gap-4 sm:grid-cols-2"
        style={{
          animation: "fade-in-up 0.4s var(--ease-out) 0.15s forwards",
          opacity: 0,
        }}
      >
        <Link
          href="/dashboard/insights"
          className="block p-5 rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--primary)]/30 transition-colors"
        >
          <span className="text-2xl">📈</span>
          <p className="mt-2 font-medium text-[var(--foreground)]">Insights</p>
          <p className="text-sm text-[var(--muted)]">See patterns from your records</p>
        </Link>
        <Link
          href="/dashboard/history"
          className="block p-5 rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--primary)]/30 transition-colors"
        >
          <span className="text-2xl">📅</span>
          <p className="mt-2 font-medium text-[var(--foreground)]">History</p>
          <p className="text-sm text-[var(--muted)]">Browse and edit past records</p>
        </Link>
      </div>
    </PageContainer>
  );
}
