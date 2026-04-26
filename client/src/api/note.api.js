// src/api/note.api.js

import api from "./client";

export const createNewNote = async (noteData) => {
  const { data } = await api.post("/notes", noteData);
  return data;
};

export const getUserNotes = async () => {
  const { data } = await api.get("/notes");
  return data;
};

export const getUserNoteById = async (noteId) => {
  const { data } = await api.get(`/notes/${noteId}`);
  return data;
};

export const getPublicNoteById = async (noteId) => {
  const { data } = await api.get(`/share/${noteId}`);
  return data;
};

export const updateUserNoteById = async (noteId, updatedNoteData) => {
  const { data } = await api.put(`/notes/${noteId}`, updatedNoteData);
  return data;
};
