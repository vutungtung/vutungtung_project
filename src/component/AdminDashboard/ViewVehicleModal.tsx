// import type { Vehicle } from "../../types/vehicle";

// type Props = {
//   vehicle: Vehicle;
//   onClose: () => void;
// };

// const ViewVehicleModal = ({ vehicle, onClose }: Props) => {
//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
//         {/* Title */}
//         <h2 className="text-2xl font-bold mb-2 text-gray-800">
//           {vehicle.title}
//         </h2>
//         <p className="text-sm text-gray-500 mb-4">
//           {vehicle.brand} • {vehicle.model}
//         </p>

//         {/* Main Image */}
//         {vehicle.image?.[0] && (
//           <img
//             src={vehicle.image[0]}
//             alt={vehicle.title}
//             className="w-full h-56 object-cover rounded-xl mb-6"
//           />
//         )}

//         {/* Info Grid */}
//         <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
//           <p>
//             <span className="font-semibold">Category:</span> {vehicle.category}
//           </p>
//           <p>
//             <span className="font-semibold">Transmission:</span>{" "}
//             {vehicle.transmission}
//           </p>
//           <p>
//             <span className="font-semibold">Fuel:</span> {vehicle.fuelType}
//           </p>
//           <p>
//             <span className="font-semibold">Seats:</span>{" "}
//             {vehicle.seatingCapacity}
//           </p>
//           <p>
//             <span className="font-semibold">Mileage:</span> {vehicle.mileage}
//           </p>
//           <p className="text-red font-semibold text-base col-span-2">
//             Rs. {vehicle.pricePerDay} / day
//           </p>
//         </div>

//         {/* Features */}
//         {vehicle.features && vehicle.features.length > 0 && (
//           <div className="mt-6">
//             <h3 className="text-sm font-semibold text-gray-800 mb-2">
//               Features
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {vehicle.features.map((f:string, index:number) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 text-xs bg-gray-100 rounded-full border"
//                 >
//                   {f}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Description */}
//         {vehicle.description && (
//           <div className="mt-6">
//             <h3 className="text-sm font-semibold text-gray-800 mb-2">
//               Description
//             </h3>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               {vehicle.description}
//             </p>
//           </div>
//         )}

//         {/* Extra Images */}
//         {vehicle.image && vehicle.image.length > 1 && (
//           <div className="mt-6">
//             <h3 className="text-sm font-semibold text-gray-800 mb-2">
//               Gallery
//             </h3>
//             <div className="grid grid-cols-3 gap-2">
//               {vehicle.image.slice(1).map((img:string, index:number) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt={`${vehicle.title} ${index + 2}`}
//                   className="h-24 w-full object-cover rounded-lg border"
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Close Button */}
//         <div className="flex justify-end mt-8">
//           <button
//             className="px-4 py-2 bg-red text-white rounded-lg hover:bg-red/90 transition"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewVehicleModal;

import type { Vehicle } from "../../types/vehicle";

type Props = {
  vehicle: Vehicle;
  onClose: () => void;
};

const ViewVehicleModal = ({ vehicle, onClose }: Props) => {
  // ✅ Get all images (main image + additional images) and filter out undefined/empty
  const allImages = [vehicle.image, vehicle.image1, vehicle.image2].filter(
    (img): img is string => img !== undefined && img !== "" && img !== null
  );

  // ✅ Check if features is a string and convert to array if needed
  const featuresArray = Array.isArray(vehicle.features)
    ? vehicle.features
    : typeof vehicle.features === "string"
    ? vehicle.features.split(",").map((f) => f.trim())
    : [];

  // ✅ Get category name safely
  const categoryName =
    typeof vehicle.category === "object" && vehicle.category !== null
      ? vehicle.category.name // If category is an object with name property
      : String(vehicle.category); // If it's a string or other type

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {vehicle.name || vehicle.title} {/* ✅ Support both name and title */}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {vehicle.brand} • {vehicle.model}
        </p>

        {/* Main Image */}
        {allImages[0] && (
          <img
            src={`http://localhost:4000/uploads/vehicles/${allImages[0]}`} // ✅ Correct path
            alt={vehicle.name || vehicle.title}
            className="w-full h-56 object-cover rounded-xl mb-6"
            onError={(e) => {
              e.currentTarget.src = "/fallback-image.jpg"; // Fallback for broken images
            }}
          />
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Category:</span> {categoryName}
          </p>
          <p>
            <span className="font-semibold">Transmission:</span>{" "}
            {vehicle.transmission}
          </p>
          <p>
            <span className="font-semibold">Fuel:</span> {vehicle.fuelType}
          </p>
          <p>
            <span className="font-semibold">Seats:</span>{" "}
            {vehicle.seatingCapacity}
          </p>
          <p>
            <span className="font-semibold">Mileage:</span> {vehicle.mileage}
          </p>
          <p>
            <span className="font-semibold">License Plate:</span>{" "}
            {vehicle.licensePlate}
          </p>
          <p>
            <span className="font-semibold">VIN:</span> {vehicle.vin}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded text-xs ${
                vehicle.status === "AVAILABLE"
                  ? "bg-green-100 text-green-800"
                  : vehicle.status === "RENTED"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {vehicle.status}
            </span>
          </p>
          <p className="text-red font-semibold text-base col-span-2">
            Rs. {vehicle.dailyRate || vehicle.pricePerDay} / day
          </p>
        </div>

        {/* Features */}
        {featuresArray.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {featuresArray.map((f: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs bg-gray-100 rounded-full border"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {vehicle.description && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {vehicle.description}
            </p>
          </div>
        )}

        {/* Extra Images */}
        {allImages.length > 1 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Gallery ({allImages.length - 1} additional images)
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {allImages.slice(1).map((img: string, index: number) => (
                <img
                  key={index}
                  src={`http://localhost:4000/uploads/vehicles/${img}`} // ✅ Correct path
                  alt={`${vehicle.name || vehicle.title} ${index + 2}`}
                  className="h-24 w-full object-cover rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-image.jpg"; // Fallback for broken images
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end mt-8">
          <button
            className="px-4 py-2 bg-red text-white rounded-lg hover:bg-red/90 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewVehicleModal;
