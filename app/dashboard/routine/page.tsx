"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { useRoutineCheck } from "@/hooks/useRoutineCheck";
import { useSaveRoutineCheck } from "@/hooks/useSaveRoutineCheck";
import { ROUTINE_TASK_LABELS, ROUTINE_TASK_ORDER, MINDSET_TIPS } from "@/lib/routine-labels";
import type { RoutineTaskId, RoutineTasks } from "@/types";

const TOTAL_TASKS = ROUTINE_TASK_ORDER.length;

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

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

function getDoneCount(tasks: RoutineTasks | null): number {
  if (!tasks) return 0;
  return ROUTINE_TASK_ORDER.filter((id) => tasks[id]).length;
}

function getMissingTasks(tasks: RoutineTasks | null): RoutineTaskId[] {
  if (!tasks) return ROUTINE_TASK_ORDER;
  return ROUTINE_TASK_ORDER.filter((id) => !tasks[id]);
}

function RoutinePageInner() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const [date, setDate] = useState(todayString);
  const [weightKg, setWeightKg] = useState<string>("");

  const { check, loading } = useRoutineCheck(date);
  const { saveRoutineCheck, loading: saving, error: saveError } = useSaveRoutineCheck();
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) setDate(dateParam);
  }, [dateParam]);

  useEffect(() => {
    if (check?.weightKg != null) setWeightKg(String(check.weightKg));
    else setWeightKg("");
  }, [check?.weightKg, date]);

  const tasks = check?.tasks ?? null;
  const doneCount = getDoneCount(tasks);
  const progress = TOTAL_TASKS ? Math.round((doneCount / TOTAL_TASKS) * 100) : 0;
  const missingTasks = getMissingTasks(tasks);

  const toggleTask = useCallback(
    async (taskId: RoutineTaskId) => {
      setSaveMessage(null);
      const next = { ...(tasks ?? {}), [taskId]: !(tasks?.[taskId] ?? false) };
      const result = await saveRoutineCheck(date, next as RoutineTasks, check?.weightKg ?? undefined);
      if (result?.success) setSaveMessage({ type: "success", text: "Saved" });
      else setSaveMessage({ type: "error", text: result?.error ?? "Failed to save" });
    },
    [date, tasks, check?.weightKg, saveRoutineCheck]
  );

  const saveWeight = useCallback(async () => {
    setSaveMessage(null);
    const w = weightKg.trim() ? parseFloat(weightKg) : undefined;
    if (w != null && (Number.isNaN(w) || w < 0)) return;
    const result = await saveRoutineCheck(date, (tasks ?? {}) as RoutineTasks, w ?? null);
    if (result?.success) setSaveMessage({ type: "success", text: "Weight saved" });
    else setSaveMessage({ type: "error", text: result?.error ?? "Failed to save" });
  }, [date, weightKg, tasks, saveRoutineCheck]);

  const tipIndex = Math.floor(Math.random() * MINDSET_TIPS.length);
  const mindsetTip = MINDSET_TIPS[tipIndex];

  return (
    <PageContainer>
      <h1
        className="text-2xl font-bold text-foreground"
        style={{ animation: "fade-in 0.4s var(--ease-out)" }}
      >
        Daily routine
      </h1>
      <p className="mt-1 text-muted">
        Tick what you did today. Small steps add up.
      </p>

      {/* Date nav */}
      <div
        className="mt-6 flex flex-wrap items-center gap-3"
        style={{ animation: "fade-in 0.4s var(--ease-out) 0.05s forwards", opacity: 0 }}
      >
        <button
          type="button"
          onClick={() => setDate(prevDay(date))}
          className="rounded-lg border border-[var(--card-border)] bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-[var(--primary-muted)]/50 transition-colors"
        >
          ← Previous
        </button>
        <span className="text-sm font-medium text-foreground">{formatDate(date)}</span>
        <button
          type="button"
          onClick={() => setDate(nextDay(date))}
          className="rounded-lg border border-[var(--card-border)] bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-[var(--primary-muted)]/50 transition-colors"
        >
          Next →
        </button>
        {date !== todayString() && (
          <button
            type="button"
            onClick={() => setDate(todayString())}
            className="text-sm text-primary hover:underline"
          >
            Today
          </button>
        )}
      </div>

      {saveMessage && (
        <p
          className={`mt-4 rounded-lg px-4 py-2 text-sm ${
            saveMessage.type === "success"
              ? "bg-primary/10 text-primary"
              : "bg-red-100 text-red-700"
          }`}
        >
          {saveMessage.text}
        </p>
      )}

      {/* Progress bar */}
      <div
        className="mt-8 rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-card p-5"
        style={{ animation: "fade-in-up 0.4s var(--ease-out) 0.1s forwards", opacity: 0 }}
      >
        <div className="flex justify-between text-sm">
          <span className="font-medium text-foreground">Today&apos;s progress</span>
          <span className="text-muted">{doneCount} / {TOTAL_TASKS} tasks</span>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[var(--primary-muted)]">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              animation: "progress-fill 0.6s var(--ease-out)",
            }}
          />
        </div>
      </div>

      {/* Task list */}
      <div className="mt-6 space-y-2">
        {loading ? (
          <div className="space-y-2">
            {ROUTINE_TASK_ORDER.map((_, i) => (
              <div
                key={i}
                className="h-14 rounded-[var(--radius)] bg-[var(--card-border)]/30 animate-pulse-soft"
              />
            ))}
          </div>
        ) : (
          ROUTINE_TASK_ORDER.map((taskId, i) => {
            const done = tasks?.[taskId] ?? false;
            return (
              <div
                key={taskId}
                className="flex items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-card p-4 transition-all duration-200 hover:border-primary/30"
                style={{
                  animation: "slide-in-right 0.35s var(--ease-out) forwards",
                  animationDelay: `${0.12 + i * 0.04}s`,
                  opacity: 0,
                }}
              >
                <span className="text-sm font-medium text-foreground">
                  {ROUTINE_TASK_LABELS[taskId]}
                </span>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleTask(taskId)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      done
                        ? "bg-primary text-white"
                        : "bg-[var(--primary-muted)] text-muted hover:bg-primary/20"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (done) toggleTask(taskId);
                    }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      !done
                        ? "bg-[var(--card-border)] text-foreground"
                        : "bg-[var(--primary-muted)]/50 text-muted"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Weight */}
      <div
        className="mt-8 rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-card p-5"
        style={{ animation: "fade-in-up 0.4s var(--ease-out) 0.2s forwards", opacity: 0 }}
      >
        <label className="block text-sm font-medium text-foreground">
          Weight (kg) — optional
        </label>
        <div className="mt-2 flex gap-2">
          <input
            type="number"
            step="0.1"
            min="0"
            placeholder="e.g. 62.5"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            onBlur={saveWeight}
            className="w-28 rounded-lg border border-[var(--card-border)] bg-background px-3 py-2 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={saveWeight}
            disabled={saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary-hover)] disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* Where you lacked + motivation */}
      <div
        className="mt-8 space-y-4"
        style={{ animation: "fade-in-up 0.4s var(--ease-out) 0.25s forwards", opacity: 0 }}
      >
        {missingTasks.length > 0 && (
          <div className="rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--accent-muted)]/50 p-5">
            <h3 className="text-sm font-semibold text-foreground">
              Where you can focus next
            </h3>
            <ul className="mt-2 list-inside list-disc text-sm text-muted">
              {missingTasks.slice(0, 4).map((id) => (
                <li key={id}>{ROUTINE_TASK_LABELS[id]}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground">
            Mindset
          </h3>
          <p className="mt-2 text-sm text-muted">{mindsetTip}</p>
        </div>
      </div>
    </PageContainer>
  );
}

export default function RoutinePage() {
  return (
    <Suspense fallback={null}>
      <RoutinePageInner />
    </Suspense>
  );
}
