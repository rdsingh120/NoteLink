// src\features\notes\Note.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import useNoteStore from "../../store/note.store";
import { toast } from "react-toastify";

const Note = () => {
  const { noteId } = useParams();
  const [noteData, setNoteData] = useState({ title: "", content: "", isPublic: true });

  const getNoteById = useNoteStore((state) => state.getNoteById);
  const updateNoteById = useNoteStore((state) => state.updateNoteById);
  const isLoading = useNoteStore((state) => state.isLoading);
  const clearError = useNoteStore((state) => state.clearError);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetNote = async () => {
    try {
      const { note } = await getNoteById(noteId);
      setNoteData({
        title: note.title || "",
        content: note.content || "",
        isPublic: note.isPublic ?? true,
      });
    } catch {
      // do nothing → store already handled error
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    clearError();
    try {
      const { message } = await updateNoteById(noteId, noteData);
      toast.success(message || "Note updated successfully.");
      
    } catch {
      // do nothing → store already handled error
    }
  };

  useEffect(() => {
    handleGetNote();
  }, [noteId]);
  return (
    <form className="space-y-5">
      <input
        name="title"
        type="text"
        placeholder="Enter title"
        value={noteData.title}
        onChange={handleChange}
        className="text-4xl w-full p-2 focus:outline-none"
      />

      <textarea
        name="content"
        className="text-2xl field-sizing-content h-[75vh] w-full resize-none p-2 focus:outline-none"
        placeholder="Enter your notes..."
        value={noteData.content}
        onChange={handleChange}
      ></textarea>

      {/* Place holder */}
      <Button
        text={isLoading ? "Updating..." : "Update"}
        onClick={handleUpdateNote}
        disabled={isLoading}
      />
    </form>
  );
};
export default Note;
