/**
 * Main dashboard page.
 *
 * This page depends on authenticated user data and must
 * be rendered dynamically at runtime.
 */
export const dynamic = 'force-dynamic';

import DashboardPageClient from './DashboardPageClient';

/**
 * Dashboard page entry.
 */
export default function DashboardPage() {
  return <DashboardPageClient />;
}
