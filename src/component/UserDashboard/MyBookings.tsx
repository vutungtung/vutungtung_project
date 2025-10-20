import { useEffect, useState } from "react";
import { useAuth } from "../../context/UseContext";
import { getUserBookings } from "../../api/api";
import { FiGrid, FiRefreshCcw } from "react-icons/fi";
import { FaList } from "react-icons/fa";

interface Booking {
  vehicleName: string;
  categoryName: string;
  bookingId: number; // Add this
  bookingDate: string;
  returnDate: string;
  pickuplocation: string;
  droplocation: string;
  deliverystatus: string;
  paymentMethod: string;
  paymentStatus: string;
  price: string;
  licenseNo: string;
  createdAt: string; // Add this to check 5-hour window
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filtered, setFiltered] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"card" | "list">("card");
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        // Do not block on missing token; cookies-based sessions may be used

        const res = await getUserBookings();
        console.log("User bookings API response:", res.data);

        const data = (res.data as any).data;
        if (Array.isArray(data)) {
          setBookings(data);
          setFiltered(data);
        } else {
          setError("Invalid data format received from server.");
        }
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError(err.response?.data?.message || "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleFilter = (status: string) => {
    setFilter(status);
    if (status === "all") setFiltered(bookings);
    else
      setFiltered(
        bookings.filter(
          (b) => b.deliverystatus.toLowerCase() === status.toLowerCase()
        )
      );
  };

  const handleCancelBooking = async (bookingId: number, bookingCreatedAt: string) => {
    const bookingTime = new Date(bookingCreatedAt).getTime();
    const currentTime = new Date().getTime();
    const fiveHoursInMillis = 5 * 60 * 60 * 1000;

    if (currentTime - bookingTime > fiveHoursInMillis) {
      alert("Booking can only be cancelled within 5 hours of creation.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    try {
      setLoading(true);
      setError(null);
      // Assuming the backend has a cancellation endpoint like /api/bookings/cancel/:id
      // The user specified not to change backend code, so we rely on an existing endpoint
      const response = await getUserBookings.post(
        `http://localhost:4000/vehicle/book/cancel-booking/${bookingId}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Booking cancelled successfully!");
        // Refresh bookings after cancellation
        const res = await getUserBookings();
        const data = (res.data as any).data;
        setBookings(data);
        setFiltered(data);
      } else {
        setError(response.data?.message || "Failed to cancel booking.");
      }
    } catch (err: any) {
      console.error("Error canceling booking:", err);
      setError(err.response?.data?.message || "Failed to cancel booking.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 flex flex-col items-center text-gray-600">
        <FiRefreshCcw className="animate-spin w-8 h-8 mb-2 text-blue-500" />
        <p>Loading your bookings...</p>
      </div>
    );

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
          My Bookings
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          {["all", "pending", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ${
                filter === status
                  ? "bg-red text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("card")}
            className={`p-2 rounded-lg transition ${
              view === "card"
                ? "bg-red-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FiGrid size={18} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition ${
              view === "list"
                ? "bg-red-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaList size={18} />
          </button>
        </div>
      </div>

      {/* No Bookings */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No bookings found.</p>
      ) : view === "card" ? (
        // 🔵 CARD VIEW
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              {/* 🔝 Status Section (replaces image) */}
              <div
                className={`h-36 flex flex-col items-center justify-center ${
                  b.deliverystatus === "completed"
                    ? "bg-gradient-to-br from-green-100 to-green-50"
                    : b.deliverystatus === "cancelled"
                    ? "bg-gradient-to-br from-red-100 to-red-50"
                    : "bg-gradient-to-br from-yellow-100 to-yellow-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {b.deliverystatus === "completed" ? (
                    <span className="text-green-600 text-4xl">✅</span>
                  ) : b.deliverystatus === "cancelled" ? (
                    <span className="text-red-600 text-4xl">❌</span>
                  ) : (
                    <span className="text-yellow-500 text-4xl">⏳</span>
                  )}
                  <h2
                    className={`text-xl font-bold ${
                      b.deliverystatus === "completed"
                        ? "text-green-700"
                        : b.deliverystatus === "cancelled"
                        ? "text-red-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {b.deliverystatus.toUpperCase()}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mt-1">Booking Status</p>
              </div>

              {/* 🔻 Booking Details Section */}
              <div className="p-5 flex flex-col justify-between h-[300px]">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {b.vehicleName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{b.categoryName}</p>

                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Pickup:</span>{" "}
                      {new Date(b.bookingDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Return:</span>{" "}
                      {new Date(b.returnDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Route:</span>{" "}
                      {b.pickuplocation} → {b.droplocation}
                    </p>
                    <p>
                      <span className="font-semibold">License:</span>{" "}
                      {b.licenseNo}
                    </p>
                    <p>
                      <span className="font-semibold">Payment:</span>{" "}
                      <span
                        className={`${
                          b.paymentStatus === "paid"
                            ? "text-green-600 font-medium"
                            : "text-red-500 font-medium"
                        }`}
                      >
                        {b.paymentMethod} ({b.paymentStatus})
                      </span>
                    </p>
                  </div>
                </div>

                {/* 🔻 Price + Action Button */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-bold text-red-600">
                    Rs. {b.price}
                  </p>
                  <div className="flex gap-2">
                    <button className="bg-black text-white px-4 py-2 text-sm rounded-full hover:bg-red-600 transition-all duration-200">
                      View Details
                    </button>
                    {b.deliverystatus !== "cancelled" && b.deliverystatus !== "completed" && (
                      <button
                        onClick={() => handleCancelBooking(b.bookingId, b.createdAt)}
                        disabled={loading}
                        className="bg-red-600 text-white px-4 py-2 text-sm rounded-full hover:bg-red-700 transition-all duration-200 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 🔴 LIST VIEW
        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="py-3 px-4">Vehicle</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Pickup</th>
                <th className="py-3 px-4">Return</th>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-200 hover:bg-gray-50 transition duration-150"
                >
                  <td className="py-3 px-4 font-semibold">{b.vehicleName}</td>
                  <td className="py-3 px-4">{b.categoryName}</td>
                  <td className="py-3 px-4">
                    {new Date(b.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(b.returnDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {b.pickuplocation} → {b.droplocation}
                  </td>
                  <td className="py-3 px-4">Rs. {b.price}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      b.deliverystatus === "completed"
                        ? "text-green-600"
                        : b.deliverystatus === "cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {b.deliverystatus.toUpperCase()}
                  </td>
                  <td className="py-3 px-4">
                    {b.deliverystatus !== "cancelled" && b.deliverystatus !== "completed" && (
                      <button
                        onClick={() => handleCancelBooking(b.bookingId, b.createdAt)}
                        disabled={loading}
                        className="bg-red-600 text-white px-3 py-1 text-sm rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
