"use client";

import React, { useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiXCircle,
} from "react-icons/fi";

const bookings = [
  {
    id: "BK001",
    car: "Mercedes S-Class",
    location: "Downtown",
    date: "2024-01-15 to 2024-01-18",
    price: 1350,
    status: "Completed",
    image: "/cars/mercedes.jpg",
  },
  {
    id: "BK002",
    car: "BMW 3 Series",
    location: "Airport",
    date: "2024-01-25 to 2024-01-27",
    price: 360,
    status: "Pending",
    image: "/cars/bmw.jpg",
  },
  {
    id: "BK003",
    car: "Tesla Model S",
    location: "Downtown",
    date: "2024-01-10 to 2024-01-12",
    price: 580,
    status: "Cancelled",
    image: "/cars/tesla.jpg",
  },
];

// Status badge styles
const statusStyles: Record<string, string> = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

// Icons
const statusIcons: Record<string, React.ReactNode> = {
  Completed: <FiCheckCircle className="w-4 h-4 mr-1" />,
  Pending: <FiClock className="w-4 h-4 mr-1" />,
  Cancelled: <FiXCircle className="w-4 h-4 mr-1" />,
};

const MyBookings = () => {
  const [filter, setFilter] = useState<string>("All");

  // Apply filter
  const filteredBookings =
    filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>

      {/* Filter Section */}
      <div className="mb-6">
        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {["All", "Completed", "Pending", "Cancelled"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3 flex-wrap">
          {["All", "Completed", "Pending", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 focus:outline-0 rounded-md text-sm font-medium transition ${
                filter === status
                  ? "bg-red text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white border border-gray-300 rounded-xl shadow-sm p-4 "
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              {/* Car Info */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-16 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={booking.image}
                    alt={booking.car}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{booking.car}</h3>
                  <div className="flex items-center text-sm text-gray-600 gap-1">
                    <FiMapPin className="w-4 h-4" />
                    {booking.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 gap-1 mt-1">
                    <FiCalendar className="w-4 h-4" />
                    {booking.date}
                  </div>
                </div>
              </div>

              {/* Status & Price */}
              <div className="my-4 sm:mt-0 flex flex-col items-end">
                <span
                  className={`flex items-center text-sm font-medium px-3 py-1 rounded-full ${
                    statusStyles[booking.status]
                  }`}
                >
                  {statusIcons[booking.status]} {booking.status}
                </span>
                <div className="text-right mt-2">
                  <p className="text-lg font-bold">${booking.price}</p>
                  <p className="text-sm text-gray-500">
                    Booking ID: {booking.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full sm:w-auto mt-4 border-t border-gray-300 pt-5 sm:mt-0 flex gap-2 flex-wrap">
              {booking.status === "Completed" && (
                <>
                  <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm">
                    Download Receipt
                  </button>
                  <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm">
                    Book Again
                  </button>
                </>
              )}
              {booking.status === "Pending" && (
                <>
                  <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm">
                    Modify Booking
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm">
                    Cancel
                  </button>
                </>
              )}
              {booking.status === "Cancelled" && (
                <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm">
                  Book Similar
                </button>
              )}
            </div>
          </div>
        ))}
        {filteredBookings.length === 0 && (
          <p className="text-gray-500 text-center py-6">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
