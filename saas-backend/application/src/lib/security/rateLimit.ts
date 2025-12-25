const hits = new Map<string, { count: number; ts: number }>();

/**
 * Simple in-memory rate limiter.
 *
 * @param key - Unique identifier (e.g. IP or user ID).
 * @param limit - Maximum number of allowed requests.
 * @param windowMs - Time window in milliseconds.
 * @returns true if request is allowed, false otherwise.
 */
export function rateLimit(
  key: string,
  limit = 10,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.ts > windowMs) {
    hits.set(key, { count: 1, ts: now });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}
