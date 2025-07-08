import { FiCheckCircle } from "react-icons/fi";
import RotatingWheel from "./rotatingWheel";
import { MdOutlineElectricRickshaw } from "react-icons/md";
import { TbCarSuv } from "react-icons/tb";
import { PiTruck } from "react-icons/pi";
import { LiaCarSolid } from "react-icons/lia";
import { RiMotorbikeLine } from "react-icons/ri";

export default function Hero() {
  return (
    <div className="w-full h-screen bg-primary-200 overflow-clip p-5  relative ">
      {/* <div className="absolute inset-0 w-full mx-auto -z-50">
        <img
          src="https://ideogram.ai/assets/image/lossless/response/x0YxMXCgSPC3IOCjC9t2CQ"
          alt=""
        />
      </div> */}
      <div className="max-w-7xl w-full flex flex-col justify-around items-center h-screen my-auto mx-auto">
        <div className="flex justify-between w-full items-center ">
          <div className="space-y-6">
            <p className="flex items-center  gap-x-2 text-sm font-semibold bg-primary-500 px-4 py-1 rounded-full w-fit">
              <FiCheckCircle size={18} className="text-secondary-200" />
              Trusted by 10,000+ customers
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-7xl text-foreground font-bold leading-tight">
              Find Your Perfect <br />
              <span className="text-primary-600">Rental Vehicle</span>
            </h1>

            <p className="text-base text-gray-500 font-semibold sm:text-lg max-w-xl">
              Choose from our wide selection of cars, bikes, SUVs, and more.
              Safe, reliable, and affordable rentals for every journey.
            </p>

            <div className="flex items-center gap-5">
              <button
                onClick={() => (window.location.href = "/vehicle")}
                className="bg-primary-500 text-white px-6 py-2 border-2 border-primary-500 rounded hover:bg-orange transition font-semibold"
              >
                Browse Vehicle
              </button>
              <button
                onClick={() => (window.location.href = "/vehicle")}
                className="border-2 text-primary-500 px-6 py-2 rounded hover:bg-orange transition font-semibold"
              >
                Learn More
              </button>
            </div>

            <div className="flex gap-5 flex-wrap mt-4 text-sm sm:text-base">
              <p className="flex items-center gap-2">
                <FiCheckCircle className="text-green-950" />
                Free Cancellation
              </p>
              <p className="flex items-center gap-2">
                <FiCheckCircle className="text-green-950" />
                24/7 Support
              </p>
              <p className="flex items-center gap-2">
                <FiCheckCircle className="text-green-950" />
                Insurance Included
              </p>
            </div>
          </div>
          <div>
            <RotatingWheel />
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-5 bg-primary-600 backdrop-blur-2xl p-5 rounded-xl text-white">
          {[
            { icon: <LiaCarSolid size={30} />, label: "Car" },
            { icon: <RiMotorbikeLine size={30} />, label: "Bike" },
            { icon: <PiTruck size={30} />, label: "Truck" },
            { icon: <TbCarSuv size={30} />, label: "SUV" },
            {
              icon: <MdOutlineElectricRickshaw size={30} />,
              label: "E-Rickshaw",
            },
          ].map(({ icon, label }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white/30 border border-white/30 backdrop-blur-sm p-3 rounded-md min-w-[90px]"
            >
              {icon}
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
