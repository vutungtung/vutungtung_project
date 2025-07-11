export const Contact = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl h-[900px]  mx-auto py-10">
        <div className="grid h-full shadow-xl bg-white rounded-2xl overflow-hidden  grid-cols-2">
          <div className="relative ">
            <div className="absolute inset-0 z-50 h-full  w-auto  ">
              <img
                src="public/image/contact-image.webp"
                alt="image"
                className="h-full object-cover"
              />
            </div>
            <h1>Get in Touch</h1>
            <p>
              We're here to help you with any questions about our vehicle rental
              services.
            </p>
          </div>
          <div className="flex flex-col p-15 space-y-3 justify-center">
            <h1 className="text-3xl font-bold">Send us a Message</h1>
            <p className="text-gray-500">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
