'use client';

import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
  Skeleton,
} from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';

import { Note } from '../../../lib/api/notes';
import { getTitleUpdateFlashAnimation } from '../../Common/animations/titleUpdateFlash';

interface NotesListViewProps {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  onViewNote: (id: string) => void;
  onEditNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  recentlyUpdatedTitles: Set<string>;
}

/**
 * Notes list view (safe, no alias imports)
 */
export default function NotesListView({
  notes,
  isLoading,
  error,
  onViewNote,
  onEditNote,
  onDeleteNote,
  recentlyUpdatedTitles,
}: NotesListViewProps) {
  if (isLoading) {
    return (
      <Box>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height={60} />
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
    <List>
      {notes.map((note, index) => (
        <React.Fragment key={note.id}>
          <ListItem
            secondaryAction={
              <Box display="flex" gap={1}>
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
            }
          >
            <ListItemText
              primary={
                <Typography
                  sx={getTitleUpdateFlashAnimation(
                    recentlyUpdatedTitles.has(note.id)
                  )}
                >
                  {note.title || 'Untitled'}
                </Typography>
              }
              secondary={
                note.content.length > 100
                  ? `${note.content.slice(0, 100)}…`
                  : note.content
              }
            />
          </ListItem>

          {index < notes.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}
