// import { useEffect, useState } from "react";
// import { FiFilter } from "react-icons/fi";
// import { AiOutlineEye, AiOutlineEdit, AiOutlineStop } from "react-icons/ai";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   status: "Active" | "Inactive" | "Suspended";
//   lastActive: string;
//   bookings: number;
//   totalSpent: number;
//   joined: string;
// }

// interface Stats {
//   totalUsers: number;
//   activeUsers: number;
//   newThisMonth: number;
//   avgSpent: number;
// }

// const Users = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
//   const [stats, setStats] = useState<Stats>({
//     totalUsers: 0,
//     activeUsers: 0,
//     newThisMonth: 0,
//     avgSpent: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // filter + sort state
//   const [statusFilter, setStatusFilter] = useState<
//     "All" | "Active" | "Inactive" | "Suspended"
//   >("All");
//   const [sortBy, setSortBy] = useState<
//     "Name" | "Join Date" | "Total Spent" | "Total Bookings"
//   >("Name");
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Replace with your API endpoint
//         const res = await fetch("");
//         const data = await res.json();

//         setUsers(data.users);
//         setFilteredUsers(data.users);
//         setStats(data.stats);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Filtering + sorting logic
//   useEffect(() => {
//     let results = [...users];

//     // filter by search
//     const lowerSearch = searchTerm.toLowerCase();
//     results = results.filter(
//       (user) =>
//         user.name.toLowerCase().includes(lowerSearch) ||
//         user.email.toLowerCase().includes(lowerSearch) ||
//         user.phone.toLowerCase().includes(lowerSearch)
//     );

//     // filter by status
//     if (statusFilter !== "All") {
//       results = results.filter((user) => user.status === statusFilter);
//     }

//     // sorting
//     results.sort((a, b) => {
//       switch (sortBy) {
//         case "Name":
//           return a.name.localeCompare(b.name);
//         case "Join Date":
//           return new Date(a.joined).getTime() - new Date(b.joined).getTime();
//         case "Total Spent":
//           return b.totalSpent - a.totalSpent;
//         case "Total Bookings":
//           return b.bookings - a.bookings;
//         default:
//           return 0;
//       }
//     });

//     setFilteredUsers(results);
//   }, [searchTerm, users, statusFilter, sortBy]);

//   const clearFilters = () => {
//     setStatusFilter("All");
//     setSortBy("Name");
//   };

//   if (loading) {
//     return <p className="text-center mt-10">Loading users...</p>;
//   }

//   return (
//     <div className="">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">User Management</h1>
//         <p className="text-gray-500">Manage customer accounts and profiles</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white shadow p-4 rounded-xl">
//           <p className="text-gray-500">Total Users</p>
//           <h2 className="text-2xl font-bold text-red-500">
//             {stats.totalUsers}
//           </h2>
//         </div>
//         <div className="bg-white shadow p-4 rounded-xl">
//           <p className="text-gray-500">Active Users</p>
//           <h2 className="text-2xl font-bold text-green-500">
//             {stats.activeUsers}
//           </h2>
//         </div>
//         <div className="bg-white shadow p-4 rounded-xl">
//           <p className="text-gray-500">New This Month</p>
//           <h2 className="text-2xl font-bold text-blue-500">
//             {stats.newThisMonth}
//           </h2>
//         </div>
//         <div className="bg-white shadow p-4 rounded-xl">
//           <p className="text-gray-500">Avg. Spent</p>
//           <h2 className="text-2xl font-bold text-red-500">${stats.avgSpent}</h2>
//         </div>
//       </div>

//       {/* Search + Filters */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 relative">
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full bg-white border border-gray-300 rounded-lg p-2"
//         />

//         {/* Filter Button + Selected Status */}
//         <div
//           onClick={() => setShowFilters((prev) => !prev)}
//           className="flex items-center border border-gray-300 px-4 py-2  w-full sm:w-fit  rounded-lg gap-2 bg-white hover:bg-gray-50 shadow-sm"
//         >
//           <button className="flex items-center justify-center gap-2 w-full font-medium">
//             <FiFilter /> Filters
//           </button>

//           {/* Show selected filter next to button */}
//           {statusFilter !== "All" && (
//             <span className="bg-gray-300 text-white text-sm font-semibold px-3 py-1 rounded-full">
//               {statusFilter}
//             </span>
//           )}
//         </div>

