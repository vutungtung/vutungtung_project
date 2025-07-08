import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import About from "./pages/about";
import Vehicle from "./pages/vehicle";
import Navbar from "./component/nav";
import { Contact } from "./pages/contact";
import Booking from "./pages/booking";
import Footer from "./component/footer";
import AuthForm from "./auth/signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer/>
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
      {
        path: "/auth",
        element: (
          <>
            <AuthForm />
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
