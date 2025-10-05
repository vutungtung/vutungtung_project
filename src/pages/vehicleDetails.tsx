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

interface VehicleType {
  v_id: number;
  name: string;
  brand?: string;
  model?: string;
  description?: string;
  dailyRate: string | number;
  image?: string;
  image1?: string;
  image2?: string;
  features?: string[];
  transmission?: string;
  fuelType?: string;
  seatingCapacity?: number;
}

const SERVICE_FEE = 20;
const INSURANCE_PER_DAY = 15;

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
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

  // ✅ Function to convert image filename to full URL
  const getImageUrl = (img: string | undefined) => {
    if (!img) return "/fallback-image.jpg";

    // If it's already a full URL, return as is
    if (
      img.startsWith("http://") ||
      img.startsWith("https://") ||
      img.startsWith("blob:")
    ) {
      return img;
    }

    // If it's a filename, convert to full backend URL
    return `http://localhost:4000/uploads/vehicles/${img}`;
  };

  // ✅ Get all images with proper URLs
  const getVehicleImages = (vehicle: VehicleType | null) => {
    if (!vehicle) return ["/fallback-image.jpg"];

    const images = [vehicle.image, vehicle.image1, vehicle.image2].filter(
      (img) => img && img !== ""
    ); // Remove empty images

    if (images.length === 0) return ["/fallback-image.jpg"];

    return images.map(getImageUrl);
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/vehicles/id/${id}`);
        if (!res.ok) throw new Error("Vehicle not found");
        const data = await res.json();
        setVehicle(data);

        // Check wishlist from localStorage
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsWishlisted(
          wishlist.some(
            (it: any) => it.id === data.v_id || it.v_id === data.v_id
          )
        );
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVehicle();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLicenseFile(e.target.files[0]);
    } else {
      setLicenseFile(null);
    }
  };

  const handleWishlist = () => {
    if (!vehicle) return;

    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    // ✅ Check if vehicle already exists
    const exists = wishlist.some(
      (item: any) => item.id === vehicle.v_id || item.v_id === vehicle.v_id
    );

    if (exists) {
      wishlist = wishlist.filter(
        (item: any) => item.id !== vehicle.v_id && item.v_id !== vehicle.v_id
      );
      setIsWishlisted(false);
    } else {
      wishlist.push({
        id: vehicle.v_id,
        title: vehicle.name,
        image: [getImageUrl(vehicle.image)],
        pricePerDay: Number(vehicle.dailyRate),
        description: vehicle.description || "",
      });
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  // const handleBooking = () => {
  //   if (
  //     !licenseNumber ||
  //     !locationData.pickupLocation ||
  //     !locationData.returnLocation ||
  //     !locationData.pickupDate ||
  //     !locationData.returnDate
  //   ) {
  //     alert("Please fill all required fields before booking.");
  //     return;
  //   }

  //   const pickupDate = new Date(locationData.pickupDate);
  //   const returnDate = new Date(locationData.returnDate);
  //   const days = Math.max(
  //     1,
  //     Math.ceil(
  //       (returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)
  //     )
  //   );

  //   const pricePerDay = parseInt(vehicle!.dailyRate.toString(), 10);
  //   const totalPrice =
  //     pricePerDay * days + SERVICE_FEE + INSURANCE_PER_DAY * days;

  //   const params = new URLSearchParams({
  //     licenseNumber,
  //     pickupLocation: locationData.pickupLocation,
  //     returnLocation: locationData.returnLocation,
  //     pickupDate: locationData.pickupDate,
  //     returnDate: locationData.returnDate,
  //     totalPrice: totalPrice.toString(),
  //   });

  //   navigate(`/confirm-booking/${id}?${params.toString()}`);
  // };

  const handleBooking = () => {
    if (
      !licenseNumber ||
      !licenseFile || // ✅ Added: check if license image is uploaded
      !locationData.pickupLocation ||
      !locationData.returnLocation ||
      !locationData.pickupDate ||
      !locationData.returnDate
    ) {
      alert(
        "Please fill all required fields and upload your license image before booking."
      );
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

    const pricePerDay = parseInt(vehicle!.dailyRate.toString(), 10);
    const totalPrice =
      pricePerDay * days + SERVICE_FEE + INSURANCE_PER_DAY * days;

    // Convert license image to base64 to send via URLSearchParams
    const reader = new FileReader();
    reader.onloadend = () => {
      const licenseImageBase64 = reader.result as string;

      const params = new URLSearchParams({
        licenseNumber,
        licenseFile: licenseImageBase64, // ✅ Send image data
        pickupLocation: locationData.pickupLocation,
        returnLocation: locationData.returnLocation,
        pickupDate: locationData.pickupDate,
        returnDate: locationData.returnDate,
        totalPrice: totalPrice.toString(),
      });

      navigate(`/confirm-booking/${id}?${params.toString()}`);
    };

    reader.readAsDataURL(licenseFile); // Read file as base64
  };

  if (loading)
    return (
      <p className="text-center py-20 text-gray-500 text-lg">Loading...</p>
    );
  if (error || !vehicle)
    return <p className="text-center py-20 text-red-500 text-lg">{error}</p>;

  // ✅ Use the helper function to get proper image URLs
  const images = getVehicleImages(vehicle);
  const pricePerDay = parseInt(vehicle.dailyRate.toString(), 10);

  const nextImage = () =>
    setCurrentImage((prev) => (images.length ? (prev + 1) % images.length : 0));
  const prevImage = () =>
    setCurrentImage((prev) =>
      images.length ? (prev - 1 + images.length) % images.length : 0
    );

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <BackButton />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Vehicle Info */}
        <div className="flex-1 space-y-6">
          <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <img
              src={images[currentImage]}
              alt={vehicle.name}
              className="w-full h-full object-cover transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = "/fallback-image.jpg";
              }}
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
                {vehicle.name}
              </h1>
              <p className="text-gray-500 mt-1">
                {vehicle.brand
                  ? `${vehicle.brand} • ${vehicle.model || ""}`
                  : "Vehicle"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-600">
                Rs. {pricePerDay}
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

          {vehicle.features && vehicle.features.length > 0 && (
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

          {/* Optional extra info row */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            {vehicle.seatingCapacity && (
              <div className="inline-flex items-center gap-2">
                <span className="font-semibold">{vehicle.seatingCapacity}</span>{" "}
                Seats
              </div>
            )}
            {vehicle.transmission && (
              <div className="inline-flex items-center gap-2">
                <span className="font-semibold">{vehicle.transmission}</span>
              </div>
            )}
            {vehicle.fuelType && (
              <div className="inline-flex items-center gap-2">
                <span className="font-semibold">{vehicle.fuelType}</span>
              </div>
            )}
          </div>
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

          <div className="border border-gray-200 bg-[#111] text-white p-6 rounded-2xl shadow-md space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-white">
                License Verification
              </h3>
              <p className="text-xs text-red-400">Required*</p>
            </div>

            <input
              type="text"
              placeholder="Enter License Number"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
              className="w-full border border-gray-600 bg-transparent p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-400"
            />

            <div className="border-2 border-dashed border-gray-600 hover:border-red-500 transition-all p-6 rounded-xl text-center cursor-pointer bg-[#1a1a1a]">
  <label
    htmlFor="licenseUpload"
    className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
  >
    <LuCloudUpload className="w-12 h-12 text-red-500 mb-3" />
    <p className="font-medium text-white">
      {licenseFile ? licenseFile.name : "Upload your license image"}
    </p>
    {!licenseFile && (
      <p className="text-xs text-gray-400 mt-1">JPG or PNG, up to 5MB</p>
    )}
  </label>
  <input
    id="licenseUpload"
    type="file"
    accept="image/png, image/jpeg"
    onChange={handleFileChange}
    className="hidden"
    required
  />
</div>

{!licenseFile && (
  <p className="text-xs text-red-400 text-center">
    Please upload your license image*
  </p>
)}

          </div>

          {locationData.pickupDate && locationData.returnDate && (
            <div className="border-t pt-4 space-y-2 text-gray-700">
              <h3 className="text-lg font-semibold">Price Breakdown</h3>
              <div className="flex justify-between">
                <span>Daily Rate</span>
                <span>Rs. {pricePerDay}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>
                  {Math.max(
                    1,
                    Math.ceil(
                      (new Date(locationData.returnDate).getTime() -
                        new Date(locationData.pickupDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                  )}{" "}
                  days × Rs. {pricePerDay}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>Rs. {SERVICE_FEE}</span>
              </div>
              <div className="flex justify-between">
                <span>Insurance (self-drive)</span>
                <span>
                  Rs.
                  {INSURANCE_PER_DAY *
                    Math.max(
                      1,
                      Math.ceil(
                        (new Date(locationData.returnDate).getTime() -
                          new Date(locationData.pickupDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                    )}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>
                  Rs.
                  {(() => {
                    const days = Math.max(
                      1,
                      Math.ceil(
                        (new Date(locationData.returnDate).getTime() -
                          new Date(locationData.pickupDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                    );
                    return (
                      days * pricePerDay +
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
