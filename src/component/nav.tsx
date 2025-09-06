// import { NavLink } from "react-router-dom";
// import { useState, useContext } from "react";
// import { RxCross2 } from "react-icons/rx";
// import { IoMdMenu } from "react-icons/io";
// import { AuthContext } from "../context/AuthContext";
// import { MdLogout } from "react-icons/md";

import { useContext, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// const Nav = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const auth = useContext(AuthContext);

//   if (!auth) {
//     throw new Error("AuthContext is missing. Wrap your app in <AuthProvider>");
//   }

//   const { user, logout } = auth;

//   return (
//     <>
//       {/* Floating Transparent Navbar */}
//       <nav className="bg-white px-5 xl:px-0 shadow w-full z-50 sticky textprimary-500 top-0">
//         <div className="max-w-7xl mx-auto flex items-center justify-between md:px-0 h-19">
//           {/* Logo */}
//           <NavLink
//             to="/"
//             className="font-heading text-xl md:text-2xl lg:text-3xl font-black"
//           >
//             <span className="text-red">VUTUNGTUNG</span>
//             TUNG
//           </NavLink>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-10 font-semibold">
//             {!user && (
//               <>
//                 <NavLink to="/">Home</NavLink>
//                 <NavLink to="/vehicles">Vehicle</NavLink>
//                 <NavLink to="/about">About</NavLink>
//                 <NavLink to="/contact">Contact</NavLink>
//               </>
//             )}

//             {user?.role === "user" && (
//               <>
//                 <NavLink to="/">Home</NavLink>
//                 <NavLink to="/vehicles">Vehicle</NavLink>
//                 <NavLink to="/contact">Contact</NavLink>
//                 <NavLink to="/user-dashboard" onClick={() => setIsOpen(false)}>
//                   Dashboard
//                 </NavLink>
//               </>
//             )}

//             {user?.role === "admin" && (
//               <>
//                 <NavLink to="/admin-dashboard">Admin Dashboard</NavLink>
//               </>
//             )}
//           </div>

//           {/* Desktop Buttons */}
//           <div className="hidden md:flex font-semibold items-center gap-5">
//             {!user ? (
//               <NavLink
//                 className="py-2 px-3 rounded-lg hover:bg-gradient-red bg-red duration-200 w-[8rem] text-center text-white border"
//                 to="/login"
//               >
//                 Sign in
//               </NavLink>
//             ) : (
//               <button
//                 onClick={logout}
//                 className="py-2 px-3 hover:bg-red hover:text-white duration-300 rounded-lg flex justify-center items-center gap-2 bg-gray-200 text-black"
//               >
//                 Logout
//                 <MdLogout size={20} />
//               </button>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="text-foreground duration-300 active:bg-red p-2 rounded-md active:text-white transform transition-transform ease-in-out block md:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <RxCross2 size={24} /> : <IoMdMenu size={24} />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Dropdown */}
//       {setIsOpen && (
//         <div
//           className={`md:hidden fixed top-16 right-0 py-10 h-full w-full bg-white/90 backdrop-blur-xs text-red font-medium flex flex-col p-5 space-y-3 z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${
//             isOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           {!user && (
//             <>
//               <NavLink to="/" onClick={() => setIsOpen(false)}>
//                 Home
//               </NavLink>
//               <NavLink to="/vehicles" onClick={() => setIsOpen(false)}>
//                 Vehicle
//               </NavLink>
//               <NavLink to="/about" onClick={() => setIsOpen(false)}>
//                 About
//               </NavLink>
//               <NavLink to="/contact" onClick={() => setIsOpen(false)}>
//                 Contact
//               </NavLink>
//               <NavLink to="/login" onClick={() => setIsOpen(false)}>
//                 Login
//               </NavLink>
//             </>
//           )}

//           {user?.role === "user" && (
//             <>
//               <NavLink to="/user-dashboard" onClick={() => setIsOpen(false)}>
//                 Dashboard
//               </NavLink>
//               <NavLink to="/" onClick={() => setIsOpen(false)}>
//                 Home
//               </NavLink>
//               <NavLink to="/vehicles" onClick={() => setIsOpen(false)}>
//                 Vehicle
//               </NavLink>
//               <NavLink to="/about" onClick={() => setIsOpen(false)}>
//                 About
//               </NavLink>
//               <NavLink to="/contact" onClick={() => setIsOpen(false)}>
//                 Contact
//               </NavLink>
//               <button
//                 className="py-2 px-3 bg-red text-white duration-300 rounded-lg flex justify-center items-center gap-2"
//                 onClick={() => {
//                   logout();
//                   setIsOpen(false);
//                 }}
//               >
//                 Logout <MdLogout size={20} />
//               </button>
//             </>
//           )}

//           {user?.role === "admin" && (
//             <>
//               <NavLink to="/admin-dashboard" onClick={() => setIsOpen(false)}>
//                 Admin Dashboard
//               </NavLink>
//               <button
//                 onClick={() => {
//                   logout();
//                   setIsOpen(false);
//                 }}
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Nav;
import { RxCross2 } from "react-icons/rx";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext is missing. Wrap your app in <AuthProvider>");
  }

  const { user, logout } = auth;

  // 🚀 Show navbar for guests & users, but hide it for admins
  if (user && user.role === "admin") {
    return null;
  }

  return (
    <>
      {/* Normal User Navbar */}
      <nav className="bg-white  px-5 xl:px-0 shadow w-full z-50 sticky textprimary-500 top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between md:px-0 h-19">
          {/* Logo */}
          <NavLink
            to="/"
            className="font-heading text-xl md:text-2xl lg:text-3xl font-black"
          >
            <span className="text-red">VUTUNGTUNG</span>TUNG
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 font-semibold">
            {!user && (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/vehicles">Vehicle</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </>
            )}

            {user?.role === "user" && (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/vehicles">Vehicle</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/user-dashboard">Dashboard</NavLink>
              </>
            )}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex font-semibold items-center gap-5">
            {!user ? (
              <NavLink
                className="py-2 px-3 rounded-lg hover:bg-gradient-red bg-red duration-200 w-[8rem] text-center text-white border"
                to="/login"
              >
                Sign in
              </NavLink>
            ) : (
              <button
                onClick={logout}
                className="py-2 px-3 hover:bg-red hover:text-white duration-300 rounded-lg flex justify-center items-center gap-2 bg-gray-200 text-black"
              >
                Logout
                <MdLogout size={20} />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-foreground duration-300 active:bg-red p-2 rounded-md active:text-white transform transition-transform ease-in-out block md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <RxCross2 size={24} /> : <IoMdMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden fixed top-16 right-0 py-10 h-full w-full bg-white/90 backdrop-blur-xs text-red font-medium flex flex-col p-5 space-y-3 z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {!user && (
            <>
              <NavLink to="/" onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/vehicles" onClick={() => setIsOpen(false)}>
                Vehicle
              </NavLink>
              <NavLink to="/about" onClick={() => setIsOpen(false)}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </NavLink>
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                Login
              </NavLink>
            </>
          )}

          {user?.role === "user" && (
            <>
              <NavLink to="/user-dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink to="/" onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/vehicles" onClick={() => setIsOpen(false)}>
                Vehicle
              </NavLink>
              <NavLink to="/about" onClick={() => setIsOpen(false)}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </NavLink>
              <button
                className="py-2 px-3 bg-red text-white duration-300 rounded-lg flex justify-center items-center gap-2"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                Logout <MdLogout size={20} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Nav;
