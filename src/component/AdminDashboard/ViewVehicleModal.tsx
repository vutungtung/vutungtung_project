import type { Vehicle } from "./Vehicles";

type Props = {
  vehicle: Vehicle;
  onClose: () => void;
};

const ViewVehicleModal = ({ vehicle, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
        <h2 className="text-xl font-bold mb-4">{vehicle.title}</h2>
        <img
          src={vehicle.image[0]}
          alt={vehicle.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <p>
          <strong>Brand:</strong> {vehicle.brand}
        </p>
        <p>
          <strong>Model:</strong> {vehicle.model}
        </p>
        <p>
          <strong>Transmission:</strong> {vehicle.transmission}
        </p>
        <p>
          <strong>Category:</strong> {vehicle.category}
        </p>
        <p className="text-red font-semibold">
          Rs. {vehicle.pricePerDay} / day
        </p>
        <button
          className="mt-4 px-4 py-2 bg-red text-white rounded hover:bg-red/80"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewVehicleModal;
