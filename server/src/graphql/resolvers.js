import { getOrCreateAnonymousUserId } from "../auth-anonymous.js";
import {
  upsertDailyRecord,
  getDailyRecord,
  getDailyRecords,
} from "../daily-record.js";
import {
  getRoutineCheck,
  upsertRoutineCheck,
  getRoutineChecks,
} from "../routine.js";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function validateDate(date) {
  if (!DATE_REGEX.test(date)) return false;
  const d = new Date(date);
  return !Number.isNaN(d.getTime());
}

function toDailyRecord(record) {
  if (!record) return null;
  return {
    id: record._id,
    date: record.date,
    right: record.right,
    wrong: record.wrong,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

function toRoutineCheck(check) {
  if (!check) return null;
  return {
    id: check._id,
    date: check.date,
    tasks: check.tasks,
    weightKg: check.weightKg ?? null,
    createdAt: check.createdAt.toISOString(),
    updatedAt: check.updatedAt.toISOString(),
  };
}

export const resolvers = {
  Query: {
    async dailyRecord(_, { date }, context) {
      if (!validateDate(date)) {
        throw new Error("Invalid date format. Use YYYY-MM-DD.");
      }
      const userId = getOrCreateAnonymousUserId(context.req, context.res);
      const record = await getDailyRecord(userId, date);
      return toDailyRecord(record);
    },

    async dailyRecords(_, { fromDate, toDate }, context) {
      const userId = getOrCreateAnonymousUserId(context.req, context.res);
      const records = await getDailyRecords(userId, fromDate, toDate);
      return records.map(toDailyRecord);
    },

    async routineCheck(_, { date }, context) {
      if (!validateDate(date)) {
        throw new Error("Invalid date format. Use YYYY-MM-DD.");
      }
      const userId = getOrCreateAnonymousUserId(context.req, context.res);
      const check = await getRoutineCheck(userId, date);
      return toRoutineCheck(check);
    },

    async routineChecks(_, { fromDate, toDate }, context) {
      const userId = getOrCreateAnonymousUserId(context.req, context.res);
      const checks = await getRoutineChecks(userId, fromDate, toDate);
      return checks.map(toRoutineCheck);
    },
  },

  Mutation: {
    async saveDailyRecord(_, { date, input }, context) {
      if (!validateDate(date)) {
        throw new Error("Invalid date format. Use YYYY-MM-DD.");
      }
      if (!Array.isArray(input.right) || !Array.isArray(input.wrong)) {
        throw new Error("right and wrong must be arrays.");
      }
      const right = input.right.map((s) => String(s).trim()).filter(Boolean);
      const wrong = input.wrong.map((s) => String(s).trim()).filter(Boolean);

      const userId = getOrCreateAnonymousUserId(context.req, context.res);
      await upsertDailyRecord(userId, date, { right, wrong });
      const record = await getDailyRecord(userId, date);
      if (!record) {
        throw new Error("Failed to retrieve saved record.");
      }
      return toDailyRecord(record);
    },

    async saveRoutineCheck(_, { date, tasks, weightKg }, context) {
      if (!validateDate(date)) {
        throw new Error("Invalid date format. Use YYYY-MM-DD.");
      }
      const userId = getOrCreateAnonymousUserId(context.req, context.res);
      await upsertRoutineCheck(
        userId,
        date,
        tasks ?? {},
        weightKg ?? undefined
      );
      const check = await getRoutineCheck(userId, date);
      if (!check) {
        throw new Error("Failed to retrieve saved routine check.");
      }
      return toRoutineCheck(check);
    },
  },
};
