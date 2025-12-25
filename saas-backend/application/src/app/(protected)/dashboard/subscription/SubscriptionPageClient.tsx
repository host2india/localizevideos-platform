'use client';

import { Box, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';

/**
 * Client-only subscription page.
 * Stripe integration will be added later.
 */
export default function SubscriptionPageClient() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TEMP: simulate client-ready state
    setLoading(false);
  }, []);

  if (loading) {
    return <Typography>Loading subscription…</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Subscription
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        You are currently on the <strong>FREE</strong> plan.
      </Typography>

      <Button variant="contained" disabled>
        Upgrade (Coming Soon)
      </Button>
    </Box>
  );
}
