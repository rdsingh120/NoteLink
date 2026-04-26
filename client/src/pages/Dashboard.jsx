// src\pages\Dashboard.jsx

import { Outlet } from "react-router-dom";
import SideBar from "../features/notes/Sidebar";
import { useEffect, useState } from "react";
import useNoteStore from "../store/note.store";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const error = useNoteStore((state) => state.error);
  const clearError = useNoteStore((state) => state.clearError);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  return (
    <div className="h-screen flex overflow-hidden">
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
