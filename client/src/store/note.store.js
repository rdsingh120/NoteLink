// src\store\note.store.js

import { create } from "zustand";
import {
  createNewNote,
  deleteUserNoteById,
  getPublicNoteById,
  getUserNoteById,
  getUserNotes,
  updateUserNoteById,
} from "../api/note.api";

const getErrorMessage = (error, fallback) => error?.response?.data?.message || fallback;

const useNoteStore = create((set, get) => ({
  notes: [],
  isLoading: false,
  error: null,

  createNote: async (noteData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await createNewNote(noteData);
      set((state) => ({
        isLoading: false,
        error: null,
        notes: [data.note, ...state.notes],
      }));
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
      set({ notes: data.notes.toReversed(), isLoading: false, error: null });
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

  updateNoteById: async (noteId, updatedNoteData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await updateUserNoteById(noteId, updatedNoteData);
      set((state) => ({
        isLoading: false,
        error: null,
        notes: state.notes.map((note) => (note._id === noteId ? data.note : note)),
      }));
      return data;
    } catch (error) {
      set({ isLoading: false, error: getErrorMessage(error, "Failed to update the note") });
      throw error;
    }
  },

  deleteNoteById: async (noteId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await deleteUserNoteById(noteId);
      set((state) => ({
        isLoading: false,
        error: null,
        notes: state.notes.filter((note) => note._id !== noteId),
      }));
      return data;
    } catch (error) {
      set({ isLoading: false, error: getErrorMessage(error, "Failed to delete the note") });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useNoteStore;
