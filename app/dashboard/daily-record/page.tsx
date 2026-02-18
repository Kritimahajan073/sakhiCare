"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { MainContent } from "@/components/layout/MainContent";
import { DateNavigator } from "@/components/features/DateNavigator";
import { DailyRecordForm } from "@/components/features/DailyRecordForm";

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyRecordPage() {
  const [date, setDate] = useState(todayString);

  return (
    <PageLayout>
      <MainContent>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          PCOD journey — daily record
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          What you did right and wrong today (or pick another day).
        </p>

        <div className="mt-6">
          <DateNavigator date={date} onDateChange={setDate} />
        </div>

        <div className="mt-8">
          <DailyRecordForm date={date} />
        </div>
      </MainContent>
    </PageLayout>
  );
}
