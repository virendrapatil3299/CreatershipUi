
import { useEffect, useState } from 'react';

// -------- Placeholder Tabs --------
export default function Preferences() {
    const [form, setForm] = useState({
      language: 'English',
      timezone: '',
      notifications: {
        email: false,
        campaign: false,
        matches: false,
        performance: false,
        collaboration: false,
        weekly: false,
        platform: false,
        marketing: false,
        newsletter: false,
      },
    });
  
    const handleToggle = (key) => {
      setForm((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [key]: !prev.notifications[key],
        },
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Saving preferences:', form);
      // Send `form` data to Firebase, Supabase, or your API route here
    };
  
    return (
      <form onSubmit={handleSubmit} className="text-gray-700">
        <h2 className="text-xl font-semibold mb-6 text-orange-500">Preferences</h2>
  
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Language Dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium">Language</label>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              className="w-full border border-gray-300 rounded-full px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
  
          {/* Timezone Dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium">Time Zone</label>
            <select
              value={form.timezone}
              onChange={(e) => setForm({ ...form, timezone: e.target.value })}
              className="w-full border border-gray-300 rounded-full px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option>Select timezone...</option>
              <option>Asia/Kolkata</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
            </select>
          </div>
        </div>
  
        {/* Notification Toggles */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="grid md:grid-cols-2 gap-y-4 gap-x-12">
            {[
              ['email', 'Email Notifications'],
              ['campaign', 'Campaign Updates'],
              ['matches', 'Creator Matches'],
              ['performance', 'Performance Alerts'],
              ['collaboration', 'Collaboration Requests'],
              ['weekly', 'Weekly Reports'],
              ['platform', 'Platform Updates'],
              ['marketing', 'Marketing Tips'],
              ['newsletter', 'Newsletter'],
            ].map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm font-medium">{label}</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={form.notifications[key]}
                    onChange={() => handleToggle(key)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 rounded-full peer dark:bg-gray-300 peer-checked:bg-orange-400 transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
  
        {/* Save Button */}
        <div className="flex justify-end mt-10">
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    );
  }
    