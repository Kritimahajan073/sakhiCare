"use client";

import { useState, useEffect } from "react";
import { TextListField } from "@/components/ui/TextListField";
import { Button } from "@/components/ui/Button";
import { useDailyRecord } from "@/hooks/useDailyRecord";
import { useSaveDailyRecord } from "@/hooks/useSaveDailyRecord";

interface DailyRecordFormProps {
  date: string;
}

export function DailyRecordForm({ date }: DailyRecordFormProps) {
  const { record, loading, error: queryError } = useDailyRecord(date);
  const { saveDailyRecord, loading: saving, error: saveError } =
    useSaveDailyRecord();
  const [right, setRight] = useState<string[]>([""]);
  const [wrong, setWrong] = useState<string[]>([""]);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (record) {
      setRight(record.right.length > 0 ? record.right : [""]);
      setWrong(record.wrong.length > 0 ? record.wrong : [""]);
    } else {
      setRight([""]);
      setWrong([""]);
    }
  }, [record]);

  async function handleSave() {
    setMessage(null);
    const rightTrimmed = right.map((s) => s.trim()).filter(Boolean);
    const wrongTrimmed = wrong.map((s) => s.trim()).filter(Boolean);

    const result = await saveDailyRecord(date, {
      right: rightTrimmed,
      wrong: wrongTrimmed,
    });

    if (result.success) {
      setMessage({ type: "success", text: "Saved." });
      setRight(rightTrimmed.length > 0 ? rightTrimmed : [""]);
      setWrong(wrongTrimmed.length > 0 ? wrongTrimmed : [""]);
    } else {
      setMessage({ type: "error", text: result.error || "Failed to save" });
    }
  }

  const error = queryError || saveError;

  if (loading) {
    return <p className="text-zinc-500 dark:text-zinc-500">Loading…</p>;
  }

  return (
    <div className="space-y-10">
      {error && (
        <p className="text-red-600 dark:text-red-400">
          {error instanceof Error ? error.message : "An error occurred"}
        </p>
      )}

      <TextListField
        label="What I did right"
        value={right}
        onChange={setRight}
        placeholder="e.g. Had breakfast on time, 30 min walk"
        addLabel="+ Add"
      />
      <TextListField
        label="What I did wrong"
        value={wrong}
        onChange={setWrong}
        placeholder="e.g. Skipped medication, late sleep"
        addLabel="+ Add"
      />

      {message && (
        <p
          className={
            message.type === "success"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }
        >
          {message.text}
        </p>
      )}

      <Button onClick={handleSave} disabled={saving} variant="primary" size="lg">
        {saving ? "Saving…" : "Save"}
      </Button>
    </div>
  );
}
