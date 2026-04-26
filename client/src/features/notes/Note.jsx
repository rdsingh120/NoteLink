// src\features\notes\Note.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";
import useNoteStore from "../../store/note.store";
import { toast } from "react-toastify";

const Note = () => {
  const { noteId } = useParams();
  const [noteData, setNoteData] = useState({ title: "", content: "", isPublic: true });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [tick, setTick] = useState(0);

  const getNoteById = useNoteStore((state) => state.getNoteById);
  const updateNoteById = useNoteStore((state) => state.updateNoteById);
  const isUpdatingNote = useNoteStore((state) => state.isUpdatingNote);
  const isFetchingNote = useNoteStore((state) => state.isFetchingNote);
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
      setLastUpdated(new Date(note.updatedAt));
    } catch {
      // do nothing → store already handled error
    }
  };

  const getLastUpdatedText = () => {
    if (!lastUpdated) return "";

    const diffMin = Math.floor((new Date() - lastUpdated) / 60000);

    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin} min ago`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} hr ago`;

    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 30) return `${diffDay} day(s) ago`;

    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth < 12) return `${diffMonth} month(s) ago`;

    const diffYear = Math.floor(diffMonth / 12);
    return `${diffYear} year(s) ago`;
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
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    handleGetNote();
  }, [noteId]);

  if (isFetchingNote) return <LoadingScreen />;
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
      <div className="flex items-center justify-between">
        <Button
          text={isUpdatingNote ? "Updating..." : "Update"}
          onClick={handleUpdateNote}
          disabled={isUpdatingNote}
        />
        <p className="text-gray-500 text-xs">Last updated: {getLastUpdatedText()}</p>
      </div>
    </form>
  );
};
export default Note;
