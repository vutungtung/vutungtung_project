import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import BackButton from "../component/navigate";

const resetSchema = z
  .object({
    otp: z.string().length(6, "OTP must be 6 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFormData = z.infer<typeof resetSchema>;

export const ResetPasswordOTP = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = (data: ResetFormData) => {
    console.log("Reset Password OTP Data:", data);
    // 👉 call backend to verify OTP & reset password
    navigate("/verify-success");
  };

  return (
    <div className="bg-light-gray min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-3xl mx-auto py-10">
        <BackButton />
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center space-y-6">
          <h1 className="text-3xl font-bold text-black">Reset Password</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              {...register("otp")}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-0 focus:ring-red"
            />
            {errors.otp && (
              <p className="text-red text-sm">{errors.otp.message}</p>
            )}

            <input
              type="password"
              placeholder="New Password"
              {...register("password")}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-0 focus:ring-red"
            />
            {errors.password && (
              <p className="text-red text-sm">{errors.password.message}</p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-0 focus:ring-red"
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
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
