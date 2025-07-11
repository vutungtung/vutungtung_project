import { useState } from "react";

const LocationForm = () => {
  // Dummy location data (can be replaced with API)
  const locations = ["Kathmandu", "Pokhara", "Butwal", "Biratnagar", "Chitwan"];

  // Form state
  const [formData, setFormData] = useState({
    pickupLocation: "",
    returnLocation: "",
    pickupDate: "",
    returnDate: "",
  });

  // Handle changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Optional: Handle form submit

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add API call or validation here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white rounded-lg  space-y-4"
    >
      {/* Pickup Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pickup Location
        </label>
        <div className="relative">
          {/* <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            📍
          </span> */}
          <select
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select location</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Return Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Return Location
        </label>
        <div className="relative">
          <select
            name="returnLocation"
            value={formData.returnLocation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select return location</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pickup Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pickup Date
        </label>
        <input
          type="date"
          name="pickupDate"
          value={formData.pickupDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Return Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Return Date
        </label>
        <input
          type="date"
          name="returnDate"
          value={formData.returnDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </form>
  );
};

export default LocationForm;
