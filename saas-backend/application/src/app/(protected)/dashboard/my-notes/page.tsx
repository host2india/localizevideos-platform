/**
 * My Notes dashboard page.
 *
 * This page renders the authenticated user's notes interface.
 * It is forced to be dynamically rendered because it depends on:
 * - authenticated user (JWT / cookies)
 * - runtime API data
 * - client-side hooks (SSE, fetch)
 */
export const dynamic = 'force-dynamic';

import MyNotes from '@/components/MyNotes/MyNotesPage';

/**
 * Page component for the "My Notes" dashboard route.
 */
export default function MyNotesPage() {
  return <MyNotes />;
}
