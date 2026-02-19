"use client";

import { useQuery } from "@apollo/client/react";
import { GET_DAILY_RECORDS } from "@/lib/graphql/queries";
import { PageContainer } from "@/components/layout/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";

function getLast30Days() {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  return {
    fromDate: start.toISOString().slice(0, 10),
    toDate: end.toISOString().slice(0, 10),
  };
}

export default function InsightsPage() {
  const { fromDate, toDate } = getLast30Days();
  const { data, loading, error } = useQuery(GET_DAILY_RECORDS, {
    variables: { fromDate, toDate },
  });

  const records = data?.dailyRecords ?? [];
  const totalRight = records.reduce((s: number, r: { right: string[] }) => s + r.right.length, 0);
  const totalWrong = records.reduce((s: number, r: { wrong: string[] }) => s + r.wrong.length, 0);
  const daysLogged = records.length;

  return (
    <PageContainer>
      <h1
        className="text-2xl font-bold text-[var(--foreground)]"
        style={{ animation: "fade-in 0.4s var(--ease-out)" }}
      >
        Insights
      </h1>
      <p className="mt-1 text-[var(--muted)]">
        Last 30 days — patterns from your daily records
      </p>

      {loading && (
        <div className="mt-8 flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      )}

      {error && (
        <p className="mt-6 text-red-600 dark:text-red-400">
          {error instanceof Error ? error.message : "Could not load insights."}
        </p>
      )}

      {!loading && !error && (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div
              className="p-5 rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--card)]"
              style={{
                animation: "scale-in 0.4s var(--ease-out) 0.1s forwards",
                opacity: 0,
              }}
            >
              <p className="text-sm text-[var(--muted)]">Days logged</p>
              <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">
                {daysLogged}
              </p>
            </div>
            <div
              className="p-5 rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--card)]"
              style={{
                animation: "scale-in 0.4s var(--ease-out) 0.15s forwards",
                opacity: 0,
              }}
            >
              <p className="text-sm text-[var(--muted)]">Things done right</p>
              <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                {totalRight}
              </p>
            </div>
            <div
              className="p-5 rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--card)]"
              style={{
                animation: "scale-in 0.4s var(--ease-out) 0.2s forwards",
                opacity: 0,
              }}
            >
              <p className="text-sm text-[var(--muted)]">Things to improve</p>
              <p className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">
                {totalWrong}
              </p>
            </div>
          </div>

          {daysLogged === 0 && (
            <div
              className="p-8 rounded-[var(--radius-lg)] border border-dashed border-[var(--card-border)] text-center text-[var(--muted)]"
              style={{ animation: "fade-in 0.4s var(--ease-out)" }}
            >
              <p className="text-lg">No records in the last 30 days.</p>
              <p className="mt-2 text-sm">
                Start logging your daily record to see insights here.
              </p>
            </div>
          )}
        </div>
      )}
    </PageContainer>
  );
}
