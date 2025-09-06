// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useNavigate } from "react-router-dom";
// import BackButton from "../component/navigate";
// import { Link } from "react-router-dom";

// const signupSchema = z
//   .object({
//     name: z.string().min(3, "Name must be at least 3 characters"),
//     email: z.string().email("Invalid email address"),
//     password: z
//       .string()
//       .min(6, "Password must be at least 6 characters")
//       .regex(/[A-Z]/, "Password must contain an uppercase letter")
//       .regex(/[0-9]/, "Password must contain a number"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type SignupFormData = z.infer<typeof signupSchema>;

// export const Signup = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignupFormData>({
//     resolver: zodResolver(signupSchema),
//   });

//   const onSubmit = (data: SignupFormData) => {
//     console.log("Signup Data:", data);
//     // 👉 call backend to create user & send OTP
//     navigate("/verify-otp"); // redirect to OTP verification
//   };

//   return (
//     <div className="bg-light-gray min-h-screen flex justify-center items-center px-4">
//       <div className="w-full max-w-7xl mx-auto py-10">
//         <BackButton />
//         <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] shadow-xl bg-white rounded-2xl overflow-hidden">
//           {/* Left Image */}
//           <div className="relative overflow-hidden h-64 lg:h-auto">
//             <img
//               src="/image/image-5.png"
//               alt="signup"
//               className="absolute inset-0 h-full w-full object-cover"
//             />
//             <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 z-10 w-full text-white bg-gradient-red/50 p-4 rounded-l-xl">
//               <h1 className="text-2xl lg:text-4xl font-bold">Join Us</h1>
//               <p className="text-sm lg:text-lg max-w-sm">
//                 Create your account to book vehicles quickly and easily.
//               </p>
//             </div>
//           </div>

//           {/* Right Form */}
//           <div className="flex flex-col p-6 sm:p-10 lg:p-12 space-y-5 justify-center bg-white">
//             <h1 className="text-2xl sm:text-3xl font-bold text-black">
//               Create an Account
//             </h1>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 {...register("name")}
//                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red outline-0"
//               />
//               {errors.name && (
//                 <p className="text-red text-sm">{errors.name.message}</p>
//               )}

//               <input
//                 type="email"
//                 placeholder="Email"
//                 {...register("email")}
//                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red outline-0"
//               />
//               {errors.email && (
//                 <p className="text-red text-sm">{errors.email.message}</p>
//               )}

//               <input
//                 type="password"
//                 placeholder="Password"
//                 {...register("password")}
//                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red outline-0"
//               />
//               {errors.password && (
//                 <p className="text-redtext-sm">{errors.password.message}</p>
//               )}

//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 {...register("confirmPassword")}
//                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red outline-0"
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red text-sm">
//                   {errors.confirmPassword.message}
//                 </p>
//               )}

//               <button
//                 type="submit"
//                 className="w-full bg-red hover:bg-gradient-red text-white py-3 px-6 rounded-xl font-semibold"
//               >
//                 Sign Up
//               </button>
//             </form>

//             <p className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-red hover:underline font-medium"
//               >
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import BackButton from "../component/navigate";
import { Link } from "react-router-dom";

const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const API_URL =
        "https://68b7d508b7154050432608f0.mockapi.io/vehicles/users";
      // Replace with your real backend URL later

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
            data.name
          )}`,
          token: "mock-token", // placeholder
        }),
      });

      if (!response.ok) throw new Error("Failed to create account");

      const createdUser = await response.json();
      console.log("User created:", createdUser);

      // Redirect to OTP verification or login
      navigate("/verify-otp");
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="bg-light-gray min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-7xl mx-auto py-10">
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] shadow-xl bg-white rounded-2xl overflow-hidden">
          {/* Left Image */}
          <div className="relative overflow-hidden h-64 lg:h-auto">
            <img
              src="/image/image-5.png"
              alt="signup"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 z-10 w-full text-white bg-gradient-red/50 p-4 rounded-l-xl">
              <h1 className="text-2xl lg:text-4xl font-bold">Join Us</h1>
              <p className="text-sm lg:text-lg max-w-sm">
                Create your account to book vehicles quickly and easily.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex flex-col p-6 sm:p-10 lg:p-12 space-y-5 justify-center bg-white">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              Create an Account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                {...register("name")}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red outline-0"
              />
              {errors.name && (
                <p className="text-red text-sm">{errors.name.message}</p>
              )}

              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red outline-0"
              />
              {errors.email && (
                <p className="text-red text-sm">{errors.email.message}</p>
              )}

              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red outline-0"
              />
              {errors.password && (
                <p className="text-red text-sm">{errors.password.message}</p>
              )}

              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red outline-0"
              />
              {errors.confirmPassword && (
                <p className="text-red text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-red hover:bg-gradient-red text-white py-3 px-6 rounded-xl font-semibold"
              >
                Sign Up
              </button>
            </form>

            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
