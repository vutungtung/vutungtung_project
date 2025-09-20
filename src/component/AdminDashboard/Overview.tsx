import { FaCar } from "react-icons/fa";
import { IoTrendingUpOutline } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { TbCurrencyDollar, TbUsers } from "react-icons/tb";

// summy Users ---------------------------------------->
const dummyUsers = [
  {
    username: "john_doe",
    vehicle: "Toyota Corolla",
    status: "Active",
    pricePerDay: 40,
  },
  {
    username: "sarah_smith",
    vehicle: "Honda Civic",
    status: "Active",
    pricePerDay: 45,
  },
  {
    username: "michael_lee",
    vehicle: "Ford Mustang",
    status: "Completed",
    pricePerDay: 120,
  },
];

const OverviewData = [
  {
    id: 1,
    title: "Total Revenue",
    total: "$124,256",
    growth: "22",
    icon: <TbCurrencyDollar size={20} />,
  },
  {
    id: 2,
    title: "Active Booking",
    total: "56",
    growth: "2",
    icon: <MdOutlineCalendarToday size={16} />,
  },
  {
    id: 3,
    title: "Fleet Vehicles",
    total: "24",
    growth: "12",
    icon: <FaCar size={20} />,
  },
  {
    id: 4,
    title: "Total Users",
    total: "1,240",
    growth: "52",
    icon: <TbUsers size={20} />,
  },
];

