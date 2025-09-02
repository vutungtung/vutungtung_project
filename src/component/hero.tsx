import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineElectricRickshaw } from "react-icons/md";
import { TbCarSuv } from "react-icons/tb";
import { PiTruck } from "react-icons/pi";
import { LiaCarSolid } from "react-icons/lia";
import { RiMotorbikeLine } from "react-icons/ri";

export default function Hero() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Lovable Gradient Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg')",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-5 bg-gradient-to-r from-black to-red/50 opacity-80"></div>

      {/* Shapes */}
      <div className="absolute inset-0">
        {/* Top left floating square */}
        <div className="absolute top-5 left-5 w-16 h-16 border-2 border-red animate-float"></div>

        {/* Right middle floating square */}
        <div className="absolute top-1/3 right-10 w-12 h-12 border-2 border-red animate-float animate-delay-2s"></div>

        {/* Bottom right water drop circle */}
        <div className="absolute bottom-50 right-20 w-16 h-16 border-2 border-red-600 rounded-full animate-waterDrop"></div>
      </div>

      <div className="max-w-7xl w-full flex flex-col justify-around items-center h-screen my-auto mx-auto p-5">
        <div className="flex justify-between w-full items-center">
          <div className="space-y-6">
            <p className="flex items-center gap-x-2 text-sm  bg-white/30 backdrop-blur-md px-4 py-1 rounded-full w-fit text-white">
              <FiCheckCircle size={18} className="" />
              Trusted by 10,000+ customers
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-7xl text-white font-black leading-tight">
              Find Your Perfect <br />
              <span className="text-red">Rental Vehicle</span>
            </h1>

            <p className="text-base text-white  sm:text-xl max-w-xl">
              Choose from our wide selection of cars, bikes, SUVs, and more.
              Safe, reliable, and affordable rentals for every journey.
            </p>

            <div className="flex items-center gap-5">
              <button
                onClick={() => (window.location.href = "/vehicle")}
                className="bg-red text-white px-6 py-2 border-2 border-red rounded hover:opacity-90 transition font-semibold"
              >
                Browse Vehicle
              </button>
              <button
                onClick={() => (window.location.href = "/vehicle")}
                className="border-2 border-white bg-white text-red px-6 py-2 rounded hover:bg-[#5A8DEE]/10 transition font-semibold"
              >
                Learn More
              </button>
            </div>

            <div className="flex gap-5 flex-wrap mt-4 text-sm text-white sm:text-base">
              <p className="flex items-center gap-2">
                <FiCheckCircle />
                Free Cancellation
              </p>
              <p className="flex items-center gap-2">
                <FiCheckCircle />
                24/7 Support
              </p>
              <p className="flex items-center gap-2">
                <FiCheckCircle />
                Insurance Included
              </p>
            </div>
          </div>
          <div>{/* You can re-add <RotatingWheel /> here later */}</div>
        </div>

        <div className="grid hidden grid-cols-3 md:grid-cols-5 gap-5 bg-white/30 backdrop-blur-xl p-5 rounded-xl text-gray-900">
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
              className="flex flex-col items-center bg-white/40 border border-white/30 backdrop-blur-sm p-3 rounded-md min-w-[90px]"
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
