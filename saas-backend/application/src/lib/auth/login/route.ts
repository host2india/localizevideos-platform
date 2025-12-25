import { login } from '@/lib/auth/auth.service';

/**
 * Login API
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await login(email, password);

    return Response.json(user);
  } catch {
    return Response.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }
}
