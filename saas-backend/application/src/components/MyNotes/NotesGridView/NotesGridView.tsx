'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Skeleton,
} from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';

import { Note } from '../../../lib/api/notes';
import { getTitleUpdateFlashAnimation } from '../../Common/animations/titleUpdateFlash';

interface NotesGridViewProps {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  onViewNote: (id: string) => void;
  onEditNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  recentlyUpdatedTitles: Set<string>;
}

/**
 * Notes grid view (CSS Grid – MUI safe)
 */
export default function NotesGridView({
  notes,
  isLoading,
  error,
  onViewNote,
  onEditNote,
  onDeleteNote,
  recentlyUpdatedTitles,
}: NotesGridViewProps) {
  if (isLoading) {
    return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        gap={2}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={160} />
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!notes.length) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography>No notes found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
      gap={2}
    >
      {notes.map((note) => (
        <Card key={note.id}>
          <CardContent>
            <Typography
              variant="h6"
              sx={getTitleUpdateFlashAnimation(
                recentlyUpdatedTitles.has(note.id)
              )}
            >
              {note.title || 'Untitled'}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {note.content.slice(0, 120)}
              {note.content.length > 120 && '…'}
            </Typography>

            <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
              <IconButton size="small" onClick={() => onViewNote(note.id)}>
                <Visibility fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => onEditNote(note.id)}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => onDeleteNote(note.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
