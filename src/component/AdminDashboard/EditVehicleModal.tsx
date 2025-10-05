// import { useRef, useState } from "react";
// import type { Vehicle } from "../../types/vehicle";

// type Props = {
//   vehicle: Vehicle;
//   onClose: () => void;
//   onSave: (updated: Vehicle) => void;
// };

// const EditVehicleModal = ({ vehicle, onClose, onSave }: Props) => {
//   const fileInputRefs = [
//     useRef<HTMLInputElement | null>(null),
//     useRef<HTMLInputElement | null>(null),
//     useRef<HTMLInputElement | null>(null),
//   ];

//   const [formData, setFormData] = useState<Vehicle>({
//     ...vehicle,
//     image: [
//       vehicle.image?.[0] || "",
//       vehicle.image?.[1] || "",
//       vehicle.image?.[2] || "",
//     ],
//     features: vehicle.features ?? [],
//     status: vehicle.status || "Available",
//   });

//   const [error, setError] = useState("");

//   const featureOptions = [
//     "AC",
//     "GPS",
//     "Bluetooth",
//     "Airbags",
//     "Power Steering",
//   ];

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "seatingCapacity" || name === "pricePerDay"
//           ? Number(value)
//           : value,
//     }));
//   };

//   const handleFeatureToggle = (feature: string) => {
//     const features = [...formData.features];
//     if (features.includes(feature)) {
//       setFormData({
//         ...formData,
//         features: features.filter((f) => f !== feature),
//       });
//     } else {
//       features.push(feature);
//       setFormData({ ...formData, features });
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate at least one image
//     const hasImage = formData.image.some((img) => img.trim() !== "");
//     if (!hasImage) {
//       setError("Please provide at least one image.");
//       return;
//     }

//     onSave(formData);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//       >
//         <h2 className="text-xl font-bold mb-4">Edit Vehicle</h2>
//         {error && <p className="text-red-600 mb-3">{error}</p>}

//         {/* Basic Info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Vehicle Title"
//           />
//           <input
//             type="text"
//             name="brand"
//             value={formData.brand}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Brand"
//           />
//           <input
//             type="text"
//             name="model"
//             value={formData.model}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Model"
//           />
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Car">Car</option>
//             <option value="2-Wheeler">2-Wheeler</option>
//             <option value="Truck">Truck</option>
//             <option value="Rickshaw">Rickshaw</option>
//           </select>
//           <select
//             name="transmission"
//             value={formData.transmission}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Manual">Manual</option>
//             <option value="Automatic">Automatic</option>
//           </select>
//           <select
//             name="fuelType"
//             value={formData.fuelType}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Petrol">Petrol</option>
//             <option value="Diesel">Diesel</option>
//             <option value="Electric">Electric</option>
//             <option value="Hybrid">Hybrid</option>
//           </select>
//           <input
//             type="number"
//             name="seatingCapacity"
//             value={formData.seatingCapacity}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Seating Capacity"
//           />
//           <input
//             type="text"
//             name="mileage"
//             value={formData.mileage}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Mileage"
//           />
//           <input
//             type="number"
//             name="pricePerDay"
//             value={formData.pricePerDay}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Price Per Day"
//           />
//         </div>
//         {/* Status */}
//         <div className="mt-4">
//           <label className="block font-semibold mb-2">Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//           >
//             <option value="Available">Available</option>
//             <option value="Rented">Rented</option>
//             <option value="Maintenance">Maintenance</option>
//           </select>
//         </div>

//         {/* Features */}
//         <div className="mt-4">
//           <p className="font-semibold mb-2">Features:</p>
//           <div className="flex flex-wrap gap-2">
//             {featureOptions.map((f) => (
//               <label key={f} className="flex items-center gap-1">
//                 <input
//                   type="checkbox"
//                   checked={formData.features.includes(f)}
//                   onChange={() => handleFeatureToggle(f)}
//                 />
//                 {f}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Description */}
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           className="border p-2 rounded w-full mt-4"
//           rows={4}
//           placeholder="Description"
//         />

