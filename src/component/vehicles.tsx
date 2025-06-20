// components/Vehicles.jsx
const allVehicles = [
  { name: "McLaren 720s", price: "$420/day", image: "/image/mclaren.jpg", type: "Car", category: "Sport" },
  { name: "Bentley GT V8", price: "$380/day", image: "/image/bentley.jpg", type: "Car", category: "Luxury" },
  { name: "Rolls-Royce Spectre", price: "$400/day", image: "/image/rolls.jpg", type: "Car", category: "Luxury" },
  { name: "Ferrari", price: "$380/day", image: "/image/ferrari.jpg", type: "Car", category: "Sport" },
  { name: "Ninja 400", price: "$90/day", image: "/image/ninja.jpg", type: "Bike", category: "Sport" },
  { name: "Scooty EV", price: "$40/day", image: "/image/scooty.jpg", type: "Scooter", category: "Economy" },
  { name: "Family Van", price: "$120/day", image: "/image/van.jpg", type: "Van", category: "Family" },
];

type Filters = {
  type?: string;
  category?: string;
  search?: string;
};

export default function Vehicles({ filters }: { filters: Filters }) {
  const filteredVehicles = allVehicles.filter((v) => {
    return (
      (!filters.type || v.type === filters.type) &&
      (!filters.category || v.category === filters.category) &&
      (!filters.search || v.name.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold mb-10 text-center">Vehicles</h2>
      {filteredVehicles.length === 0 ? (
        <p className="text-center text-gray-500">No vehicles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredVehicles.map((vehicle, index) => (
            <div key={index} className="bg-white shadow p-4 rounded text-center">
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-40 object-contain mb-4" />
              <h3 className="font-semibold text-lg">{vehicle.name}</h3>
              <p className="text-gray-600">{vehicle.price}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
