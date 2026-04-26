import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import useNoteStore from "../store/note.store";
import { toast } from "react-toastify";

const SideBarLink = ({ id, sidebarOpen, title, short }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const deleteNoteById = useNoteStore((state) => state.deleteNoteById);
  const isDeletingNote = useNoteStore((state) => state.isDeletingNote);

  const handleDelete = async () => {
    try {
      const { message } = await deleteNoteById(id);
      toast.success(message);
      setOpen(false);
      navigate("/new");
    } catch {}
  };

  if (!sidebarOpen && !short) return null;

  return (
    <>
      <NavLink
        to={`/n/${id}`}
        className={({ isActive }) =>
          `w-full flex items-center justify-between px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium tracking-wide group
        ${
          isActive
            ? "bg-white/20 border-white/30 shadow-sm"
            : "hover:bg-white/10 hover:border-white/20"
        }`
        }
      >
        <span
          className={`transition-all duration-200 ${sidebarOpen ? "opacity-100" : "opacity-80"}`}
        >
          {sidebarOpen ? title : short}
        </span>

        {/* 3 dots button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className="invisible text-gray-400 hover:text-gray-200 group-hover:visible cursor-pointer"
        >
          <BsThreeDots size={20} />
        </button>
      </NavLink>
      {/* dropdown menu */}
      {open && (
        <div className="fixed left-48 top-44 w-36 bg-gray-800/80 rounded-lg shadow-lg p-2 z-50">
          <button
            onClick={() => {
              setOpen(false);
              navigate(`/s/${id}`);
            }}
            className="block w-full text-left px-2 py-1 hover:bg-white/10 rounded cursor-pointer"
          >
            Share
          </button>
          <button
            disabled={isDeletingNote}
            onClick={handleDelete}
            className="block w-full text-left px-2 py-1 hover:bg-red-400/10 rounded cursor-pointer text-red-500"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default SideBarLink;
