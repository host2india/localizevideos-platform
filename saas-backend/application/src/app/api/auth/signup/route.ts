import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth/password';
import { signJwt } from '@/lib/auth/jwt';

/**
 * Handles user signup.
 * Creates a user, hashes password, and issues auth cookie.
 */
export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: 'User already exists' },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      name: name ?? null,
      passwordHash,
      role: 'USER',
    },
  });

  const token = signJwt({ userId: user.id });

  const res = NextResponse.json({ ok: true }, { status: 201 });
  res.cookies.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  return res;
}
