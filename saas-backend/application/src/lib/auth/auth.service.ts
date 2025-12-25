import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

/**
 * Signup a new user
 */
export async function signup(email: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      role: 'USER',
    },
  });

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}

/**
 * Login an existing user
 */
export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.passwordHash) {
    throw new Error('Invalid credentials');
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}
