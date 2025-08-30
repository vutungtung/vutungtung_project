// import { useState } from "react";
// import LocationForm from "../component/locationTime";
// import { FaRegClock, FaShieldAlt } from "react-icons/fa";

// const VehicleDetails = () => {
//   const [activeOption, setActiveOption] = useState("driver");

//   return (
//     <div className="mx-auto  h-full max-w-7xl py-10">
//       <div className="p-5 xl:p-0 flex flex-wrap lg:flex-nowrap gap-5 justify-between">
//         <div className="w-full space-y-2">
//           <img
//             src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&height=900&width=1600&fit=bounds"
//             alt=""
//           />

//           <div className="flex justify-between items-center text-justify">
//             <div>
//               <h1 className="text-2xl font-semibold">Honda CR-V</h1>
//               <p className="font-semibold">4.7 (127 Reviews)</p>
//             </div>
//             <div className="font-heading">
//               <p className="text-xl font-bold text-red">$65</p>
//               <p>per day</p>
//             </div>
//           </div>
//           <div></div>
//           <h2 className="border-t border-border text-xl font-semibold pt-5">
//             About Vehicles
//           </h2>
//           <p className="text-justify">
//             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
//             quisquam, repellendus eos facilis, veniam reiciendis praesentium
//             commodi molestias rerum explicabo similique?
//           </p>
//         </div>

//         {/* booking Section  */}
//         <div className="lg:p-5 pt-5 bg-light-gray lg:shadow-lg border-t border-border lg:border-0 rounded-none  sticky top-25 w-full lg:w-[750px] h-fit  space-y-2 lg:rounded-xl">
//           <h1 className="text-2xl text-foreground font-semibold">
//             Book This Vehicle
//           </h1>
//           <div className="space-y-5">
//             <h4 className="text-base font-semibold text-foreground/80">
//               Rent Type
//             </h4>
//             <div className="flex gap-x-5">
//               {/* With Driver Button */}
//               <button
//                 onClick={() => setActiveOption("driver")}
//                 className={`inline-flex flex-col p-2 w-full border rounded text-xl font-semibold
//           ${
//             activeOption === "driver"
//               ? " text-red bg-red/10 border-border"
//               : "bg-accent/10 text-accent"
//           }
//         `}
//               >
//                 With Driver
//                 <span
//                   className={`text-sm font-normal ${
//                     activeOption === "driver"
//                       ? " text-red border-border"
//                       : "bg-accent/10 text-accent"
//                   }`}
//                 >
//                   +Rs.500/day
//                 </span>
//               </button>

//               {/* Self Drive Button */}
//               <button
//                 onClick={() => setActiveOption("self")}
//                 className={`inline-flex flex-col p-2 w-full border rounded text-xl font-semibold
//           ${
//             activeOption === "self"
//               ? " text-red bg-red/10 border-border"
//               : "bg-accent/10 text-accent"
//           }
//         `}
//               >
//                 Self Drive
//                 <span
//                   className={`text-sm font-normal ${
//                     activeOption === "self"
//                       ? " text-red  border-border"
//                       : "bg-accent/10 text-accent"
//                   }`}
//                 >
//                   License required
//                 </span>
//               </button>
//             </div>
//             <div>
//               <LocationForm />
//             </div>
//             <button className="w-full border text-xl font-semibold text-white bg-red hover:bg-gradient-red rounded p-3">
//               Book Now
//             </button>
//             <button className="w-full border  text-xl font-semibold text-red hover:text-gradient-red rounded p-3">
//               Save for Checkout
//             </button>
//           </div>
//           <div className="text-center text-sm text-background/50 p-3">
//             <p className="flex justify-center  items-center gap-2">
//               <FaRegClock />
//               Instant confirmation
//             </p>
//             <p className="flex justify-center  items-center gap-2">
//               <FaShieldAlt />
//               Free cancellation up to 24h
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleDetails;

