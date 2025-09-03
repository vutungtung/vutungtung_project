import { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { FaEnvelope } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEdit, AiOutlineStop } from "react-icons/ai";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Suspended";
  lastActive: string;
  bookings: number;
  totalSpent: number;
  joined: string;
}

interface Stats {
  totalUsers: number;
  activeUsers: number;
  newThisMonth: number;
  avgSpent: number;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    newThisMonth: 0,
    avgSpent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Replace with your API endpoint
        const res = await fetch(
          ""
        );
        const data = await res.json();

        setUsers(data.users);
        setStats(data.stats);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage customer accounts and profiles</p>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FaEnvelope /> Send Newsletter
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded-xl">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold text-red-500">
            {stats.totalUsers}
          </h2>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <p className="text-gray-500">Active Users</p>
          <h2 className="text-2xl font-bold text-green-500">
            {stats.activeUsers}
          </h2>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <p className="text-gray-500">New This Month</p>
          <h2 className="text-2xl font-bold text-blue-500">
            {stats.newThisMonth}
          </h2>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <p className="text-gray-500">Avg. Spent</p>
          <h2 className="text-2xl font-bold text-red-500">${stats.avgSpent}</h2>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full sm:w-1/2 border rounded-lg p-2"
        />
        <button className="ml-4 border px-4 py-2 rounded-lg flex items-center gap-2">
          <FiFilter /> Filters
        </button>
      </div>

      {/* User List */}
      <div className="bg-white shadow rounded-xl p-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-4 last:border-none"
          >
            {/* Left Section */}
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <p className="text-gray-500 text-sm">{user.phone}</p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : user.status === "Inactive"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {user.status}
              </span>
              <span className="text-gray-400 text-sm">{user.lastActive}</span>
            </div>

            {/* Bookings */}
            <div className="text-center mt-2 sm:mt-0">
              <p className="font-semibold">{user.bookings}</p>
              <p className="text-gray-500 text-sm">Bookings</p>
            </div>

            {/* Total Spent */}
            <div className="text-center mt-2 sm:mt-0 text-red-500 font-bold">
              ${user.totalSpent.toLocaleString()}
              <p className="text-gray-500 text-sm">Total Spent</p>
            </div>

            {/* Joined */}
            <div className="text-gray-500 text-sm mt-2 sm:mt-0">
              {user.joined}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button className="p-2 bg-gray-100 rounded-lg">
                <AiOutlineEye />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg">
                <AiOutlineEdit />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg text-red-500">
                <AiOutlineStop />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
