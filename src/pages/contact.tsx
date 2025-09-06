export const Contact = () => {
  return (
    <div className="bg-white min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-7xl mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] shadow-xl bg-white rounded-2xl overflow-hidden">
          {/* Left Side with Image */}
          <div className="relative h-64 overflow-hidden lg:h-auto">
            <img
              src="/image/image-7.png"
              alt="image"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6  lg:bottom-8 lg:left-8 z-10 w-full text-white bg-gradient-red/50  p-4 rounded-l-xl ">
              <h1 className="text-2xl lg:text-4xl font-bold">Get in Touch</h1>
              <p className="text-sm  lg:text-lg max-w-sm">
                We're here to help you with any questions about our vehicle
                rental services.
              </p>
            </div>
          </div>

          {/* Right Side with Form */}
          <div className="flex flex-col p-6 sm:p-10 lg:p-12 space-y-5 justify-center bg-white">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              Send us a Message
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            {/* Form */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red"
              />
              <textarea
                placeholder="Your Message"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red"
                rows={4}
              ></textarea>
              <button
                type="submit"
                className="w-full bg-red hover:bg-gradient-red text-white py-3 px-6 rounded-xl font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
