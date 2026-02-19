"use client";

import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { GET_DAILY_RECORDS } from "@/lib/graphql/queries";
import { PageContainer } from "@/components/layout/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";

function getLast90Days() {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 90);
  return {
    fromDate: start.toISOString().slice(0, 10),
    toDate: end.toISOString().slice(0, 10),
  };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface DailyRecordsData {
  dailyRecords: Array<{ date: string; right: string[]; wrong: string[] }>;
}

export default function HistoryPage() {
  const { fromDate, toDate } = getLast90Days();
  const { data, loading, error } = useQuery<DailyRecordsData>(GET_DAILY_RECORDS, {
    variables: { fromDate, toDate },
  });

  const records = (data?.dailyRecords ?? []).sort(
    (a: { date: string }, b: { date: string }) =>
      b.date.localeCompare(a.date)
  );

  return (
    <PageContainer>
      <h1
        className="text-2xl font-bold text-foreground"
        style={{ animation: "fade-in 0.4s var(--ease-out)" }}
      >
        History
      </h1>
      <p className="mt-1 text-muted">
        Past daily records — tap to view or edit
      </p>

      {loading && (
        <div className="mt-8 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      )}

      {error && (
        <p className="mt-6 text-red-600 dark:text-red-400">
          {error instanceof Error ? error.message : "Could not load history."}
        </p>
      )}

      {!loading && !error && (
        <ul className="mt-8 space-y-2">
          {records.length === 0 ? (
            <li
              className="p-8 rounded-lg border border-dashed border-card-border text-center text-muted"
              style={{ animation: "fade-in 0.4s var(--ease-out)" }}
            >
              <p>No records in the last 90 days.</p>
              <Link
                href="/dashboard/daily-record"
                className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
              >
                Log today’s record
              </Link>
            </li>
          ) : (
            records.map((r: { date: string; right: string[]; wrong: string[] }, i: number) => (
              <li
                key={r.date}
                style={{
                  animation: "slide-in-right 0.35s var(--ease-out) forwards",
                  animationDelay: `${i * 0.04}s`,
                  opacity: 0,
                }}
              >
                <Link
                  href={`/dashboard/daily-record?date=${r.date}`}
                  className="block p-4 rounded-lg border border-card-border bg-card hover:border-primary/30 hover:shadow transition-all duration-200"
                >
                  <p className="font-medium text-foreground">
                    {formatDate(r.date)}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {r.right.length} right · {r.wrong.length} wrong
                  </p>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </PageContainer>
  );
}
