import { USER_ROLES } from './lib/auth/roles';

/* =========================
   USER
========================= */
export interface User {
  id: string;
  name: string | null;
  email: string;
  passwordHash: string;
  image: string | null;

  role: UserRole;
  createdAt: Date;

  verificationToken?: string | null;
  emailVerified: boolean;
}

/* =========================
   SUBSCRIPTION
========================= */
export interface Subscription {
  id: string;
  userId: string;

  status: SubscriptionStatusEnum | null;
  plan: SubscriptionPlanEnum | null;

  customerId: string | null;
  createdAt: Date;
}

/* =========================
   NOTE
========================= */
export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
}

/* =========================
   ROLES
========================= */
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/* =========================
   ENUMS (CANONICAL)
========================= */
export enum SubscriptionStatusEnum {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
}

export enum SubscriptionPlanEnum {
  FREE = 'FREE',
  PRO = 'PRO',
}

/* =========================
   COMPOSITE TYPES
========================= */
export interface UserWithSubscriptions extends User {
  subscription: {
    plan: SubscriptionPlanEnum;
    status: SubscriptionStatusEnum;
  } | null;
}
