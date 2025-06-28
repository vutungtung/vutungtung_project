import { NavLink } from "react-router-dom";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdMenu } from "react-icons/io";

const Nav = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <>
      {/* Floating Transparent Navbar */}
      <nav className="fixed  bg-secondary top-0 left-0 w-full z-50   ">
        <div className="max-w-[1290px] mx-auto flex items-center  justify-between text-white px-4 md:px-0 h-16">
          {/* Logo */}
          <NavLink to="/" className="font-main text-2xl font-black text-white">
            vutungtung
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 font-semibold">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-accent" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/vehicle"
              className={({ isActive }) => (isActive ? "text-accent" : "")}
            >
              Vehicle
            </NavLink>
            <NavLink
              to="/booking"
              className={({ isActive }) => (isActive ? "text-accent" : "")}
            >
              Booking
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "text-primary" : "")}
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "text-accent" : "")}
            >
              Contact
            </NavLink>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-5">
            <NavLink to="">Login</NavLink>
            <NavLink to=""> SignUp</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-white block md:hidden"
            onClick={() => setisOpen(!isOpen)}
          >
            {isOpen ? <RxCross2 size={24} /> : <IoMdMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden w-full bg-black/80 backdrop-blur-md text-white font-normal flex flex-col p-5 space-y-3 absolute top-16 left-0 z-40 shadow-lg">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Vehicle
          </NavLink>
          <NavLink
            to="/booking"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Booking
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            About Us
          </NavLink>
          <NavLink
            to=""
            className="bg-primary text-white py-2 px-4 rounded text-center"
          >
            Register
          </NavLink>
        </div>
      )}
    </>
  );
};
export default Nav;
