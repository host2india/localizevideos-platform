/**
 * Admin dashboard page.
 *
 * This page is rendered dynamically because it depends
 * on authenticated admin-only data.
 */
export const dynamic = 'force-dynamic';

import AdminDashboardPageClient from './AdminDashboardPageClient';

/**
 * Admin dashboard route entry.
 *
 * @returns JSX element for admin dashboard
 */
export default function AdminDashboardPage() {
  return <AdminDashboardPageClient />;
}
