'use client';

import React, { useState } from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Person,
  Receipt,
  Settings,
  CreditCard,
  Logout,
  Assessment,
  Menu as MenuIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { USER_ROLES } from '@/lib/auth/roles';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

const SidebarLink = ({ href, icon, children, onClick }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton component={Link} href={href} onClick={onClick} selected={isActive}>
        <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
        <ListItemText primary={children} />
      </ListItemButton>
    </ListItem>
  );
};

const SidebarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '3.5rem',
  padding: theme.spacing(0, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
    onNavigate?.();
  };

  return (
    <>
      <SidebarHeader>
        <Typography variant="h6" fontWeight={600}>
          🐳 SeaNotes
        </Typography>
      </SidebarHeader>

      <Box sx={{ p: 2, flex: 1 }}>
        <List>
          <SidebarLink href="/dashboard" icon={<Person />}>
            Dashboard
          </SidebarLink>
          <SidebarLink href="/dashboard/my-notes" icon={<Receipt />}>
            My Notes
          </SidebarLink>
        </List>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <List>
          {session?.user?.role === USER_ROLES.ADMIN && (
            <SidebarLink href="/admin/dashboard" icon={<Assessment />}>
              Admin Dashboard
            </SidebarLink>
          )}
          <SidebarLink href="/dashboard/account" icon={<Settings />}>
            Account Settings
          </SidebarLink>
          <SidebarLink href="/dashboard/subscription" icon={<CreditCard />}>
            Billing
          </SidebarLink>
          <SidebarLink href="#" icon={<Logout />} onClick={handleLogout}>
            Logout
          </SidebarLink>
        </List>
      </Box>
    </>
  );
};

/**
 * Sidebar navigation drawer (desktop + mobile).
 */
const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      </>
    );
  }

  return (
    <Drawer variant="permanent" sx={{ width: 256 }}>
      <SidebarContent />
    </Drawer>
  );
};

export default Sidebar;
