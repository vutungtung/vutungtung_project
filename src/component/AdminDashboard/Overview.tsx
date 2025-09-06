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
