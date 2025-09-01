import { FiX } from "react-icons/fi";

interface Vehicle {
  title: string;
  image: string[];
  brand: string;
  model: string;
  category: string;
  transmission: string;
  fuelType: string;
  seatingCapacity: number;
  mileage: number;
  pricePerDay: number;
  features: string[];
  description: string;
}

interface ViewVehicleModalProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const ViewVehicleModal = ({ vehicle, onClose }: ViewVehicleModalProps) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4">{vehicle.title}</h2>

        {/* Image */}
        <img
          src={vehicle.image[0]}
          alt={vehicle.title}
          className="w-full h-64 object-cover rounded mb-4"
        />

        {/* Info */}
        <p className="text-gray-600 mb-2">
          <strong>Brand:</strong> {vehicle.brand}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Model:</strong> {vehicle.model}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Category:</strong> {vehicle.category}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Transmission:</strong> {vehicle.transmission}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Fuel Type:</strong> {vehicle.fuelType}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Seats:</strong> {vehicle.seatingCapacity}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Mileage:</strong> {vehicle.mileage}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Price:</strong> Rs. {vehicle.pricePerDay} / day
        </p>

        <p className="text-gray-600 mb-2">
          <strong>Features:</strong> {vehicle.features.join(", ")}
        </p>
        <p className="text-gray-600">
          <strong>Description:</strong> {vehicle.description}
        </p>
      </div>
    </div>
  );
};

export default ViewVehicleModal;
