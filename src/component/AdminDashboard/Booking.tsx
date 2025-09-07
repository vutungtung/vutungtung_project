// "use client";

// import { useState } from "react";
// import SearchFilter from "./SearchFilter"; // adjust path if needed
// import { FaCheck, FaEye } from "react-icons/fa";
// import { FiX } from "react-icons/fi";

// const Booking = () => {
//   // Dummy bookings data
//   const allBookings = [
//     {
//       id: 1,
//       name: "John Smith",
//       email: "john@email.com",
//       car: "Mercedes S-Class",
//       category: "Car",
//       days: 3,
//       range: "2024-01-15 - 2024-01-18",
//       status: "Active",
//       amount: 1350,
//     },
//     {
//       id: 2,
//       name: "Emma Wilson",
//       email: "emma@email.com",
//       car: "BMW X7",
//       category: "Car",
//       days: 5,
//       range: "2024-01-20 - 2024-01-25",
//       status: "Pending",
//       amount: 1600,
//     },
//     {
//       id: 3,
//       name: "Michael Chen",
//       email: "michael@email.com",
//       car: "Audi RS6",
//       category: "Car",
//       days: 4,
//       range: "2024-01-10 - 2024-01-14",
//       status: "Completed",
//       amount: 1520,
//     },
//     {
//       id: 4,
//       name: "Alex Brown",
//       email: "alex@email.com",
//       car: "Yamaha R15",
//       category: "2-Wheeler",
//       days: 2,
//       range: "2024-02-01 - 2024-02-03",
//       status: "Active",
//       amount: 500,
//     },
//   ];

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");

//   const bookings = allBookings.filter((b) => {
//     const matchesSearch =
//       b.name.toLowerCase().includes(search.toLowerCase()) ||
//       b.email.toLowerCase().includes(search.toLowerCase()) ||
//       b.car.toLowerCase().includes(search.toLowerCase());
//     const matchesFilter = filter === "All" || b.category === filter;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="p-4 rounded-lg">
//         <div>
//           <h1 className="text-2xl font-bold">Booking Management</h1>
//           <p className="text-gray-500 text-sm md:text-base">
//             Track and manage all reservations
//           </p>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         {["Total Bookings", "Active", "Pending", "Revenue"].map(
//           (label, idx) => {
//             const value =
//               label === "Total Bookings"
//                 ? allBookings.length
//                 : label === "Active"
//                 ? allBookings.filter((b) => b.status === "Active").length
//                 : label === "Pending"
//                 ? allBookings.filter((b) => b.status === "Pending").length
//                 : `$${allBookings
//                     .reduce((acc, b) => acc + b.amount, 0)
//                     .toLocaleString()}`;
//             const textColor =
//               label === "Active"
//                 ? "text-green-600"
//                 : label === "Pending"
//                 ? "text-yellow-500"
//                 : label === "Revenue"
//                 ? "text-red-500"
//                 : "text-gray-900";

//             return (
//               <div
//                 key={idx}
//                 className="p-4 border border-gray-300 rounded-lg bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center"
//               >
//                 <p className="text-sm text-gray-500">{label}</p>
//                 <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
//               </div>
//             );
//           }
//         )}
//       </div>

//       {/* Search + Filter */}
//       <SearchFilter
//         search={search}
//         setSearch={setSearch}
//         filter={filter}
//         setFilter={setFilter}
//         placeholder="Search bookings by name, email, or car..."
//       />

//       {/* Recent Bookings */}
//       <div className="bg-white border border-gray-300 p-4 rounded-lg overflow-x-auto">
//         <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
//         {bookings.length === 0 ? (
//           <p className="text-gray-500">No bookings found.</p>
//         ) : (
//           <div className="space-y-3  md:min-w-full">
//             {bookings.map((b) => (
//               <div
//                 key={b.id}
//                 className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border border-gray-300 rounded-lg bg-white gap-2 sm:gap-0"
//               >
//                 {/* Left side: user */}
//                 <div className="flex-1">
//                   <p className="font-semibold">{b.name}</p>
//                   <p className="text-sm text-gray-500">{b.email}</p>
//                 </div>

//                 {/* Car */}
//                 <div className="flex-1">
//                   <p className="font-semibold">{b.car}</p>
//                   <p className="text-sm text-gray-500">{b.days} days</p>
//                 </div>

//                 {/* Date Range */}
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-500">{b.range}</p>
//                 </div>

//                 {/* Status */}
//                 <div className="flex-1 flex justify-start sm:justify-center">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       b.status === "Active"
//                         ? "bg-green-100 text-green-700"
//                         : b.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-blue-100 text-blue-700"
//                     }`}
//                   >
//                     {b.status}
//                   </span>
//                 </div>

