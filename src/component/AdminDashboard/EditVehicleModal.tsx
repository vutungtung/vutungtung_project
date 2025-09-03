import { useState } from "react";
import type { Vehicle } from "./Vehicles";

type Props = {
  vehicle: Vehicle;
  onClose: () => void;
  onSave: (updated: Vehicle) => void;
};

const EditVehicleModal = ({ vehicle, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState(vehicle);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
        <h2 className="text-xl font-bold mb-4">Edit Vehicle</h2>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="model"
          value={formData.model}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="pricePerDay"
          type="number"
          value={formData.pricePerDay}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-red text-white rounded hover:bg-red/80"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVehicleModal;
