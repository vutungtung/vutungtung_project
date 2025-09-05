import { useState } from "react";
import MyBookings from "../component/UserDashboard/MyBookings";
import UserSetting from "../component/UserDashboard/UserSetting";
import Profile from "../component/UserDashboard/Profile";
import Wishlist from "../component/UserDashboard/Wishlist";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <div>
      <div className="bg-gradient-to-l from-red to-gradient-red">
        <div className=" max-w-7xl text-white mx-auto p-5 md:py-10">
          <div className="sm:flex items-center gap-5 space-y-2">
            <div className="bg-light-gray h-10 w-10 p-10 text-black border-5 text-3xl font-bold flex justify-center items-center rounded-full">
              UD
            </div>
            <div>
              <h1 className="text-lg sm:text-3xl font-bold">
                Welcome back, <strong>Pyarjan Thapa</strong>!
              </h1>
              <p>Member since Janaury 2025</p>
              <div className="flex gap-5">
                <p>
                  <strong>12 </strong>Bookings
                </p>
                <p>
                  <strong>$2,350 </strong>Total Spent
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto xl:px-0 px-2 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-5 bg-light-gray p-2 rounded-2xl">
          {["bookings", "wishlist", "profile", "settings"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer flex items-center justify-center gap-2 p-1 rounded-lg ${
                activeTab === tab ? "bg-white" : ""
              }`}
            >
              {tab === "bookings" && <span> My Bookings</span>}
              {tab === "wishlist" && <span> Wishlist</span>}
              {tab === "profile" && <span> Profile</span>}
              {tab === "settings" && <span> Settings</span>}
            </div>
          ))}
        </div>

        {/* Tabs Content */}
        <div className="p-2 xl:p-0">
          {activeTab === "bookings" && (
            <div>
              <MyBookings />
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              <Wishlist />
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <Profile />
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <UserSetting />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
