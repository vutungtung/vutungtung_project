import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuFuel, LuUsers } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface Vehicle {
  v_id: number;
  name: string;
  image: string;
  image1?: string;
  image2?: string;
  seatingCapacity: number;
  transmission: string;
  fuelType: string;
  description: string;
  dailyRate: string | number;
  status: string;
  categoryId: number;
}

const AvailableVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchAvailableVehicles();
    loadWishlist();
  }, []);

  const fetchAvailableVehicles = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/vehicles/");
      if (!response.ok) throw new Error("Failed to fetch vehicles");
      
      const data: Vehicle[] = await response.json();
      // Filter only available vehicles
      const availableVehicles = data.filter(v => v.status === "AVAILABLE");
      setVehicles(availableVehicles);
    } catch (err: any) {
      setError(err.message || "Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  const loadWishlist = () => {
    const userId = auth?.user?.id || "guest";
    const wishlistKey = `wishlist_${userId}`;
    const storedWishlist = JSON.parse(localStorage.getItem(wishlistKey) || "[]");
    setWishlist(storedWishlist.map((item: any) => item.id || item.v_id));
  };

  const toggleWishlist = (vehicle: Vehicle) => {
    const userId = auth?.user?.id || "guest";
    const wishlistKey = `wishlist_${userId}`;
    let currentWishlist = JSON.parse(localStorage.getItem(wishlistKey) || "[]");

    const isInWishlist = wishlist.includes(vehicle.v_id);
    
    if (isInWishlist) {
      // Remove from wishlist
      currentWishlist = currentWishlist.filter((item: any) => 
        item.id !== vehicle.v_id && item.v_id !== vehicle.v_id
      );
      setWishlist(prev => prev.filter(id => id !== vehicle.v_id));
    } else {
      // Add to wishlist
      currentWishlist.push({
        id: vehicle.v_id,
        title: vehicle.name,
        image: [getImageUrl(vehicle.image)],
        pricePerDay: Number(vehicle.dailyRate),
        description: vehicle.description,
      });
      setWishlist(prev => [...prev, vehicle.v_id]);
    }

    localStorage.setItem(wishlistKey, JSON.stringify(currentWishlist));
  };

  const getImageUrl = (img: string) => {
    if (!img) return "/fallback-image.jpg";
    if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("blob:")) {
      return img;
    }
    return `http://localhost:4000/uploads/vehicles/${img}`;
  };

  const getVehicleImages = (vehicle: Vehicle) => {
    const images = [vehicle.image, vehicle.image1, vehicle.image2]
      .filter(img => img && img !== "")
      .map(getImageUrl);
    return images.length > 0 ? images : ["/fallback-image.jpg"];
  };

  const nextImage = (vehicleId: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [vehicleId]: ((prev[vehicleId] || 0) + 1) % 3
    }));
  };

  const prevImage = (vehicleId: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [vehicleId]: ((prev[vehicleId] || 0) - 1 + 3) % 3
    }));
  };

  const handleBookNow = (vehicle: Vehicle) => {
    navigate(`/vehicle-details/${vehicle.v_id}`, { state: { vehicle } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading available vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button 
            onClick={fetchAvailableVehicles}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Vehicles
          </h1>
          <p className="text-lg text-gray-600">
            Choose from our collection of premium vehicles
          </p>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No vehicles available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => {
              const images = getVehicleImages(vehicle);
              const currentIndex = currentImageIndex[vehicle.v_id] || 0;
              const isInWishlist = wishlist.includes(vehicle.v_id);

              return (
                <div
                  key={vehicle.v_id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={images[currentIndex]}
                      alt={vehicle.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/fallback-image.jpg";
                      }}
                    />
                    
                    {/* Image Navigation */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(vehicle.v_id)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                        >
                          <IoChevronBack size={16} />
                        </button>
                        <button
                          onClick={() => nextImage(vehicle.v_id)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                        >
                          <IoChevronForward size={16} />
                        </button>
                      </>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(vehicle)}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-colors"
                    >
                      {isInWishlist ? (
                        <FaHeart className="text-red-500" size={20} />
                      ) : (
                        <FaRegHeart size={20} />
                      )}
                    </button>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Available
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {vehicle.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {vehicle.description}
                    </p>

                    {/* Vehicle Specs */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <LuUsers size={16} />
                        <span>{vehicle.seatingCapacity} Seats</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IoSettingsOutline size={16} />
                        <span>{vehicle.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <LuFuel size={16} />
                        <span>{vehicle.fuelType}</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-red-600">
                          Rs. {Number(vehicle.dailyRate)}
                        </p>
                        <p className="text-sm text-gray-500">per day</p>
                      </div>
                      <button
                        onClick={() => handleBookNow(vehicle)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableVehicles;
