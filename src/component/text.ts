//   {/* Vehicle Categories */}
//   <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-4 text-white text-sm sm:text-base font-semibold">
//     {[
//       { icon: <LiaCarSolid size={30} />, label: "Car" },
//       { icon: <RiMotorbikeLine size={30} />, label: "Bike" },
//       { icon: <PiTruck size={30} />, label: "Truck" },
//       { icon: <TbCarSuv size={30} />, label: "SUV" },
//       {
//         icon: <MdOutlineElectricRickshaw size={30} />,
//         label: "E-Rickshaw",
//       },
//     ].map(({ icon, label }, idx) => (
//       <div
//         key={idx}
//         className="flex flex-col items-center bg-white/30 border border-white/30 backdrop-blur-sm p-3 rounded-md min-w-[90px]"
//       >
//         {icon}
//         {label}
//       </div>
//     ))}
//   </div>
// --------------------------------------------->
// {/* Main Content */}
//   <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 text-white">
//     {/* Left Content */}
//     <div className="space-y-6">
//       <p className="flex items-center gap-2 text-sm font-semibold bg-green-950 px-4 py-1 rounded-full w-fit">
//         <FiCheckCircle size={18} className="text-yellow" />
//         Trusted by 10,000+ customers
//       </p>

//       <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
//         Find Your Perfect <br />
//         <span className="text-green-950">Rental Vehicle</span>
//       </h1>

//       <p className="text-base sm:text-lg max-w-xl">
//         Choose from our wide selection of cars, bikes, SUVs, and more. Safe,
//         reliable, and affordable rentals for every journey.
//       </p>

//       <button
//         onClick={() => (window.location.href = "/vehicle")}
//         className="bg-green-950 text-white px-6 py-3 rounded hover:bg-orange transition font-semibold"
//       >
//         Rent Vehicle
//       </button>

//       <div className="flex gap-5 flex-wrap mt-4 text-sm sm:text-base">
//         <p className="flex items-center gap-2">
//           <FiCheckCircle className="text-green-950" />
//           Free Cancellation
//         </p>
//         <p className="flex items-center gap-2">
//           <FiCheckCircle className="text-green-950" />
//           24/7 Support
//         </p>
//         <p className="flex items-center gap-2">
//           <FiCheckCircle className="text-green-950" />
//           Insurance Included
//         </p>
//       </div>
//     </div>

//     {/* Right Content */}
//     <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 relative">
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className="bg-white/20 p-4 text-center rounded-lg">
//           <div className="text-xl font-bold">500+</div>
//           <div className="text-sm opacity-80">Premium Cars</div>
//         </div>
//         <div className="bg-white/20 p-4 text-center rounded-lg">
//           <div className="text-xl font-bold">50+</div>
//           <div className="text-sm opacity-80">Locations</div>
//         </div>
//       </div>
//       <div className="bg-gradient-to-r from-green-900 to-green-950 p-4 text-center rounded-lg">
//         <div className="font-semibold text-lg">Special Offer</div>
//         <div className="text-sm">Get 20% off your first rental</div>
//       </div>
//       {/* Floating Car */}
//       <div className="absolute -top-8 -right-6 h-20 w-20 bg-gradient-to-b from-green-900 to-green-950 rounded-full flex items-center justify-center animate-bounce">
//         <img
//           src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100&h=100&fit=crop"
//           alt="Car"
//           className="h-12 w-12 object-cover rounded-full"
//         />
//       </div>
//     </div>
//   </div>
