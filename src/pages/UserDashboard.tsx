import { useState, useContext } from "react";
import MyBookings from "../component/UserDashboard/MyBookings";
import UserSetting from "../component/UserDashboard/UserSetting";
import Profile from "../component/UserDashboard/Profile";
import Wishlist from "../component/UserDashboard/Wishlist";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const auth = useContext(AuthContext);

  if (!auth || !auth.user) {
    return <p className="text-center py-10">Loading user data...</p>;
  }

  const { name, avatar } = auth.user;

  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-l from-red to-gradient-red">
        <div className="max-w-7xl text-white mx-auto p-5 md:py-10">
          <div className="sm:flex items-center gap-5 space-y-2">
            {/* Profile Avatar */}
            <div className="h-24 w-24 rounded-full overflow-hidden border-4 bg-amber-200 border-white flex-shrink-0">
              <img
                src={avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="h-full w-full object-cover"
              />
            </div>

            {/* User Info */}
            <div>
              <h1 className="text-lg sm:text-3xl font-bold">
                Welcome back, <strong>{name}</strong>!
              </h1>
              <p>Member since January 2025</p>

              {/* Example stats (replace with real data later) */}
              <div className="flex gap-5 mt-2">
                <p>
                  <strong>0</strong> Bookings
                </p>
                <p>
                  <strong>$0</strong> Total Spent
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
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
          {activeTab === "bookings" && <MyBookings />}
          {activeTab === "wishlist" && <Wishlist />}
          {activeTab === "profile" && <Profile />}
          {activeTab === "settings" && <UserSetting />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
