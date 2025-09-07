import { LuFuel, LuUsers } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface VehicleCardProps {
  id: string; // must be string to match API
  title: string;
  image: string | string[];
  seatingCapacity: number;
  transmission: string;
  fuelType: string;
  description: string;
  pricePerDay: number;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  id,
  title,
  image,
  seatingCapacity,
  transmission,
  fuelType,
  description,
  pricePerDay,
}) => {
  const navigate = useNavigate();

  

  return (
    <div className="relative md:h-[25rem] rounded-2xl hover:shadow-lg hover:-translate-y-5 duration-300 shadow-accent/30 overflow-hidden">
      <img
        src={Array.isArray(image) ? image[0] : image}
        alt={title}
        className="h-48 w-full object-cover"
      />
      <div className="space-y-2 p-5">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="text-sm text-gray-600 flex flex-wrap gap-x-3 items-center">
          <p className="inline-flex justify-center items-center text-base gap-1">
            <LuUsers size={15} />
            {seatingCapacity} Seats
          </p>
          <p className="inline-flex items-center text-base gap-1">
            <IoSettingsOutline size={15} />
            {transmission}
          </p>
          <p className="inline-flex justify-center items-center text-base gap-1">
            <LuFuel size={15} />
            {fuelType}
          </p>
        </div>
        <p className="text-gray-600 line-clamp-1">{description}</p>
        <div className="md:absolute bottom-5 right-5 left-5 flex justify-between items-center">
          <p className="text-red font-heading text-xl font-semibold">
            Rs.{pricePerDay}
            <span className="text-sm text-gray-600 font-normal">/day</span>
          </p>
          <button
            onClick={() => navigate(`/vehicles/${id}`)} // navigate with string ID
            className="bg-red hover:bg-gradient-red text-white font-medium p-2 rounded-lg"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
