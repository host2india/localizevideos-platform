import { NextResponse } from 'next/server';
import { requireApiRole } from '@/lib/auth/requireApiRole';

/**
 * Admin-only stats endpoint.
 */
export async function GET() {
  const result = await requireApiRole(['ADMIN']);

  if (result instanceof NextResponse) {
    return result;
  }

  return NextResponse.json({
    users: 42,
    revenue: 12345,
  });
}
