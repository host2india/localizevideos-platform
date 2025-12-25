/**
 * LEGACY AUTH SHIM
 *
 * This file exists only to satisfy legacy imports from
 * older scaffold code. It MUST NOT be used in new code.
 *
 * TODO: Remove once all legacy auth references are deleted.
 */
export function auth(): never {
  throw new Error(
    'Legacy auth() called. Replace with getAuthUser / requireApiAuth.'
  );
}
