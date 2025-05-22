
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
      <div className="bg-black ">
         <div className="flex justify-center space-x-9 font-semibold p-3 ">
         <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : " text-[#2563EB]"
          }
        >
          Home
        </NavLink>
         <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : " text-[#2563EB]"
          }
        >
          About Us
        </NavLink>
         <NavLink
          to="/vehicle"
          className={({ isActive }) =>
            isActive ?"text-blue-400" : " text-[#2563EB]"
          }
        >
          Vehicle
        </NavLink>
         <NavLink
          to="/customersupport"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : " text-[#2563EB]"
          }
        >
         CustomerSupport
        </NavLink>
       </div>
      </div>
   
      </nav>
    </>
  );
};
export default Nav;
