// src\models\note.model.js

import { Schema, model } from "mongoose";

const NoteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    isPublic: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  },
);

const Note = model("Note", NoteSchema);

export default Note;
