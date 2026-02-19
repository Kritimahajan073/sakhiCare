/** MongoDB collection for daily PCOD journey records. */
export const DAILY_RECORDS_COLLECTION = "daily_records";

/** MongoDB collection for daily routine checks (timetable). */
export const ROUTINE_CHECKS_COLLECTION = "routine_checks";

/** Cookie name for anonymous user ID (no PII). */
export const ANONYMOUS_USER_ID_COOKIE = "sakhicare_anon_id";

const COOKIE_MAX_AGE_MS = 60 * 60 * 24 * 365 * 1000; // 1 year

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  maxAge: COOKIE_MAX_AGE_MS,
  path: "/",
};
