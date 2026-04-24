// src\store\note.store.js

import { create } from "zustand";
import { createNewNote, getPublicNoteById, getUserNoteById, getUserNotes } from "../api/note.api";

const getErrorMessage = (error, fallback) => error?.response?.data?.message || fallback;

const useNoteStore = create((set, get) => ({
  notes: [],
  isLoading: false,
  error: null,

  createNote: async (noteData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await createNewNote(noteData);
      set({ isLoading: false, error: null, notes: [...get().notes, data.note] });
      return data;
    } catch (error) {
      set({ isLoading: false, error: getErrorMessage(error, "Note creation failed") });
      throw error;
    }
  },

  getNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getUserNotes();
      set({ notes: data.notes, isLoading: false, error: null });
      return data;
    } catch (error) {
      set({ isLoading: false, error: getErrorMessage(error, "Failed to fetch notes") });
      throw error;
    }
  },

  getNoteById: async (noteId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getUserNoteById(noteId);
      set({ isLoading: false, error: null });
      return data;
    } catch (error) {
      set({ isLoading: false, error: getErrorMessage(error, "Failed to fetch note") });
      throw error;
    }
  },

  getSharedNote: async (noteId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getPublicNoteById(noteId);
      set({ isLoading: false, error: null });
      return data;
    } catch (error) {
      set({ isLoading: false, error: getErrorMessage(error, "Failed to fetch shared note") });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useNoteStore;
