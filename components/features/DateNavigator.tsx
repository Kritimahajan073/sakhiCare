"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function prevDay(date: string): string {
  const d = new Date(date);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function nextDay(date: string): string {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

interface DateNavigatorProps {
  date: string;
  onDateChange: (date: string) => void;
}

export function DateNavigator({ date, onDateChange }: DateNavigatorProps) {
  const isToday = date === todayString();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button
        type="button"
        onClick={() => onDateChange(prevDay(date))}
        variant="secondary"
        size="sm"
      >
        Previous day
      </Button>
      <Input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-auto"
      />
      <Button
        type="button"
        onClick={() => onDateChange(nextDay(date))}
        variant="secondary"
        size="sm"
      >
        Next day
      </Button>
      {!isToday && (
        <Button
          type="button"
          onClick={() => onDateChange(todayString())}
          variant="ghost"
          size="sm"
        >
          Go to today
        </Button>
      )}
    </div>
  );
}
