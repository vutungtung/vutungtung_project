import type { Vehicle } from "./Vehicles";

type Props = {
  vehicle: Vehicle;
  onClose: () => void;
};

const ViewVehicleModal = ({ vehicle, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {vehicle.title}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {vehicle.brand} • {vehicle.model}
        </p>

        {/* Main Image */}
        {vehicle.image?.[0] && (
          <img
            src={vehicle.image[0]}
            alt={vehicle.title}
            className="w-full h-56 object-cover rounded-xl mb-6"
          />
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Category:</span> {vehicle.category}
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
          <p className="text-red font-semibold text-base col-span-2">
            Rs. {vehicle.pricePerDay} / day
          </p>
        </div>

        {/* Features */}
        {vehicle.features && vehicle.features.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {vehicle.features.map((f, index) => (
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
        {vehicle.image && vehicle.image.length > 1 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Gallery
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {vehicle.image.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${vehicle.title} ${index + 2}`}
                  className="h-24 w-full object-cover rounded-lg border"
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
