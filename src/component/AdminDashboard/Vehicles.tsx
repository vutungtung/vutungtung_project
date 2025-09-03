import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import SearchFilter from "./SearchFilter";
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

const Vehicles = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // modal states
  const [viewVehicle, setViewVehicle] = useState<Vehicle | null>(null);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [deleteVehicleTarget, setDeleteVehicleTarget] =
    useState<Vehicle | null>(null);

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

      {/* Search & Filter */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        placeholder="Search vehicles by brand, model, or category..."
      />

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
