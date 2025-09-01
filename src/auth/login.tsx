import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BackButton from "../component/navigate";
import { Link } from "react-router-dom";

// ✅ Login Validation Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
    // 👉 send login request to API
  };

  return (
    <div className="bg-light-gray min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-7xl mx-auto py-10">
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] shadow-xl bg-white rounded-2xl overflow-hidden">
          {/* Left Side Image */}
          <div className="relative h-64 lg:h-auto">
            <img
              src="https://cdn.leonardo.ai/users/681f98f9-2358-4fde-a8ae-88bf5a7c51e8/generations/aaefcf57-622c-4433-b1ed-5b4d95b8c94e/segments/1:4:1/Lucid_Origin_A_minimalist_and_clean_website_login_page_The_bac_0.jpg"
              alt="login"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 z-10 text-red bg-white/70 lg:bg-transparent p-4 rounded-l-xl">
              <h1 className="text-2xl lg:text-4xl font-bold">Welcome Back</h1>
              <p className="text-sm lg:text-lg max-w-sm">
                Log in to continue booking vehicles quickly and securely.
              </p>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="flex flex-col p-6 sm:p-10 lg:p-12 space-y-5 justify-center bg-[#FFFFFF]">
            <h1 className="text-2xl sm:text-3xl font-bold black">
              Login to Your Account
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-red hover:bg-gradient-red text-white py-3 px-6 rounded-xl font-semibold transition"
              >
                Login
              </button>
            </form>

            {/* Links */}
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
