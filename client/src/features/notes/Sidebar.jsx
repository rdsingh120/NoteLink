// src\components\Sidebar.jsx

import { Link, NavLink, useNavigate } from "react-router-dom";
import SideBarLink from "../../components/SideBarLink";
import useNoteStore from "../../store/note.store";
import { useEffect } from "react";

import { LuPanelLeft } from "react-icons/lu";
import useAuthStore from "../../store/auth.store";
import Button from "../../components/Button";

import { MdOutlineLogout } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const notes = useNoteStore((state) => state.notes);
  const getNotes = useNoteStore((state) => state.getNotes);

  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // store already handled error
    } finally {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <aside
      className={`transition-all duration-300  border-white/10 bg-white/10 backdrop-blur-xl h-screen ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className={`p-4 flex flex-col h-full ${!sidebarOpen && "items-center"}`}>
        <div className="flex items-center justify-between mb-6">
          {sidebarOpen && (
            <Link to="/">
              <h2 className="text-lg font-semibold text-gray-500 hover:text-gray-600 duration-300">
                NoteLink
              </h2>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            className={`px-3 py-2 rounded-lg 
             hover:bg-white/20 hover:border-white/20 
             transition-all duration-300
             flex items-center justify-center
             text-sm leading-none cursor-pointer`}
          >
            <span className="transition-transform duration-200">
              <LuPanelLeft size={17} />
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-10 flex-1">
          {/* Create new note */}
          <NavLink
            to="/new"
            className={({ isActive }) =>
              `w-full flex items-center px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium tracking-wide
            ${
              isActive
                ? "bg-white/20 border-white/30 shadow-sm"
                : "hover:bg-white/10 hover:border-white/20"
            } ${sidebarOpen && "gap-3"}`
            }
          >
            <PiNotePencilBold size={20} className="" />
            <span
              className={`transition-all duration-200 ${sidebarOpen ? "opacity-100" : "opacity-80"}`}
            >
              {sidebarOpen && "New note"}
            </span>
          </NavLink>

          {/* Notes list */}
          <div className="flex flex-col gap-1 max-h-125 overflow-y-auto overflow-x-hidden pr-2 relative">
            {notes.map((note) => (
              <SideBarLink
                key={note.id || note._id}
                id={note.id || note._id}
                sidebarOpen={sidebarOpen}
                title={note.title.length > 20 ? `${note.title.substring(0, 20)}...` : note.title}
              />
            ))}
          </div>

          {/* user */}
          <div
            className={`mt-auto flex items-center ${sidebarOpen ? "justify-left" : "justify-center"}`}
          >
            <div
              className={`flex items-center justify-center rounded-full bg-white/10 border-white/20 text-white 
                font-medium backdrop-blur-md transition-all duration-300 w-8 h-8 text-sm`}
            >
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>

            {sidebarOpen && (
              <span className="ml-3 text-sm text-gray-300 truncate max-w-30">{user?.name}</span>
            )}
          </div>
        </div>
        <button
          className={`flex items-center mt-5 ${sidebarOpen ? "justify-left" : "justify-center"} px-3 py-2 rounded-lg 
             hover:bg-white/20 hover:border-white/20 
             transition-all duration-300 text-sm leading-none cursor-pointer`}
          onClick={handleLogout}
          disabled={isLoading}
        >
          <MdOutlineLogout size={20} />
          {sidebarOpen && (
            <span className="ml-3 text-sm text-gray-300 truncate max-w-30">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
