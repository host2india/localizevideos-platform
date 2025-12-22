import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from './options'

export interface AuthContext {
  user: {
    id: string
    email: string
    role: string
  }
}

/**
 * Wraps an API route with authentication.
 * Injects authenticated user into handler context.
 */
export function withAuth<
  T extends (
    req: NextRequest,
    ctx: AuthContext
  ) => Promise<NextResponse>
>(handler: T) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return handler(req, {
      user: {
        id: session.user.id,
        email: session.user.email ?? '',
        role: session.user.role ?? 'USER'
      }
    })
  }
}