import { useState } from "react";
import LocationForm from "../component/locationTime";
import { FaCheckCircle, FaRegClock, FaShieldAlt } from "react-icons/fa";
import { vehiclesData } from "../component/vehiclesData";
import { useParams, useNavigate } from "react-router-dom";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehiclesData.find((v) => v.id.toString() === id);
  const [activeOption, setActiveOption] = useState("driver");
  const [currentImage, setCurrentImage] = useState(0);
  const [locationData, setLocationData] = useState({});
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);

  const handleBooking = () => {
    const bookingData = {
      rentType: activeOption,
      ...locationData,
      licenseNumber,
      licenseFile,
    };

    navigate("/confirm-booking", { state: bookingData });
  };

  if (!vehicle) {
    return <p className="text-center p-10">Vehicle not found.</p>;
  }

  const images = vehicle.image;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="mx-auto h-full max-w-7xl py-10">
      <div className="p-5 xl:p-0 flex flex-wrap lg:flex-nowrap gap-5 justify-between">
        <div className="w-full space-y-2">
          {/* Carousel */}
          <div className="relative w-full h-96 overflow-hidden rounded-xl">
            <img
              src={images[currentImage]}
              alt=""
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
            >
              {"<"}
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
            >
              {">"}
            </button>
          </div>

          <div className="flex justify-between items-center text-justify">
            <div>
              <h1 className="text-2xl font-semibold">{vehicle.title}</h1>
              <p className="font-semibold">4.7 (127 Reviews)</p>
            </div>
            <div className="font-heading">
              <p className="text-xl font-bold text-red">
                {vehicle.pricePerDay}
              </p>
              <p>per day</p>
            </div>
          </div>

          <h2 className="border-t border-border text-xl font-semibold pt-5">
            About Vehicles
          </h2>
          <p className="text-justify">{vehicle.description}</p>
          <h2 className=" text-xl font-semibold pt-5">What's included</h2>
          {/* Features list */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {vehicle.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-green-600 text-sm font-medium"
              >
                <FaCheckCircle size={16} />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Section */}
        <div className="p-5 pt-5 bg-light-gray lg:shadow-lg rounded-xl sticky top-25 w-full lg:w-[750px] h-fit space-y-2 lg:rounded-xl">
          <h1 className="text-2xl text-foreground font-semibold">
            Book This Vehicle
          </h1>
          <div className="space-y-5">
            <h4 className="text-base font-semibold text-foreground/80">
              Rent Type
            </h4>
            <div className="flex gap-x-5">
              {/* With Driver Button */}
              <button
                onClick={() => setActiveOption("driver")}
                className={`inline-flex flex-col p-2 w-full border rounded text-xl font-semibold
                  ${
                    activeOption === "driver"
                      ? "text-red bg-red/10 border-border"
                      : "bg-accent/10 text-accent"
                  }`}
              >
                With Driver
                <span
                  className={`text-sm font-normal ${
                    activeOption === "driver"
                      ? "text-red border-border"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  +Rs.500/day
                </span>
              </button>

              {/* Self Drive Button */}
              <button
                onClick={() => setActiveOption("self")}
                className={`inline-flex flex-col p-2 w-full border rounded text-xl font-semibold
                  ${
                    activeOption === "self"
                      ? "text-red bg-red/10 border-border"
                      : "bg-accent/10 text-accent"
                  }`}
              >
                Self Drive
                <span
                  className={`text-sm font-normal ${
                    activeOption === "self"
                      ? "text-red border-border"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  License required
                </span>
              </button>
            </div>

            {/* Location Form */}
            <div>
              <LocationForm onFormChange={setLocationData} />
            </div>

            {/* License Upload Form (Conditional) */}
            {activeOption === "self" && (
              <div className="mt-5 p-5 border border-red bg-red/10 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">
                  License Verification Required
                </h3>
                <input
                  type="text"
                  value={licenseNumber}
                  placeholder="Enter your license number"
                  className="w-full mb-3 p-2 border rounded"
                />
                <div className="border-dashed border-2 border- p-5 text-center rounded mb-3">
                  <p className="mb-2">Upload License Photo</p>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) =>
                      setLicenseFile(e.target.files?.[0] || null)
                    }
                    className="text-center"
                  />
                </div>
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  <li>License must be valid and not expired</li>
                  <li>Photo should be clear and readable</li>
                  <li>International licenses accepted with translation</li>
                  <li>Minimum age requirement: 21 years</li>
                </ul>
              </div>
            )}

            <button
              onClick={handleBooking}
              className="w-full border text-xl font-semibold text-white bg-red hover:bg-gradient-red rounded p-3"
            >
              Book Now
            </button>
            <button className="w-full border text-xl font-semibold text-red hover:text-gradient-red rounded p-3">
              Save for Checkout
            </button>
          </div>

          <div className="text-center text-sm text-background/50 p-3">
            <p className="flex justify-center items-center gap-2">
              <FaRegClock />
              Instant confirmation
            </p>
            <p className="flex justify-center items-center gap-2">
              <FaShieldAlt />
              Free cancellation up to 24h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
