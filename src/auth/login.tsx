import { useState, useContext, useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { RiHome5Line } from "react-icons/ri";
import api from "../lib/api";
import { z } from "zod";
import { AuthContext } from "../context/AuthContext";
import type { User } from "../context/AuthProvider";

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
};

type LoginResponse = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  token?: string;
};

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Helper functions
const generateNameFromEmail = (email: string): string => {
  if (!email) return "User";
  const username = email.split("@")[0];
  return username
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const Login = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext) as AuthContextType;
  if (!auth) throw new Error("AuthContext is missing");

  const { login, user } = auth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Prevent accessing /login if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/user-dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    try {
      setLoading(true);

      // 1. First, authenticate the user
      const resp = await api.post<LoginResponse>("/userlogin", {
        email,
        password,
      });

      console.log("Login response:", resp.data);

      // 2. Try to fetch complete user details using the user ID
      let userDetails = resp.data;

      if (resp.data.id) {
        try {
          // Fetch complete user details from the user endpoint
          const userResponse = await fetch(
            `http://localhost:4000/user/${resp.data.id}`
          );

          if (userResponse.ok) {
            const userDataFromApi = await userResponse.json();
            userDetails = { ...resp.data, ...userDataFromApi };
            console.log("Complete user details:", userDetails);
          }
        } catch (fetchError) {
          console.error("Failed to fetch user details:", fetchError);
        }
      }

      // 3. Create user data with proper fallbacks
      const userData: User = {
        id: userDetails.id || `user-${Date.now()}`,
        name: userDetails.name || generateNameFromEmail(email),
        email: userDetails.email || email,
        role: userDetails.role || "user",
        token: userDetails.token || "",
      };

      login(userData);

      if (userData.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/user-dashboard", { replace: true });
      }
    } catch (err: unknown) {
      console.error("Login error:", err);

      let serverMsg: string | null = null;

      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosErr = err as {
          response?: {
            data?: { message?: string; error?: string } | string;
          };
        };

        const data = axiosErr.response?.data;

        if (typeof data === "string") {
          serverMsg = data;
        } else {
          serverMsg = data?.message || data?.error || null;
        }
      }

      setError(serverMsg || "Failed to login. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light-gray min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-7xl mx-auto py-10">
        <div className="mb-3">
          <NavLink
            className="font-semibold flex items-center text-gradient-red gap-2"
            to={"/"}
          >
            <RiHome5Line size={20} />
            <strong>Home</strong>
          </NavLink>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] shadow-xl bg-white rounded-2xl overflow-hidden">
          <div className="relative overflow-hidden h-64 lg:h-auto">
            <img
              src="/image/img-3.png"
              alt="login"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 z-10 w-full text-white bg-gradient-red/50 p-4 rounded-l-xl">
              <h1 className="text-2xl lg:text-4xl font-bold">Welcome Back</h1>
              <p className="text-sm lg:text-lg max-w-sm">
                Log in to continue booking vehicles quickly and securely.
              </p>
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-10 lg:p-12 space-y-5 justify-center bg-[#FFFFFF]">
            <h1 className="text-2xl sm:text-3xl font-bold black">
              Login to Your Account
            </h1>

            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {error && <p className="text-red-600 mt-2">{error}</p>}
            </form>

            <div className="flex justify-between text-sm text-gray-600">
              <Link to="/forgot-password" className="hover:underline">
                Forgot Password?
              </Link>
              <Link to="/signup" className="text-red hover:underline">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
