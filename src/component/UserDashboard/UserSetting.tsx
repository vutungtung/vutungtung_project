const UserSetting = () => {
  return (
    <div className="space-y-6 ">
      {/* Notification Preferences */}
      <div className="border border-gray-300 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>🔔</span> Notification Preferences
        </h2>
        <div className="space-y-3 mt-4">
          <label className="flex items-center justify-between">
            <div>
              <p className="font-medium">Booking Confirmations</p>
              <p className="text-sm text-gray-500">
                Get notified when your booking is confirmed
              </p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5" />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <p className="font-medium">Promotional Offers</p>
              <p className="text-sm text-gray-500">
                Receive emails about special deals and offers
              </p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5" />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <p className="font-medium">Booking Reminders</p>
              <p className="text-sm text-gray-500">
                Get reminded about upcoming bookings
              </p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5" />
          </label>
        </div>
      </div>

      {/* Security & Privacy */}
      <div className="border border-gray-300 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>🛡️</span> Security & Privacy
        </h2>
        <div className="space-y-2 mt-4">
          <button className="w-full text-left border border-gray-300 rounded-md p-3 hover:bg-gray-50">
            Change Password
          </button>
          <button className="w-full text-left border border-gray-300 rounded-md p-3 hover:bg-gray-50">
            Two-Factor Authentication
          </button>
          <button className="w-full text-left border border-gray-300 rounded-md p-3 hover:bg-gray-50">
            Download My Data
          </button>
          <button className="w-full text-left bg-red-600 text-white rounded-md p-3 hover:bg-red-700">
            Delete Account
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border border-gray-300 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>💳</span> Payment Methods
        </h2>
        <div className="space-y-2 mt-4">
          <div className="border border-gray-300 rounded-md p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span>💳</span>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
              Default
            </span>
          </div>
          <button className="w-full border border-gray-300 rounded-md p-3 hover:bg-gray-50">
            Add New Payment Method
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
