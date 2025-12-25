import { Box } from '@mui/material';
import Sidebar from '@/components/Common/Sidebar/Sidebar';
import MaterialThemeProvider from '@/components/Theme/Theme';
import { ThemePicker } from '@/components/Theme/ThemePicker';
import NavigationHandler from './NavigationHandler';

/**
 * Protected layout wrapper.
 * Renders authenticated dashboard layout.
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MaterialThemeProvider>
      <NavigationHandler />
      <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            padding: '1rem',
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10,
              display: { xs: 'none', md: 'block' },
            }}
          >
            <ThemePicker />
          </Box>

          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <ThemePicker />
          </Box>

          {children}
        </Box>
      </Box>
    </MaterialThemeProvider>
  );
}
