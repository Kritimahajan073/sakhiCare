import { getDb } from "./db";
import { DAILY_RECORDS_COLLECTION } from "./constants";
import type { DailyRecord, DailyRecordInput } from "@/types";

let indexEnsured = false;

async function ensureIndexes() {
  if (indexEnsured) return;
  const db = await getDb();
  if (!db) return;
  const coll = db.collection<DailyRecord>(DAILY_RECORDS_COLLECTION);
  await coll.createIndex({ userId: 1, date: 1 }, { unique: true });
  indexEnsured = true;
}

/**
 * Insert or update the daily record for this user and date.
 */
export async function upsertDailyRecord(
  userId: string,
  date: string,
  input: DailyRecordInput
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("MongoDB connection not configured. Please set MONGODB_URI in .env.local");
  }
  await ensureIndexes();
  const coll = db.collection<DailyRecord>(DAILY_RECORDS_COLLECTION);
  const now = new Date();
  await coll.updateOne(
    { userId, date },
    {
      $set: {
        right: input.right,
        wrong: input.wrong,
        updatedAt: now,
      },
      $setOnInsert: {
        userId,
        date,
        createdAt: now,
      },
    },
    { upsert: true }
  );
}

/**
 * Get the daily record for this user and date, or null.
 */
export async function getDailyRecord(
  userId: string,
  date: string
): Promise<DailyRecord | null> {
  const db = await getDb();
  if (!db) return null;
  await ensureIndexes();
  const coll = db.collection<DailyRecord>(DAILY_RECORDS_COLLECTION);
  const doc = await coll.findOne({ userId, date });
  return doc as DailyRecord | null;
}

/**
 * List daily records for this user, optionally filtered by date range.
 */
export async function getDailyRecords(
  userId: string,
  fromDate?: string,
  toDate?: string
): Promise<DailyRecord[]> {
  const db = await getDb();
  if (!db) return [];
  await ensureIndexes();
  const coll = db.collection<DailyRecord>(DAILY_RECORDS_COLLECTION);
  const filter: Record<string, unknown> = { userId };
  if (fromDate != null || toDate != null) {
    filter.date = {};
    if (fromDate != null) (filter.date as Record<string, string>).$gte = fromDate;
    if (toDate != null) (filter.date as Record<string, string>).$lte = toDate;
  }
  const cursor = coll.find(filter).sort({ date: -1 });
  return (await cursor.toArray()) as DailyRecord[];
}
