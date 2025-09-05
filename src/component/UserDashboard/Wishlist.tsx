"use client";

import { FaMapPin, FaStar } from "react-icons/fa";



const wishlistData = [
  {
    id: 1,
    name: "Porsche 911",
    category: "Sports",
    rating: 4.9,
    location: "Downtown",
    price: 520,
    image: "/cars/porsche911.jpg",
  },
  {
    id: 2,
    name: "Range Rover Sport",
    category: "SUV",
    rating: 4.7,
    location: "Airport",
    price: 380,
    image: "/cars/rangerover.jpg",
  },
  {
    id: 3,
    name: "Audi A8",
    category: "Luxury",
    rating: 4.8,
    location: "Downtown",
    price: 420,
    image: "/cars/audia8.jpg",
  },
];

const Wishlist = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistData.map((car) => (
          <div
            key={car.id}
            className="bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden relative"
          >
            {/* Category Badge */}
            <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              {car.category}
            </span>

            {/* Wishlist Heart */}
            <button className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
              ❤️
            </button>

            {/* Car Image */}
            <div className="h-40 bg-gray-100">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <FaStar className="w-4 h-4 text-yellow-500" />
                <span>{car.rating}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <FaMapPin className="w-4 h-4 text-gray-500" />
                <span>{car.location}</span>
              </div>

              {/* Price & Button */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold">${car.price}/day</span>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
