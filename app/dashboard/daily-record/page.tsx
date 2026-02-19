"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { DateNavigator } from "@/components/features/DateNavigator";
import { DailyRecordForm } from "@/components/features/DailyRecordForm";

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyRecordPage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const [date, setDate] = useState(todayString);

  useEffect(() => {
    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      setDate(dateParam);
    }
  }, [dateParam]);

  return (
    <PageContainer>
      <h1
        className="text-2xl font-bold text-foreground"
        style={{ animation: "fade-in 0.4s var(--ease-out)" }}
      >
        PCOD journey — daily record
      </h1>
      <p className="mt-1 text-muted">
        What you did right and wrong today (or pick another day).
      </p>

      <div
        className="mt-6"
        style={{
          animation: "fade-in 0.4s var(--ease-out) 0.08s forwards",
          opacity: 0,
        }}
      >
        <DateNavigator date={date} onDateChange={setDate} />
      </div>

      <div
        className="mt-8"
        style={{
          animation: "fade-in-up 0.4s var(--ease-out) 0.12s forwards",
          opacity: 0,
        }}
      >
        <DailyRecordForm date={date} />
      </div>
    </PageContainer>
  );
}
