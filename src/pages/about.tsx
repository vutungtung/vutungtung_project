const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <section className="bg-green-800 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">About VuTungTung</h1>
        <p className="text-lg mt-4 max-w-2xl mx-auto">
          We’re passionate about providing reliable, affordable, and convenient
          vehicle rental services that help you explore the world on your terms.
        </p>
      </section>

      {/* Stats */}
      <section className="bg-white py-10 grid grid-cols-2 md:grid-cols-4 text-center max-w-5xl mx-auto gap-6">
        {[
          ["50,000+", "Happy Customers"],
          ["500+", "Vehicles Available"],
          ["15+", "Years of Experience"],
          ["Always", "24/7 Support"],
        ].map(([stat, label]) => (
          <div key={label}>
            <div className="text-yellow text-3xl font-bold">{stat}</div>
            <div className="text-sm mt-2">{label}</div>
          </div>
        ))}
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2009, VuTungTung started with a simple mission: to make
              vehicle rental accessible, affordable, and hassle-free for
              everyone. What began as a small local business has grown into a
              trusted name in the transportation industry.
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              We believe that mobility should never be a barrier to your
              adventures, business needs, or daily life. That’s why we’ve built
              a diverse fleet of well-maintained vehicles and a customer-centric
              team that’s available around the clock.
            </p>
          </div>
          <div className="bg-gray-300 w-full h-60 rounded-md flex items-center justify-center">
            <span className="text-gray-500">[Image Placeholder]</span>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
        <p className="text-gray-600 mb-10">
          The principles that guide everything we do
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            [
              "Safety First",
              "Every vehicle in our fleet undergoes rigorous safety inspections.",
            ],
            [
              "Customer Focused",
              "Your satisfaction is our priority. We listen to your needs.",
            ],
            [
              "Excellence",
              "We strive for excellence in every aspect of our service.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-gray-50 border border-gray-200 p-6 rounded-md shadow-sm"
            >
              <h3 className="text-lg font-semibold text-yellow">{title}</h3>
              <p className="text-sm text-gray-600 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Meet Our Team</h2>
        <p className="text-gray-600 mb-10">
          The people behind your great rental experience
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            [
              "Pyarjan Thapa",
              "CEO & Founder",
              "15+ years in the automotive industry",
            ],
            [
              "Sujan Pokharal",
              "Operations Manager",
              "Expert in fleet management and standards",
            ],
            [
              "Bishwash Rijal",
              "Customer Success",
              "Exceptional customer experiences 24/7",
            ],
            [
              "Bishal Parajuli",
              "Customer Success",
              "Exceptional customer experiences 24/7",
            ],
          ].map(([name, role, desc]) => (
            <div
              key={name}
              className="bg-white shadow p-6 rounded-md text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4" />
              <h3 className="font-bold">{name}</h3>
              <p className="text-sm text-yellow">{role}</p>
              <p className="text-xs text-gray-600 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
