import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h1 className="text-xl font-bold text-white">
            <span className="text-white">vutung</span><span className="text-red-400">tung</span>
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Your trusted partner for vehicle rentals. Safe, reliable, and affordable.
          </p>
        </div>

        {/* Services */}
        <div>
          <h2 className="font-semibold mb-2">Services</h2>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><Link to="/car-rental" className="hover:underline">Car Rental</Link></li>
            <li><Link to="/bike-rental" className="hover:underline">Bike Rental</Link></li>
            <li><Link to="/truck-rental" className="hover:underline">Truck Rental</Link></li>
            <li><Link to="/e-vehicle" className="hover:underline">E-Vehicle</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="font-semibold mb-2">Company</h2>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/support" className="hover:underline">Support</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold mb-2">Contact</h2>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>24/7 Support</li>
            <li>+1 (555) 123-4567</li>
            <li><a href="mailto:info@vutungtung.com" className="hover:underline">info@vutungtung.com</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © 2024 vutungtung. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
