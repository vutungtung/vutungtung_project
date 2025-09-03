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
import ConfirmBooking from "./pages/ConfirmBooking";
import AdminDashboard from "./pages/AdminDashboard";
import Overview from "./component/AdminDashboard/Overview";

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
      {
        path: "/",
        element: (
          <>
            <Home />
          </>
        ),
      },
      {
        path: "/about",
        element: (
          <>
            <About />
          </>
        ),
      },
      {
        path: "/vehicles",
        element: (
          <>
            <Vehicle />
          </>
        ),
      },

      {
        path: "/vehicles/:id",
        element: (
          <>
            <VehicleDetails />
          </>
        ),
      },
      {
        path: "/confirm-booking/",
        element: (
          <>
            <ConfirmBooking />
          </>
        ),
      },
      {
        path: "/contact",
        element: (
          <>
            <Contact />
          </>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <>
        <ForgotPassword />
      </>
    ),
  },
  {
    path: "/verify-otp",
    element: (
      <>
        <VerifyOTP />
      </>
    ),
  },
  {
    path: "/reset-password-otp",
    element: (
      <>
        <ResetPasswordOTP />
      </>
    ),
  },
  {
    path: "/verify-success",
    element: (
      <>
        <VerifySuccess />
      </>
    ),
  },
  {
    path: "/verify-failed",
    element: (
      <>
        <VerifyFailed />
      </>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <>
        <AdminDashboard />
      </>
    ),
  },
  {
    path: "/overview",
    element: (
      <>
        <Overview />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
