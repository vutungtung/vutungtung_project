import { useRef, useState } from "react";
import type { NewVehicle } from "../../types/vehicle";

interface AddVehicleFormProps {
  onSave: (vehicle: NewVehicle) => void;
  onClose: () => void;
}

const AddVehicleForm = ({ onSave, onClose }: AddVehicleFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Car",
    brand: "",
    model: "",
    transmission: "Manual",
    fuelType: "Petrol",
    seatingCapacity: 1,
    mileage: "",
    pricePerDay: 0,
    features: [] as string[],
    description: "",
    image: ["", "", ""], // 3 optional images
  });

  const featureOptions = [
    "AC",
    "GPS",
    "Bluetooth",
    "Airbags",
    "Power Steering",
  ];
  const [error, setError] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate at least one image
    const hasImage = formData.image.some((img) => img.trim() !== "");
    if (!hasImage) {
      setError("Please provide at least one image URL.");
      return;
    }

    // Just use formData, no id here
    onSave(formData as NewVehicle);
    onClose();
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
          Add Vehicle
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </h2>
        {/* Error message */}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Vehicle Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
            className="border p-2 rounded"
            required
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
            placeholder="Seating Capacity"
            className="border p-2 rounded"
            min={1}
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
            min={0}
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
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-4"
          rows={4}
        />

        {/* Images */}
        <div className="mt-4">
          <p className="font-semibold mb-2">
            Upload Images (at least 1 required, up to 3):
          </p>
          {formData.image.map((_, index) => {
            return (
              <div key={index} className="mb-3">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const newImages = [...formData.image];
                      newImages[index] = URL.createObjectURL(file); // Store preview
                      setFormData({ ...formData, image: newImages });
                    }
                  }}
                  className="border p-2 rounded w-full"
                />

                {/* Show preview + remove option */}
                {formData.image[index] && (
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={formData.image[index]}
                      alt={`Preview ${index + 1}`}
                      className="h-32 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = [...formData.image];
                        newImages[index] = ""; // Clear state
                        setFormData({ ...formData, image: newImages });

                        // Also reset file input field
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit */}
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
            className="px-4 py-2 bg-red text-white rounded hover:bg-gradient-red"
          >
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
