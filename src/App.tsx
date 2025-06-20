import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import About from "./pages/about";
import Vehicle from "./pages/vehicle";
import Navbar from "./component/nav";
import { Contact } from "./pages/contact";
import Booking from "./pages/booking";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
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
        path: "/vehicle",
        element: (
          <>
            <Vehicle />
          </>
        ),
      },
      {
        path: "/booking",
        element: (
          <>
            <Booking />
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
