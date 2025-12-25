import { signup } from '@/lib/auth/auth.service';

/**
 * Handles user signup requests.
 */
export async function POST(req: Request) {
  const { email, password } = await req.json();

  const result = await signup(email, password);

  return Response.json(result);
}
