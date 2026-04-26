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

const useNoteStore = create((set) => ({
  notes: [],
  isFetchingNotes: false,
  isFetchingNote: false,
  isCreatingNote: false,
  isUpdatingNote: false,
  isDeletingNote: false,
  error: null,

  createNote: async (noteData) => {
    set({ isCreatingNote: true, error: null });
    try {
      const data = await createNewNote(noteData);
      set((state) => ({
        isCreatingNote: false,
        error: null,
        notes: [data.note, ...state.notes],
      }));
      return data;
    } catch (error) {
      set({ isCreatingNote: false, error: getErrorMessage(error, "Note creation failed") });
      throw error;
    }
  },

  getNotes: async () => {
    set({ isFetchingNotes: true, error: null });
    try {
      const data = await getUserNotes();
      set({ notes: [...data.notes].reverse(), isFetchingNotes: false, error: null });
      return data;
    } catch (error) {
      set({ isFetchingNotes: false, error: getErrorMessage(error, "Failed to fetch notes") });
      throw error;
    }
  },

  getNoteById: async (noteId) => {
    set({ isFetchingNote: true, error: null });
    try {
      const data = await getUserNoteById(noteId);
      set({ isFetchingNote: false, error: null });
      return data;
    } catch (error) {
      set({ isFetchingNote: false, error: getErrorMessage(error, "Failed to fetch note") });
      throw error;
    }
  },

  getSharedNote: async (noteId) => {
    set({ isFetchingNote: true, error: null });
    try {
      const data = await getPublicNoteById(noteId);
      set({ isFetchingNote: false, error: null });
      return data;
    } catch (error) {
      set({ isFetchingNote: false, error: getErrorMessage(error, "Failed to fetch shared note") });
      throw error;
    }
  },

  updateNoteById: async (noteId, updatedNoteData) => {
    set({ isUpdatingNote: true, error: null });
    try {
      const data = await updateUserNoteById(noteId, updatedNoteData);
      set((state) => ({
        isUpdatingNote: false,
        error: null,
        notes: state.notes.map((note) => (note._id === noteId ? data.note : note)),
      }));
      return data;
    } catch (error) {
      set({ isUpdatingNote: false, error: getErrorMessage(error, "Failed to update the note") });
      throw error;
    }
  },

  deleteNoteById: async (noteId) => {
    set({ isDeletingNote: true, error: null });
    try {
      const data = await deleteUserNoteById(noteId);
      set((state) => ({
        isDeletingNote: false,
        error: null,
        notes: state.notes.filter((note) => note._id !== noteId),
      }));
      return data;
    } catch (error) {
      set({ isDeletingNote: false, error: getErrorMessage(error, "Failed to delete the note") });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useNoteStore;
