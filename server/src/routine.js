import { getDb } from "./db.js";
import { ROUTINE_CHECKS_COLLECTION } from "./constants.js";

const DEFAULT_TASKS = {
  wakeUpOnTime: false,
  meditation: false,
  deepBreathing: false,
  morningWalkSunlight: false,
  breakfastWithProtein: false,
  lunchSimpleNotOutside: false,
  dinnerLight: false,
  dailyWalk: false,
};

let indexEnsured = false;

async function ensureIndexes() {
  if (indexEnsured) return;
  const db = await getDb();
  const coll = db.collection(ROUTINE_CHECKS_COLLECTION);
  await coll.createIndex({ userId: 1, date: 1 }, { unique: true });
  indexEnsured = true;
}

export async function getRoutineCheck(userId, date) {
  const db = await getDb();
  await ensureIndexes();
  const coll = db.collection(ROUTINE_CHECKS_COLLECTION);
  return coll.findOne({ userId, date });
}

export async function upsertRoutineCheck(userId, date, tasks, weightKg) {
  const db = await getDb();
  await ensureIndexes();
  const coll = db.collection(ROUTINE_CHECKS_COLLECTION);
  const now = new Date();
  const existing = await coll.findOne({ userId, date });
  const mergedTasks = { ...DEFAULT_TASKS, ...(existing?.tasks ?? {}), ...tasks };
  await coll.updateOne(
    { userId, date },
    {
      $set: {
        tasks: mergedTasks,
        ...(weightKg != null && { weightKg }),
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

export async function getRoutineChecks(userId, fromDate, toDate) {
  const db = await getDb();
  await ensureIndexes();
  const coll = db.collection(ROUTINE_CHECKS_COLLECTION);
  const filter = { userId };
  if (fromDate != null || toDate != null) {
    filter.date = {};
    if (fromDate != null) filter.date.$gte = fromDate;
    if (toDate != null) filter.date.$lte = toDate;
  }
  const cursor = coll.find(filter).sort({ date: -1 });
  return cursor.toArray();
}
