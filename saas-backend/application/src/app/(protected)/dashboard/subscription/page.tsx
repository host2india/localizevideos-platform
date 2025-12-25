/**
 * Subscription dashboard page.
 *
 * This page depends on runtime-only data and must NOT be prerendered.
 */
export const dynamic = 'force-dynamic';

import SubscriptionPageClient from './SubscriptionPageClient';

/**
 * Subscription page entry.
 */
export default function SubscriptionPage() {
  return <SubscriptionPageClient />;
}
