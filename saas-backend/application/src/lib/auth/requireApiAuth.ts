import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import { AuthUser } from '@/lib/auth/types';

/**
 * Requires authentication for API routes.
 * Returns user or a 401 response.
 */
export async function requireApiAuth():
  Promise<{ user: AuthUser } | NextResponse> {
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return { user };
}
