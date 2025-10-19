import { useState, useContext } from "react";
import MyBookings from "../component/UserDashboard/MyBookings";
import UserSetting from "../component/UserDashboard/UserSetting";
import Profile from "../component/UserDashboard/Profile";
import Wishlist from "../component/UserDashboard/Wishlist";
import { AuthContext } from "../context/AuthContext";
import { getAvatar } from "../lib/avatar";

// Helper functions
const generateNameFromEmail = (email: string): string => {
  if (!email) return "User";
  const username = email.split("@")[0];
  return username
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const auth = useContext(AuthContext);

  if (auth?.loading) {
    return <p className="text-center py-10">Loading user data...</p>;
  }

  if (!auth?.user) {
    return (
      <div className="text-center py-10">
        <p>User not found. Please log in again.</p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="mt-4 bg-red text-white px-4 py-2 rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Get user data with nice fallbacks
  const userData = {
    name: auth.user.name || "User", // Use actual name from registration, fallback to "User"
    email: auth.user.email || "No email provided",
    avatar: auth.user.avatar || getAvatar(auth.user.email || "user"),
  };

  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-l from-red to-gradient-red">
        <div className="max-w-7xl text-white mx-auto p-5 md:py-10 flex items-center gap-5">
          {/* Profile Avatar */}
          <div className="h-24 w-24 rounded-full overflow-hidden border-4 bg-gray-200 border-white flex-shrink-0">
            <img
              src={userData.avatar}
              alt="User Avatar"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://api.dicebear.com/7.x/initials/svg?seed=user&backgroundColor=ffadad";
              }}
            />
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-lg sm:text-3xl font-bold">
              Welcome back, <strong>{userData.name}</strong>!
            </h1>
            <p className="text-white/90">{userData.email}</p>

            {/* Example stats */}
            <div className="flex gap-5 mt-2 text-sm">
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
              {tab === "bookings" && <span>My Bookings</span>}
              {tab === "wishlist" && <span>Wishlist</span>}
              {tab === "profile" && <span>Profile</span>}
              {tab === "settings" && <span>Settings</span>}
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
