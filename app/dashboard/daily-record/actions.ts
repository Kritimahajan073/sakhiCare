"use server";

import { getOrCreateAnonymousUserId } from "@/lib/auth-anonymous";
import {
  upsertDailyRecord,
  getDailyRecord,
} from "@/lib/daily-record";
import type { DailyRecordInput } from "@/types";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function validateDate(date: string): boolean {
  if (!DATE_REGEX.test(date)) return false;
  const d = new Date(date);
  return !Number.isNaN(d.getTime());
}

export async function saveDailyRecord(
  date: string,
  input: DailyRecordInput
): Promise<{ success: true } | { success: false; error: string }> {
  if (!validateDate(date)) {
    return { success: false, error: "Invalid date format. Use YYYY-MM-DD." };
  }
  if (!Array.isArray(input.right) || !Array.isArray(input.wrong)) {
    return { success: false, error: "right and wrong must be arrays." };
  }
  const right = input.right.map((s) => String(s).trim()).filter(Boolean);
  const wrong = input.wrong.map((s) => String(s).trim()).filter(Boolean);

  try {
    const userId = await getOrCreateAnonymousUserId();
    await upsertDailyRecord(userId, date, { right, wrong });
    return { success: true };
  } catch (err) {
    console.error("saveDailyRecord:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to save record.",
    };
  }
}

export async function getDailyRecordForDate(
  date: string
): Promise<{ right: string[]; wrong: string[] } | null> {
  if (!validateDate(date)) return null;
  try {
    const userId = await getOrCreateAnonymousUserId();
    const record = await getDailyRecord(userId, date);
    if (!record) return null;
    return { right: record.right, wrong: record.wrong };
  } catch (err) {
    console.error("getDailyRecordForDate:", err);
    return null;
  }
}
