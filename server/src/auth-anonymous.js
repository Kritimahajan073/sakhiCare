import { ANONYMOUS_USER_ID_COOKIE, COOKIE_OPTIONS } from "./constants.js";

/**
 * Get or create an anonymous user ID using a cookie (req/res).
 * Use in GraphQL context. No PII.
 */
export function getOrCreateAnonymousUserId(req, res) {
  const existing = req.cookies?.[ANONYMOUS_USER_ID_COOKIE];
  if (existing) return existing;

  const userId = crypto.randomUUID();
  res.cookie(ANONYMOUS_USER_ID_COOKIE, userId, COOKIE_OPTIONS);
  return userId;
}
