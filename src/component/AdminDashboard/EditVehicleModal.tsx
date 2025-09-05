import { useRef, useState } from "react";
import type { Vehicle } from "../../types/vehicle";

type Props = {
  vehicle: Vehicle;
  onClose: () => void;
  onSave: (updated: Vehicle) => void;
};

const EditVehicleModal = ({ vehicle, onClose, onSave }: Props) => {
  const fileInputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const [formData, setFormData] = useState<Vehicle>({
    ...vehicle,
    image: [
      vehicle.image?.[0] || "",
      vehicle.image?.[1] || "",
      vehicle.image?.[2] || "",
    ],
    features: vehicle.features ?? [],
  });

  const [error, setError] = useState("");

  const featureOptions = [
    "AC",
    "GPS",
    "Bluetooth",
    "Airbags",
    "Power Steering",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "seatingCapacity" || name === "pricePerDay"
          ? Number(value)
          : value,
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate at least one image
    const hasImage = formData.image.some((img) => img.trim() !== "");
    if (!hasImage) {
      setError("Please provide at least one image.");
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4">Edit Vehicle</h2>
        {error && <p className="text-red-600 mb-3">{error}</p>}

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Vehicle Title"
          />
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Brand"
          />
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Model"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Car">Car</option>
            <option value="2-Wheeler">2-Wheeler</option>
            <option value="Truck">Truck</option>
            <option value="Rickshaw">Rickshaw</option>
          </select>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <input
            type="number"
            name="seatingCapacity"
            value={formData.seatingCapacity}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Seating Capacity"
          />
          <input
            type="text"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Mileage"
          />
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Price Per Day"
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
          className="border p-2 rounded w-full mt-4"
          rows={4}
          placeholder="Description"
        />

        {/* Images */}
        <div className="mt-4">
          <p className="font-semibold mb-2">Images (3 slots):</p>
          {[0, 1, 2].map((index) => (
            <div key={index} className="mb-3">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRefs[index]}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const newImages = [...formData.image];
                    newImages[index] = URL.createObjectURL(file);
                    setFormData({ ...formData, image: newImages });
                  }
                }}
                className="border p-2 rounded w-full"
              />
              {formData.image[index] && (
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={formData.image[index]}
                    alt={`Preview ${index + 1}`}
                    className="h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = [...formData.image];
                      newImages[index] = "";
                      setFormData({ ...formData, image: newImages });
                      if (fileInputRefs[index].current)
                        fileInputRefs[index].current.value = "";
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red text-white rounded hover:bg-red/80"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVehicleModal;
