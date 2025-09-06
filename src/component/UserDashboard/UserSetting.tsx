// const UserSetting = () => {
//   return (
//     <div className="space-y-6 ">
//       {/* Notification Preferences */}
//       <div className="border border-gray-300 rounded-lg p-6 space-y-4">
//         <h2 className="text-lg font-semibold flex items-center gap-2">
//           <span>🔔</span> Notification Preferences
//         </h2>
//         <div className="space-y-3 mt-4">
//           <label className="flex items-center justify-between">
//             <div>
//               <p className="font-medium">Booking Confirmations</p>
//               <p className="text-sm text-gray-500">
//                 Get notified when your booking is confirmed
//               </p>
//             </div>
//             <input type="checkbox" defaultChecked className="h-5 w-5" />
//           </label>

//           <label className="flex items-center justify-between">
//             <div>
//               <p className="font-medium">Promotional Offers</p>
//               <p className="text-sm text-gray-500">
//                 Receive emails about special deals and offers
//               </p>
//             </div>
//             <input type="checkbox" defaultChecked className="h-5 w-5" />
//           </label>

//           <label className="flex items-center justify-between">
//             <div>
//               <p className="font-medium">Booking Reminders</p>
//               <p className="text-sm text-gray-500">
//                 Get reminded about upcoming bookings
//               </p>
//             </div>
//             <input type="checkbox" defaultChecked className="h-5 w-5" />
//           </label>
//         </div>
//       </div>

//       {/* Security & Privacy */}
//       <div className="border border-gray-300 rounded-lg p-6 space-y-4">
//         <h2 className="text-lg font-semibold flex items-center gap-2">
//           <span>🛡️</span> Security & Privacy
//         </h2>
//         <div className="space-y-2 mt-4">
//           <button className="w-full text-left border border-gray-300 rounded-md p-3 hover:bg-gray-50">
//             Change Password
//           </button>
//           <button className="w-full text-left border border-gray-300 rounded-md p-3 hover:bg-gray-50">
//             Two-Factor Authentication
//           </button>
//           <button className="w-full text-left border border-gray-300 rounded-md p-3 hover:bg-gray-50">
//             Download My Data
//           </button>
//           <button className="w-full text-left bg-red-600 text-white rounded-md p-3 hover:bg-red-700">
//             Delete Account
//           </button>
//         </div>
//       </div>

//       {/* Payment Methods */}
//       <div className="border border-gray-300 rounded-lg p-6 space-y-4">
//         <h2 className="text-lg font-semibold flex items-center gap-2">
//           <span>💳</span> Payment Methods
//         </h2>
//         <div className="space-y-2 mt-4">
//           <div className="border border-gray-300 rounded-md p-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <span>💳</span>
//               <div>
//                 <p className="font-medium">•••• •••• •••• 4242</p>
//                 <p className="text-sm text-gray-500">Expires 12/25</p>
//               </div>
//             </div>
//             <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
//               Default
//             </span>
//           </div>
//           <button className="w-full border border-gray-300 rounded-md p-3 hover:bg-gray-50">
//             Add New Payment Method
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserSetting;
import { useState } from "react";
import { useAuth } from "../../context/UseContext";

const UserSetting = () => {
  const { user, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return <p className="text-center py-10">No user found</p>;

  // =======================
  // Change Password
  // =======================
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill both current and new password");
      return;
    }

    setLoading(true);
    try {
      // Use MockAPI for testing or replace with real backend URL
      const API_URL = `https://68b7d508b7154050432608f0.mockapi.io/vehicles/users/${user.id}`;

      const res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword, // backend will verify
          newPassword,
        }),
      });

      // MockAPI always returns 200, so simulate password check
      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.message || "Current password is incorrect");
        return;
      }

      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // Delete Account
  // =======================
  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      alert("Please enter your password to confirm deletion");
      return;
    }

    if (!confirm("Are you sure you want to delete your account?")) return;

    setLoading(true);
    try {
      // MockAPI for now, replace with real backend later
      const API_URL = `https://68b7d508b7154050432608f0.mockapi.io/vehicles/users/${user.id}`;

      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePassword }), // backend verifies
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.message || "Password incorrect or deletion failed");
        return;
      }

      alert("Account deleted successfully!");
      logout(); // clear user session
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow border border-gray-300">
      <h2 className="text-xl font-semibold mb-6">User Settings</h2>

      {/* Change Password */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="block w-full rounded-md border border-gray-300 p-2 mb-2 focus:border-black focus:ring-black"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="block w-full rounded-md border border-gray-300 p-2 mb-2 focus:border-black focus:ring-black"
        />
        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </div>

      {/* Delete Account */}
      <div>
        <h3 className="font-medium mb-2">Delete Account</h3>
        <input
          type="password"
          placeholder="Enter your password to confirm"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          className="block w-full rounded-md border border-gray-300 p-2 mb-2 focus:border-black focus:ring-black"
        />
        <button
          onClick={handleDeleteAccount}
          disabled={loading}
          className="bg-red text-white px-4 py-2 rounded-md hover:bg-gradient-red disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default UserSetting;
