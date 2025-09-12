import BackButton from "../component/navigate";

export const ResetPasswordOTP = () => {
  return (
    <div className="bg-light-gray min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-3xl mx-auto py-10">
        <BackButton />
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center space-y-6">
          <h1 className="text-3xl font-bold text-black">Reset Password</h1>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-0 focus:ring-red"
            />

            <button
              type="button"
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
