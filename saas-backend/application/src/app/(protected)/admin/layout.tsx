import { requireRole } from '@/lib/auth/requireRole';

/**
 * Admin-only layout guard
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(['ADMIN']);
  return <>{children}</>;
}
