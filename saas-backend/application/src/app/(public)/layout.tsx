/**
 * Public layout wrapper.
 * Used for all unauthenticated public routes.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