//                 {/* Amount */}
//                 <div className="flex-1 flex justify-start sm:justify-center">
//                   <p className="font-semibold text-red-500">${b.amount}</p>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-2 justify-start sm:justify-end">
//                   {b.status === "Pending" ? (
//                     <>
//                       <button className="p-2 rounded-full hover:bg-green-100 text-green-600">
//                         <FaCheck className="w-4 h-4" />
//                       </button>
//                       <button className="p-2 rounded-full hover:bg-red-100 text-red-600">
//                         <FiX className="w-4 h-4" />
//                       </button>
//                     </>
//                   ) : (
//                     <button className="p-2 rounded-full hover:bg-gray-100">
//                       <FaEye className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Booking;
// "use client";

// import { useState, useEffect } from "react";
// import SearchFilter from "./SearchFilter";
// import { FaCheck, FaEye } from "react-icons/fa";
// import { FiX } from "react-icons/fi";

// import { fetchBookings } from "../../api/bookingApi";
// import type { Booking As BookingType } from "../../types/booking";

// const Booking = () => {
//   const [allBookings, setAllBookings] = useState<BookingType[]>([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch bookings from API file
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await fetchBookings();
//         setAllBookings(data);
//       } catch (err) {
//         console.error("Error fetching bookings:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   // Format date safely as YYYY-MM-DD
//   // Format date safely as YYYY-MM-DD
//   const formatDate = (date: string | undefined): string => {
//     if (!date) return "N/A";
//     try {
//       return new Date(date).toISOString().split("T")[0];
//     } catch {
//       return "N/A";
//     }
//   };

//   // Calculate days between bookingDate and returnDate
//   const calcDays = (
//     start: string | undefined,
//     end: string | undefined
//   ): number => {
//     if (!start || !end) return 0;
//     try {
//       const s = new Date(start);
//       const e = new Date(end);
//       return Math.max(
//         1,
//         Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
//       );
//     } catch {
//       return 0;
//     }
//   };

//   // Search + filter
//   const bookings = allBookings.filter((b) => {
//     const matchesSearch =
//       (b.username?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (b.useremail?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (b.vehicleName?.toLowerCase() || "").includes(search.toLowerCase());

