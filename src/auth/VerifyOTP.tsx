import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import BackButton from "../component/navigate";

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type OTPFormData = z.infer<typeof otpSchema>;

export const VerifyOTP = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = (data: OTPFormData) => {
    console.log("OTP Entered:", data.otp);
    const isValid = data.otp === "123456"; // temporary for testing
    if (isValid) navigate("/verify-success");
    else navigate("/verify-failed");
  };

  return (
    <div className="bg-light-gray min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-3xl mx-auto py-10">
        <BackButton />
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center space-y-6">
          <h1 className="text-3xl font-bold text-black">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            Enter the 6-digit code sent to your email.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              {...register("otp")}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red outline-0"
            />
            {errors.otp && (
              <p className="text-red text-sm">{errors.otp.message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-red hover:bg-gradient-red text-white py-3 px-6 rounded-xl font-semibold"
            >
              Verify OTP
            </button>
          </form>
          <button className="text-sm text-red hover:underline">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};
