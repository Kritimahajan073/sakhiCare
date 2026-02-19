"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { useDailyRecord } from "@/hooks/useDailyRecord";
import { useRoutineCheck } from "@/hooks/useRoutineCheck";

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DashboardPage() {
  const today = todayString();
  const { record, loading } = useDailyRecord(today);
  const { check: routineCheck } = useRoutineCheck(today);
  const routineDone = routineCheck?.tasks
    ? Object.values(routineCheck.tasks).filter(Boolean).length
    : 0;
  const routineTotal = 8;

  return (
    <PageContainer>
      <h1
        className="text-2xl font-bold text-foreground"
        style={{ animation: "fade-in 0.4s var(--ease-out)" }}
      >
        Dashboard
      </h1>
      <p className="mt-1 text-muted">
        Quick overview and today’s record
      </p>

      <section className="mt-8 space-y-4">
        <Link
          href="/dashboard/routine"
          className="block p-6 rounded-lg border border-card-border bg-card shadow hover:shadow-lg hover:border-primary/30 transition-all duration-200"
          style={{
            animation: "fade-in-up 0.4s var(--ease-out) 0.1s forwards",
            opacity: 0,
          }}
        >
          <span className="text-2xl">🌿</span>
          <h2 className="mt-2 text-lg font-semibold text-primary">
            Today’s routine
          </h2>
          <p className="mt-1 text-sm text-muted">
            {routineDone} / {routineTotal} tasks done — wake, meditate, walk, meals & more
          </p>
        </Link>
        <Link
          href="/dashboard/daily-record"
          className="block p-6 rounded-lg border border-card-border bg-card shadow hover:shadow-lg hover:border-primary/30 transition-all duration-200"
          style={{
            animation: "fade-in-up 0.4s var(--ease-out) 0.12s forwards",
            opacity: 0,
          }}
        >
          <span className="text-2xl">📝</span>
          <h2 className="mt-2 text-lg font-semibold text-primary">
            Today’s PCOD journey record
          </h2>
          <p className="mt-1 text-sm text-muted">
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
          className="block p-5 rounded-lg border border-card-border bg-card hover:border-primary/30 transition-colors"
        >
          <span className="text-2xl">📈</span>
          <p className="mt-2 font-medium text-foreground">Insights</p>
          <p className="text-sm text-muted">See patterns from your records</p>
        </Link>
        <Link
          href="/dashboard/history"
          className="block p-5 rounded-lg border border-card-border bg-card hover:border-primary/30 transition-colors"
        >
          <span className="text-2xl">📅</span>
          <p className="mt-2 font-medium text-foreground">History</p>
          <p className="text-sm text-muted">Browse and edit past records</p>
        </Link>
      </div>
    </PageContainer>
  );
}
