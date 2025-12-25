/**
 * Admin root page.
 *
 * This route simply redirects to the admin dashboard.
 * It must be dynamic to avoid build-time auth execution.
 */
export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';

/**
 * Admin entry route.
 */
export default function AdminPage() {
  redirect('/admin/dashboard');
}