//     const matchesFilter = filter === "All" || b.categoryName === filter;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="p-4 rounded-lg">
//         <h1 className="text-2xl font-bold">Booking Management</h1>
//         <p className="text-gray-500 text-sm md:text-base">
//           Track and manage all reservations
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         {["Total Bookings", "Active", "Pending", "Revenue"].map(
//           (label, idx) => {
//             const value =
//               label === "Total Bookings"
//                 ? allBookings.length
//                 : label === "Active"
//                 ? allBookings.filter((b) => b.deliverystatus === "active")
//                     .length
//                 : label === "Pending"
//                 ? allBookings.filter((b) => b.deliverystatus === "pending")
//                     .length
//                 : `$${allBookings
//                     .reduce((acc, b) => acc + Number(b.price || 0), 0)
//                     .toLocaleString()}`;

//             const textColor =
//               label === "Active"
//                 ? "text-green-600"
//                 : label === "Pending"
//                 ? "text-yellow-500"
//                 : label === "Revenue"
//                 ? "text-red-500"
//                 : "text-gray-900";

//             return (
//               <div
//                 key={idx}
//                 className="p-4 border border-gray-300 rounded-lg bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center"
//               >
//                 <p className="text-sm text-gray-500">{label}</p>
//                 <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
//               </div>
//             );
//           }
//         )}
//       </div>

//       {/* Search + Filter */}
//       <SearchFilter
//         search={search}
//         setSearch={setSearch}
//         filter={filter}
//         setFilter={setFilter}
//         placeholder="Search by username, email, or vehicle..."
//       />

//       {/* Recent Bookings */}
//       <div className="bg-white border border-gray-300 p-4 rounded-lg overflow-x-auto">
//         <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>

//         {loading ? (
//           <p className="text-gray-500">Loading bookings...</p>
//         ) : bookings.length === 0 ? (
//           <p className="text-gray-500">No bookings found.</p>
//         ) : (
//           <div className="space-y-3 md:min-w-full">
//             {bookings.map((b) => (
//               <div
//                 key={b.bookingId}
//                 className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border border-gray-300 rounded-lg bg-white gap-2 sm:gap-0"
//               >
//                 {/* User */}
//                 <div className="flex-1">
//                   <p className="font-semibold">{b.username || "N/A"}</p>
//                   <p className="text-sm text-gray-500">{b.useremail}</p>
//                 </div>

//                 {/* Vehicle */}
//                 <div className="flex-1">
//                   <p className="font-semibold">{b.vehicleName || "N/A"}</p>
//                   <p className="text-sm text-gray-500">
//                     {calcDays(b.bookingDate, b.returnDate)} days
//                   </p>
//                 </div>

//                 {/* Date Range */}
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-500">
//                     {formatDate(b.bookingDate)} - {formatDate(b.returnDate)}
//                   </p>
//                 </div>

//                 {/* Delivery Status */}
//                 <div className="flex-1 flex justify-start sm:justify-center">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       b.deliverystatus === "active"
//                         ? "bg-green-100 text-green-700"
//                         : b.deliverystatus === "pending"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-blue-100 text-blue-700"
//                     }`}
//                   >
//                     {b.deliverystatus}
//                   </span>
//                 </div>

//                 {/* Price */}
//                 <div className="flex-1 flex justify-start sm:justify-center">
//                   <p className="font-semibold text-red-500">${b.price}</p>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-2 justify-start sm:justify-end">
//                   {b.deliverystatus === "pending" ? (
//                     <>
//                       <button className="p-2 rounded-full hover:bg-green-100 text-green-600">
//                         <FaCheck className="w-4 h-4" />
//                       </button>
//                       <button className="p-2 rounded-full hover:bg-red-100 text-red-600">
//                         <FiX className="w-4 h-4" />
//                       </button>
//                     </>
//                   ) : (
//                     <button className="p-2 rounded-full hover:bg-gray-100">
//                       <FaEye className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Booking;


"use client";

import { useState, useEffect } from "react";
import SearchFilter from "./SearchFilter";
import { FaCheck, FaEye } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import { fetchBookings } from "../../api/bookingApi";
import type { Booking as BookingType } from "../../types/booking"; // alias type ✅

const Booking = () => {
  const [allBookings, setAllBookings] = useState<BookingType[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch bookings from API
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchBookings();
        setAllBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Format date safely
  const formatDate = (date: string | undefined): string => {
    if (!date) return "N/A";
    try {
      return new Date(date).toISOString().split("T")[0];
    } catch {
      return "N/A";
    }
  };

  // Calculate days
  const calcDays = (start: string | undefined, end: string | undefined): number => {
    if (!start || !end) return 0;
    try {
      const s = new Date(start);
      const e = new Date(end);
      return Math.max(
        1,
        Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
      );
    } catch {
      return 0;
    }
  };

  // Search + filter
  const bookings = allBookings.filter((b) => {
    const matchesSearch =
      (b.username?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (b.useremail?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (b.vehicleName?.toLowerCase() || "").includes(search.toLowerCase());

    const matchesFilter = filter === "All" || b.categoryName === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-lg">
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <p className="text-gray-500 text-sm md:text-base">
          Track and manage all reservations
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {["Total Bookings", "Active", "Pending", "Revenue"].map((label, idx) => {
          const value =
            label === "Total Bookings"
              ? allBookings.length
              : label === "Active"
              ? allBookings.filter((b) => b.deliverystatus === "active").length
              : label === "Pending"
              ? allBookings.filter((b) => b.deliverystatus === "pending").length
              : `$${allBookings
                  .reduce((acc, b) => acc + Number(b.price || 0), 0)
                  .toLocaleString()}`;

          const textColor =
            label === "Active"
              ? "text-green-600"
              : label === "Pending"
              ? "text-yellow-500"
              : label === "Revenue"
              ? "text-red-500"
              : "text-gray-900";

          return (
            <div
              key={idx}
              className="p-4 border border-gray-300 rounded-lg bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <p className="text-sm text-gray-500">{label}</p>
              <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
            </div>
          );
        })}
      </div>

      {/* Search + Filter */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        placeholder="Search by username, email, or vehicle..."
      />

      {/* Recent Bookings */}
      <div className="bg-white border border-gray-300 p-4 rounded-lg overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>

        {loading ? (
          <p className="text-gray-500">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-3 md:min-w-full">
            {bookings.map((b) => (
              <div
                key={b.bookingId}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border border-gray-300 rounded-lg bg-white gap-2 sm:gap-0"
              >
                {/* User */}
                <div className="flex-1">
                  <p className="font-semibold">{b.username || "N/A"}</p>
                  <p className="text-sm text-gray-500">{b.useremail}</p>
                </div>

                {/* Vehicle */}
                <div className="flex-1">
                  <p className="font-semibold">{b.vehicleName || "N/A"}</p>
                  <p className="text-sm text-gray-500">
                    {calcDays(b.bookingDate, b.returnDate)} days
                  </p>
                </div>

                {/* Date Range */}
                <div className="flex-1">
                  <p className="text-sm text-gray-500">
                    {formatDate(b.bookingDate)} - {formatDate(b.returnDate)}
                  </p>
                </div>

                {/* Delivery Status */}
                <div className="flex-1 flex justify-start sm:justify-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      b.deliverystatus === "active"
                        ? "bg-green-100 text-green-700"
                        : b.deliverystatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {b.deliverystatus}
                  </span>
                </div>

                {/* Price */}
                <div className="flex-1 flex justify-start sm:justify-center">
                  <p className="font-semibold text-red-500">${b.price}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-start sm:justify-end">
                  {b.deliverystatus === "pending" ? (
                    <>
                      <button className="p-2 rounded-full hover:bg-green-100 text-green-600">
                        <FaCheck className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-red-100 text-red-600">
                        <FiX className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <FaEye className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
