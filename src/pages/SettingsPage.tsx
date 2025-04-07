export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">⚙️ Store Settings</h2>

      {/* Store Info */}
      <section className="bg-white p-6 shadow rounded space-y-4">
        <h3 className="text-lg font-medium">🏬 Store Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Store Name" className="input" />
          <input type="text" placeholder="Store URL" className="input" />
          <input type="text" placeholder="Support Email" className="input" />
          <input type="text" placeholder="Support Phone" className="input" />
        </div>
      </section>

      {/* Admin Info */}
      <section className="bg-white p-6 shadow rounded space-y-4">
        <h3 className="text-lg font-medium">👤 Admin Profile</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Admin Name" className="input" />
          <input type="email" placeholder="Email Address" className="input" />
          <input type="password" placeholder="Change Password" className="input" />
          <input type="password" placeholder="Confirm Password" className="input" />
        </div>
      </section>

      {/* Payment Settings */}
      <section className="bg-white p-6 shadow rounded space-y-4">
        <h3 className="text-lg font-medium">💳 Payment Integration</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Stripe API Key" className="input" />
          <input type="text" placeholder="PayPal Client ID" className="input" />
        </div>
      </section>

      {/* Shipping Settings */}
      <section className="bg-white p-6 shadow rounded space-y-4">
        <h3 className="text-lg font-medium">🚚 Shipping Settings</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Default Shipping Provider" className="input" />
          <input type="text" placeholder="Shipping Cost (Flat Rate)" className="input" />
        </div>
      </section>

      {/* Tax Settings */}
      <section className="bg-white p-6 shadow rounded space-y-4">
        <h3 className="text-lg font-medium">🧾 Tax Settings</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="number" placeholder="GST / VAT (%)" className="input" />
          <input type="text" placeholder="Tax Region" className="input" />
        </div>
      </section>

      {/* Notification Settings */}
      <section className="bg-white p-6 shadow rounded space-y-4">
        <h3 className="text-lg font-medium">📩 Notifications</h3>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="checkbox" />
          <span>Send email for new orders</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="checkbox" />
          <span>Send SMS alerts for low inventory</span>
        </label>
      </section>

      {/* Appearance */}
      <section className="bg-white p-6 shadow rounded space-y-4">
        <h3 className="text-lg font-medium">🎨 Appearance</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="file" className="input" />
          <input type="color" className="input" />
        </div>
        <p className="text-sm text-gray-500">Upload your logo and set theme color</p>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-50 p-6 shadow rounded space-y-4">
        <h3 className="text-lg font-medium text-red-600">🚨 Danger Zone</h3>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Delete Store
        </button>
        <button className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Reset All Data
        </button>
      </section>
    </div>
  );
}