//         {/* Images */}
//         <div className="mt-4">
//           <p className="font-semibold mb-2">Images (3 slots):</p>
//           {[0, 1, 2].map((index) => (
//             <div key={index} className="mb-3">
//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRefs[index]}
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (file) {
//                     const newImages = [...formData.image];
//                     newImages[index] = URL.createObjectURL(file);
//                     setFormData({ ...formData, image: newImages });
//                   }
//                 }}
//                 className="border p-2 rounded w-full"
//               />
//               {formData.image[index] && (
//                 <div className="mt-2 flex items-center gap-3">
//                   <img
//                     src={formData.image[index]}
//                     alt={`Preview ${index + 1}`}
//                     className="h-24 object-cover rounded border"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const newImages = [...formData.image];
//                       newImages[index] = "";
//                       setFormData({ ...formData, image: newImages });
//                       if (fileInputRefs[index].current)
//                         fileInputRefs[index].current.value = "";
//                     }}
//                     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end mt-4 gap-2">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 border rounded hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-red text-white rounded hover:bg-red/80"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditVehicleModal;

// import { useEffect, useRef, useState } from "react";
// import type { Vehicle } from "../../types/vehicle";

// interface Props {
//   vehicle: Vehicle;
//   onClose: () => void;
//   onSave: (updated: Vehicle) => void;
// }

// interface Category {
//   c_id: number;
//   name: string;
// }

// const EditVehicleModal = ({ vehicle, onClose, onSave }: Props) => {
//   const [formData, setFormData] = useState({
//     title: vehicle.name || "",
//     category: "",
//     brand: vehicle.brand || "",
//     model: vehicle.model || "",
//     transmission: vehicle.transmission || "Manual",
//     fuelType: vehicle.fuelType || "Petrol",
//     seatingCapacity: vehicle.seatingCapacity || 1,
//     mileage: vehicle.mileage?.toString() || "",
//     pricePerDay: Number(vehicle.dailyRate) || 0,
//     features: vehicle.features || [],
//     description: vehicle.description || "",
//     image: [vehicle.image || "", vehicle.image1 || "", vehicle.image2 || ""],
//     status: vehicle.status || "Available",
//   });

//   const [categories, setCategories] = useState<Category[]>([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fileInputRefs = [
//     useRef<HTMLInputElement | null>(null),
//     useRef<HTMLInputElement | null>(null),
//     useRef<HTMLInputElement | null>(null),
//   ];

//   const featureOptions = [
//     "AC",
//     "GPS",
//     "Bluetooth",
//     "Airbags",
//     "Power Steering",
//   ];

//   // Fetch categories
//   useEffect(() => {
//     fetch(`http://localhost:4000/api/category/all${id}`)
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.error("Failed to fetch categories:", err));
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "seatingCapacity" || name === "pricePerDay"
//           ? Number(value)
//           : value,
//     }));
//   };

//   // const handleFeatureToggle = (feature: string) => {
//   //   const features = [...formData.features];
//   //   if (features.includes(feature)) {
//   //     setFormData({
//   //       ...formData,
//   //       features: features.filter((f) => f !== feature),
//   //     });
//   //   } else {
//   //     features.push(feature);
//   //     setFormData({ ...formData, features });
//   //   }
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate at least one image
//     if (!formData.image.some((img) => img.trim() !== "")) {
//       setError("Please provide at least one image.");
//       return;
//     }

