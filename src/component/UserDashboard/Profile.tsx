const Profile = () => {
  return (
    <div className=" p-6 bg-white rounded-lg shadow border border-gray-300">
      <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

      {/* Profile Avatar */}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600">
          JD
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            defaultValue="John Doe"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            defaultValue="+1 (555) 123-4567"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            defaultValue="john.doe@example.com"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Member Since
          </label>
          <input
            type="text"
            value="January 2023"
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-6">
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
          Save Changes
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Profile;
