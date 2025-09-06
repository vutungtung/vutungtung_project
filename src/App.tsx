// import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import "./App.css";
// import Home from "./pages/home";
// import About from "./pages/about";
// import Vehicle from "./pages/vehicle";
// import Navbar from "./component/nav";
// import { Contact } from "./pages/contact";
// import Footer from "./component/footer";
// import VehicleDetails from "./pages/vehicleDetails";
// import { Login } from "./auth/login";
// import { ForgotPassword } from "./auth/ForgotPassword";
// import { Signup } from "./auth/signup";
// import { VerifyOTP } from "./auth/VerifyOTP";
// import { ResetPasswordOTP } from "./auth/ResetPasswordOTP";
// import { VerifySuccess } from "./auth/VerifySuccess";
// import { VerifyFailed } from "./auth/VerifyFailed";
// import ScrollToTop from "./component/ScrollToTop";
// import AdminDashboard from "./pages/AdminDashboard";
// import Overview from "./component/AdminDashboard/Overview";
// import UserDashboard from "./pages/UserDashboard";
// import ConfirmBooking from "./pages/ConfirmBooking";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <>
//         <ScrollToTop />
//         <Navbar />
//         <Outlet />
//         <Footer />
//       </>
//     ),
//     children: [
//       {
//         path: "/",
//         element: (
//           <>
//             <Home />
//           </>
//         ),
//       },
//       {
//         path: "/about",
//         element: (
//           <>
//             <About />
//           </>
//         ),
//       },
//       {
//         path: "/vehicles",
//         element: (
//           <>
//             <Vehicle />
//           </>
//         ),
//       },

//       {
//         path: "/vehicles/:id",
//         element: (
//           <>
//             <VehicleDetails />
//           </>
//         ),
//       },
//       {
//         // path: "/confirm-booking/:vehicleId/:categoryId/:bookingId",
//         path: "/confirm-booking/:bookingData",
//         element: (
//           <>
//             <ConfirmBooking />
//           </>
//         ),
//       },
//       {
//         path: "/contact",
//         element: (
//           <>
//             <Contact />
//           </>
//         ),
//       },
//       {
//         path: "/user-dashboard",
//         element: (
//           <>
//             <UserDashboard />
//           </>
//         ),
//       },
//     ],
//   },

//   {
//     path: "/login",
//     element: (
//       <>
//         <Login />
//       </>
//     ),
//   },
//   {
//     path: "/signup",
//     element: (
//       <>
//         <Signup />
//       </>
//     ),
//   },
//   {
//     path: "/forgot-password",
//     element: (
//       <>
//         <ForgotPassword />
//       </>
//     ),
//   },
//   {
//     path: "/verify-otp",
//     element: (
//       <>
//         <VerifyOTP />
//       </>
//     ),
//   },
//   {
//     path: "/reset-password-otp",
//     element: (
//       <>
//         <ResetPasswordOTP />
//       </>
//     ),
//   },
//   {
//     path: "/verify-success",
//     element: (
//       <>
//         <VerifySuccess />
//       </>
//     ),
//   },
//   {
//     path: "/verify-failed",
//     element: (
//       <>
//         <VerifyFailed />
//       </>
//     ),
//   },
//   {
//     path: "/admin-dashboard",
//     element: (
//       <>
//         <AdminDashboard />
//       </>
//     ),
//   },
//   {
//     path: "/overview",
//     element: (
//       <>
//         <Overview />
//       </>
//     ),
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import About from "./pages/about";
import Vehicle from "./pages/vehicle";
import Navbar from "./component/nav";
import { Contact } from "./pages/contact";
import Footer from "./component/footer";
import VehicleDetails from "./pages/vehicleDetails";
import { Login } from "./auth/login";
import { ForgotPassword } from "./auth/ForgotPassword";
import { Signup } from "./auth/signup";
import { VerifyOTP } from "./auth/VerifyOTP";
import { ResetPasswordOTP } from "./auth/ResetPasswordOTP";
import { VerifySuccess } from "./auth/VerifySuccess";
import { VerifyFailed } from "./auth/VerifyFailed";
import ScrollToTop from "./component/ScrollToTop";
import AdminDashboard from "./pages/AdminDashboard";
import Overview from "./component/AdminDashboard/Overview";
import UserDashboard from "./pages/UserDashboard";
import ConfirmBooking from "./pages/ConfirmBooking";
import PrivateRoute from "./context/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/vehicles", element: <Vehicle /> },
      { path: "/vehicles/:id", element: <VehicleDetails /> },
      {
        path: "/confirm-booking/:bookingData",
        element: (
          <PrivateRoute role="user">
            <ConfirmBooking />
          </PrivateRoute>
        ),
      },
      { path: "/contact", element: <Contact /> },

      // User protected route
      {
        path: "/user-dashboard",
        element: (
          <PrivateRoute role="user">
            <UserDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Public auth routes
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-otp", element: <VerifyOTP /> },
  { path: "/reset-password-otp", element: <ResetPasswordOTP /> },
  { path: "/verify-success", element: <VerifySuccess /> },
  { path: "/verify-failed", element: <VerifyFailed /> },

  // Admin protected routes
  {
    path: "/admin-dashboard",
    element: (
      <PrivateRoute role="admin">
        <AdminDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/overview",
    element: (
      <PrivateRoute role="admin">
        <Overview />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
