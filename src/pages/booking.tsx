import { useState } from "react";
import { vehiclesData } from "../component/vehiclesData";

const Booking = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const selectedVehicle = vehiclesData.find((v) => v.id === selectedVehicleId);

  const calculateTotal = () => {
    if (!pickupDate || !returnDate || !selectedVehicle) return null;

    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const timeDiff = end.getTime() - start.getTime();
    const dayCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (dayCount <= 0) return null;
    return dayCount * selectedVehicle.pricePerDay;
  };

  const totalPrice = calculateTotal();

  return (
    <>
      {/* Header Section */}
      <div className="bg-[var(--color-secondary)] w-full py-10 px-4 sm:px-6 lg:px-20 mt-14 text-white text-center">
        <h1 className="text-3xl font-semibold">Book Your Vehicle</h1>
        <p className="text-[var(--color-muted)] mt-2">
          Complete your reservation in just a few steps
        </p>
      </div>

      {/* Booking Container */}
      <div className="bg-white w-full max-w-[1290px] mx-auto  px-4 sm:px-6 lg:px-8 my-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            {/* Vehicle Selection */}
            <div className="border border-[var(--color-border)] rounded p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                🚗 Vehicle Selection
              </h2>
              <select
                className="w-full border border-[var(--color-border)] rounded px-3 py-2"
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                value={selectedVehicleId}
              >
                <option value="">Select a vehicle</option>
                {vehiclesData.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Rental Details */}
            <div className="border border-[var(--color-border)] rounded p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                📅 Rental Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Pickup Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full border border-[var(--color-border)] rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label>Return Date</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full border border-[var(--color-border)] rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label>Pickup Time</label>
                  <input
                    type="time"
                    className="w-full border border-[var(--color-border)] rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label>Return Time</label>
                  <input
                    type="time"
                    className="w-full border border-[var(--color-border)] rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="border border-[var(--color-border)] rounded p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                📍 Location Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Pickup Location</label>
                  <select className="w-full border border-[var(--color-border)] rounded px-3 py-2">
                    <option value="">Select pickup location</option>
                    <option value="Kathmandu">Kathmandu</option>
                    <option value="Pokhara">Pokhara</option>
                  </select>
                </div>
                <div>
                  <label>Return Location</label>
                  <select className="w-full border border-[var(--color-border)] rounded px-3 py-2">
                    <option value="">Select return location</option>
                    <option value="Kathmandu">Kathmandu</option>
                    <option value="Pokhara">Pokhara</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="border border-[var(--color-border)] rounded p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                🙋 Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="First Name"
                  className="border border-[var(--color-border)] rounded px-3 py-2"
                />
                <input
                  placeholder="Last Name"
                  className="border border-[var(--color-border)] rounded px-3 py-2"
                />
                <input
                  placeholder="Email"
                  className="border border-[var(--color-border)] rounded px-3 py-2"
                />
                <input
                  placeholder="Phone Number"
                  className="border border-[var(--color-border)] rounded px-3 py-2"
                />
                <input
                  placeholder="Driver's License Number"
                  className="border border-[var(--color-border)] rounded px-3 py-2 md:col-span-2"
                />
                <textarea
                  placeholder="Any special requirements or requests..."
                  className="border border-[var(--color-border)] rounded px-3 py-2 md:col-span-2"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded py-3 font-semibold">
              Complete Booking
            </button>
          </div>

          {/* Booking Summary */}
          <div className="w-full lg:w-[350px] border h-fit border-[var(--color-border)] rounded p-4 sm:p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold border-b border-[var(--color-border)] pb-2">
              Booking Summary
            </h2>
            {selectedVehicle ? (
              <div className="space-y-4 text-sm text-[var(--color-text)]">
                <div className="space-y-1 border-b border-[var(--color-border)] pb-3">
                  <p>
                    <strong>Vehicle:</strong> {selectedVehicle.title}
                  </p>
                  <p>
                    <strong>Daily Rate:</strong> ${selectedVehicle.pricePerDay}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedVehicle.category}
                  </p>
                </div>

                <div className="space-y-1 border-b border-[var(--color-border)] pb-3">
                  <p className="font-medium">Included Features:</p>
                  <ul className="list-disc ml-5 text-[var(--color-muted)]">
                    {selectedVehicle.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                  <p className="font-bold text-[var(--color-text)] text-base">
                    Total:
                  </p>
                  {totalPrice ? (
                    <p className="text-[var(--color-accent)] font-semibold">
                      ${totalPrice}
                    </p>
                  ) : (
                    <p className="text-[var(--color-warning)] font-bold text-base">
                      Calculate on dates
                    </p>
                  )}
                </div>

                <div className="text-xs text-[var(--color-muted)] space-y-1">
                  <p>• Free cancellation up to 24 hours before pickup</p>
                  <p>• Valid driver’s license required</p>
                  <p>• Full policy: Return with same fuel level</p>
                </div>
              </div>
            ) : (
              <p className="text-[var(--color-muted)]">
                Select a vehicle to see details.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
