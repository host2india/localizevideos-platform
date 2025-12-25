import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/auth/jwt';
import { AuthUser, Role } from '@/lib/auth/types';

/**
 * Retrieves and verifies the authenticated user from the JWT cookie.
 * Normalizes role to a strict union type.
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const payload = verifyJwt<{
      userId: string;
      role?: string;
    }>(token);

    const role: Role = payload.role === 'ADMIN' ? 'ADMIN' : 'USER';

    return {
      userId: payload.userId,
      role,
    };
  } catch {
    return null;
  }
}
