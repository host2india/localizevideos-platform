import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthUser {
  userId: string;
  role: 'ADMIN' | 'USER';
}

const JWT_SECRET = process.env.JWT_SECRET!;

/**
 * Protects API routes using HttpOnly JWT cookie
 */
export function withAuth(
  handler: (req: NextRequest, user: AuthUser) => Promise<Response>,
  options?: { roles?: Array<'ADMIN' | 'USER'> }
) {
  return async (req: NextRequest) => {
    try {
      const token = req.cookies.get('token')?.value;

      if (!token) {
        return new Response('Unauthorized', { status: 401 });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;

      if (options?.roles && !options.roles.includes(decoded.role)) {
        return new Response('Forbidden', { status: 403 });
      }

      return handler(req, decoded);
    } catch {
      return new Response('Unauthorized', { status: 401 });
    }
  };
}
