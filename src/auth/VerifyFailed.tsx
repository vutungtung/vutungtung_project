import { useNavigate } from "react-router-dom";

export const VerifyFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-light-gray">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center space-y-4">
        <h1 className="text-3xl font-bold text-red">
          Verification Failed!
        </h1>
        <p className="text-gray-600">
          Invalid or expired OTP. Please try again.
        </p>
        <button
          onClick={() => navigate("/verify-otp")}
          className="mt-4 bg-red hover:bg-gradient-red text-white py-3 px-6 rounded-xl font-semibold transition"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};
