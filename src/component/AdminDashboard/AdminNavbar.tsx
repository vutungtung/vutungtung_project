import { useState } from "react";
import { FaBell, FaSearch, FaBars } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

interface AdminNavbarProps {
  onMenuClick: () => void;
  onSelectPage: (page: string) => void;
  onAddVehicleClick: () => void; // ✅ new prop
}

export const AdminNavbar = ({
  onMenuClick,
  onSelectPage,
  onAddVehicleClick,
}: AdminNavbarProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex justify-between items-center bg-white shadow px-4 md:px-6 py-3 sticky top-0 z-30">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-red">
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
        <div className="relative ">
          <button
            onClick={() => setOpen(!open)}
            className="hidden sm:flex justify-center items-center gap-2  bg-red text-white px-3 md:px-4 py-2 text-sm md:text-base rounded-lg hover:bg-gradient-red"
          >
            <IoMdAdd size={24} /> Quick Action
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute left-0 right-0 mt-2 w-fit p-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className=" text-sm text-gray-700">
                <li>
                  <button
                    className=" flex justify-start w-full items-center gap-2  px-4 py-2 rounded-lg hover:text-white hover:bg-red"
                    onClick={() => {
                      onSelectPage("Vehicles");
                      onAddVehicleClick();
                      setOpen(false);
                    }}
                  >
                    <IoMdAdd size={20} /> Add Vehicle
                  </button>
                </li>
                <li>
                  <button
                    className="flex justify-start w-full items-center gap-2 px-4 py-2 rounded-lg hover:text-white hover:bg-red"
                    onClick={() => {
                      onSelectPage("Settings");
                      setOpen(false);
                    }}
                  >
                    <FiSettings size={20} /> Settings
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <FaBell className="w-5 h-5 text-gray-600" />
          {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red rounded-full"></span> */}
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
