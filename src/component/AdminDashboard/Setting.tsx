import { useEffect, useState } from "react";

interface Settings {
  companyName: string;
  supportEmail: string;
  defaultCurrency: string;
  taxRate: number;
  emailNotifications: boolean;
}

const Settings = () => {
  const [settings, setSettings] = useState<Settings>({
    companyName: "",
    supportEmail: "",
    defaultCurrency: "USD",
    taxRate: 0,
    emailNotifications: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch settings from API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("https://api.example.com/settings");
        const data = await res.json();
        setSettings(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching settings:", err);
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save settings
  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("https://api.example.com/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      alert("Settings saved successfully!");
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading settings...</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">
          Manage organization and system preferences
        </p>
      </div>

      {/* Card */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Organization</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={settings.companyName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Support Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Support Email
            </label>
            <input
              type="email"
              name="supportEmail"
              value={settings.supportEmail}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Default Currency */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Default Currency
            </label>
            <select
              name="defaultCurrency"
              value={settings.defaultCurrency}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="NPR">NPR</option>
            </select>
          </div>

          {/* Tax Rate */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tax Rate (%)
            </label>
            <input
              type="number"
              name="taxRate"
              value={settings.taxRate}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
            <p className="text-gray-400 text-xs">Applied to booking totals.</p>
          </div>
        </div>

        {/* Email Notifications */}
        <div className="flex items-center mt-6">
          <label className="text-sm font-medium flex-1">
            Email Notifications
            <p className="text-gray-400 text-xs">
              Receive updates for new bookings and user activity.
            </p>
          </label>
          <input
            type="checkbox"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
            className="w-5 h-5"
          />
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
