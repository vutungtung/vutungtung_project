import { useState } from "react";
import { vehiclesData } from "../component/vehiclesData";
import { MdOutlineFilterAltOff } from "react-icons/md";
// import { LuFuel, LuUsers } from "react-icons/lu";
// import { IoSettingsOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
import VehicleCard from "../component/VehicleCard";

const Vehicle = () => {
  // const navigate = useNavigate();

  const [filters, setfilters] = useState({
    category: "",
    transmission: "",
    pricePerDay: "",
    fuelType: "",
  });

  const handleFilterChanger = (
    e: React.ChangeEvent<HTMLImageElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLSelectElement;
    setfilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredVehicles = vehiclesData.filter((vehicle) => {
    const matchCategory =
      filters.category === "" || vehicle.category === filters.category;
    const matchTransmission =
      filters.transmission === "" ||
      vehicle.transmission === filters.transmission;
    const matchFuel =
      filters.fuelType === "" || vehicle.fuelType === filters.fuelType;
    const matchPrice =
      filters.pricePerDay === "" ||
      (() => {
        const [minStr, maxStr] = filters.pricePerDay
          .replace(/Rs\./g, "")
          .split("-")
          .map((s) => s.trim());

        const min = parseInt(minStr);
        const max = parseInt(maxStr);

        return vehicle.pricePerDay >= min && vehicle.pricePerDay <= max;
      })();

    return matchCategory && matchTransmission && matchPrice && matchFuel;
  });

  return (
    <>
      <div className="w-full max-w-[1290px] px-5 xl:px-0  py-10 mx-auto h-auto">
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-foreground">
            Our Vehicle Fleet
          </h1>
          <p className="text-xl  text-gray-500 ">
            Browse our extensive collection of premium vehicles
          </p>

          {/* filters  */}
          <div className="border border-gray-200 gap-5  rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5  py-8 px-5 w-full mx-auto">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-md text-gray-500 font-semibold">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChanger}
                className="border text-b border-gray-200 focus:outline-0 rounded-xl px-2 py-2 w-full"
              >
                <option value="">All Categories</option>
                <option value="2-Wheeler">2-Wheeler</option>
                <option value="Car">Car</option>
                <option value="Truck">Truck</option>
                <option value="E-Rickshaw">E-Rickshaw</option>
              </select>
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-md text-gray-500 font-semibold">
                Price Range
              </label>
              <select
                name="pricePerDay"
                value={filters.pricePerDay}
                onChange={handleFilterChanger}
                className="border text-b border-gray  focus:outline-0 rounded-xl px-2 py-2 w-full"
              >
                <option value="">Any Price</option>
                <option value="Rs.1000 - Rs.2000">Rs.1000 - Rs.2000</option>
                <option value="Rs.2000 - Rs.4000">Rs.2000 - Rs.4000</option>
                <option value="Rs.4000 - Rs.6000">Rs.4000 - Rs.6000</option>
              </select>
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-md text-gray-500 font-semibold">
                Transmission
              </label>
              <select
                name="transmission"
                value={filters.transmission}
                onChange={handleFilterChanger}
                className="border text-b border-gray focus:outline-0 rounded-xl px-2 py-2 w-full"
              >
                <option value="">Any</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-md text-gray-500 font-semibold">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={filters.fuelType}
                onChange={handleFilterChanger}
                className="border text-b border-gray focus:outline-0 rounded-xl px-2 py-2 w-full"
              >
                <option value="">All</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() =>
                  setfilters({
                    category: "",
                    pricePerDay: "",
                    transmission: "",
                    fuelType: "",
                  })
                }
                className="border bg-red h-fit hover:bg-gradient-red duration-300 inline-flex justify-center items-center text-white font-medium border-border rounded-xl px-3 py-2 w-full"
              >
                <MdOutlineFilterAltOff size={25} /> Clear Filter
              </button>
            </div>
          </div>
        </div>

        {/* vehicles */}
        <div className="text-base text-gray-500 mt-8">
          Showing {filteredVehicles.length} of {vehiclesData.length} vehicles
        </div>
        <div className="grid sm:grid-cols-2 w-full lg:grid-cols-3 gap-5 py-8">
          {filteredVehicles.length === 0 ? (
            <div className="col-span-full flex justify-center items-center min-h-[200px]">
              <p className="text-gray-500 text-lg text-center">
                No vehicles found.
              </p>
            </div>
          ) : (
            filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                {...vehicle}
                id={parseInt(vehicle.id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};
export default Vehicle;
