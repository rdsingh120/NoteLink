// src\routes\noteShare.route.js

import { Router } from "express";
import { getPublicNoteById } from "../controllers/note.controller.js";

const router = Router()

router.get("/:id", getPublicNoteById)

export default router;
