import { useState } from "react";
import LocationForm from "../component/locationTime";
import { FaRegClock, FaShieldAlt } from "react-icons/fa";

const VehicleDetails = () => {
  const [activeOption, setActiveOption] = useState("driver");

  return (
    <div className="mx-auto h-full max-w-7xl py-10">
      <div className="p-5 xl:p-0 flex flex-wrap lg:flex-nowrap gap-5 justify-between">
        <div className="w-full space-y-2">
          <img
            src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&height=900&width=1600&fit=bounds"
            alt=""
          />
          <div className="flex justify-between items-center text-justify">
            <div>
              <h1 className="text-2xl font-semibold">Honda CR-V</h1>
              <p className="font-semibold">4.7 (127 Reviews)</p>
            </div>
            <div>
              <p>$65</p>
              <p>per day</p>
            </div>
          </div>
          <div></div>
          <h2 className="border-t border-border text-xl font-semibold pt-5">
            About Vehicles
          </h2>
          <p className="text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
            quisquam, repellendus eos facilis, veniam reiciendis praesentium
            commodi molestias rerum explicabo similique?
          </p>
        </div>

        {/* booking Section  */}
        <div className="lg:p-5 pt-5 lg:shadow-lg border-t border-border lg:border-0 rounded-none  sticky top-25 w-full lg:w-[750px] h-fit  space-y-2 lg:rounded-xl">
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
              ? "bg-accent/10 text-accent"
              : " text-foreground border-border"
          }
        `}
              >
                With Driver
                <span
                  className={`text-sm font-normal ${
                    activeOption === "driver"
                      ? "text-foreground/50"
                      : " text-foreground/50"
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
              ? "bg-accent/10 text-accent"
              : " text-foreground border-border"
          }
        `}
              >
                Self Drive
                <span
                  className={`text-sm font-normal ${
                    activeOption === "self"
                      ? "text-foreground/50"
                      : " text-foreground/50"
                  }`}
                >
                  License required
                </span>
              </button>
            </div>
            <div>
              <LocationForm />
            </div>
            <button className="w-full border text-xl font-semibold text-white bg-primary-500 rounded p-3">
              Book Now
            </button>
            <button className="w-full border  text-xl font-semibold text-primary-500 rounded p-3">
              Save for Checkout
            </button>
          </div>
          <div className="text-center text-sm text-background/50 p-3">
            <p className="flex justify-center  items-center gap-2">
              <FaRegClock />
              Instant confirmation
            </p>
            <p className="flex justify-center  items-center gap-2">
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
