import { NextResponse } from 'next/server';
import { requireApiAuth } from '@/lib/auth/requireApiAuth';
import { Role } from '@/lib/auth/types';

/**
 * Requires specific roles for API routes.
 */
export async function requireApiRole(
  allowedRoles: Role[]
) {
  const result = await requireApiAuth();

  if (result instanceof NextResponse) {
    return result;
  }

  const { user } = result;

  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  return { user };
}
