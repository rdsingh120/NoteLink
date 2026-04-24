// src\routes\note.route.js

import { Router } from "express";
import { createNewNote, getUserNoteById, getUserNotes } from "../controllers/note.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protect, createNewNote);
router.get("/", protect, getUserNotes);
router.get("/:id", protect, getUserNoteById);

export default router;
