'use client';

/**
 * NoteForm Component with AI Content Generation
 *
 * Unified component for creating, editing, and viewing notes.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';

import { NotesApiClient } from '../../../lib/api/notes';
import { hasDigitalOceanGradientAIEnabled } from '../../../settings';

const apiClient = new NotesApiClient();

interface NoteFormProps {
  mode: 'create' | 'edit' | 'view';
  noteId?: string;
  onSave?: (note: { id?: string; title?: string; content: string }) => void;
  onCancel?: () => void;
}

/**
 * NoteForm for creating, editing, and viewing notes.
 */
export default function NoteForm({
  mode,
  noteId,
  onSave,
  onCancel,
}: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt, setCreatedAt] = useState<string>('');
  const [loading, setLoading] = useState(mode !== 'create');
  const [error, setError] = useState<string | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] =
    useState<'success' | 'error'>('success');

  const contentRef = useRef<HTMLInputElement>(null);

  /* ---------------- Fetch note (edit/view) ---------------- */

  useEffect(() => {
    if ((mode === 'edit' || mode === 'view') && noteId) {
      const load = async () => {
        try {
          setLoading(true);
          const note = await apiClient.getNote(noteId);
          setTitle(note.title ?? '');
          setContent(note.content);
          setCreatedAt(note.createdAt);
        } catch {
          setError('Failed to load note');
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [mode, noteId]);

  useEffect(() => {
    if (mode === 'create') contentRef.current?.focus();
  }, [mode]);

  /* ---------------- Submit ---------------- */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSave) return;

    if (mode === 'edit' && noteId) {
      onSave({ id: noteId, title, content });
    } else {
      onSave(title ? { title, content } : { content });
    }
  };

  /* ---------------- AI Generation ---------------- */

  const generateAIContent = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-content', { method: 'POST' });
      if (!res.ok) throw new Error();
      const { content } = await res.json();
      setContent(content);
      setToastMessage('Content generated');
      setToastSeverity('success');
    } catch {
      setToastMessage('AI generation failed');
      setToastSeverity('error');
    } finally {
      setShowToast(true);
      setIsGenerating(false);
    }
  };

  /* ---------------- States ---------------- */

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} textAlign="center">
        <Alert severity="error">{error}</Alert>
        <Button sx={{ mt: 2 }} onClick={onCancel}>
          Back
        </Button>
      </Box>
    );
  }

  const readOnly = mode === 'view';

  /* ---------------- UI ---------------- */

  return (
    <Box>
      {createdAt && (
        <Typography variant="body2" color="text.secondary" mb={1}>
          Created: {new Date(createdAt).toLocaleDateString()}
        </Typography>
      )}

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            {mode === 'create'
              ? 'Create Note'
              : mode === 'edit'
              ? 'Edit Note'
              : 'View Note'}
          </Typography>

          <form onSubmit={mode === 'view' ? undefined : handleSubmit}>
            <TextField
              label="Title (optional)"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{ readOnly }}
            />

            <TextField
              label="Content"
              fullWidth
              required
              multiline
              rows={6}
              margin="normal"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              InputProps={{ readOnly }}
              inputRef={contentRef}
            />

            <Box display="flex" justifyContent="space-between" mt={2}>
              {mode === 'create' && hasDigitalOceanGradientAIEnabled ? (
                <Button
                  size="small"
                  disabled={isGenerating}
                  onClick={() =>
                    content ? setShowConfirmDialog(true) : generateAIContent()
                  }
                >
                  ✨ Generate with AI
                </Button>
              ) : (
                <Box />
              )}

              <Box>
                <Button onClick={onCancel}>
                  {mode === 'view' ? 'Close' : 'Cancel'}
                </Button>
                {mode !== 'view' && (
                  <Button type="submit" variant="contained" sx={{ ml: 1 }}>
                    Save
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* Confirm replace */}
      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
        <DialogTitle>Replace content?</DialogTitle>
        <DialogContent>
          <Typography>
            This will overwrite existing content.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={generateAIContent}>
            Replace
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showToast}
        autoHideDuration={4000}
        onClose={() => setShowToast(false)}
      >
        <Alert severity={toastSeverity}>{toastMessage}</Alert>
      </Snackbar>
    </Box>
  );
}