const Overview = () => {
  return (
    <div>
      <h1 className="text-2xl py-5 font-bold">Analytics</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {OverviewData.map((data, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl border border-gray-300"
          >
            <div className="text-gray-600 mb-2 flex justify-between items-center text-sm font-medium">
              <p>{data.title}</p>
              <p className="text-red">{data.icon}</p>
            </div>
            <p className=" text-2xl font-bold ">{data.total}</p>
            <p className="flex text-green-500 text-xs justify-start items-center">
              <IoTrendingUpOutline />+{data.growth}%
            </p>
          </div>
        ))}
      </div>

      <div className="md:flex  gap-5">
        <div className="border border-gray-300 w-full  rounded-xl bg-white p-5 mt-5">
          {/* Recent Bookings  */}
          <div className=" flex justify-start gap-2 items-center">
            <MdOutlineCalendarToday size={16} className="text-red" />
            <h1 className="text-xl font-bold">Recent Bookings</h1>
          </div>
          <div className="mt-5">
            {dummyUsers.map((data, index) => (
              <div key={index} className="bg-light-gray mt-5 rounded-2xl  p-5">
                <div className="flex justify-between">
                  <p className="font-medium">{data.username}</p>
                  <p>{data.status}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500 text-sm">{data.vehicle}</p>
                  <p>{data.pricePerDay}/perday</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Status  */}
        <div className="border border-gray-300 w-full rounded-xl bg-white p-5 mt-5">
          <div className="flex justify-start gap-2 items-center">
            <FaCar size={20} className="text-red" />
            <h1 className="text-xl font-bold">Fleet Status</h1>
          </div>
          <div className="space-y-5">
            <div className="flex justify-between items mt-5">
              <p>Available</p>
              <div className="text-green-400 font-medium">18 Vehicles</div>
            </div>
            <div className="flex justify-between items">
              <p>Rented</p>
              <div className="text-red font-medium">18 Vehicles</div>
            </div>
            <div className="flex justify-between items">
              <p>Maintenance</p>
              <div className="text-yellow-300 font-medium">18 Vehicles</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

// import { FaCar } from "react-icons/fa";
// import { MdOutlineCalendarToday } from "react-icons/md";
// import { TbCurrencyDollar, TbUsers } from "react-icons/tb";
// import { useEffect, useState } from "react";
// import { fetchVehicles } from "../../api/vehicleApi";
// import { fetchBookings } from "../../api/bookingApi";
// import type { Vehicle } from "../../types/vehicle";
// import type { Booking } from "../../types/booking";

// interface OverviewStats {
//   totalRevenue: number;
//   totalBookings: number;
//   fleetVehicles: number;
//   totalUsers: number;
// }

// const Overview = () => {
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [stats, setStats] = useState<OverviewStats>({
//     totalRevenue: 0,
//     totalBookings: 0,
//     fleetVehicles: 0,
//     totalUsers: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [vehiclesData, bookingsData] = await Promise.all([
//           fetchVehicles(),
//           fetchBookings(),
//         ]);

//         setVehicles(vehiclesData);
//         setBookings(bookingsData);

//         // Calculate total revenue based on booking duration
//         const totalRevenue = bookingsData.reduce((sum, booking) => {
//           const vehicle = vehiclesData.find((v) => v.id === booking.vehicleId);
//           if (vehicle && booking.bookingDate && booking.returnDate) {
//             const startDate = new Date(booking.bookingDate);
//             const endDate = new Date(booking.returnDate);
//             const days = Math.ceil(
//               (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
//             );
//             return sum + vehicle.pricePerDay * Math.max(days, 1);
//           }
//           return sum;
//         }, 0);

//         const uniqueUsers = new Set(
//           bookingsData.map((booking) => booking.userId)
//         ).size;

//         setStats({
//           totalRevenue,
//           totalBookings: bookingsData.length,
//           fleetVehicles: vehiclesData.length,
//           totalUsers: uniqueUsers,
//         });
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const OverviewData = [
//     {
//       id: 1,
//       title: "Total Revenue",
//       value: `$${stats.totalRevenue.toLocaleString()}`,
//       icon: <TbCurrencyDollar size={20} />,
//       color: "text-green-600",
//     },
//     {
//       id: 2,
//       title: "Total Bookings",
//       value: stats.totalBookings.toString(),
//       icon: <MdOutlineCalendarToday size={16} />,
//       color: "text-blue-600",
//     },
//     {
//       id: 3,
//       title: "Total Vehicles",
//       value: stats.fleetVehicles.toString(),
//       icon: <FaCar size={20} />,
//       color: "text-purple-600",
//     },
//     {
//       id: 4,
//       title: "Total Users",
//       value: stats.totalUsers.toString(),
//       icon: <TbUsers size={20} />,
//       color: "text-orange-600",
//     },
//   ];

//   // Calculate average vehicle price safely
//   const averageVehiclePrice =
//     vehicles.length > 0
//       ? vehicles.reduce((sum, v) => sum + v.pricePerDay, 0) / vehicles.length
//       : 0;

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-lg">Loading dashboard data...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-red-500">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1 className="text-2xl py-5 font-bold">Dashboard Overview</h1>

//       {/* Stats Cards */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
//         {OverviewData.map((data) => (
//           <div
//             key={data.id}
//             className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <p className="text-gray-600 text-sm font-medium">{data.title}</p>
//               <p className={data.color}>{data.icon}</p>
//             </div>
//             <p className="text-3xl font-bold text-gray-800">{data.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Simple Summary Section */}
//       <div className="mt-8 grid md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-xl border border-gray-200">
//           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <FaCar className="text-purple-600" />
//             Vehicle Summary
//           </h2>
//           <div className="space-y-2">
//             <p>
//               <span className="font-medium">Total Vehicles:</span>{" "}
//               {vehicles.length}
//             </p>
//             <p>
//               <span className="font-medium">Average Price:</span> $
//               {averageVehiclePrice.toFixed(2)}/day
//             </p>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl border border-gray-200">
//           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <MdOutlineCalendarToday className="text-blue-600" />
//             Booking Summary
//           </h2>
//           <div className="space-y-2">
//             <p>
//               <span className="font-medium">Total Bookings:</span>{" "}
//               {bookings.length}
//             </p>
//             <p>
//               <span className="font-medium">Total Revenue:</span> $
//               {stats.totalRevenue.toLocaleString()}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="mt-6 bg-white p-6 rounded-xl border border-gray-200">
//         <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="text-center">
//             <p className="text-2xl font-bold text-green-600">
//               {stats.totalBookings}
//             </p>
//             <p className="text-sm text-gray-600">Bookings</p>
//           </div>
//           <div className="text-center">
//             <p className="text-2xl font-bold text-blue-600">
//               {stats.fleetVehicles}
//             </p>
//             <p className="text-sm text-gray-600">Vehicles</p>
//           </div>
//           <div className="text-center">
//             <p className="text-2xl font-bold text-purple-600">
//               {stats.totalUsers}
//             </p>
//             <p className="text-sm text-gray-600">Users</p>
//           </div>
//           <div className="text-center">
//             <p className="text-2xl font-bold text-orange-600">
//               ${stats.totalRevenue.toLocaleString()}
//             </p>
//             <p className="text-sm text-gray-600">Revenue</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;
