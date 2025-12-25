'use client';

import { Box, CircularProgress, Fade } from '@mui/material';

/**
 * Full screen loading spinner.
 * Used during blocking async operations or route transitions.
 */
export default function LoadingSpinner({ open = true }: { open?: boolean }) {
  return (
    <Fade in={open} timeout={200}>
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.6)',
        }}
      >
        <CircularProgress />
      </Box>
    </Fade>
  );
}
