import { useState, useEffect, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { FiMoreVertical, FiFilter } from "react-icons/fi";
import AddVehicleForm from "./AddVehicleForm";
import ViewVehicleModal from "./ViewVehicleModal";
import EditVehicleModal from "./EditVehicleModal";
import DeleteVehicleModal from "./DeleteVehicleModal";
import {
  addVehicle,
  deleteVehicle,
  fetchVehicles,
  updateVehicle,
} from "../../api/vehicleApi";

// Vehicle type
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

interface VehicleProps {
  showAddModal: boolean;
  setShowAddModal: (value: boolean) => void;
}

const Vehicles = ({ showAddModal, setShowAddModal }: VehicleProps) =>  {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // const [showAddModal, setShowAddModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // modal states
  const [viewVehicle, setViewVehicle] = useState<Vehicle | null>(null);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [deleteVehicleTarget, setDeleteVehicleTarget] =
    useState<Vehicle | null>(null);

  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch vehicles
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles();
        setVehicleList(data);
      } catch (err) {
        console.error("Failed to load vehicles:", err);
      } finally {
        setLoading(false);
      }
    };
    loadVehicles();
  }, []);

  // Filtering logic
  const filteredVehicles = vehicleList.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || v.category === filterCategory;

    // If you have status property in vehicle, adjust here
    const matchesStatus =
      filterStatus === "All" || v.transmission === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
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
      </div>

      {showAddModal && (
        <AddVehicleForm
          onClose={() => setShowAddModal(false)}
          onSave={async (newVehicle) => {
            const saved = await addVehicle(newVehicle);
            setVehicleList((prev) => [...prev, saved]);
            setShowAddModal(false);
          }}
        />
      )}

      {/* Search + Filter */}
      <div className="flex flex-wrap items-center justify-between bg-white p-5 rounded-2xl border border-gray-300 gap-4">
        <input
          type="text"
          placeholder="Search vehicles by brand, model, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[250px] px-4 py-2 border border-gray-300  bg-white rounded-lg focus:ring-2 focus:ring-red outline-none"
        />

        {/* Filters Dropdown */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
          >
            <FiFilter size={18} /> Filters
          </button>

          {showFilter && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-xl shadow-lg p-4 z-20">
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-gray-700">Filters</p>
                <button
                  className="text-sm text-red hover:underline"
                  onClick={() => {
                    setFilterCategory("All");
                    setFilterStatus("All");
                    setShowFilter(false);
                  }}
                >
                  Clear
                </button>
              </div>

              {/* Status */}
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    // setShowFilter(false); // 👈 close dropdown after selecting
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                    setShowFilter(false); // 👈 close dropdown after selecting
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="2-Wheeler">2-Wheeler</option>
                  <option value="Car">Car</option>
                  <option value="Truck">Truck</option>
                  <option value="Rickshaw">Rickshaw</option>
                </select>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Showing {filteredVehicles.length} of {vehicleList.length}{" "}
                vehicles
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Vehicle Cards */}
      {loading ? (
        <p>Loading vehicles...</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((v) => (
              <div
                key={v.id}
                className="relative rounded-lg bg-white overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={v.image[0]}
                  alt={v.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold">{v.title}</h3>
                  <p className="text-sm text-gray-500">
                    {v.brand} • {v.model} • {v.transmission}
                  </p>
                  <p className="text-red font-semibold mt-2">
                    Rs. {v.pricePerDay} / day
                  </p>
                </div>

                {/* 3-dot Menu */}
                <div className="absolute top-3 right-3">
                  <button
                    className="menu-button p-2 rounded-full hover:bg-gray-100"
                    onClick={() =>
                      setOpenMenuId(openMenuId === v.id ? null : v.id)
                    }
                  >
                    <FiMoreVertical size={18} />
                  </button>

                  {openMenuId === v.id && (
                    <div className="menu-dropdown absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setViewVehicle(v)}
                      >
                        View
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setEditVehicle(v)}
                      >
                        Edit
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                        onClick={() => setDeleteVehicleTarget(v)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-6">No vehicles found.</p>
          )}
        </div>
      )}

      {/* Modals */}
      {viewVehicle && (
        <ViewVehicleModal
          vehicle={viewVehicle}
          onClose={() => setViewVehicle(null)}
        />
      )}

      {editVehicle && (
        <EditVehicleModal
          vehicle={editVehicle}
          onClose={() => setEditVehicle(null)}
          onSave={async (updated) => {
            const saved = await updateVehicle(updated.id, updated);
            setVehicleList((prev) =>
              prev.map((v) => (v.id === saved.id ? saved : v))
            );
            setEditVehicle(null);
          }}
        />
      )}

      {deleteVehicleTarget && (
        <DeleteVehicleModal
          vehicleTitle={deleteVehicleTarget.title}
          onClose={() => setDeleteVehicleTarget(null)}
          onConfirm={async () => {
            await deleteVehicle(deleteVehicleTarget.id);
            setVehicleList((prev) =>
              prev.filter((v) => v.id !== deleteVehicleTarget.id)
            );
            setDeleteVehicleTarget(null);
          }}
        />
      )}
    </div>
  );
};

export default Vehicles;
