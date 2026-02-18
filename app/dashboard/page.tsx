"use client";

import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { MainContent } from "@/components/layout/MainContent";
import { Card } from "@/components/ui/Card";
import { useDailyRecord } from "@/hooks/useDailyRecord";

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DashboardPage() {
  const { record, loading } = useDailyRecord(todayString());

  return (
    <PageLayout>
      <MainContent>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Trackers and insights will appear here.
        </p>

        <section className="mt-8">
          <Link href="/dashboard/daily-record">
            <Card hover className="p-6">
              <h2 className="text-lg font-semibold text-rose-700 dark:text-rose-300">
                Today&apos;s PCOD journey record
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {loading
                  ? "Loading…"
                  : record
                    ? `${record.right.length} right, ${record.wrong.length} wrong`
                    : "Not logged yet — tap to add today's record"}
              </p>
            </Card>
          </Link>
        </section>
      </MainContent>
    </PageLayout>
  );
}
