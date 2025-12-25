'use client';

import { Typography, Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

/**
 * Temporary subscription plan enum.
 * Will be replaced when Billing (Stripe) is implemented.
 */
enum SubscriptionPlanEnum {
  FREE = 'FREE',
  PRO = 'PRO',
}

/**
 * DashboardPageClient renders the dashboard UI.
 *
 * User data is fetched from the session at runtime.
 * This avoids build-time and prerendering issues.
 */
export default function DashboardPageClient() {
  const { data: session } = useSession();
  const theme = useTheme();

  const userEmail = session?.user?.email ?? '';
  const userName = session?.user?.name ?? '';

  const [subscription, setSubscription] =
    useState<SubscriptionPlanEnum | null>(null);
  const [loading, setLoading] = useState(true);

  const subscriptionLabel = 'Your current subscription plan is: ';

  // Extract first name from full name, fallback to email username
  const getDisplayName = () => {
    if (userName && userName.trim()) {
      return userName.trim().split(' ')[0];
    }
    if (userEmail) {
      return userEmail.split('@')[0];
    }
    return 'User';
  };

  useEffect(() => {
    /**
     * TEMP: Simulated subscription fetch.
     * Replace with Stripe API when Billing is implemented.
     */
    const fetchSubscription = async () => {
      try {
        // Simulate FREE plan for now
        setSubscription(SubscriptionPlanEnum.FREE);
      } catch {
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Typography variant="h4">
        Welcome back, {getDisplayName()}!
      </Typography>

      <Typography variant="h5" mt={2}>
        {loading ? (
          'Loading subscription...'
        ) : subscription === SubscriptionPlanEnum.FREE ? (
          <>
            {subscriptionLabel}{' '}
            <span
              style={{
                color: '#888',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
              }}
            >
              {subscription}
            </span>
          </>
        ) : subscription === SubscriptionPlanEnum.PRO ? (
          <>
            {subscriptionLabel}{' '}
            <span
              style={{
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 2,
                fontSize: '1.2rem',
                padding: '0.25em 0.75em',
                borderRadius: '1.5em',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: '#fff',
                boxShadow: '0 2px 12px 0 rgba(31,162,255,0.15)',
                display: 'inline-block',
              }}
            >
              {subscription}
            </span>
          </>
        ) : (
          `${subscriptionLabel} None`
        )}
      </Typography>
    </Box>
  );
}
