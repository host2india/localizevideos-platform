'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

/**
 * Handles client-side navigation protection for protected routes.
 * Redirects unauthenticated users to login.
 */
export default function NavigationHandler() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [session, status, router, pathname]);

  return null;
}
