import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapPin, FaStar } from "react-icons/fa";

interface Vehicle {
  id: string | number;
  title: string;
  image: string[];
  pricePerDay: number;
  description: string;
  features?: string[];
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Vehicle[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (id: string | number) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const handleBookNow = (id: string | number) => {
    navigate(`/vehicles/${id}`); // ✅ redirect to VehicleDetails
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No vehicles in your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((car) => (
            <div
              key={car.id}
              className="bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden relative"
            >
              {/* Category Badge */}
              <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                {car.features?.[0] || "Vehicle"}
              </span>

              {/* Wishlist Heart (remove) */}
              <button
                onClick={() => removeFromWishlist(car.id)}
                className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              >
                ❌
              </button>

              {/* Car Image */}
              <div className="h-40 bg-gray-100">
                <img
                  src={car.image[0]}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{car.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <FaStar className="w-4 h-4 text-yellow-500" />
                  <span>4.7</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <FaMapPin className="w-4 h-4 text-gray-500" />
                  <span>Location</span>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold">
                    ${car.pricePerDay}/day
                  </span>
                  <button
                    onClick={() => handleBookNow(car.id)}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