//         {showFilters && (
//           <div className="absolute right-0 top-12 bg-white shadow-lg rounded-xl border border-gray-200 w-56 z-50">
//             <div className="p-3 border-gray-200 border-b">
//               <p className="text-sm font-semibold text-gray-600">Status</p>
//               {["All", "Active", "Inactive", "Suspended"].map((status) => (
//                 <div
//                   key={status}
//                   onClick={() => {
//                     setStatusFilter(
//                       status as "All" | "Active" | "Inactive" | "Suspended"
//                     );
//                     setShowFilters(false); // close dropdown
//                   }}
//                   className={`cursor-pointer px-2 py-1 rounded-md mt-1 ${
//                     statusFilter === status ? "bg-gray-100" : ""
//                   }`}
//                 >
//                   {status}
//                 </div>
//               ))}
//             </div>
//             <div className="p-3 border-b border-gray-200">
//               <p className="text-sm font-semibold text-gray-600">Sort By</p>
//               {["Name", "Join Date", "Total Spent", "Total Bookings"].map(
//                 (sort) => (
//                   <div
//                     key={sort}
//                     onClick={() => {
//                       setSortBy(
//                         sort as
//                           | "Name"
//                           | "Join Date"
//                           | "Total Spent"
//                           | "Total Bookings"
//                       );
//                       setShowFilters(false);
//                     }}
//                     className={`cursor-pointer px-2 py-1 rounded-md mt-1 ${
//                       sortBy === sort ? "bg-gray-100" : ""
//                     }`}
//                   >
//                     {sort}
//                   </div>
//                 )
//               )}
//             </div>
//             <div className="p-3">
//               <button
//                 onClick={() => {
//                   clearFilters();
//                   setShowFilters(false);
//                 }}
//                 className="w-full text-center text-sm text-black  rounded-lg py-1 hover:bg-red-50"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* User List */}
//       <div className="bg-white shadow rounded-xl p-4">
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map((user) => (
//             <div
//               key={user.id}
//               className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-4 last:border-none"
//             >
//               {/* Left Section */}
//               <div>
//                 <p className="font-semibold">{user.name}</p>
//                 <p className="text-gray-500 text-sm">{user.email}</p>
//                 <p className="text-gray-500 text-sm">{user.phone}</p>
//               </div>

//               {/* Status */}
//               <div className="flex items-center gap-2 mt-2 sm:mt-0">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm ${
//                     user.status === "Active"
//                       ? "bg-green-100 text-green-600"
//                       : user.status === "Inactive"
//                       ? "bg-yellow-100 text-yellow-600"
//                       : "bg-red-100 text-red-600"
//                   }`}
//                 >
//                   {user.status}
//                 </span>
//                 <span className="text-gray-400 text-sm">{user.lastActive}</span>
//               </div>

//               {/* Bookings */}
//               <div className="text-center mt-2 sm:mt-0">
//                 <p className="font-semibold">{user.bookings}</p>
//                 <p className="text-gray-500 text-sm">Bookings</p>
//               </div>

//               {/* Total Spent */}
//               <div className="text-center mt-2 sm:mt-0 text-red-500 font-bold">
//                 ${user.totalSpent.toLocaleString()}
//                 <p className="text-gray-500 text-sm">Total Spent</p>
//               </div>

//               {/* Joined */}
//               <div className="text-gray-500 text-sm mt-2 sm:mt-0">
//                 {user.joined}
//               </div>

//               {/* Actions */}
//               <div className="flex gap-2 mt-2 sm:mt-0">
//                 <button className="p-2 bg-gray-100 rounded-lg">
//                   <AiOutlineEye />
//                 </button>
//                 <button className="p-2 bg-gray-100 rounded-lg">
//                   <AiOutlineEdit />
//                 </button>
//                 <button className="p-2 bg-gray-100 rounded-lg text-red-500">
//                   <AiOutlineStop />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center">No users found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Users;

"use client";

import { useEffect, useState } from "react";
import { FiFilter, FiSearch, FiX, FiMenu, FiChevronDown } from "react-icons/fi";
import {
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineStop,
  AiOutlineSortAscending,
} from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";
import type { Booking } from "../../types/booking";

interface User {
  email: string;
  username: string;
  joined: string;
  totalSpent: number;
}

interface Stats {
  totalUsers: number;
  newThisMonth: number;
  totalRevenue: number;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    newThisMonth: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Sort
  const [sortBy, setSortBy] = useState<"Name" | "Join Date" | "Total Spent">(
    "Name"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          "https://68bbe2b00f2491613edd85fe.mockapi.io/booking/booking"
        );
        const data: Booking[] = await res.json();

        // Get unique users with total spent
        const userMap: Record<string, User> = {};
        const now = new Date();

        data.forEach((b) => {
          if (!userMap[b.useremail]) {
            userMap[b.useremail] = {
              email: b.useremail,
              username: b.username,
              joined: b.bookingDate,
              totalSpent: 0,
            };
          }
          // Use the earliest booking date as join date
          if (new Date(b.bookingDate) < new Date(userMap[b.useremail].joined)) {
            userMap[b.useremail].joined = b.bookingDate;
          }
          // Add to total spent
          userMap[b.useremail].totalSpent += Number(b.price || 0);
        });

        const usersArray = Object.values(userMap);
        setUsers(usersArray);
        setFilteredUsers(usersArray);

        // Compute stats
        const totalUsers = usersArray.length;
        const newThisMonth = usersArray.filter(
          (u) =>
            new Date(u.joined).getMonth() === now.getMonth() &&
            new Date(u.joined).getFullYear() === now.getFullYear()
        ).length;
        const totalRevenue = usersArray.reduce(
          (sum, user) => sum + user.totalSpent,
          0
        );

        setStats({ totalUsers, newThisMonth, totalRevenue });
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Search + sort
  useEffect(() => {
    let results = [...users];
    const lowerSearch = searchTerm.toLowerCase();
    results = results.filter(
      (u) =>
        u.username.toLowerCase().includes(lowerSearch) ||
        u.email.toLowerCase().includes(lowerSearch)
    );

    results.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "Name":
          comparison = a.username.localeCompare(b.username);
          break;
        case "Join Date":
          comparison =
            new Date(a.joined).getTime() - new Date(b.joined).getTime();
          break;
        case "Total Spent":
          comparison = a.totalSpent - b.totalSpent;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredUsers(results);
  }, [searchTerm, users, sortBy, sortOrder]);

  const clearFilters = () => {
    setSortBy("Name");
    setSortOrder("asc");
    setSearchTerm("");
    setShowFilters(false);
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    if (isMobile) {
      setShowFilters(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            User Management
          </h1>
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white border border-gray-300"
            >
              <FiMenu className="h-5 w-5" />
            </button>
          )}
        </div>
        <p className="text-gray-600 text-sm md:text-base">
          View and manage system users
        </p>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="space-y-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`w-full flex items-center justify-between gap-2 px-4 py-2 rounded-lg border ${
                showFilters
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              <span>Sort Options</span>
              <FiChevronDown
                className={`transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>

            {showFilters && (
              <div className="p-3 bg-gray-50 rounded-lg space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="Name">Name</option>
                    <option value="Join Date">Join Date</option>
                    <option value="Total Spent">Total Spent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortOrder("asc")}
                      className={`flex-1 py-2 rounded-lg border ${
                        sortOrder === "asc"
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      Ascending
                    </button>
                    <button
                      onClick={() => setSortOrder("desc")}
                      className={`flex-1 py-2 rounded-lg border ${
                        sortOrder === "desc"
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      Descending
                    </button>
                  </div>
                </div>
                <button
                  onClick={clearFilters}
                  className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-xl md:text-2xl font-bold mt-2">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-sm font-medium">
              New This Month
            </h3>
            <div className="p-2 bg-purple-100 rounded-lg">
              <BsCalendar3 className="h-4 w-4 md:h-5 md:w-5 text-purple-500" />
            </div>
          </div>
          <p className="text-xl md:text-2xl font-bold mt-2">
            {stats.newThisMonth}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
            <div className="p-2 bg-green-100 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-xl md:text-2xl font-bold mt-2">
            ${stats.totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Search and Filters - Desktop */}
      {!isMobile && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  showFilters
                    ? "bg-blue-50 border-blue-500 text-blue-600"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                <FiFilter />
                <span>Sort</span>
              </button>

              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <div className="flex gap-2">
                  <select
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="Name">Name</option>
                    <option value="Join Date">Join Date</option>
                    <option value="Total Spent">Total Spent</option>
                  </select>
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <AiOutlineSortAscending
                      className={`h-5 w-5 ${
                        sortOrder === "desc" ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          {!isMobile ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("Name")}
                  >
                    <div className="flex items-center">
                      <span>User</span>
                      {sortBy === "Name" && (
                        <AiOutlineSortAscending
                          className={`ml-1 h-3 w-3 ${
                            sortOrder === "desc" ? "transform rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("Join Date")}
                  >
                    <div className="flex items-center">
                      <span>Joined</span>
                      {sortBy === "Join Date" && (
                        <AiOutlineSortAscending
                          className={`ml-1 h-3 w-3 ${
                            sortOrder === "desc" ? "transform rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("Total Spent")}
                  >
                    <div className="flex items-center">
                      <span>Total Spent</span>
                      {sortBy === "Total Spent" && (
                        <AiOutlineSortAscending
                          className={`ml-1 h-3 w-3 ${
                            sortOrder === "desc" ? "transform rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.email} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.username}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.joined).toLocaleDateString()}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ${user.totalSpent.toLocaleString()}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                            <AiOutlineEye className="h-5 w-5" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50">
                            <AiOutlineEdit className="h-5 w-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
                            <AiOutlineStop className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 md:px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No users found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            /* Mobile Cards */
            <div className="p-4 space-y-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.email}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.username}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {user.email}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button className="text-blue-600 p-1 rounded hover:bg-blue-50">
                          <AiOutlineEye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 p-1 rounded hover:bg-gray-50">
                          <AiOutlineEdit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 p-1 rounded hover:bg-red-50">
                          <AiOutlineStop className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">
                        <div>Joined:</div>
                        <div className="font-medium">
                          {new Date(user.joined).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-green-600">
                        <div>Total Spent:</div>
                        <div className="font-medium">
                          ${user.totalSpent.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm text-gray-500 py-8">
                  No users found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && !isMobile && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{filteredUsers.length}</span> of{" "}
            <span className="font-medium">{filteredUsers.length}</span> results
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
