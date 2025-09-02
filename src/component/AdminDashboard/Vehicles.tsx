import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import SearchFilter from "./SearchFilter";
import { vehiclesData } from "../vehiclesData";
import ViewVehicleModal from "./ViewVehicleModal";
import EditVehicleModal from "./EditVehicleModal";
import DeleteVehicleModal from "./DeleteVehicleModal";
import AddVehicleForm from "./AddVehicleForm";

// Define the Vehicle type locally if not available elsewhere
export type Vehicle = {
  id: string;
  title: string;
  brand: string;
  model: string;
  transmission: string;
  category: string;
  pricePerDay: number;
  image: string[];
};

// Remove the import since the type is now defined locally

const Vehicles = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [vehicleList, setVehicleList] = useState<Vehicle[]>(vehiclesData);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [viewMode, setViewMode] = useState<"view" | "edit" | "delete" | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // If clicked element does NOT have the class 'menu-button' or inside menu
      if (
        !target.closest(".menu-button") &&
        !target.closest(".menu-dropdown")
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleView = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setViewMode("view");
  };

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setViewMode("edit");
  };

  const handleDelete = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setViewMode("delete");
  };

  const handleSave = (updatedVehicle: Vehicle) => {
    setVehicleList((prev) =>
      prev.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v))
    );
    setViewMode(null);
  };

  const confirmDelete = (id: string) => {
    setVehicleList((prev) => prev.filter((v) => v.id !== id));
    setViewMode(null);
  };

  // Filtering logic
  const filteredVehicles = vehicleList.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || v.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-10 items-center">
        <div>
          <p className="text-2xl font-black">Vehicle Management</p>
          <p className="text-gray-500 text-sm">Manage your fleet of vehicles</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex justify-start w-fit items-center gap-2 px-4 py-2 rounded-lg text-white bg-red hover:bg-gradient-red"
        >
          <IoMdAdd size={20} /> Add Vehicle
        </button>
        {showAddModal && (
          <AddVehicleForm
            onClose={() => setShowAddModal(false)}
            onSave={(newVehicle) => {
              // Ensure newVehicle.id is a string
              const vehicleToAdd = {
                ...newVehicle,
                id:
                  typeof newVehicle.id === "string" && newVehicle.id.length > 0
                    ? newVehicle.id
                    : `${Date.now()}-${Math.random()
                        .toString(36)
                        .substr(2, 9)}`,
              };
              setVehicleList((prev) => [...prev, vehicleToAdd]);
            }}
          />
        )}
      </div>

      {/* Search & Filter */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        placeholder="Search vehicles by brand, model, or category..."
      />

      {/* Vehicle Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((v) => (
            <div
              key={v.id}
              className="relative rounded-lg bg-white overflow-hidden shadow hover:shadow-lg transition"
            >
              {/* 3-dot menu */}
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === v.id ? null : v.id)
                  }
                  className="p-1 rounded-full hover:bg-gray-100 menu-button"
                >
                  <FiMoreVertical />
                </button>

                {openMenuId === v.id && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg menu-dropdown">
                    <button
                      onClick={() => handleView(v)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(v)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(v)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Vehicle Image */}
              <img
                src={v.image[0]}
                alt={v.title}
                className="w-full h-40 object-cover"
              />

              {/* Vehicle Details */}
              <div className="p-5">
                <h3 className="text-lg font-bold">{v.title}</h3>
                <p className="text-sm text-gray-500">
                  {v.brand} • {v.model} • {v.transmission}
                </p>
                <p className="text-red font-semibold mt-2">
                  Rs. {v.pricePerDay} / day
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-6">No vehicles found.</p>
        )}
      </div>

      {/* Modals */}
      {viewMode === "view" && (
        <ViewVehicleModal
          vehicle={selectedVehicle}
          onClose={() => setViewMode(null)}
        />
      )}
      {viewMode === "edit" && (
        <EditVehicleModal
          vehicle={selectedVehicle}
          onClose={() => setViewMode(null)}
          onSave={handleSave}
        />
      )}
      {viewMode === "delete" && (
        <DeleteVehicleModal
          vehicle={selectedVehicle}
          onClose={() => setViewMode(null)}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default Vehicles;
