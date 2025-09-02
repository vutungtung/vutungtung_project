import { FiX } from "react-icons/fi";

interface Vehicle {
  id: string;
  title: string;
  // Add other properties as needed
}

interface DeleteVehicleModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const DeleteVehicleModal = ({
  vehicle,
  onClose,
  onDelete,
}: DeleteVehicleModalProps) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">Delete Vehicle</h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{vehicle.title}</span>? This action
          cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(vehicle.id)}
            className="px-4 py-2 bg-red text-white rounded-lg hover:bg-gradient-red"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVehicleModal;
