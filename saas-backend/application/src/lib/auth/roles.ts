/**
 * LEGACY COMPATIBILITY FILE
 * TODO: Remove once old scaffold code is deleted
 */
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type UserRole = keyof typeof USER_ROLES;
