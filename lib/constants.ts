/** MongoDB collection for daily PCOD journey records. */
export const DAILY_RECORDS_COLLECTION = "daily_records";

/** MongoDB collection for daily routine checks (timetable). */
export const ROUTINE_CHECKS_COLLECTION = "routine_checks";

/** Cookie name for anonymous user ID (no PII). */
export const ANONYMOUS_USER_ID_COOKIE = "sakhicare_anon_id";

/** Routine task IDs in display order. */
export const ROUTINE_TASK_IDS = [
  "wakeUpOnTime",
  "meditation",
  "deepBreathing",
  "morningWalkSunlight",
  "breakfastWithProtein",
  "lunchSimpleNotOutside",
  "dinnerLight",
  "dailyWalk",
] as const;
