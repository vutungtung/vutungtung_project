"use client";

import { useState } from "react";
import SearchFilter from "./SearchFilter"; // adjust path if needed
import { FaCheck, FaEye } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const Booking = () => {
  // Dummy bookings data
  const allBookings = [
    {
      id: 1,
      name: "John Smith",
      email: "john@email.com",
      car: "Mercedes S-Class",
      category: "Car",
      days: 3,
      range: "2024-01-15 - 2024-01-18",
      status: "Active",
      amount: 1350,
    },
    {
      id: 2,
      name: "Emma Wilson",
      email: "emma@email.com",
      car: "BMW X7",
      category: "Car",
      days: 5,
      range: "2024-01-20 - 2024-01-25",
      status: "Pending",
      amount: 1600,
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael@email.com",
      car: "Audi RS6",
      category: "Car",
      days: 4,
      range: "2024-01-10 - 2024-01-14",
      status: "Completed",
      amount: 1520,
    },
    {
      id: 4,
      name: "Alex Brown",
      email: "alex@email.com",
      car: "Yamaha R15",
      category: "2-Wheeler",
      days: 2,
      range: "2024-02-01 - 2024-02-03",
      status: "Active",
      amount: 500,
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const bookings = allBookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.car.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || b.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold">Booking Management</h1>
          <p className="text-gray-500 text-sm md:text-base">
            Track and manage all reservations
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {["Total Bookings", "Active", "Pending", "Revenue"].map(
          (label, idx) => {
            const value =
              label === "Total Bookings"
                ? allBookings.length
                : label === "Active"
                ? allBookings.filter((b) => b.status === "Active").length
                : label === "Pending"
                ? allBookings.filter((b) => b.status === "Pending").length
                : `$${allBookings
                    .reduce((acc, b) => acc + b.amount, 0)
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
          }
        )}
      </div>

      {/* Search + Filter */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        placeholder="Search bookings by name, email, or car..."
      />

      {/* Recent Bookings */}
      <div className="bg-white border border-gray-300 p-4 rounded-lg overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-3  md:min-w-full">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border border-gray-300 rounded-lg bg-white gap-2 sm:gap-0"
              >
                {/* Left side: user */}
                <div className="flex-1">
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-sm text-gray-500">{b.email}</p>
                </div>

                {/* Car */}
                <div className="flex-1">
                  <p className="font-semibold">{b.car}</p>
                  <p className="text-sm text-gray-500">{b.days} days</p>
                </div>

                {/* Date Range */}
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{b.range}</p>
                </div>

                {/* Status */}
                <div className="flex-1 flex justify-start sm:justify-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      b.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : b.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                {/* Amount */}
                <div className="flex-1 flex justify-start sm:justify-center">
                  <p className="font-semibold text-red-500">${b.amount}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-start sm:justify-end">
                  {b.status === "Pending" ? (
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
