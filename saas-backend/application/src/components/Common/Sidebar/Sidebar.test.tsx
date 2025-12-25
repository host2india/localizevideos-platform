'use client';

import { Box, Button, List, ListItem, ListItemButton } from '@mui/material';
import { useRouter } from 'next/navigation';

export type AuthUser = {
  userId: string;
  role?: 'ADMIN' | 'USER';
};

type Props = {
  user: AuthUser;
};

/**
 * Sidebar with role-aware navigation and logout.
 */
export default function Sidebar({ user }: Props) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <Box sx={{ width: 240, borderRight: '1px solid #eee' }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/dashboard')}>
            Dashboard
          </ListItemButton>
        </ListItem>

        {user.role === 'ADMIN' && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push('/admin')}>
              Admin
            </ListItemButton>
          </ListItem>
        )}

        <ListItem disablePadding>
          <Button
            color="error"
            fullWidth
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </Box>
  );
}
