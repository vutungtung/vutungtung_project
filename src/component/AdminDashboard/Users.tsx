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
//         setLoading(true);

//         // ✅ Fetch user data from your backend
//         const response = await fetch("http://localhost:4000/user");

//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }

//         const data = await response.json();

//         // ✅ Check and adapt based on actual API structure
//         // If your API returns { users: [...] }
//         const usersData = Array.isArray(data) ? data : data.users || [];

//         setUsers(usersData);
//         setFilteredUsers(usersData);

//         // ✅ Optional: Compute some stats dynamically
//         const activeUsers = usersData.filter(
//           (u) => u.status === "Active"
//         ).length;
//         const avgSpent =
//           usersData.reduce((sum, u) => sum + (u.totalSpent || 0), 0) /
//           usersData.length;

//         setStats({
//           totalUsers: usersData.length,
//           activeUsers,
//           newThisMonth: usersData.filter((u) => {
//             const joined = new Date(u.joined);
//             const now = new Date();
//             return (
//               joined.getMonth() === now.getMonth() &&
//               joined.getFullYear() === now.getFullYear()
//             );
//           }).length,
//           avgSpent: Number(avgSpent.toFixed(2)) || 0,
//         });

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

// import { useEffect, useState } from "react";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
// }

// const Users = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token =
//           localStorage.getItem("token") || sessionStorage.getItem("token");

//         const res = await fetch("http://localhost:4000/user", {
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           credentials: "include",
//         });

//         if (!res.ok) throw new Error("Failed to fetch users");

//         const data = await res.json();
//         const usersData = Array.isArray(data)
//           ? data
//           : data.users || data.data || [];

//         console.log("Fetched users:", usersData);
//         setUsers(usersData);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) {
//     return <p className="text-center mt-10">Loading users...</p>;
//   }

//   return (
//     <div className="p-4">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">User Management</h1>
//         <p className="text-gray-500">Total Users: {users.length}</p>
//       </div>

//       {/* User List */}
//       <div className="bg-white shadow rounded-xl p-4">
//         {users.length > 0 ? (
//           users.map((user) => (
//             <div
//               key={user.id}
//               className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-4 last:border-none"
//             >
//               <div>
//                 <p className="font-semibold">{user.name}</p>
//                 <p className="text-gray-500 text-sm">{user.email}</p>
//                 <p className="text-gray-500 text-sm">{user.phone}</p>
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


import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        const res = await fetch("http://localhost:4000/user", {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        const usersData = Array.isArray(data)
          ? data
          : data.users || data.data || [];

        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-600 font-medium">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b-2 border-red-500 pb-3">
        <div className="flex items-center gap-2">
          <FiUsers className="text-red-600 text-2xl" />
          <h1 className="text-2xl font-semibold text-red-600">User Management</h1>
        </div>
        <span className="text-sm bg-red-600 text-white px-3 py-1 rounded-full shadow">
          Total: {users.length}
        </span>
      </div>

      {/* User List */}
      <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
        {users.length > 0 ? (
          <div className="divide-y divide-red-100">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 hover:bg-red-50 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{user.username}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <p className="text-gray-400 text-sm">{user.phone}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-6">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
