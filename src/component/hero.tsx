import { LiaCarSolid } from "react-icons/lia";
import { MdOutlineElectricRickshaw } from "react-icons/md";
import { PiTruck } from "react-icons/pi";
import { RiMotorbikeLine } from "react-icons/ri";
import { TbCarSuv } from "react-icons/tb";

export default function Hero() {
  return (
    <div className="w-full h-screen bg-[url('https://videos.openai.com/vg-assets/assets%2Ftask_01jyk58jhdeae98nepapqf6z0t%2F1750842377_img_0.webp?st=2025-06-25T07%3A23%3A49Z&se=2025-07-01T08%3A23%3A49Z&sks=b&skt=2025-06-25T07%3A23%3A49Z&ske=2025-07-01T08%3A23%3A49Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=ddntVkZ3Iq2hAGsJ4%2F3Gn%2Fiwp8dYXH0omKMGN0Gka60%3D&az=oaivgprodscus')] bg-cover bg-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 space-y-8 max-w-[1290px] flex flex-col mx-auto h-full justify-center text-white">
        <div className="backdrop-blur-sm border border-border space-y-8 p-5 rounded-2xl w-fit">
          <h1 className="text-3xl text-white md:text-6xl font-bold">
            Find the Perfect <br /> Ride &nbsp;
            <span className="text-primary">Anytime</span>
            , <br /> <span className="text-primary">Anywhere</span>
          </h1>
          <p className="text-lg font-medium text-white max-w-2xl">
            Choose from bikes, cars, vans, and electric vehicles with <br />{" "}
            instant booking and 24/7 support.
          </p>
          <button
            onClick={() => { window.location.href = '/vehicle'; }}
            className=" rounded-lg font-semibold bg-primary hover:bg-primary-hover duration-300 text-text w-fit  py-3 px-5"
          >
            Rent Vehicle
          </button>
          <div className="flex flex-wrap text-white text-xl font-semibold w-fit rounded-3xl  gap-5 ">
            <div className="flex flex-col justify-center items-center bg-white/30 backdrop-blur-xs p-2 min-w-32  rounded-lg">
              <LiaCarSolid size={35} />
              Car
            </div>
            <div className="flex flex-col justify-center items-center bg-white/30 backdrop-blur-xs p-2 min-w-32  rounded-lg">
              <RiMotorbikeLine size={35} />
              Bikes
            </div>
            <div className="flex flex-col justify-center items-center bg-white/30 backdrop-blur-xs p-2 min-w-32  rounded-lg">
              <PiTruck size={35} />
              Truck
            </div>
            <div className="flex flex-col justify-center items-center bg-white/30 backdrop-blur-xs p-2 min-w-32  rounded-lg">
              <TbCarSuv size={35} />
              SUV
            </div>
            <div className="flex flex-col justify-center items-center bg-white/30 backdrop-blur-xs p-2 min-w-32  rounded-lg">
              <MdOutlineElectricRickshaw size={35} />
              E-riksha
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
