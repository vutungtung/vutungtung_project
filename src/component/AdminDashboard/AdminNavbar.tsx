import { FaBell, FaSearch, FaBars } from "react-icons/fa";

interface AdminNavbarProps {
  onMenuClick: () => void; // toggle sidebar
}

export const AdminNavbar = ({ onMenuClick }: AdminNavbarProps) => {
  return (
    <div className="w-full flex justify-between items-center bg-white shadow px-4 md:px-6 py-3 sticky top-0 z-30">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-red-500">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-xs md:text-sm">
            Manage your vehicle rental business
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-2 py-1">
          <FaSearch className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm px-2"
          />
        </div>

        {/* Quick Action */}
        <button className="hidden sm:block bg-red-500 text-white px-3 md:px-4 py-2 text-sm md:text-base rounded-lg hover:bg-red-600">
          + Quick Action
        </button>

        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <FaBell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Sidebar toggle (mobile only) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <FaBars className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};
