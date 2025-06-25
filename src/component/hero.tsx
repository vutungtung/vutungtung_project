import { LiaCarSolid } from "react-icons/lia";
import { MdOutlineElectricRickshaw } from "react-icons/md";
import { PiTruck } from "react-icons/pi";
import { RiMotorbikeLine } from "react-icons/ri";
import { TbCarSuv } from "react-icons/tb";

export default function Hero() {
  return (
    <div className="w-full h-screen bg-[url('https://cdn.leonardo.ai/users/285a086d-7df9-45dd-a98e-ed2a4f5446a7/generations/1313354b-7f63-430b-ae11-296da9065d06/segments/1:4:1/Flux_Dev_A_moody_lowkey_artistic_portrait_photography_capturin_0.jpg')] bg-cover bg-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 space-y-8 max-w-[1290px] flex flex-col mx-auto px-4 md:px-10 h-full justify-center text-white">
        <h1 className="text-3xl text-text-primary md:text-6xl font-bold">
          Find the Perfect <br /> Ride &nbsp;
          <span className="text-button-bg">
            Anytime, <br /> Anywhere
          </span>
        </h1>
        <p className="text-lg md:text-xl font-semibold text-text-secondary max-w-2xl">
          Choose from bikes, cars, vans, and electric vehicles with <br />{" "}
          instant booking and 24/7 support.
        </p>
        <button className=" rounded-lg font-semibold bg-button-bg text-button-text w-fit  py-3 px-5">
          Rent Vehicle
        </button>
        <div className="flex flex-wrap text-[#533c35] text-xl font-semibold w-fit rounded-3xl  gap-5 ">
          <div className="flex flex-col justify-center items-center bg-white p-2 min-w-32  rounded-lg">
            <LiaCarSolid size={35} />
            Car
          </div>
          <div className="flex flex-col justify-center items-center bg-white p-2 min-w-32  rounded-lg">
            <RiMotorbikeLine size={35} />
            Bikes
          </div>
          <div className="flex flex-col justify-center items-center bg-white p-2 min-w-32  rounded-lg">
            <PiTruck size={35} />
            Truck
          </div>
          <div className="flex flex-col justify-center items-center bg-white p-2 min-w-32  rounded-lg">
            <TbCarSuv size={35} />
            SUV
          </div>
          <div className="flex flex-col justify-center items-center bg-white p-2 min-w-32  rounded-lg">
            <MdOutlineElectricRickshaw size={35} />
            E-riksha
          </div>
        </div>
      </div>
    </div>
  );
}
