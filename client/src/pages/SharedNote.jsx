// src\pages\SharedNote.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useNoteStore from "../store/note.store";
import LoadingScreen from "../components/LoadingScreen";


const SharedNote = () => {
  const { noteId } = useParams();
  const [noteData, setNoteData] = useState({ title: "", content: "", isPublic: true });

  const getSharedNote = useNoteStore((state) => state.getSharedNote);
  const isFetchingNote = useNoteStore((state) => state.isFetchingNote);


  const handleGetNote = async () => {
    try {
      const { note } = await getSharedNote(noteId);
      setNoteData({
        title: note.title || "",
        content: note.content || "",
        isPublic: note.isPublic ?? true,
      });
    } catch (error) {
      // do nothing → store already handled error
    }
  };

  useEffect(() => {
    handleGetNote();
  }, [noteId]);

  if (isFetchingNote) return <LoadingScreen />;

  return (
    <form className="space-y-5">
      <input
        disabled
        name="title"
        type="text"
        placeholder="Enter title"
        value={noteData.title}
        className="text-4xl w-full p-2 focus:outline-none"
      />
      <textarea
        disabled
        name="content"
        className="text-2xl field-sizing-content h-[75vh] w-full resize-none p-2 focus:outline-none"
        placeholder="Enter your notes..."
        value={noteData.content}
      ></textarea>
    </form>
  );
};
export default SharedNote;
