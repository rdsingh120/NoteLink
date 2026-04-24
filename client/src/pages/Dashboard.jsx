// src\pages\Dashboard.jsx

import { Outlet } from "react-router-dom";
import SideBar from "../features/notes/Sidebar";
import { useState } from "react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
