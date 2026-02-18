import { cookies } from "next/headers";
import { ANONYMOUS_USER_ID_COOKIE } from "./constants";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

/**
 * Get or create an anonymous user ID stored in a cookie.
 * Use in server actions and when reading records. No PII.
 */
export async function getOrCreateAnonymousUserId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(ANONYMOUS_USER_ID_COOKIE)?.value;
  if (existing) return existing;

  const userId = crypto.randomUUID();
  store.set(ANONYMOUS_USER_ID_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return userId;
}
