import { useState, useRef } from "react";
import { FiX } from "react-icons/fi";

interface Vehicle {
  id?: string;
  title: string;
  brand: string;
  model: string;
  category: string;
  transmission: string;
  fuelType: string;
  seatingCapacity: number;
  mileage: string;
  pricePerDay: number;
  features: string[];
  description: string;
  image: string[]; // exactly 3 slots
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
  // Ensure always 3 slots (fill missing with "")
  const [formData, setFormData] = useState<Vehicle>({
    ...vehicle,
    image: [...vehicle.image, "", "", ""].slice(0, 3),
  });

  const featureOptions = [
    "AC",
    "GPS",
    "Bluetooth",
    "Airbags",
    "Power Steering",
  ];

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeatureToggle = (feature: string) => {
    const features = [...formData.features];
    if (features.includes(feature)) {
      setFormData({
        ...formData,
        features: features.filter((f) => f !== feature),
      });
    } else {
      features.push(feature);
      setFormData({ ...formData, features });
    }
  };

  const handleImageChange = (index: number, file?: File) => {
    const newImages = [...formData.image];
    if (file) {
      newImages[index] = URL.createObjectURL(file);
    } else {
      newImages[index] = "";
      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index]!.value = ""; // reset input
      }
    }
    setFormData({ ...formData, image: newImages });
  };

  const handleSave = () => {
    // Require at least 1 image
    if (!formData.image.some((img) => img && img.trim() !== "")) {
      alert("Please upload at least one image.");
      return;
    }
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

        <h2 className="text-2xl font-bold mb-4">Edit Vehicle</h2>

        {/* Form Fields */}
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

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Car">Car</option>
            <option value="2-Wheeler">2-Wheeler</option>
            <option value="Rickshaw">Rickshaw</option>
            <option value="Truck">Truck</option>
          </select>

          {/* Transmission */}
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>

          {/* Fuel */}
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>

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

        {/* Features */}
        <div className="mt-4">
          <p className="font-semibold mb-2">Features:</p>
          <div className="flex flex-wrap gap-2">
            {featureOptions.map((f) => (
              <label key={f} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={formData.features.includes(f)}
                  onChange={() => handleFeatureToggle(f)}
                />
                {f}
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded w-full mt-4"
          rows={4}
        />

        {/* Images (3 inputs) */}
        <div className="mt-4">
          <p className="font-semibold mb-2">
            Upload Images (3 slots, 1 required):
          </p>
          {formData.image.map((img, index) => (
            <div key={index} className="mb-3">
              <input
                type="file"
                accept="image/*"
                ref={(el) => (fileInputRefs.current[index] = el)}
                onChange={(e) => handleImageChange(index, e.target.files?.[0])}
                className="border p-2 rounded w-full"
              />

              {img && (
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="h-32 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageChange(index, undefined)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Save */}
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
