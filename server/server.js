// src/server.js

import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.route.js";
import noteRoutes from "./src/routes/note.route.js";
import noteShareRoutes from "./src/routes/noteShare.route.js";
import { authorize, protect } from "./src/middleware/auth.middleware.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/share", noteShareRoutes);

app.get("/", (req, res) =>
  res.status(200).json({ success: true, message: "NoteLink service is running" }),
);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server: http://localhost:${port}/`);
});
