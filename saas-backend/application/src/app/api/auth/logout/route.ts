import { NextResponse } from 'next/server';

/**
 * Logs out the user by clearing auth cookie.
 */
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return res;
}
