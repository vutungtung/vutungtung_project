import React, { useState } from "react";
import { AdminNavbar } from "../component/AdminDashboard/AdminNavbar";
import { Sidebar } from "../component/AdminDashboard/Sidebar";
import Overview from "../component/AdminDashboard/Overview";
import Vehicles from "../component/AdminDashboard/Vehicles";
import Booking from "../component/AdminDashboard/Booking";
import Setting from "../component/AdminDashboard/Setting";
import Users from "../component/AdminDashboard/Users";
import Analytics from "../component/AdminDashboard/Analytics";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Overview");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const pages: Record<string, React.JSX.Element> = {
    Overview: <Overview />,
    Vehicles: <Vehicles />,
    Bookings: <Booking />,
    Users: <Users />,
    Analytics: <Analytics />,
    Settings: <Setting />,
  };

  return (
    <div className="flex h-screen bg-light-gray">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onSelectPage={setActivePage}
        onClose={() => setIsSidebarOpen(false)}
        activePage={activePage}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar onMenuClick={toggleSidebar} />
        <div className="flex-1 p-6 overflow-y-auto">{pages[activePage]}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