//     // Map frontend formData to backend payload
//     const payload = {
//       name: formData.title,
//       brand: formData.brand,
//       model: formData.model,
//       description: formData.description,
//       vin: vehicle.vin || "",
//       licensePlate: vehicle.licensePlate || "",
//       mileage: Number(formData.mileage) || 0,
//       fuelType: formData.fuelType.toUpperCase(),
//       transmission: formData.transmission.toUpperCase(),
//       seatingCapacity: Number(formData.seatingCapacity),
//       dailyRate: String(formData.pricePerDay),
//       status: formData.status.toUpperCase(),
//       image: formData.image[0] || "",
//       image1: formData.image[1] || "",
//       image2: formData.image[2] || "",
//       categoryId:
//         categories.find((c) => c.name === formData.category)?.c_id ||
//         vehicle.categoryId ||
//         1,
//     };

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/vehicles/${vehicle.v_id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok || data.error) {
//         setError(data.message || "Failed to update vehicle.");
//         return;
//       }

//       onSave(data); // Pass updated vehicle back
//       onClose();
//     } catch (err: unknown) {
//       if (err instanceof Error) setError(err.message);
//       else setError("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex justify-center items-center z-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]"
//       >
//         <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
//           Edit Vehicle
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             X
//           </button>
//         </h2>

//         {error && <p className="text-red-600 mb-4">{error}</p>}

//         {/* Basic Info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="title"
//             placeholder="Vehicle Title"
//             value={formData.title}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             name="brand"
//             placeholder="Brand"
//             value={formData.brand}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             name="model"
//             placeholder="Model"
//             value={formData.model}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="">Select Category</option>
//             {categories.map((c) => (
//               <option key={c.c_id} value={c.name}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//           <select
//             name="transmission"
//             value={formData.transmission}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Manual">Manual</option>
//             <option value="Automatic">Automatic</option>
//           </select>
//           <select
//             name="fuelType"
//             value={formData.fuelType}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Petrol">Petrol</option>
//             <option value="Diesel">Diesel</option>
//             <option value="Electric">Electric</option>
//             <option value="Hybrid">Hybrid</option>
//           </select>
//           <input
//             type="number"
//             name="seatingCapacity"
//             value={formData.seatingCapacity}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Seating Capacity"
//           />
//           <input
//             type="text"
//             name="mileage"
//             value={formData.mileage}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Mileage"
//           />
//           <input
//             type="number"
//             name="pricePerDay"
//             value={formData.pricePerDay}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Price Per Day"
//           />
//         </div>

//         {/* Status */}
//         <div className="mt-4">
//           <label className="block font-semibold mb-2">Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="border p-2 rounded w-full"
//           >
//             <option value="Available">Available</option>
//             <option value="Rented">Rented</option>
//             <option value="Maintenance">Maintenance</option>
//           </select>
//         </div>

//         {/* Features
//         <div className="mt-4">
//           <p className="font-semibold mb-2">Features:</p>
//           <div className="flex flex-wrap gap-2">
//             {featureOptions.map((f) => (
//               <label key={f} className="flex items-center gap-1">
//                 <input
//                   type="checkbox"
//                   checked={formData.features.includes(f)}
//                   onChange={() => handleFeatureToggle(f)}
//                 />
//                 {f}
//               </label>
//             ))}
//           </div>
//         </div> */}

//         {/* Description */}
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="border p-2 rounded w-full mt-4"
//           rows={4}
//         />

//         {/* Images */}
//         <div className="mt-4">
//           <p className="font-semibold mb-2">Upload Images (3 slots)</p>
//           {formData.image.map((_, index) => (
//             <div key={index} className="mb-3">
//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRefs[index]}
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (file) {
//                     const newImages = [...formData.image];
//                     newImages[index] = URL.createObjectURL(file);
//                     setFormData({ ...formData, image: newImages });
//                   }
//                 }}
//                 className="border p-2 rounded w-full"
//               />
//               {formData.image[index] && (
//                 <div className="mt-2 flex items-center gap-3">
//                   <img
//                     src={formData.image[index]}
//                     alt={`Preview ${index + 1}`}
//                     className="h-32 object-cover rounded border"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const newImages = [...formData.image];
//                       newImages[index] = "";
//                       setFormData({ ...formData, image: newImages });
//                       if (fileInputRefs[index].current)
//                         fileInputRefs[index].current.value = "";
//                     }}
//                     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end mt-4 gap-2">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 border rounded hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-red text-white rounded hover:bg-gradient-red"
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditVehicleModal;

import { useEffect, useRef, useState, useCallback } from "react";
import type { Vehicle } from "../../types/vehicle";

interface EditVehicleFormProps {
  vehicle: Vehicle; // ✅ existing vehicle data to edit
  onUpdate: (vehicle: Vehicle) => void;
  onClose: () => void;
}

interface Category {
  c_id: number;
  name: string;
}

const EditVehicleModal = ({
  vehicle,
  onUpdate,
  onClose,
}: EditVehicleFormProps) => {
  const [formData, setFormData] = useState({
    title: vehicle.name || vehicle.title || "",
    category:
      typeof vehicle.category === "object"
        ? vehicle.category.name
        : String(vehicle.category),
    brand: vehicle.brand || "",
    model: vehicle.model || "",
    transmission: vehicle.transmission || "MANUAL",
    fuelType: vehicle.fuelType || "PETROL",
    seatingCapacity: vehicle.seatingCapacity || 1,
    mileage: vehicle.mileage || "",
    pricePerDay: vehicle.dailyRate || vehicle.pricePerDay || 0,
    features: Array.isArray(vehicle.features)
      ? vehicle.features
      : typeof vehicle.features === "string"
      ? vehicle.features.split(",").map((f) => f.trim())
      : [],
    description: vehicle.description || "",
    images: [
      vehicle.image
        ? `http://localhost:4000/uploads/vehicles/${vehicle.image}`
        : "",
      vehicle.image1
        ? `http://localhost:4000/uploads/vehicles/${vehicle.image1}`
        : "",
      vehicle.image2
        ? `http://localhost:4000/uploads/vehicles/${vehicle.image2}`
        : "",
    ],
    status: vehicle.status || "AVAILABLE",
    licensePlate: vehicle.licensePlate || "",
    vin: vehicle.vin || "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const featureOptions = [
    "AC",
    "GPS",
    "Bluetooth",
    "Airbags",
    "Power Steering",
  ];

  useEffect(() => {
    fetch("http://localhost:4000/api/category/all")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const setFileInputRef = useCallback(
    (index: number) => (el: HTMLInputElement | null) => {
      fileInputRefs.current[index] = el;
    },
    []
  );

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();

    form.append("name", formData.title);
    form.append("brand", formData.brand);
    form.append("model", formData.model);
    form.append("description", formData.description);
    form.append("licensePlate", formData.licensePlate);
    form.append("vin", formData.vin);
    form.append("mileage", formData.mileage);
    form.append("fuelType", formData.fuelType.toUpperCase());
    form.append("seatingCapacity", formData.seatingCapacity.toString());
    form.append("dailyRate", formData.pricePerDay.toString());
    form.append("transmissionType", formData.transmission.toUpperCase());
    form.append("status", formData.status.toUpperCase());
    if (formData.features.length > 0)
      form.append("features", formData.features.join(","));

    const categoryId = categories.find(
      (c) => c.name === formData.category
    )?.c_id;
    if (categoryId) {
      form.append("categoryId", categoryId.toString());
    } else {
      setError("Please select a valid category");
      return;
    }

    // ✅ Attach updated images if new ones are chosen
    fileInputRefs.current.forEach((ref, index) => {
      if (ref?.files?.[0]) {
        const fieldName = index === 0 ? "image" : `image${index}`;
        form.append(fieldName, ref.files[0]);
      }
    });

    setLoading(true);
    setError("");

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const res = await fetch(
        `http://localhost:4000/api/vehicles/update/${vehicle.v_id}`,
        {
          method: "PUT",
          body: form,
          credentials: "include",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const responseText = await res.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        console.error("Invalid JSON response:", responseText);
        setError("Invalid response from server.");
        return;
      }

      if (!res.ok) {
        setError(data.error || "Failed to update vehicle");
        console.error("Server error:", data);
        return;
      }

      alert("Vehicle updated successfully!");
      onUpdate(data);
      onClose();
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
          Edit Vehicle
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Same fields as AddVehicleForm */}
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
          <input
            type="text"
            name="licensePlate"
            placeholder="License Plate"
            value={formData.licensePlate}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="vin"
            placeholder="VIN Number"
            value={formData.vin}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.c_id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="MANUAL">Manual</option>
            <option value="AUTOMATIC">Automatic</option>
          </select>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="PETROL">Petrol</option>
            <option value="DIESEL">Diesel</option>
            <option value="ELECTRIC">Electric</option>
            <option value="HYBRID">Hybrid</option>
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

        {/* Status */}
        <div className="mt-4">
          <label className="block font-semibold mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="AVAILABLE">Available</option>
            <option value="RENTED">Rented</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>
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
          <p className="font-semibold mb-2">Update Images (Optional):</p>
          {[0, 1, 2].map((index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image {index + 1}
              </label>
              <input
                type="file"
                ref={setFileInputRef(index)}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const newImages = [...formData.images];
                    newImages[index] = URL.createObjectURL(file);
                    setFormData({ ...formData, images: newImages });
                  }
                }}
                className="border p-2 rounded w-full"
              />
              {formData.images[index] && (
                <img
                  src={formData.images[index]}
                  alt={`Preview ${index + 1}`}
                  className="h-32 object-cover rounded mt-2 border"
                />
              )}
            </div>
          ))}
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
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVehicleModal;
