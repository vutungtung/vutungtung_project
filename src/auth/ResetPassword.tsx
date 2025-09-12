import BackButton from "../component/navigate";

export const ResetPassword = () => {
  return (
    <div className="bg-light-gray min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-7xl mx-auto py-10">
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] shadow-xl bg-white rounded-2xl overflow-hidden">
          {/* Left Image */}
          <div className="relative h-64 overflow-hidden lg:h-auto">
            <img
              src="/image/image-8.png"
              alt="reset"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 z-10 text-white bg-gradient-red/50 w-full  p-4 rounded-l-xl">
              <h1 className="text-2xl lg:text-4xl font-bold">Reset Password</h1>
              <p className="text-sm lg:text-lg max-w-sm">
                Create a new password for your account.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex flex-col p-6 sm:p-10 lg:p-12 justify-center space-y-5">
            <form className="space-y-4">
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-red"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-red"
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
    </div>
  );
};
