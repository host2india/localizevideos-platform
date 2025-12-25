/**
 * Account settings dashboard page.
 *
 * This page depends on authenticated user data (JWT / cookies)
 * and must be rendered dynamically at runtime.
 */
export const dynamic = 'force-dynamic';

import AccountSettingsPage from '@/components/AccountSettings/AccountSettingsPage';

/**
 * Page component for the Account Settings dashboard route.
 */
export default function AccountPage() {
  return <AccountSettingsPage />;
}
