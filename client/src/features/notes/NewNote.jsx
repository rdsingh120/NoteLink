// src\features\notes\NewNote.jsx

import { useEffect, useState } from "react";
import Button from "../../components/Button";
import useNoteStore from "../../store/note.store";
import { toast } from "react-toastify";

const NewNote = () => {
  //AuthStore
  const createNote = useNoteStore((state) => state.createNote);
  const isCreatingNote = useNoteStore((state) => state.isCreatingNote);
  const clearError = useNoteStore((state) => state.clearError);

  //Form state
  const [noteData, setNoteData] = useState({ title: "", content: "", isPublic: true });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prev) => ({ ...prev, [name]: value }));
  };

  //Save note
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    try {
      const data = await createNote(noteData);
      toast.success(data?.message || "Note created successfully.");
      setNoteData({ title: "", content: "", isPublic: true });
    } catch (error) {
      // do nothing → store already handled error
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        value={noteData.title}
        onChange={handleChange}
        placeholder="Enter title"
        className="text-4xl w-full p-2 focus:outline-none"
      />

      <textarea
        name="content"
        value={noteData.content}
        onChange={handleChange}
        className="text-2xl field-sizing-content h-[75vh] w-full resize-none p-2 focus:outline-none"
        placeholder="Enter your notes..."
      ></textarea>
      <Button
        text={isCreatingNote ? "Saving..." : "Save"}
        disabled={isCreatingNote || !(noteData.title && noteData.content)}
      />
    </form>
  );
};
export default NewNote;
