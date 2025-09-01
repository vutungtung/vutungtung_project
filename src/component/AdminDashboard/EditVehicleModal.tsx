import { useState } from "react";
import { FiX } from "react-icons/fi";

interface Vehicle {
  title: string;
  brand: string;
  model: string;
  category: string;
  transmission: string;
  fuelType: string;
  seatingCapacity: number;
  mileage: string;
  pricePerDay: number;
  description: string;
}

interface EditVehicleModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onSave: (updatedVehicle: Vehicle) => void;
}

const EditVehicleModal = ({
  vehicle,
  onClose,
  onSave,
}: EditVehicleModalProps) => {
  const [formData, setFormData] = useState(vehicle);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4">Edit Vehicle</h2>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Vehicle Title"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Model"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            placeholder="Transmission"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            placeholder="Fuel Type"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="seatingCapacity"
            value={formData.seatingCapacity}
            onChange={handleChange}
            placeholder="Seating Capacity"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            placeholder="Mileage"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            placeholder="Price Per Day"
            className="border p-2 rounded"
          />
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded w-full mt-4"
          rows={4}
        />

        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-red text-white px-4 py-2 rounded hover:bg-gradient-red"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVehicleModal;
