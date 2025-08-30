import { NavLink } from "react-router-dom";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdMenu } from "react-icons/io";

const Nav = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <>
      {/* Floating Transparent Navbar */}
      <nav className=" bg-white px-5 xl:px-0 shadow w-full z-50 sticky textprimary-500 top-0">
        <div className="max-w-7xl mx-auto flex items-center  justify-between  md:px-0 h-19">
          {/* Logo */}
          <NavLink
            to="/"
            className="font-heading text-xl md:text-2xl lg:text-3xl font-black"
          >
            <span className="text-red">VUTUNGTUNG</span>
            TUNG
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 font-semibold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-red border-b-3 w-14 inline-flex justify-center items-center p-"
                  : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/vehicles"
              className={({ isActive }) =>
                isActive
                  ? "text-red border-b-3 w-14 inline-flex justify-center items-center p-"
                  : ""
              }
            >
              Vehicle
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-red border-b-3 w-14 inline-flex justify-center items-center p-"
                  : ""
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-red border-b-3 w-14 inline-flex justify-center items-center p-"
                  : ""
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex font-semibold items-center gap-5">
            <NavLink
              className="py-2 px-3 rounded-lg hover:bg-gradient-red bg-red duration-200 w-[8rem] text-center text-white border"
              to="/login"
            >
              Sign in
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-foreground duration-300 active:bg-red p-2 rounded-md  active:text-white  transform transition-transform ease-in-out  block md:hidden"
            onClick={() => setisOpen(!isOpen)}
          >
            {isOpen ? <RxCross2 size={24} /> : <IoMdMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {setisOpen && (
        <div
          className={`md:hidden fixed  top-16 h-full w-full bg-gradientRed/80 backdrop-blur-xs text-red font-medium flex flex-col p-5 space-y-3 z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-foreground" : "")}
            onClick={() => setisOpen(!isOpen)}
          >
            Home
          </NavLink>
          <NavLink
            to="/vehicles"
            className={({ isActive }) => (isActive ? "text-foreground" : "")}
            onClick={() => setisOpen(!isOpen)}
          >
            Vehicle
          </NavLink>
          {/* <NavLink
            to="/booking"
            className={({ isActive }) => (isActive ? "text-foreground" : "")}
            onClick={() => setisOpen(!isOpen)}
          >
            Booking
          </NavLink> */}
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "text-foreground" : "")}
            onClick={() => setisOpen(!isOpen)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-foreground" : "")}
            onClick={() => setisOpen(!isOpen)}
          >
            About Us
          </NavLink>
          <NavLink
            to="/login"
            className="bg-primary text-red border bg-white/30 py-2 px-4 rounded text-center"
          >
            Login / Register
          </NavLink>
        </div>
      )}
    </>
  );
};
export default Nav;
