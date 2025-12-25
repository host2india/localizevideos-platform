/**
 * NextAuth configuration options.
 * Uses JWT-based sessions.
 */
export const authOptions = {
  providers: [],

  session: {
    strategy: 'jwt' as const,
  },

  callbacks: {
    /**
     * Attaches custom fields to session object.
     */
    async session({
      session,
      token,
    }: {
      session: {
        user?: {
          id?: string;
          role?: string;
        };
      };
      token: {
        sub?: string;
        role?: string;
      };
    }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role ?? 'USER';
      }
      return session;
    },

    /**
     * JWT callback.
     */
    async jwt({
      token,
    }: {
      token: {
        sub?: string;
        role?: string;
      };
    }) {
      return token;
    },
  },
};
