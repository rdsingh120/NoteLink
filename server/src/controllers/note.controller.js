// src\controllers\note.controller.js

import Note from "../models/note.model.js";
import serverErrorResponse from "../utils/serverErrorResponse.js";

export const createNewNote = async (req, res) => {
  const user = req.user;
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Not Authenticated, please login to create a new note." });

  const { title, content, isPublic } = req.body;

  if (!title) return res.status(400).json({ success: false, message: "Note title is required." });
  if (!content) return res.status(400).json({ success: false, message: "Note cannot be empty." });

  try {
    const newNote = await Note.create({ title, content, isPublic, userId: user.id || user._id });
    res.status(201).json({ success: true, message: "Note created successfully.", note: newNote });
  } catch (error) {
    serverErrorResponse("createNewNote", error, res);
  }
};

export const getUserNotes = async (req, res) => {
  const user = req.user;
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Not Authenticated, please login to view your notes" });

  try {
    const notesFound = await Note.find({ userId: user.id || user._id });
    res.status(200).json({ success: true, notes: notesFound });
  } catch (error) {
    serverErrorResponse("getUserNotes", error, res);
  }
};

export const getUserNoteById = async (req, res) => {
  const noteId = req.params.id;

  const user = req.user;
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Not Authenticated, please login to view your notes" });

  try {
    const noteFound = await Note.findOne({ userId: user.id || user._id, _id: noteId });

    if (!noteFound) return res.status(404).json({ success: false, message: "Note doesn't exist" });

    res.status(200).json({ success: true, note: noteFound });
  } catch (error) {
    serverErrorResponse("getUserNoteById", error, res);
  }
};

export const getPublicNoteById = async (req, res) => {
  const noteId = req.params.id;

  try {
    const noteFound = await Note.findOne({ _id: noteId });

    if (!noteFound) return res.status(404).json({ success: false, message: "Note doesn't exist" });

    if (!noteFound.isPublic) {
      return res.status(403).json({ success: false, message: "Forbidden. Note is private" });
    }

    res.status(200).json({ success: true, note: noteFound });
  } catch (error) {
    serverErrorResponse("getPublicNoteById", error, res);
  }
};
