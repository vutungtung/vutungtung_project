import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  FaCheckCircle,
  FaHeart,
  FaRegClock,
  FaRegHeart,
  FaShieldAlt,
} from "react-icons/fa";
import { LuCloudUpload } from "react-icons/lu";
import BackButton from "../component/navigate";
import LocationForm from "../component/locationTime";
import { fetchVehicleById } from "../api/vehicleApi";

interface Vehicle {
  id: string | number;
  title: string;
  image: string[];
  pricePerDay: number;
  description: string;
  features?: string[];
}

const SERVICE_FEE = 20;
const INSURANCE_PER_DAY = 15;

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState(
    searchParams.get("licenseNumber") || ""
  );
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [locationData, setLocationData] = useState({
    pickupLocation: searchParams.get("pickupLocation") || "",
    returnLocation: searchParams.get("returnLocation") || "",
    pickupDate: searchParams.get("pickupDate") || "",
    returnDate: searchParams.get("returnDate") || "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLicenseFile(e.target.files[0]);
    } else {
      setLicenseFile(null);
    }
  };

  const handleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (isWishlisted) {
      wishlist = wishlist.filter((item: Vehicle) => item.id !== vehicle!.id);
      setIsWishlisted(false);
    } else {
      wishlist.push(vehicle);
      setIsWishlisted(true);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const handleBooking = () => {
    if (
      !licenseNumber ||
      !locationData.pickupLocation ||
      !locationData.returnLocation ||
      !locationData.pickupDate ||
      !locationData.returnDate
    ) {
      alert("Please fill all required fields before booking.");
      return;
    }

    const pickupDate = new Date(locationData.pickupDate);
    const returnDate = new Date(locationData.returnDate);
    const days = Math.max(
      1,
      Math.ceil(
        (returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );

    const totalPrice =
      vehicle!.pricePerDay * days + SERVICE_FEE + INSURANCE_PER_DAY * days;

    // Update URL with query parameters
    const params = new URLSearchParams({
      licenseNumber,
      pickupLocation: locationData.pickupLocation,
      returnLocation: locationData.returnLocation,
      pickupDate: locationData.pickupDate,
      returnDate: locationData.returnDate,
      totalPrice: totalPrice.toString(),
    });

    // Navigate with path parameter for vehicle ID and query parameters for booking data
    navigate(`/confirm-booking/${id}?${params.toString()}`);
  };

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        const data = await fetchVehicleById(id!);
        setVehicle(data);
      } catch {
        setError("Vehicle not found.");
      } finally {
        setLoading(false);
      }
    };
    loadVehicle();
  }, [id]);

  if (loading)
    return (
      <p className="text-center py-20 text-gray-500 text-lg">Loading...</p>
    );
  if (error || !vehicle)
    return <p className="text-center py-20 text-red-500 text-lg">{error}</p>;

  const images = Array.isArray(vehicle.image) ? vehicle.image : [vehicle.image];
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <BackButton />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Vehicle Info */}
        <div className="flex-1 space-y-6">
          <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <img
              src={images[currentImage]}
              alt={vehicle.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition"
                >
                  {"<"}
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition"
                >
                  {">"}
                </button>
              </>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {vehicle.title}
              </h1>
              <p className="text-gray-500 mt-1">4.7 (127 Reviews)</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-600">
                ${vehicle.pricePerDay}
              </p>
              <span className="text-gray-500 text-sm">per day</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold border-t pt-5">
              About Vehicle
            </h2>
            <p className="text-gray-600 text-justify">{vehicle.description}</p>
          </div>

          {vehicle.features?.length && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">What's Included</h2>
              <div className="grid grid-cols-2 gap-3">
                {vehicle.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-green-600 font-medium"
                  >
                    <FaCheckCircle />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Card */}
        <div className="lg:w-[400px] w-full bg-white p-6 rounded-xl shadow-lg sticky top-20 space-y-5">
          <h2 className="text-2xl font-bold text-gray-900">
            Book This Vehicle
          </h2>
          <LocationForm
            onFormChange={setLocationData}
            initialData={locationData}
          />

          <div className="border border-yellow-300 p-4 rounded-lg bg-yellow-50 space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-red">
                License Verification
              </h3>
              <p className="text-xs text-red">Required*</p>
            </div>
            <input
              type="text"
              placeholder="License Number"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="w-full border border-yellow-300 p-2 rounded focus:outline-none focus:none"
            />
            <div className="border-dashed border-2 border-yellow-300 p-4 text-center rounded">
              <label
                htmlFor="licenseUpload"
                className="flex flex-col items-center justify-center w-full cursor-pointertransition"
              >
                <LuCloudUpload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-blue-600 font-medium">
                  {licenseFile ? licenseFile.name : "Upload a file"}
                </p>
                {!licenseFile && (
                  <p className="text-xs text-gray-500">
                    or drag and drop PNG, JPG up to 5MB
                  </p>
                )}
              </label>
              <input
                id="licenseUpload"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {locationData.pickupDate && locationData.returnDate && (
            <div className="border-t pt-4 space-y-2 text-gray-700">
              <h3 className="text-lg font-semibold">Price Breakdown</h3>
              <div className="flex justify-between">
                <span>Daily Rate</span>
                <span>${vehicle.pricePerDay}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>
                  {Math.ceil(
                    (new Date(locationData.returnDate).getTime() -
                      new Date(locationData.pickupDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days × ${vehicle.pricePerDay}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>${SERVICE_FEE}</span>
              </div>
              <div className="flex justify-between">
                <span>Insurance (self-drive)</span>
                <span>
                  $
                  {INSURANCE_PER_DAY *
                    Math.ceil(
                      (new Date(locationData.returnDate).getTime() -
                        new Date(locationData.pickupDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>
                  $
                  {(() => {
                    const days = Math.ceil(
                      (new Date(locationData.returnDate).getTime() -
                        new Date(locationData.pickupDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    );
                    return (
                      days * vehicle.pricePerDay +
                      SERVICE_FEE +
                      INSURANCE_PER_DAY * days
                    );
                  })()}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleBooking}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg py-3 transition"
          >
            Book Now
          </button>

          <button
            onClick={handleWishlist}
            className={`w-full border rounded-lg py-3 flex items-center justify-center gap-2 font-semibold transition ${
              isWishlisted
                ? "bg-red-600 text-white hover:bg-red-700"
                : "border-red-600 text-red-600 hover:bg-red-50"
            }`}
          >
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
          </button>

          <div className="text-center text-gray-500 text-sm space-y-1">
            <p className="flex items-center justify-center gap-2">
              <FaRegClock /> Instant confirmation
            </p>
            <p className="flex items-center justify-center gap-2">
              <FaShieldAlt /> Free cancellation up to 24h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
