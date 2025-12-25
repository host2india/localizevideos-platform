/**
 * Represents a single note.
 */
export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
}

/**
 * Payload for creating a note.
 */
export interface CreateNoteData {
  title?: string;
  content: string;
}

/**
 * Payload for updating a note.
 */
export interface UpdateNoteData {
  title?: string;
  content?: string;
}

/**
 * Paginated notes response.
 */
export interface PaginatedNotes {
  notes: Note[];
  total: number;
}

/**
 * API client for managing notes.
 * Provides methods to fetch, create, update, and delete notes.
 */
export class NotesApiClient {
  constructor(private readonly baseURL = '/api/notes') {}

  /**
   * Fetch all notes with optional pagination, search, and sorting.
   */
  async getNotes(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
  }): Promise<PaginatedNotes> {
    let url = this.baseURL;

    if (params) {
      const query = new URLSearchParams();

      if (params.page !== undefined) {
        query.append('page', params.page.toString());
      }
      if (params.pageSize !== undefined) {
        query.append('pageSize', params.pageSize.toString());
      }
      if (params.search !== undefined) {
        query.append('search', params.search);
      }
      if (params.sortBy !== undefined) {
        query.append('sortBy', params.sortBy);
      }

      if (query.toString()) {
        url += `?${query.toString()}`;
      }
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Failed to fetch notes');
    }

    return res.json();
  }

  /**
   * Fetch a single note by ID.
   */
  async getNote(id: string): Promise<Note> {
    const res = await fetch(`${this.baseURL}/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch note');
    }

    return res.json();
  }

  /**
   * Create a new note.
   */
  async createNote(noteData: CreateNoteData): Promise<Note> {
    const res = await fetch(this.baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });

    if (!res.ok) {
      throw new Error('Failed to create note');
    }

    return res.json();
  }

  /**
   * Update an existing note.
   */
  async updateNote(
    id: string,
    updateData: UpdateNoteData
  ): Promise<Note> {
    const res = await fetch(`${this.baseURL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      throw new Error('Failed to update note');
    }

    return res.json();
  }

  /**
   * Delete a note.
   */
  async deleteNote(id: string): Promise<void> {
    const res = await fetch(`${this.baseURL}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete note');
    }
  }
}
