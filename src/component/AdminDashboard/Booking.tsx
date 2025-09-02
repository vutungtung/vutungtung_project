"use client";

import { useState } from "react";

import SearchFilter from "./SearchFilter"; // adjust path if needed
import { FaCalendar, FaCheck, FaEye } from "react-icons/fa";
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

  // Filtering logic
  const bookings = allBookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.car.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || b.category === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Booking Management</h1>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
            <FaCalendar className="w-4 h-4" />
            Export Report
          </button>
        </div>
        <p className="text-gray-500">Track and manage all reservations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold">{allBookings.length}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {allBookings.filter((b) => b.status === "Active").length}
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-500">
            {allBookings.filter((b) => b.status === "Pending").length}
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold text-red-500">
            $
            {allBookings.reduce((acc, b) => acc + b.amount, 0).toLocaleString()}
          </p>
        </div>
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
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                {/* Left side: user */}
                <div>
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-sm text-gray-500">{b.email}</p>
                </div>

                {/* Car */}
                <div>
                  <p className="font-semibold">{b.car}</p>
                  <p className="text-sm text-gray-500">{b.days} days</p>
                </div>

                {/* Date Range */}
                <p className="text-sm text-gray-500">{b.range}</p>

                {/* Status */}
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

                {/* Amount */}
                <p className="font-semibold text-red-500">${b.amount}</p>

                {/* Actions */}
                {b.status === "Pending" ? (
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-green-100 text-green-600">
                      <FaCheck className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-red-100 text-red-600">
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <FaEye className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
