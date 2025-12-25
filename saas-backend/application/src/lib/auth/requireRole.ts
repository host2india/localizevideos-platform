import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth/getAuthUser';

export type Role = 'ADMIN' | 'USER';

/**
 * Enforces role-based access control.
 * Redirects if user is missing or role is insufficient.
 */
export async function requireRole(allowedRoles: Role[]) {
  const user = await getAuthUser();

  if (!user) {
    redirect('/login');
  }

  if (!allowedRoles.includes(user.role as Role)) {
    redirect('/dashboard'); // or /403 later
  }

  return user;
}
