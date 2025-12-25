'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Notes SSE event payload
 * (Defined locally to avoid broken service imports)
 */
export interface NotesSSEEvent {
  type: 'TITLE_UPDATED';
  noteId: string;
  title: string;
}

/**
 * SSE connection state
 */
export interface SSEConnectionState {
  connected: boolean;
  error?: string;
}

/**
 * Hook to listen for real-time note title updates via SSE
 */
export function useNotesSSE(
  onTitleUpdate: (noteId: string, newTitle: string) => void
) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const [state, setState] = useState<SSEConnectionState>({
    connected: false,
  });

  const connect = useCallback(() => {
    if (eventSourceRef.current) return;

    const es = new EventSource('/api/notes/events');

    es.onopen = () => {
      setState({ connected: true });
    };

    es.onmessage = (event) => {
      try {
        const data: NotesSSEEvent = JSON.parse(event.data);

        if (data.type === 'TITLE_UPDATED') {
          onTitleUpdate(data.noteId, data.title);
        }
      } catch (err) {
        console.error('Invalid SSE payload', err);
      }
    };

    es.onerror = () => {
      setState({
        connected: false,
        error: 'SSE connection lost',
      });
      es.close();
      eventSourceRef.current = null;
    };

    eventSourceRef.current = es;
  }, [onTitleUpdate]);

  useEffect(() => {
    connect();

    return () => {
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
    };
  }, [connect]);

  return state;
}
