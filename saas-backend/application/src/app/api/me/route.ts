import { NextResponse } from 'next/server';
import { requireApiAuth } from '@/lib/auth/requireApiAuth';

/**
 * Returns the authenticated user.
 */
export async function GET() {
  const result = await requireApiAuth();

  if (result instanceof NextResponse) {
    return result;
  }

  return NextResponse.json({
    user: result.user,
  });
}
