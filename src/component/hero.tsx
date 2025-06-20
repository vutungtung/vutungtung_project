import { useState } from "react";

export default function Hero() {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="w-full h-screen bg-[url('/image/img2.jpg')] bg-cover bg-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[1290px] mx-auto px-4 md:px-10 h-full flex flex-col justify-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold leading-snug mb-4">
          Find the Perfect Ride Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Choose from bikes, cars, vans, and electric vehicles with instant
          booking and 24/7 support.
        </p>

        {/* Filter Bar */}
        <div className="bg-white/10 backdrop-blur-lg h-fit p-5 rounded-lg md:p-5 flex justify-center flex-col md:flex-row gap-4 md:items-center max-w-[1290px]">
          {/* Vehicle Type */}
          <select
            className="w-full md:w-1/4 p-4 rounded bg-white text-black"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option disabled value="">Vehicle Type</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Van">Van</option>
            <option value="EV">EV</option>
          </select>

          {/* Category */}
          <select
            className="w-full md:w-1/4 p-4 rounded bg-white text-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            <option value="Luxury">Luxury</option>
            <option value="Economy">Economy</option>
            <option value="Family">Family</option>
            <option value="Sport">Sport</option>
          </select>

          {/* Search */}
          <input
            type="text"
            placeholder="Search vehicle..."
            className="w-full md:w-1/3 p-4 rounded bg-white text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Button */}
          <button className="w-full md:w-auto bg-primary text-white p-4 rounded hover:bg-primary/90 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
