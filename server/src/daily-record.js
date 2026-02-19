import { getDb } from "./db.js";
import { DAILY_RECORDS_COLLECTION } from "./constants.js";

let indexEnsured = false;

async function ensureIndexes() {
  if (indexEnsured) return;
  const db = await getDb();
  const coll = db.collection(DAILY_RECORDS_COLLECTION);
  await coll.createIndex({ userId: 1, date: 1 }, { unique: true });
  indexEnsured = true;
}

export async function upsertDailyRecord(userId, date, input) {
  const db = await getDb();
  await ensureIndexes();
  const coll = db.collection(DAILY_RECORDS_COLLECTION);
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

export async function getDailyRecord(userId, date) {
  const db = await getDb();
  await ensureIndexes();
  const coll = db.collection(DAILY_RECORDS_COLLECTION);
  return coll.findOne({ userId, date });
}

export async function getDailyRecords(userId, fromDate, toDate) {
  const db = await getDb();
  await ensureIndexes();
  const coll = db.collection(DAILY_RECORDS_COLLECTION);
  const filter = { userId };
  if (fromDate != null || toDate != null) {
    filter.date = {};
    if (fromDate != null) filter.date.$gte = fromDate;
    if (toDate != null) filter.date.$lte = toDate;
  }
  const cursor = coll.find(filter).sort({ date: -1 });
  return cursor.toArray();
}
