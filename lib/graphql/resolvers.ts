import { getOrCreateAnonymousUserId } from "@/lib/auth-anonymous";
import {
  upsertDailyRecord,
  getDailyRecord,
  getDailyRecords,
} from "@/lib/daily-record";
import type { DailyRecord } from "@/types";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function validateDate(date: string): boolean {
  if (!DATE_REGEX.test(date)) return false;
  const d = new Date(date);
  return !Number.isNaN(d.getTime());
}

export const resolvers = {
  Query: {
    async dailyRecord(_: unknown, { date }: { date: string }) {
      if (!validateDate(date)) {
        throw new Error("Invalid date format. Use YYYY-MM-DD.");
      }
      const userId = await getOrCreateAnonymousUserId();
      const record = await getDailyRecord(userId, date);
      if (!record) return null;
      return {
        id: record._id,
        date: record.date,
        right: record.right,
        wrong: record.wrong,
        createdAt: record.createdAt.toISOString(),
        updatedAt: record.updatedAt.toISOString(),
      };
    },

    async dailyRecords(
      _: unknown,
      { fromDate, toDate }: { fromDate?: string; toDate?: string }
    ) {
      const userId = await getOrCreateAnonymousUserId();
      const records = await getDailyRecords(userId, fromDate, toDate);
      return records.map((record) => ({
        id: record._id,
        date: record.date,
        right: record.right,
        wrong: record.wrong,
        createdAt: record.createdAt.toISOString(),
        updatedAt: record.updatedAt.toISOString(),
      }));
    },
  },

  Mutation: {
    async saveDailyRecord(
      _: unknown,
      { date, input }: { date: string; input: { right: string[]; wrong: string[] } }
    ) {
      if (!validateDate(date)) {
        throw new Error("Invalid date format. Use YYYY-MM-DD.");
      }
      if (!Array.isArray(input.right) || !Array.isArray(input.wrong)) {
        throw new Error("right and wrong must be arrays.");
      }
      const right = input.right.map((s) => String(s).trim()).filter(Boolean);
      const wrong = input.wrong.map((s) => String(s).trim()).filter(Boolean);

      const userId = await getOrCreateAnonymousUserId();
      await upsertDailyRecord(userId, date, { right, wrong });
      const record = await getDailyRecord(userId, date);
      if (!record) {
        throw new Error("Failed to retrieve saved record.");
      }
      return {
        id: record._id,
        date: record.date,
        right: record.right,
        wrong: record.wrong,
        createdAt: record.createdAt.toISOString(),
        updatedAt: record.updatedAt.toISOString(),
      };
    },
  },
};
