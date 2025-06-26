export default function WhyChooseUs() {
  return (
    <div className="mt-15 mb-15  max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mb-14 flex flex-col items-center ">
        <h1 className="text-2xl sm:text-3xl text-center  md:text-5xl  font-bold leading-tight md:leading-snug">
          Flexible rentals, unbeatable prices
        </h1>
        <p className="text-3xl">—explore the city your way!</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 ">
        <div className=" bg-[#98A1BC]/30 rounded-xl p-5 shadow-2xl text-center flex flex-col justify-center items-center">
          <img src="/image/carvector.svg" alt="car-vector-img" />
          <h2 className="text-2xl mb-3 font-semibold ">
            Well maintained vehicles
          </h2>
          <p className="text-gray-700 font-normal">
            All our vehicles are well-maintained and regularly serviced,
            ensuring safe and smooth driving.
          </p>
        </div>
        <div className=" bg-[#98A1BC]/30 rounded-xl p-5 shadow-2xl text-center flex flex-col justify-center items-center">
          <img src="/image/bookingvector.svg" alt="booking-vector-img" />
          <h2 className="text-2xl mb-3 font-semibold ">Easy online booking</h2>
          <p className="text-gray-700 font-normal">
            Book your vehicles in minutes with our user-friendly online
            platform. Fast, simple, and convenient!
          </p>
        </div>
        <div className=" bg-[#98A1BC]/30 rounded-xl p-5 shadow-2xl text-center flex flex-col justify-center items-center">
          <img src="/image/pricingvector.svg" alt="pricing-vector-img" />
          <h2 className="text-2xl mb-3 font-semibold ">Affordable pricing</h2>
          <p className="text-gray-700 font-normal">
            Enjoy competitive rates with no hidden fees. Rent the perfect car
            without breaking the bank.
          </p>
        </div>
        <div className=" bg-[#98A1BC]/30 rounded-xl p-5 shadow-2xl text-center flex flex-col justify-center items-center">
          <img src="/image/supportvector.svg" alt="support-vector-img" />
          <h2 className="text-2xl mb-3 font-semibold ">24/7 support</h2>
          <p className="text-gray-700 font-normal">
            We’re here to assist you anytime, anywhere. Drive with peace of mind
            knowing help is just a call away.
          </p>
        </div>
      </div>
    </div>
  );
}
