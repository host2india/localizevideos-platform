'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Note, NotesApiClient } from '@/lib/api/notes';
import NotesHeader from './NotesHeader/NotesHeader';
import NotesListView from './NotesListView/NotesListView';
import PageContainer from '../Common/PageContainer/PageContainer';

const apiClient = new NotesApiClient();

/**
 * My Notes page – list & manage user notes.
 */
const MyNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      const { notes } = await apiClient.getNotes();
      setNotes(notes);
    } catch {
      setError('Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <PageContainer title="My Notes">
      <NotesHeader
        searchQuery=""
        sortBy="newest"
        viewMode="list"
        onSearchChange={() => {}}
        onSortChange={() => {}}
        onViewModeChange={() => {}}
        onCreateNote={() => {}}
      />

      <NotesListView
        notes={notes}
        isLoading={loading}
        error={error}
        onViewNote={() => {}}
        onEditNote={() => {}}
        onDeleteNote={() => {}}
        recentlyUpdatedTitles={new Set()}
      />
    </PageContainer>
  );
};

export default MyNotes;
