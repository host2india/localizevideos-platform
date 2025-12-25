'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { StripeClient } from '@/lib/api/stripe';

/**
 * Subscription management page.
 * Displays the user's current Stripe subscription (read-only).
 */
const SubscriptionPage: React.FC = () => {
  const stripeApi = useMemo(() => new StripeClient(), []);
  const [plan, setPlan] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const result = await stripeApi.getSubscription();

        if (Array.isArray(result.subscription) && result.subscription.length > 0) {
          const sub = result.subscription[0] as {
            plan?: string;
            status?: string;
          };

          setPlan(sub.plan ?? null);
          setStatus(sub.status ?? null);
        }
      } catch {
        setPlan(null);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };

    loadSubscription();
  }, [stripeApi]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!plan) {
    return <Alert severity="info">No active subscription</Alert>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Subscription
      </Typography>

      <Typography>
        Plan: <strong>{plan}</strong>
      </Typography>

      {status && (
        <Typography>
          Status: <strong>{status}</strong>
        </Typography>
      )}
    </Box>
  );
};

export default SubscriptionPage;
