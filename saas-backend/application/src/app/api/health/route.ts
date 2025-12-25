import { NextResponse } from 'next/server';

/**
 * Health check endpoint
 */
export const GET = async () => {
  return NextResponse.json({ status: 'ok' });
};
