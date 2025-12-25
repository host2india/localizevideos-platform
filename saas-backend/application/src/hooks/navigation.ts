'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Simple navigation state hook
 * (No context dependency — production safe)
 */
export function useNavigating() {
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    const originalPush = router.push;

    router.push = (...args: Parameters<typeof router.push>) => {
      setNavigating(true);
      return originalPush(...args);
    };

    return () => {
      router.push = originalPush;
    };
  }, [router]);

  return navigating;
}
