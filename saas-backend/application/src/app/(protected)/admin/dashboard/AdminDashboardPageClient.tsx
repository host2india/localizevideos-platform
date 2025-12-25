'use client';

import { Box, Typography } from '@mui/material';

/**
 * Admin dashboard client page.
 */
export default function AdminDashboardPageClient() {
  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={600}>
        Admin Dashboard
      </Typography>

      <Typography mt={2} color="text.secondary">
        Admin tools and analytics will appear here.
      </Typography>
    </Box>
  );
}
